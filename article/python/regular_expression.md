<!-- 2020-09-28 14:00 -->
## Python 进阶学习 之正则表达式
> 正则表达式是一个特殊的字符序列，它能帮助你方便的检查一个字符串是否与某种模式匹配。

### re.match 函数

函数语法： `re.match(pattern, string, flags=0)`
  > * pattern	匹配的正则表达式
  > * string	要匹配的字符串。
  > * flags	标志位，用于控制正则表达式的匹配方式
 
匹配成功 re.match方法返回一个匹配的对象，否则返回None

#### 匹配对象 Match object

|匹配对象方法|	描述|
|:----|:----|
|group(num=0)	| 返回匹配的字符串，group() 可以一次输入多个组号，在这种情况下它将返回一个包含那些组所对应值的元组。|
|groups()	    | 返回一个包含所有小组字符串的元组，从 1 到 所含的小组号。|
|span()         | 返回匹配的范围|
|start()        | 返回匹配的开始处|

```
  s = 'hello python'
  p = 'hello'
  o = re.match(p, s) # 返回 re.Match object
  print(o.group())  # 返回匹配的字符串 hello
  print(o.span())  # 范围 (0, 5) 
  print(o.start())  # 开始处 0
  print(o.end())  # 开始处 5
  o2 = re.match(p, 'Hello python', re.I) # 忽略大小写
  print(o2.group())  # 返回匹配的字符串 Hello
```

#### flags : 可选，表示匹配模式，比如忽略大小写，多行模式等，具体参数为：
     
 * re.I 忽略大小写
 * re.L 表示特殊字符集 \w, \W, \b, \B, \s, \S 依赖于当前环境
 * re.M 多行模式
 * re.S 即为 . 并且包括换行符在内的任意字符（. 不包括换行符）
 * re.U 表示特殊字符集 \w, \W, \b, \B, \d, \D, \s, \S 依赖于 Unicode 字符属性数据库
 * re.X 为了增加可读性，忽略空格和 # 后面的注释

###  re.search 函数
> 扫描整个字符串并返回第一个成功的匹配。

函数语法： `re.search(pattern, string, flags=0)`
 
匹配成功re.search方法返回一个匹配的对象，否则返回None。

re.match与re.search的区别
 * re.match只匹配字符串的开始，如果字符串开始不符合正则表达式，则匹配失败，函数返回None；
 * re.search匹配整个字符串，直到找到一个匹配。

```
  print(re.match(r'hello', 'python hello')) # None
  print(re.search(r'hello', 'python hello ')) # <re.Match object; span=(0, 5), match='hello'>
```

### re.sub 函数
> 用于替换字符串中的匹配项。

函数语法： `re.sub(pattern, repl, string, count=0, flags=0)`
  > * repl : 替换的字符串，也可为一个函数
  > * count : 模式匹配后替换的最大次数，默认 0 表示替换所有的匹配。

```
  print(re.sub(r'#.*$', '', '123456 # 这是个什么'))          # 123456    # 替换#开头的部分
  print(re.sub(r'#\D*', '', '123456 # 这是个什么'))          # 123456    # 替换#开头的非数字部分
  print(re.subn(r'#\D*', '', '123456 # 这是个什么 78 # 这是个什么')) # ('123456 78 ', 2)   # 返回结果和替换的次数
  print(re.subn(r'#.*$', '', '123456 # 这是个什么'))                # ('123456'，1)       # 替换#开头的非数字部分

```
  
### re.compile 函数
> compile 函数用于编译正则表达式，生成一个正则表达式（ Pattern ）对象  RegexObject ，供 match() 和 search() 这两个函数使用。

函数语法： `re.compile(pattern[, flags])`

```
  regex = re.compile(r'\w+')  # 匹配字母或数字
  print(regex.match('1223dfdf'))        # <re.Match object; span=(0, 8), match='1223dfdf'>
  print(regex.match('##1223dfdf'))      # None
  print(regex.search('##1223dfdf'))     # <re.Match object; span=(2, 10), match='1223dfdf'>
  print(regex.findall('##1223dfdf'))    # ['1223dfdf']

```

### re.finditer 和 re.findall
> 在字符串中找到正则表达式所匹配的所有子串，
* finditer 并把它们作为一个迭代器返回
* findall返回一个列表，如果没有找到匹配的，则返回空列表。

注意： match 和 search 是匹配一次 findall 匹配所有。

函数语法： `re.finditer(pattern, string, flags=0)`

```
  print(re.findall(r'\w', '##1223dfdf'))        # ['1', '2', '2', '3', 'd', 'f', 'd', 'f']
  print(re.findall(r'\w+', '## 1223 df df 1'))  # ['1223', 'df', 'df', '1']
  for i in re.finditer(r'\w+', '## 1223 df df 1'): # 返回迭代器
    print(i, i.group())
```

### re.split
split 方法按照能够匹配的子串将字符串分割后返回列表，它的使用形式如下：

函数语法： `re.split(pattern, string[, maxsplit=0, flags=0])`

```
  print(re.split(r'\d+', '123abc123abc'))           # ['', 'abc', 'abc']
  print(re.split(r'\d+', '123 abc 123 abc'))        # ['', ' abc ', ' abc']
  print(re.split(r'\d+', 'abc123 abc 123 abc'))     # ['abc', ' abc ', ' abc']
  print(re.split(r'\d+', 'abc 123 abc 123 abc',1))  # ['abc ', ' abc 123 abc']

```


