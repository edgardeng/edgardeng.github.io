# Python 基础学习

> 关于基本数据类型，数据结构，函数

### 基础语法

*编码*
默认情况下，Python 3 源码文件以 UTF-8 编码，所有字符串都是 unicode 字符串。

*标识符*
第一个字符必须是字母表中字母或下划线 _ 。
标识符的其他的部分由字母、数字和下划线组成。
标识符对大小写敏感。
在 Python 3 中，非 ASCII 标识符也是允许的了。

*python保留字* ,不能把它们用作任何标识符名称。Python 的标准库提供了一个 keyword 模块，可以输出所有关键字：
```
>>> import keyword
>>> keyword.kwlist
# ['False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
```

*注释* 单行注释以 # 开头，
多行注释可以用多个 # 号，还有 ''' 和 """：

```python
# 第一个注释
 
'''
第三注释
第四注释
'''
 
"""
第五注释
第六注释
"""
```

*行与缩进* 使用缩进来表示代码块，不需要使用大括号 {} 。缩进的空格数是可变的，但是同一个代码块的语句必须包含相同的缩进空格数。缩进不一致，会导致运行错误
IndentationError: unindent does not match any outer indentation level

*多行语句*
Python 通常是一行写完一条语句，但如果语句很长，我们可以使用反斜杠(\)来实现多行语句

数字(Number)类型

python中数字有四种类型：整数、布尔型、浮点数和复数。

* int (整数), 如 1, 只有一种整数类型 int，表示为长整型，没有 python2 中的 Long。
* bool (布尔), 如 True。
* float (浮点数), 如 1.23、3E-2
* complex (复数), 如 1 + 2j、 1.1 + 2.2j

字符串(String)

