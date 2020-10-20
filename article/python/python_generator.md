<!-- 2020-10-19 20:00 -->
# Python 进阶之生成器
> 生成器也是一种迭代器，但只能对其迭代一次。
> 因为它们并没有把所有的值存在内存中，而是在运行时生成值。我们可以通过遍历来使用它们，要么用一个“for”循环，要么将它们传递给任意可以进行迭代的函数和结构

## 迭代器(iterators)

迭代器是可以遍历一个容器(特别是列表)的对象。
然而，一个迭代器在遍历并读取一个容器的数据元素时，并不会执行一个迭代。

三个概念:
* 可迭代对象(Iterable) 
* 迭代器(Iterator) 
* 迭代(Iteration)

### 可迭代对象(Iterable)

Python中任意的对象，只要它定义了可以返回一个迭代器的__iter__方法，或者定义了 可以支持下标索引的__getitem__方法, 那么它就是一个可迭代对象。

简单说，可迭代对象就是能提供迭代器的任意对象

### 迭代器(Iterator)

任意对象，只要定义了next(Python2) 或者__next__方法，它就是一个迭代器。

### 迭代(Iteration)

当创建一个(列表)对象后，可以一个接一个读取该(列表)对象中的值，这个过程就叫做迭代

当我们使用一个循环来从某个地方(比如一个列表)取出一个元素的过程，就叫迭代。

```python
# mylist = [1, 2, 3]
mylist = [x*x for x in range(3)]
for i in mylist:
    print(i, end=' ')
```

只要使用for ... in...语句，那么in子句后面的部分一定是一个可迭代的对象，如列表、字典、字符串等。


## 生成器(Generators)
> 如果这些值只需要迭代一次就不再使用，那么这些值在内存中长期存在是没有必要的，所有就产生了产生器（Generator）的概念

生成器也是一种迭代器，但只能对其迭代一次。因为它们并没有把所有的值存在内存中，而是在运行时生成值。

通过遍历来使用它们，要么用一个“for”循环，要么将它 们传递给任意可以进行迭代的函数和结构。大多数时候生成器是以函数来实现的。然而， 它们并不返回一个值，而是yield(暂且译作“生出”)一个值。

产生器只解决一个问题，就是让需要迭代的值不再常驻内存，也就是解决的内存资源消耗的问题。

> 生成器最佳应用场景是:你不想同一时间将所有计算出来的大 量结果集分配到内存当中，特别是结果集里还包含循环。

```python
# 创建产生器
data_generator = (x*x for x in range(3))
print(data_generator) #  <generator object <genexpr> at 0x7f95e0154150>
for i in data_generator:
    print(i, end=' ')

print('第二次迭代data_generator,什么都不会输出')

for i in data_generator:
    print(i, end=' ')
```

使用一对方括号创建的是列表对象，而使用一对圆括号创建的就是迭代器对象

### yield
> 产生器是如何做到这一点的呢？这就要依靠yield语句

```python
# 编写产生器函数
def generate_even(max):
    for i in range(0, max + 1):
        if i % 2 == 0:
            yield i
print(generate_even(10)) # <generator object generate_even at 0x7f814826c450>
even_generator = generate_even(10)
for n in even_generator:
    print(n, end=' ')
```

其中generator_even是一个产生器函数。我们注意到，在该函数中每找到一个偶数，就会通过yield语句指定这个偶数

其实yield语句与return语句一样，都起到返回的作用。
但yield与return不同，如果执行return语句，会直接返回return后面表达式的值。
但执行yield语句，返回的是一个产生器对象，而且这个产生器对象的当前值就是yield语句后面跟着的表达式的值。
调用yield语句后，当前函数就会返回一个迭代器，而且函数会暂停执行，直到对该函数进行下一次迭代。


### next方法

> 什么时候进行下一次迭代呢？如果不使用for...in...语句，是否可以对产生器进行迭代呢？其实迭代器有一个特殊方法__next__。每次对迭代器的迭代，本质上都是在调用__next__方法。

其实for...in...语句在底层会不断调用in子句后面的可迭代对象的__next__方法，直到该方法抛出StopIteration异常为止

for循环会自动捕捉到这个异常并 停止调用next()

```python
def generator_function():
    for i in range(3):
        yield i
gen = generator_function() 
print(next(gen)) # Output: 0
print(next(gen)) # Output: 1
print(next(gen)) # Output: 2
print(next(gen)) # 抛出StopIteration异常
```


### Python中一些内置数据类型也支持迭代

```python
my_string = "Yasoob"
next(my_string) # TypeError: str object is not an iterator
```

异常说: str对象不是一个迭代器。也就是说它是一个可迭代对象，而不是一个迭代器

这意味着它支持迭代，但我们不能直接对其进行迭代操作

**一个内置函数iter， 将根据一个可迭代对象返回一个迭代器对象**

```python
my_string = "Yasoob"
my_iter = iter(my_string)
next(my_iter)
```

### 与迭代相关的API
> Python SDK提供了一个itertools模块，该模块中的API都与迭代相关，例如，可以通过chain.from_iterable方法合并多个可迭代对象，通过permutations函数以可迭代对象形式返回列表的全排列。
    
```python

 from itertools import *
    
    # 这里每一个yield的值必须是可迭代的，才能用chain.from_iterable方法合并
    def make_iterables_to_chain():
        yield [1,2,3]
        yield ['a','b','c']
        yield ['hello','world']
    
    for v in make_iterables_to_chain():
        print(v)
    # 将所有可迭代对象合并成一个可迭代对象
    for v in chain.from_iterable(make_iterables_to_chain()):
        print('<',v,'>', end = ' ')

    print('-------上面的代码相当于下面的写法-------')
    a = [1,2,3]
    a.extend(['a','b','c'])
    a.extend(['hello','world'])
    print(a)
    for v in a:
        print('[',v,']', end = ' ')

    #  以可迭代对象形式返回列表的全排列
    values = [1,2,3,4]
    values_permutations = permutations(values)
    for p in values_permutations:
        print(p)
```    