### 正则表达式中的特殊字符

> 模式字符串使用特殊的语法来表示一个正则表达式：

#### 特殊字符类

|实例|	描述|
|:----|:----|
|.	    |匹配除 "\n" 之外的任何单个字符。要匹配包括 '\n' 在内的任何字符，请使用象 '[.\n]' 的模式。|
|\d	    |匹配一个数字字符。等价于 [0-9]。|
|\D	    |匹配一个非数字字符。等价于 [^0-9]。|
|\s	    |匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。|
|\S	    |匹配任何非空白字符。等价于 [^ \f\n\r\t\v]。|
|\w	    |匹配包括下划线的任何单词字符。等价于'[A-Za-z0-9_]'。|
|\W	    |匹配任何非单词字符。等价于 '[^A-Za-z0-9_]'。|


####某些模式元素的含义会改变。

|模式	|描述|
|:----|:----|
|^	    | 匹配字符串的开头
|$	    | 匹配字符串的末尾。
|.	    | 匹配任意字符，除了换行符，当re.DOTALL标记被指定时，则可以匹配包括换行符的任意字符。
|[...]	| 用来表示一组字符,单独列出：[amk] 匹配 'a'，'m'或'k'
|[^...]	| 不在[]中的字符：[^abc] 匹配除了a,b,c之外的字符。
|re*	| 匹配0个或多个的表达式。
|re+	| 匹配1个或多个的表达式。
|re?	| 匹配0个或1个由前面的正则表达式定义的片段，非贪婪方式
|re{ n}	    |精确匹配 n 个前面表达式。例如， o{2} 不能匹配 "Bob" 中的 "o"，但是能匹配 "food" 中的两个 o。
|re{ n,}	| 匹配 n 个前面表达式。例如， o{2,} 不能匹配"Bob"中的"o"，但能匹配 "foooood"中的所有 o。"o{1,}" 等价于 "o+"。"o{0,}" 则等价于 "o*"。
|re{ n, m}	|匹配 n 到 m 次由前面的正则表达式定义的片段，贪婪方式
|a\| b	|匹配a或b
|(re)	|对正则表达式分组并记住匹配的文本
|(?imx)	|正则表达式包含三种可选标志：i, m, 或 x 。只影响括号中的区域。
|(?-imx)	|正则表达式关闭 i, m, 或 x 可选标志。只影响括号中的区域。
|(?: re)	|类似 (...), 但是不表示一个组
|(?imx: re)	|在括号中使用i, m, 或 x 可选标志
|(?-imx: re)	|在括号中不使用i, m, 或 x 可选标志
|(?#...)	|注释.
|(?= re)	|前向肯定界定符。如果所含正则表达式，以 ... 表示，在当前位置成功匹配时成功，否则失败。但一旦所含表达式已经尝试，匹配引擎根本没有提高；模式的剩余部分还要尝试界定符的右边。
|(?! re)	|前向否定界定符。与肯定界定符相反；当所含表达式不能在字符串当前位置匹配时成功
|(?> re)	|匹配的独立模式，省去回溯。
|\w	|匹配字母数字及下划线
|\W	|匹配非字母数字及下划线
|\s	|匹配任意空白字符，等价于 [ \t\n\r\f]。
|\S	|匹配任意非空字符
|\d	|匹配任意数字，等价于 [0-9].
|\D	|匹配任意非数字
|\A	|匹配字符串开始
|\Z	|匹配字符串结束，如果是存在换行，只匹配到换行前的结束字符串。
|\z	|匹配字符串结束
|\G	|匹配最后匹配完成的位置。
|\b	|匹配一个单词边界，也就是指单词和空格间的位置。例如， 'er\b' 可以匹配"never" 中的 'er'，但不能匹配 "verb" 中的 'er'。
|\B	|匹配非单词边界。'er\B' 能匹配 "verb" 中的 'er'，但不能匹配 "never" 中的 'er'。|
|\n, \t, 等.	|匹配一个换行符。匹配一个制表符。等|
|\1...\9	|匹配第n个分组的内容。|
|\10	|匹配第n个分组的内容，如果它经匹配。否则指的是八进制字符码的表达式。|


### 案例

```python
  print(re.match(r'abc(\d+)', 'abc123456'))    # 贪婪模式   <re.Match object; span=(0, 9), match='abc123456'>
  print(re.match(r'abc(\d+?)', 'abc123456'))   # 非贪婪模式 <re.Match object; span=(0, 4), match='abc1'>     
```

(.*) 贪婪匹配 尽可能多的往后匹配
(.*?) 非贪婪匹配 尽可能少的往后匹配

` re.findall('<a>(.*)</a>', '<a>AA</a><a>BB</a>') ` 返回 ['AA</a><a>BB']

` re.findall('<a>(.*?)</a>', '<a>AA</a><a>BB</a>') ` 返回 ['AA','BB']

` re.sub(r'\d+', 9, 'I'm 10 years old') ` 返回 I'm 9 years old

字段的提取：

 ` re.findall(r'range=(.*?)%7(.*?)&', 'range=2020-01-01%72020-01-02&a=1') ` 返回 ['2020-01-01','2020-01-02']
 
 `re.match('1\d{9}[0-3,5-6,8-9])` 匹配不是4/7结尾的手机号
 
 `re.findall('https://.*?\.jpg', s)[]` 匹配并返回一个url 
 
 `re.findall(r'[\u4e00-\u9fa5]+)` 匹配中文

