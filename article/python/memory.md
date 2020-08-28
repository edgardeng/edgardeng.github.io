# Python 中的 内存管理
> Python中的内存管理(垃圾回收)机制主要包括：引用计数，标志清除，分代回收，部分缓存

## 引用计数
>   在python中，任何对象都会放在一个环形双向链表refChain中 
>
>   每种类型的对象都有一个ob_refcnt引用计数的值，引用个数+1，-1
>
>   当引用计数变成0时，会进行垃圾回收（对象销毁，在refchain中移除）

C源码如下：
```c
#define PyObject_HEAD       PyObject ob_base;
#define PyObject_VAR_HEAD      PyVarObject ob_base;
// 宏定义，包含 上一个、下一个，用于构造双向链表用。(放到refchain链表中时，要用到)
#define _PyObject_HEAD_EXTRA            \
    struct _object *_ob_next;           \
    struct _object *_ob_prev;
typedef struct _object {
    _PyObject_HEAD_EXTRA // 用于构造双向链表
    Py_ssize_t ob_refcnt;  // 引用计数器
    struct _typeobject *ob_type;    // 数据类型
} PyObject;
typedef struct {
    PyObject ob_base;   // PyObject对象
    Py_ssize_t ob_size; /* Number of items in variable part，即：元素个数 */
} PyVarObject;
```

这两个结构体PyObject和PyVarObject是基石，他们保存这其他数据类型公共部分，
例如：
    每个类型的对象在创建时都有PyObject中的那4部分数据；
    list/set/tuple等由多个元素组成对象创建时都有PyVarObject中的那5部分数据。


PyObject 是每个对象必有的内容 
    * ob_refcnt 为引用计数

在refchain中的所有对象内部都有一个`ob_refcnt`用来保存当前对象的引用计数器

当一个对象有新的引用时，`ob_refcnt`会增加，引用的对象被删除时，`ob_refcnt`减少

```python
age = 18
number = age  # 对象18的引用计数器 + 1
del age          # 对象18的引用计数器 - 1
print(sys.getrefcount(age)) # 获取对象的引用计数
```

常用的函数：
    * gc.get_count()        当前自动执行垃圾回收的计数器
    * gc.get_threshold      垃圾回收频率
    * gc.set_threshold()    设置频率
    * gc.disable()          关闭垃圾回收
    * gc.collect            手动回收

#### 循环引用的问题

```
v1 = [11,22,33]        # refchain中创建一个列表对象，由于v1=对象，所以列表引对象用计数器为1.
v2 = [44,55,66]        # refchain中再创建一个列表对象，因v2=对象，所以列表对象引用计数器为1.
v1.append(v2)        # 把v2追加到v1中，则v2对应的[44,55,66]对象的引用计数器加1，最终为2.
v2.append(v1)        # 把v1追加到v1中，则v1对应的[11,22,33]对象的引用计数器加1，最终为2.
del v1    # 引用计数器-1
del v2    # 引用计数器-1

```

上述代码会发现，执行del操作之后，没有变量再会去使用那两个列表对象，但由于循环引用的问题，他们的引用计数器不为0，所以他们的状态：永远不会被使用、也不会被销毁

## 标记清除
> 在python的底层，维护一个链表，链表中专门放一些可能存在循环引用的对象（如 List，tuple， dict, set ）
在python内部，某种情况下触发，去扫描可能存在循环引用的对象，检查是否循环引用。如果有则让双方的引用计数-1

## 分代回收
> 对标记清除中的链表进行优化，将那些可能存在循引用的对象拆分到3个链表，链表称为：0/1/2三代，每代都可以存储对象和阈值，当达到阈值时，就会对相应的链表中的每个对象做一次扫描，除循环引用各自减1并且销毁引用计数器为0的对象。

将可能存在循环引用的对象维护成3个链表：
    0 代， 0代对象个数达到700个扫描1次
    1 代， 0代扫描10次，则1次扫描一次
    2 代， 1代扫描10次，则2次扫描一次
    

## 缓存
> python在源码内部提出了优化机制-缓存机制

