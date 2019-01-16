## Python中的数字(Number)和字符串(String)

> Python中最基础的数据类型包括数字型和字符型

### 数字数据

> 存储数值。数据类型是不允许改变的,这就意味着如果改变数字数据类型的值，将重新分配内存空间。

在变量赋值时 Number 对象将被创建 `var1 = 1`

使用del语句删除一些数字对象的引用 `del var1[,var2[,var3[....,varN]]]]`
使用del语句删除单个或多个对象的引用，例如： ` del var_a, var_b `

Python 支持三种不同的数值类型：

* 整型(Int) - 通常被称为是整型或整数，是正或负整数，不带小数点。Python3 整型是没有限制大小的，可以当作 Long 类型使用，所以 Python3 没有 Python2 的 Long 类型。
* 浮点型(float) - 浮点型由整数部分与小数部分组成，浮点型也可以使用科学计数法表示（2.5e2 = 2.5 x 102 = 250）
* 复数( (complex)) - 复数由实数部分和虚数部分构成，可以用a + bj,或者complex(a,b)表示， 复数的实部a和虚部b都是浮点型。

我们可以使用十六进制和八进制来代表整数：

```python

number = 0xA0F # 十六进制 2575
number=0o37 # 八进制 = 31
number=q0 # int
number=1.0 # float
number=3.14j # complex

``` 

> Python支持复数，复数由实数部分和虚数部分构成，可以用a + bj,或者complex(a,b)表示， 复数的实部a和虚部b都是浮点型。

__数字类型转换__

* int(x) 将x转换为一个整数。

* float(x) 将x转换到一个浮点数。

* complex(x) 将x转换到一个复数，实数部分为 x，虚数部分为 0。

* complex(x, y) 将 x 和 y 转换到一个复数，实数部分为 x，虚数部分为 y。x 和 y 是数字表达式。


#### Python 数字运算

表达式的语法很直白： +, -, * 和 / ：

> 注意：在不同的机器上浮点运算的结果可能会不一样。
  在整数除法中，除法 / 总是返回一个浮点数，如果只想得到整数的结果，丢弃可能的分数部分，可以使用运算符 // ：

```python
17 / 3  # 整数除法返回浮点型
17 // 3  # 整数除法返回向下取整后的结果
17 % 3  # ％操作符返回除法的余数
7.0//2  # 得到的并不一定是整数类型的数，它与分母分子的数据类型有关系。
7//2.0
```
使用 ** 操作来进行幂运算：`5 ** 2  # 5 的平方`


__数学函数__

* abs(x)	返回数字的绝对值，如abs(-10) 返回 10
* ceil(x)	返回数字的上入整数，如math.ceil(4.1) 返回 5
* cmp(x, y) 如果 x < y 返回 -1, 如果 x == y 返回 0, 如果 x > y 返回 1。 Python 3 已废弃 。使用 使用 (x>y)-(x<y) 替换。
* exp(x)	返回e的x次幂(ex),如math.exp(1) 返回2.718281828459045
* fabs(x)	返回数字的绝对值，如math.fabs(-10) 返回10.0
* floor(x)	返回数字的下舍整数，如math.floor(4.9)返回 4
* log(x)	如math.log(math.e)返回1.0,math.log(100,10)返回2.0
* log10(x)	返回以10为基数的x的对数，如math.log10(100)返回 2.0
* max(x1, x2,...)	返回给定参数的最大值，参数可以为序列。
* min(x1, x2,...)	返回给定参数的最小值，参数可以为序列。
* modf(x)	返回x的整数部分与小数部分，两部分的数值符号与x相同，整数部分以浮点型表示。
* pow(x, y)	x**y 运算后的值。
* round(x [,n])	返回浮点数x的四舍五入值，如给出n值，则代表舍入到小数点后的位数。
* sqrt(x)	返回数字x的平方根。

__随机数函数__

* choice(seq)	从序列的元素中随机挑选一个元素，比如random.choice(range(10))，从0到9中随机挑选一个整数。
* randrange ([start,] stop [,step])	从指定范围内，按指定基数递增的集合中获取一个随机数，基数缺省值为1
* random()	随机生成下一个实数，它在[0,1)范围内。
* seed([x])	改变随机数生成器的种子seed。如果你不了解其原理，你不必特别去设定seed，Python会帮你选择seed。
* shuffle(lst)	将序列的所有元素随机排序
* uniform(x, y)	随机生成下一个实数，它在[x,y]范围内。

__三角函数__

* acos(x)	返回x的反余弦弧度值。
* asin(x)	返回x的反正弦弧度值。
* atan(x)	返回x的反正切弧度值。
* atan2(y, x)	返回给定的 X 及 Y 坐标值的反正切值。
* cos(x)	返回x的弧度的余弦值。
* hypot(x, y)	返回欧几里德范数 sqrt(x*x + y*y)。
* sin(x)	返回的x弧度的正弦值。
* tan(x)	返回x弧度的正切值。
* degrees(x)	将弧度转换为角度,如degrees(math.pi/2) ， 返回90.0
* radians(x)	将角度转换为弧度