* python中单引号和双引号使用完全相同。
* 使用三引号('''或""")可以指定一个多行字符串。
* 转义符 '\'
* 反斜杠可以用来转义，使用r可以让反斜杠不发生转义。。 如 r"this is a line with \n" 则\n会显示，并不是换行。
* 按字面意义级联字符串，如"this " "is " "string"会被自动转换为this is string。
* 字符串可以用 + 运算符连接在一起，用 * 运算符重复。
* Python 中的字符串有两种索引方式，从左往右以 0 开始，从右往左以 -1 开始。
* Python中的字符串不能改变。
* Python 没有单独的字符类型，一个字符就是长度为 1 的字符串。

字符串的截取的语法格式：变量[头下标:尾下标]

空行

函数之间或类的方法之间用空行分隔，表示一段新的代码的开始。类和函数入口之间也用一行空行分隔，以突出函数入口的开始。

空行与代码缩进不同，空行并不是Python语法的一部分。书写时不插入空行，Python解释器运行也不会出错。但是空行的作用在于分隔两段不同功能或含义的代码，便于日后代码的维护或重构。

记住：空行也是程序代码的一部分。

等待用户输入
执行下面的程序在按回车键后就会等待用户输入：
```
input("\n\n按下 enter 键后退出。")
```
以上代码中 ，"\n\n"在结果输出前会输出两个新的空行。一旦用户按下 enter 键时，程序将退出。

*同一行显示多条语句*

Python可以在同一行中使用多条语句，语句之间使用分号(;)分割，以下是一个简单的实例：

```
import sys; x = 'runoob'; sys.stdout.write(x + '\n')
# runoob
```

*多个语句构成代码组*

缩进相同的一组语句构成一个代码块，我们称之代码组。
像if、while、def和class这样的复合语句，首行以关键字开始，以冒号( : )结束，该行之后的一行或多行代码构成代码组。将首行及后面的代码组称为一个子句(clause)。

```
if expression : 
   suite
elif expression : 
   suite 
else : 
   suite
```
   
*Print 输出*

print 默认输出是换行的，如果要实现不换行需要在变量末尾加上 end=""：

*导入相应的模块*

将整个模块(somemodule)导入，格式为： import somemodule

从某个模块中导入某个函数,格式为： from somemodule import somefunction

从某个模块中导入多个函数,格式为： from somemodule import firstfunc, secondfunc, thirdfunc

将某个模块中的全部函数导入，格式为： from somemodule import *


### 标准数据类型
> Python 中的变量不需要声明。每个变量在使用前都必须赋值，变量赋值以后该变量才会被创建

Python3 中有六个标准的数据类型：

* Number（数字）
* String（字符串）
* List（列表）
* Tuple（元组）
* Set（集合）
* Dictionary（字典）

Python3 的六个标准数据类型中：

* 不可变数据（3 个）：Number（数字）、String（字符串）、Tuple（元组）；
* 可变数据（3 个）：List（列表）、Dictionary（字典）、Set（集合）。


### 函数

定义一个函数要使用def语句，依次写出函数名、括号、括号中的参数和冒号:，然后，在缩进块中编写函数体，函数的返回值用return语句返回。

```
def my_abs(x):
    if x >= 0:
        return x
    else:
        return -x
// my_abs(-9)  调用  
```

*空函数*

如果想定义一个什么事也不做的空函数，可以用pass语句,(pass 作为占位符)：

```
def nop():
    pass
//  在其他语句里   
if age >= 18:
    pass    
```

参数检查

调用函数时，如果参数个数不对，Python解释器会自动检查出来，并抛出TypeError

```
def my_abs(x):
    if not isinstance(x, (int, float)):
        raise TypeError('bad operand type')
    // 数据类型检查可以用内置函数isinstance()实现：
    if x >= 0:
        return x
    else:
        return -x
```
        
返回多个值

```
import math
def move(x, y, step, angle=0):
    nx = x + step * math.cos(angle)
    ny = y - step * math.sin(angle)
    return nx, ny
```   
 
*默认参数* （定义默认参数要牢记一点：默认参数必须指向不变对象！）

```
def enroll(name, gender, age=6, city='shanghai'):
  print('gender:',gender)
  print('age:',age)
  print('city:',city)

enroll('shan','F')
enroll('shan','M',5,'beijing')
enroll('shan','F',age=6)

def add_end(L=None):
    if L is None:
        L = []
    L.append('END')
    return L

add_end()    
```

*可变参数*

```
def calc(numbers):
    sum = 0
    for n in numbers:
        sum = sum + n * n
    return sum
    
calc([1, 2, 3]) //  调用的时候，需要先组装出一个list或tuple
calc(1, 2, 3)
nums = [1, 2, 3]
calc(*nums)   // 定义可变参数和定义一个list或tuple参数相比，仅仅在参数前面加了一个*号
```

*关键字参数*

关键字参数允许你传入0个或任意个含参数名的参数，这些关键字参数在函数内部自动组装为一个dict

```
def person(name, age, **kw):
    print('name:', name, 'age:', age, 'other:', kw)
    
person('Bob', 35, city='Beijing')
person('Adam', 45, gender='M', job='Engineer')
extra = {'city': 'Beijing', 'job': 'Engineer'}
person('Jack', 24, **extra)   // **extra表示把extra这个dict的所有key-value用关键字参数传入到函数的**kw参数  
```

*命名关键字参数*

如果要限制关键字参数的名字，就可以用命名关键字参数，例如，只接收city和job作为关键字参数
和关键字参数*kw不同，命名关键字参数需要一个特殊分隔符，*后面的参数被视为命名关键字参数。

```
def person(name, age, *, city, job):
    print(name, age, city, job)

person('Jack', 24, city='Beijing', job='Engineer')
person('Jack', 24, 'Beijing', 'Engineer')   命名关键字参数必须传入参数名，这和位置参数不同。如果没有传入参数名，调用将报错

def person(name, age, city, job):
    # 缺少 *，city和job被视为位置参数
    pass
```

如果没有可变参数，就必须加一个作为特殊分隔符。如果缺少，Python解释器将无法识别位置参数和命名关键字参数：

*参数组合*

在Python中定义函数，可以用必选参数、默认参数、可变参数、关键字参数和命名关键字参数，这5种参数都可以组合使用。
参数定义的顺序必须是：必选参数、默认参数、可变参数、命名关键字参数和关键字参数。

```
def f1(a, b, c=0, *args, **kw):
    print('a =', a, 'b =', b, 'c =', c, 'args =', args, 'kw =', kw)
def f2(a, b, c=0, *, d, **kw):
    print('a =', a, 'b =', b, 'c =', c, 'd =', d, 'kw =', kw)
```

在函数调用的时候，Python解释器自动按照参数位置和参数名把对应的参数传进去。

```
 f1(1, 2)
a = 1 b = 2 c = 0 args = () kw = {}
 f1(1, 2, c=3)
a = 1 b = 2 c = 3 args = () kw = {}
 f1(1, 2, 3, 'a', 'b')
a = 1 b = 2 c = 3 args = ('a', 'b') kw = {}
 f1(1, 2, 3, 'a', 'b', x=99)
a = 1 b = 2 c = 3 args = ('a', 'b') kw = {'x': 99}
 f2(1, 2, d=99, ext=None)
a = 1 b = 2 c = 0 d = 99 kw = {'ext': None}
```

最神奇的是通过一个tuple和dict，你也可以调用上述函数：

```
 args = (1, 2, 3, 4)
 kw = {'d': 99, 'x': '#'}
 f1(*args, **kw)
a = 1 b = 2 c = 3 args = (4,) kw = {'d': 99, 'x': '#'}
 args = (1, 2, 3)
 kw = {'d': 88, 'x': '#'}
 f2(*args, **kw)
a = 1 b = 2 c = 3 d = 88 kw = {'x': '#'}
```

*递归函数*

在函数内部，可以调用其他函数。如果一个函数在内部调用自身本身，这个函数就是递归函数。
举个例子，计算阶乘n! = 1 x 2 x 3 x ... x n

```
def fact(n):
    if n==1:
        return 1
    return n * fact(n - 1)
```
    
使用递归函数需要注意防止栈溢出。在计算机中，函数调用是通过栈（stack）这种数据结构实现的，每当进入一个函数调用，栈就会加一层栈帧，每当函数返回，栈就会减一层栈帧。由于栈的大小不是无限的，所以，递归调用的次数过多，会导致栈溢出。

可以试试fact(1000)：

*尾递归* 是指在函数返回的时候，调用自身本身，并且，return语句不能包含表达式。这样，编译器或者解释器就可以把尾递归做优化，使递归本身无论调用多少次，都只占用一个栈帧，不会出现栈溢出的情况。

```
def fact(n):
    return fact_iter(n, 1)

def fact_iter(num, product):
    if num == 1:
        return product
    return fact_iter(num - 1, num * product)
``` 

*切片* (取前N个元素)

```
  L = ['Michael', 'Sarah', 'Tracy', 'Bob', 'Jack']
  for i in range(n):
     r.append(L[i])
  L[0:3]   // 完成切片 
  L[-2:]  //　倒数第２个开始
  L[0:3] // 表示，从索引0开始取，直到索引3为止，但不包括索引3。即索引0，1，2，正好是3个元素。
倒数第一个元素的索引是-1
```
再如下：

```
  L = list(range(100))
  // L [0, 1, 2, 3, ..., 99]

  L[:10] 前10个数
  L[-10:] 后10个数：
  L[10:20] 前11-20个数
  L[:10:2]  前10个数，每两个取一个
  L[::5] 所有数，每5个取一个：
  L[:] 所有的

 // 字符串'xxx'也可以看成是一种list，每个元素就是一个字符。
 'ABCDEFG'[:3]
 // 'ABC'
 'ABCDEFG'[::2]
 // 'ACEG'

  def trim(s):
    if (s[:1] == ' '):
      return trim(s[1:])
    if (s[-1:] == ' '):
      return trim(s[:-1])
    return s
```
  
*迭代*

如果给定一个list或tuple，通过for循环来遍历这个list或tuple，这种遍历我们称为迭代（Iteration）

```
d = {'a': 1, 'b': 2, 'c': 3}
for key in d:
  print(key)
```
  
dict的存储不是按照list的方式顺序排列，所以，迭代出的结果顺序很可能不一样

```
for ch in 'abcde'
  print(ch)
```

如何判断一个对象是可迭代对象呢？方法是通过collections模块的Iterable类型判断：

```
 from collections import Iterable
 isinstance('abc', Iterable) # str是否可迭代
 // True
 isinstance([1,2,3], Iterable) # list是否可迭代
 // True
 isinstance(123, Iterable) # 整数是否可迭代
 // False
```

 Python内置的enumerate函数可以把一个list变成索引-元素对
 
```
  for i, value in enumerate(['A', 'B', 'C']):
    print(i, value)
 // 在for循环中，引用了两个变量 
  for x, y in [(1, 1), (2, 4), (3, 9)]:
    print(x, y)
```

列表生成式 (List Comprehensions，是Python内置的非常简单却强大的可以用来创建list的生成式)
 
``` 
 list(range(1, 11))
 // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

 L = []
 for x in range(1, 11):
    L.append(x * x)
 // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

 [x * x for x in range(1, 11)]
 // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
 # for循环后面加条件判断
  [x * x for x in range(1, 11) if x % 2 == 0]
  // [4, 16, 36, 64, 100]
  # 两层循环
  [m + n for m in 'ABC' for n in 'XYZ']
  // ['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']

  import os // 导入os模块
  [d for d in os.listdir('.')]  // os.listdir可以列出文件和目录
```
for循环其实可以同时使用两个甚至多个变量

```
d = {'x': 'A', 'y': 'B', 'z': 'C' }
 for k, v in d.items():
   print(k, '=', v)
[k + '=' + v for k, v in d.items()]
L = ['Hello', 'World', 'IBM', 'Apple']
[s.lower() for s in L] #大写变小写

```

生成器

如果列表元素可以按照某种算法推算出来，那我们是否可以在循环的过程中不断推算出后续的元素呢？这样就不必创建完整的list，从而节省大量的空间。在Python中，这种一边循环一边计算的机制，称为生成器：generator。

```
 L = [x * x for x in range(10)]
 L
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
 g = (x * x for x in range(10))
 g
<generator object <genexpr> at 0x1022ef63
next(g)

for n in g:
  print(n)
```
  
创建L和g的区别仅在于最外层的[]和()，L是一个list，而g是一个generator。

可以通过next()函数获得generator的下一个返回值：

著名的斐波拉契数列（Fibonacci），除第一个和第二个数外，任意一个数都可由前两个数相加得到,函数

```
def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        print(b)
        a, b = b, a + b
        n = n + 1
    return 'done'
```  
把fib函数变成generator，只需要把print(b)改为yield b就可以了：

```
def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b
        a, b = b, a + b
        n = n + 1
    return 'done'

 f = fib(6)
 f
<generator object fib at 0x104feaaa0>
```

最难理解的就是generator和函数的执行流程不一样。
函数是顺序执行，遇到return语句或者最后一行函数语句就返回。
generator的函数，在每次调用next()的时候执行，遇到yield语句返回，再次执行时从上次返回的yield语句处继续执行。
用for循环调用generator时，发现拿不到generator的return语句的返回值。如果想要拿到返回值，必须捕获StopIteration错误，返回值包含在StopIteration的value中：

```
 g = fib(6)
 while True:
     try:
       x = next(g)
        print('g:', x)
    except StopIteration as e:
       print('Generator return value:', e.value)
              break
```
              
迭代器
凡是可作用于for循环的对象都是Iterable类型；

凡是可作用于next()函数的对象都是Iterator类型，它们表示一个惰性计算的序列；

集合数据类型如list、dict、str等是Iterable但不是Iterator，不过可以通过iter()函数获得一个Iterator对象。

```
for x in [1, 2, 3, 4, 5]:
    pass
实际上完全等价于：

# 首先获得Iterator对象:
it = iter([1, 2, 3, 4, 5])
# 循环:
while True:
    try:
        # 获得下一个值:
        x = next(it)
    except StopIteration:
        # 遇到StopIteration就退出循环
        break
```
        
使用isinstance()判断一个对象是否是Iterable对象：

```
 from collections import Iterable
 isinstance([], Iterable)
True
 isinstance({}, Iterable)
True
 isinstance('abc', Iterable)
True
 isinstance((x for x in range(10)), Iterable)
True
 isinstance(100, Iterable)
False
```

相关连接：

[廖雪峰Python教程](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000)