#### 池

>  为了避免重复创建和销毁一些常见对象，有个维护池 (int,string)
>  启动解释器时，python内部创建了一个小整数池 [-5,257]  

```
  a = 10
  b = 10 
  print(id(a)==id(b)) # 初始化地址一样
```

#### free_list (float,list,tuple,dict)
> 有数量限制
  当一个对象的引用计数器为0，按理应该回收，内部不会直接回收。而是将对象添加到free_list链表中
  以后再创建时，不再重新开辟内存，直接使用free_list

* float类型，维护的free_list链表最多可缓存100个float对象。

```python
  v1 = 3.14    # 开辟内存来存储float对象，并将对象添加到refchain链表。
  print( id(v1) ) # 内存地址：4436033488
  del v1    # 引用计数器-1，如果为0则在rechain链表中移除，不销毁对象，而是将对象添加到float的free_list.
  v2 = 9.999    # 优先去free_list中获取对象，并重置为9.999，如果free_list为空才重新开辟内存。
  print( id(v2) ) # 内存地址：4436033488
  # 注意：引用计数器为0时，会先判断free_list中缓存个数是否满了，未满则将对象缓存，已满则直接将对象销毁。
```

* int类型，不是基于free_list，而是维护一个small_ints链表保存常见数据（小数据池），小数据池范围：-5 <= value < 257。即：重复使用这个范围的整数时，不会重新开辟内存。
```python
  v1 = 38    # 去小数据池small_ints中获取38整数对象，将对象添加到refchain并让引用计数器+1。
  print( id(v1))  #内存地址：4514343712
  v2 = 38 # 去小数据池small_ints中获取38整数对象，将refchain中的对象的引用计数器+1。
  print( id(v2) ) #内存地址：4514343712
  # 注意：在解释器启动时候-5~256就已经被加入到small_ints链表中且引用计数器初始化为1，代码中使用的值时直接去small_ints中拿来用并将引用计数器+1即可。另外，small_ints中的数据引用计数器永远不会为0（初始化时就设置为1了），所以也不会被销毁。
```

* str类型，维护unicode_latin1[256]链表，内部将所有的ascii字符缓存起来，以后使用时就不再反复创建。

```python
  v1 = "A"
  print( id(v1) ) # 输出：4517720496
  del v1
  v2 = "A"
  print( id(v1) ) # 输出：4517720496
  # 除此之外，Python内部还对字符串做了驻留机制，针对那么只含有字母、数字、下划线的字符串（见源码Objects/codeobject.c），如果内存中已存在则不会重新在创建而是使用原来的地址里（不会像free_list那样一直在内存存活，只有内存中有才能被重复利用）。
  v1 = "wupeiqi"
  v2 = "wupeiqi"
  print(id(v1) == id(v2)) # 输出：True
```

* list类型，维护的free_list数组最多可缓存80个list对象。
```python
  v1 = [11,22,33]
  print( id(v1) ) # 输出：4517628816
  del v1
  v2 = ["武","沛齐"]
  print( id(v2) ) # 输出：4517628816
```

* tuple类型，维护一个free_list数组且数组容量20，数组中元素可以是链表且每个链表最多可以容纳2000个元组对象。元组的free_list数组在存储数据时，是按照元组可以容纳的个数为索引找到free_list数组中对应的链表，并添加到链表中。

```python
  v1 = (1,2)
  print( id(v1) )
  del v1  # 因元组的数量为2，所以会把这个对象缓存到free_list[2]的链表中。
  v2 = ("武沛齐","Alex")  # 不会重新开辟内存，而是去free_list[2]对应的链表中拿到一个对象来使用。
  print( id(v2) )
```
* dict类型，维护的free_list数组最多可缓存80个dict对象。

```python
  v1 = {"k1":123}
  print( id(v1) )  # 输出：4515998128
  del v1
  v2 = {"name":"武沛齐","age":18,"gender":"男"}
  print( id(v1) ) # 输出：4515998128
```

## Reference 参考
    
* [白话垃圾回收] (https://pythonav.com/wiki/detail/6/88)