__数学常量__

* pi	数学常量 pi（圆周率，一般以π来表示）
* e	数学常量 e，e即自然常数（自然常数）。

### 字符串

使用引号('或")来创建字符串。
```python
var1 = 'Hello World!'
var2 = "Runoob"
print ("var1[0]: ", var1[0])
print ("var2[1:5]: ", var2[1:5])
print ("已更新字符串 : ", var1[:6] + 'Runoob!')
```

Python转义字符
```
转义字符	描述
\(在行尾时)	续行符
\\	反斜杠符号
\'	单引号
\"	双引号
\a	响铃
\b	退格(Backspace)
\e	转义
\000	空
\n	换行
\v	纵向制表符
\t	横向制表符
\r	回车
\f	换页
\oyy	八进制数，yy代表的字符，例如：\o12代表换行
\xyy	十六进制数，yy代表的字符，例如：\x0a代表换行
\other	其它的字符以普通格式输出
```

Python字符串运算符


|操作符|	描述|示例|
|:----|:----|:----|
|+	|字符串连接|	a + b 输出结果： HelloPython|
|*	|重复输出字符串	|a*2 输出结果：HelloHello|
|[]	|通过索引获取字符串中字符|	a[1] 输出结果 e|
|[ : ]	|截取字符串中的一部分，遵循左闭右开原则|a[1:4] 输出结果 ell|
|in	|成员运算符 - 如果字符串中包含给定的字符返回 True	|'H' in a 输出结果 True|
|not in	|成员运算符 - 如果字符串中不包含给定的字符返回True|	'M' not in a 输出结果 True|
|r/R	|原始字符串 - 所有的字符串都是直接按照字面的意思来使用，没有转义特殊或不能打印的字符|	print( r'\n' ) print( R'\n' )|
|%	|格式字符串|print ("我叫 %s 今年 %d 岁!" % ('小明', 10)) |


python字符串格式化符号:
```
      符号	 描述
      %c	 格式化字符及其ASCII码
      %s	 格式化字符串
      %d	 格式化整数
      %u	 格式化无符号整型
      %o	 格式化无符号八进制数
      %x	 格式化无符号十六进制数
      %X	 格式化无符号十六进制数（大写）
      %f	 格式化浮点数字，可指定小数点后的精度
      %e	 用科学计数法格式化浮点数
      %E	 作用同%e，用科学计数法格式化浮点数
      %g	 %f和%e的简写
      %G	 %f 和 %E 的简写
      %p	 用十六进制数格式化变量的地址
```
      
格式化操作符辅助指令:
```
符号	功能
*	定义宽度或者小数点精度
-	用做左对齐
+	在正数前面显示加号( + )
<sp>	在正数前面显示空格
#	在八进制数前面显示零('0')，在十六进制前面显示'0x'或者'0X'(取决于用的是'x'还是'X')
0	显示的数字前面填充'0'而不是默认的空格
%	'%%'输出一个单一的'%'
(var)	映射变量(字典参数)
m.n.	m 是显示的最小总宽度,n 是小数点后的位数(如果可用的话)
```

格式化示例
```python
for i in range(1, 10):
  print
  for j in range(1, i+1):
    print "%d*%d=%d" % (i, j, i*j)

name='test'
desc = "name=%s" % string 
age = 18
desc = "name=%s,age=%d" % (name, age)
height=1.7102
desc = "name=%s,age=%d,height=%.*f" % (name, age, 3, height)
```

__Python三引号__ 允许一个字符串跨多行，字符串中可以包含换行符、制表符以及其他特殊字符。
```python
para_str = """这是一个多行字符串的实例
多行字符串可以使用制表符
TAB ( \t )。
也可以使用换行符 [ \n ]。
"""
print (para_str)
```

__Unicode 字符串__

在Python2中，普通字符串是以8位ASCII码进行存储的，而Unicode字符串则存储为16位unicode字符串，这样能够表示更多的字符集。使用的语法是在字符串前面加上前缀 u。
在Python3中，所有的字符串都是Unicode字符串。

__内建函数__

* capitalize() 将字符串的第一个字符转换为大写
* center(width, fillchar) 返回一个指定的宽度 width 居中的字符串，fillchar 为填充的字符，默认为空格。
* count(str, beg= 0,end=len(string)) 返回 str 在 string 里面出现的次数，如果 beg 或者 end 指定则返回指定范围内 str 出现的次数
* bytes.decode(encoding="utf-8", errors="strict") Python3 中没有 decode 方法，但我们可以使用 bytes 对象的 decode() 方法来解码给定的 bytes 对象，这个 bytes 对象可以由 str.encode() 来编码返回。
* encode(encoding='UTF-8',errors='strict') 以 encoding 指定的编码格式编码字符串，如果出错默认报一个ValueError 的异常，除非 errors 指定的是'ignore'或者'replace'
* endswith(suffix, beg=0, end=len(string)) 
* expandtabs(tabsize=8) 把字符串 string 中的 tab 符号转为空格，tab 符号默认的空格数是 8 。
* find(str, beg=0 end=len(string)) 检测 str 是否包含在字符串中，如果指定范围 beg 和 end ，则检查是否包含在指定范围内，如果包含返回开始的索引值，否则返回-1
* index(str, beg=0, end=len(string)) 跟find()方法一样，只不过如果str不在字符串中会报一个异常.
* isalnum() 如果字符串至少有一个字符并且所有字符都是字母或数字则返 回 True,否则返回 False
* isalpha()如果字符串至少有一个字符并且所有字符都是字母则返回 True, 否则返回 False
* isdigit() 如果字符串只包含数字则返回 True 否则返回 False..
* islower()如果字符串中包含至少一个区分大小写的字符，并且所有这些(区分大小写的)字符都是小写，则返回 True，否则返回 False
* isnumeric()如果字符串中只包含数字字符，则返回 True，否则返回 False
* isspace() 如果字符串中只包含空白，则返回 True，否则返回 False.
* istitle() 如果字符串是标题化的(见 title())则返回 True，否则返回 False
* isupper() 如果字符串中包含至少一个区分大小写的字符，并且所有这些(区分大小写的)字符都是大写，则返回 True，否则返回 False
* join(seq) 以指定字符串作为分隔符，将 seq 中所有的元素(的字符串表示)合并为一个新的字符串
* len(string) 返回字符串长度
* ljust(width[, fillchar]) 返回一个原字符串左对齐,并使用 fillchar 填充至长度 width 的新字符串，fillchar 默认为空格。
* lower()转换字符串中所有大写字符为小写.
* lstrip()截掉字符串左边的空格或指定字符。
* maketrans() 创建字符映射的转换表，对于接受两个参数的最简单的调用方式，第一个参数是字符串，表示需要转换的字符，第二个参数也是字符串表示转换的目标。
* max(str) 返回字符串 str 中最大的字母。
* min(str)返回字符串 str 中最小的字母。
* replace(old, new [, max]) 把 将字符串中的 str1 替换成 str2,如果 max 指定，则替换不超过 max 次。
* rfind(str, beg=0,end=len(string)) 类似于 find()函数，不过是从右边开始查找.
* rindex( str, beg=0, end=len(string)) 类似于 index()，不过是从右边开始.
* rjust(width,[, fillchar]) 返回一个原字符串右对齐,并使用fillchar(默认空格）填充至长度 width 的新字符串
* rstrip() 删除字符串字符串末尾的空格.
* split(str="", num=string.count(str)) num=string.count(str)) 以 str 为分隔符截取字符串，如果 num 有指定值，则仅截取 num 个子字符串
*  splitlines([keepends]) 按照行('\r', '\r\n', \n')分隔，返回一个包含各行作为元素的列表，如果参数 keepends 为 False，不包含换行符，如果为 True，则保留换行符。
* startswith(substr, beg=0,end=len(string)) 检查字符串是否是以指定子字符串 substr 开头，返回 True，False。如果beg 和 end 指定值，则在指定范围内检查。
* strip([chars]) 在字符串上执行 lstrip()和 rstrip()
* swapcase() 将字符串中大写转换为小写，小写转换为大写
* title() 返回"标题化"的字符串,所有单词都是以大写开始，其余字母均为小写(见 istitle())
* translate(table, deletechars="") 根据 str 给出的表(包含 256 个字符)转换 string 的字符, 要过滤掉的字符放到 deletechars 参数中
* upper() 转换字符串中的小写字母为大写
*  zfill (width) 返回长度为 width 的字符串，原字符串右对齐，前面填充0
* isdecimal() 检查字符串是否只包含十进制字符，返回 true, false。



### 随机串

基础使用

```python
import random
# 随机整数：
random.randint(1,50) # a <= N <= b.

# 随机选取0到100间的偶数：
print random.randrange(0, 101, 2)

random.random()       # 随机浮点数

random.uniform(1, 10) # 随机浮点数

random.choice('abcdefghijklmnopqrstuvwxyz!@#$%^&*()') # 随机字符：

random.sample('zyxwvutsrqponmlkjihgfedcba',5) # 多个字符中生成指定数量的随机字符 数组：

# 从a-zA-Z0-9生成指定数量的随机字符：
ran_str = ''.join(random.sample(string.ascii_letters + string.digits, 8))
print ran_str

# 多个字符中选取指定数量的字符组成新字符串：
prin ''.join(random.sample(['z','y','x','w','v','u','t','s','r','q','p','o','n','m','l','k','j','i','h','g','f','e','d','c','b','a'], 5))

# 随机选取字符串：
print random.choice(['剪刀', '石头', '布'])

# 打乱排序
items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
print random.shuffle(items)

```



