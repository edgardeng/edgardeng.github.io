## Flutter Study - 3. Dart
> Dart语言的知识点：常用开发库/变量与基本数据类型/函数/运算符/流程控制语句/异常处理/面向对象/泛型/库的使用/异步支持/元数据/注释

### 3.1　Dart重要概念与常用开发库
> Dart诞生于2011年10月10日，Lars Bak在丹麦举行的Goto会议上宣布，Dart是一种“结构化的Web编程”语言，Dart编程语言在所有现代浏览器和环境中提供高性能。
Dart虽然是谷歌开发的计算机编程语言，但后来被ECMA认定为标准。

这门语言用于Web、服务器、移动应用和物联网等领域的开发，是宽松开源许可证（修改的BSD证书）下的开源软件

* Dart是AOT（Ahead Of Time）编译的，编译成快速、可预测的本地代码，使Flutter几乎都可以使用Dart编写。这不仅使Flutter变得更快，而且几乎所有的组件（包括所有的小部件）都可以定制。
* Dart也可以JIT（Just In Time）编译，开发周期异常快，工作流颠覆常规（包括Flutter流行的亚秒级有状态热重载）。
* Dart可以更轻松地创建以60fps运行的流畅动画和转场。Dart可以在没有锁的情况下进行对象分配和垃圾回收。就像JavaScript一样，Dart避免了抢占式调度和共享内存（因而也不需要锁）。由于Flutter应用程序被编译为本地代码，因此不需要在领域之间建立缓慢的桥梁（例如，JavaScript到本地代码）。它的启动速度也快得多。
* Dart使Flutter不需要单独的声明式布局语言（如JSX或XML），或单独的可视化界面构建器，因为Dart的声明式编程布局易于阅读和可视化。
所有的布局使用一种语言，聚集在一处，Flutter很容易提供高级工具，使布局更简单。
* 开发人员发现Dart特别容易学习，因为它具有静态和动态语言用户都熟悉的特性。


Dart重要的概念如下：
* 所有的东西都是对象，无论是变量、数字、函数等都是对象。所有的对象都是类的实例。所有的对象都继承自内置的Object类。这点类似于Java语言“一切皆为对象”。
* 程序中指定数据类型使得程序合理地分配内存空间，并帮助编绎器进行语法检查。但是，指定类型不是必须的。Dart 语言是弱数据类型。
* Dart代码在运行前解析。指定数据类型和编译时的常量，可以提高运行速度。

* Dart程序有统一的程序入口：main()。这一点与Java、C / C++语言相像。
* Dart没有public、protected和private的概念。私有特性通过变量或函数加上下划线来表示。
* Dart的工具可以检查出警告信息（warning）和错误信息（errors）。警告信息只是表明代码可能不工作，但是不会妨碍程序运行。错误信息可以是编译时的错误，也可能是运行时的错误。编译时的错误将阻止程序运行，运行时的错误将会以异（exception）的方式呈现。
* Dart支持anync/await异步处理。

Dart语言常用库:
|包名     |描述|
|:----   |:----|
|dart:async     |异步编程，提供Future,Stream|
|dart:collection|对core提供更多的集合支持|
|dart:convert   |不同类型间的字符编码转换|
|dart:core      |核心库，包括strings、  numbers、collections、errors、dates、URIs|
|dart:html      |网页开发里DOM相关的一些库|
|dart:io        |I/O命令行使用的I/O库|
|dart:math      |数字常量和函数，提供随机数|
|dart:svg       |事件和动画的矢量图像支持|

> 使用官方提供的pub工具可以安装丰富的第三方库。第三方库的地址为：pub.dartlang.org。

### 3.2　变量与基本数据类型
1. 变量

在Dart里，变量声明使用var关键字： `var name = '小张'`

在Dart语言里一切皆为对象，所以如果没有将变量初始化，那么它的默认值为null。

下面的示例代码判断name是否为null：
```dart
int name;
if(name == null);
```

2. 常量和固定值

    * 如果定义的变量不会变化，可以使用final或const来指明
    > const是一个编译时的常量，final的值只能被设定一次，示例如下：
`final username = '张三'; // 定义了一个常量
// username = '李四'; // 会引发一个错误`
    > 第一行代码设置了一个常量，如果第二行进新重新赋值，那么将引发异常。

    * 通过对const类型做四则运算将自动得到一个const类型的值。
    `const pi = 3.1415926; const area = pi 100 100;`
    * 可以通过const来创建常量的值，就是说const[] 本身是构造函数，示例代码如下所示：
    `final stars = const []; const buttons = const [];`
    
3. 基本数据类型
    > Dart语言常用的基本数据类型包括：  number、String、Boolean、List、Map。
    
    1.   number类型
        * int整形。取值范围：-2^53 到 2^53。
        * doble浮点型。64 位长度的浮点型数据，即双精度浮点型。
        > int和double类型都是   num 类型的子类。int类型不能包含小数点。  num类型包括的操作有：+，-，*，/以及位移操作>>。  num类型包括的常用方法有：abs、ceil和floor。
    2. String类型/字符串类型
        `var s1 = 'hello world'`; //单双引号都可以
        `var s1 = 'hi ';var s2 = 'flutter';var s3 = s1 + s2;`
        可以使用三个单引号或双引号来定义多行的String类型，表示大文本块
    3. Boolean类型
        Dart是强bool类型检查，只有bool 类型的值是true才被认为是true。
        有的语言里0是false，大于0是true。在Dart语言里则不是，值必须为true或者false。
        `var sex = '男'; if (sex) { print('你的性别是!' + sex);}`编译不能正常通过，原因是sex变量是一个字符串，不能使用条件判断语句，必需使用bool类型才可以

    4. List类型(具有一系列相同类型的数据)
        * 索引: 第一个元素的索引是0，最后一个是list.lenght – 1 `var list = [1,2,3,4,5,6]; print(list.length); print(list[list.length - 1]); `
        * 声明: 非固定长度`List()`。 固定长度 `List(2)`。固定类型 `List<String>()`。 直接赋值`[1,2,3]`。
        * 生成: 使用generate方法,` new List<String>.generate(1000, (i)=> "Item $i")`

    5. Map类型
        > Map类型将key和value关联在一起，也就是健值对。像其他支持Map的编程语言一样，key必须是唯一的。

```Dart
var week = {

  'Monday' : '星期一',
  'Tuesday': '星期二',
  'Wednesday' : '星期三',
  'Thursday': '星期四',
  'Friday': '星期五',
  'Saturday': '星期六',
  'Sunday': '星期日',
};
// 也可以使用Map对象的构造函数Map()来创建Map对象，如下所示：
var week = new Map();

week['Monday'] = '星期一';
week['Tuesday'] = '星期二';
week['Wednesday'] = '星期三';
week['Thursday'] = '星期四';
week['Friday'] = '星期五';
week['Saturday'] = '星期六';
week['Sunday'] = '星期日';
// 添加新的key-value对，再给week添加一个值，注意，其中0为键不是数组的下标索引：
week['0'] = '星期一';
// 检查key是否在Map对象中：
assert(week['Monday'] == null);
// 使用length来获取key-value对的数量，现在我们调用length输出长度结果为8，原因是后面又添加了一个数据，代码如下所示：
print(week.length);
```

### 3.3　函数

> Dart是一个面向对象的语言，所以函数也是对象，函数属于Function对象。
> 函数可以像参数一样传递给其他函数，这样便于做回调处理。

```Dart
//判断两个字符串是否相等
bool equal(String str1, String str2) {
  return str1 == str2;
}
```

1. 可选参数
> 使用中括号[]将参数括起来，用来表明是可选位置参数。

例如: 总共传入了三个参数，其中name和sex是必需传入的参数，from参数可以不传

```Dart
//获取用户信息
String getUserInfo(String name, String sex, [String from]) {
  var info = '$name的性别是$sex';
  if (from != null) {
    info = '$info来自$from';
  }
  return info;
}

void test(){
  print(getUserInfo('小王', '男'));
}
// 调用上面的test方法可以输出“小王的性别是男”，但是不会输出来自哪里。
```

2. 参数默认值
> 如果参数指定了默认值，当不传入值时，函数里会使用这个默认值。
> 如果传入了值，则用传入的值取代默认值。通常参数的默认值为null。

```Dart
//获取用户信息 使用等号(= )来设置默位置字参数
String getUserInfo(String name, String sex, [String from = '中国']) {
var info = '$name的性别是$sex';
if (from != null) {

info = '$info来自$from';
}
return info;
}

void test(){
print(getUserInfo('小王', '男'));
}
//调用上面的test方法可以输出“小王的性别是男来自中国”，这里大家会发现输出了来自哪里，就是因为我们使用了默认参数值。
```

3. main函数
> Flutter应用程序必须要有一个main函数，和其他语言一样作为程序的入口函数。
下面的代码表示应用要启动MyApp类：`void main() => runApp(MyApp());`

4. 函数返回值
在Dart语言中，函数的返回值有如下特点：
* 所有的函数都会有返回值。
* 如果没有指定函数返回值，则默认的返回值是null。
* 没有返回值的函数，系统会在最后添加隐式的return语句。

### 3.4　运算符
Dart 支持各种类型的运算符，并且其中的一些操作符还能进行重载。

|描述|	运算符|
|:----|:----|
|一元后缀	|expr++ expr-- () [] . ?.|
|一元前缀	|-expr !expr ~expr ++expr --expr|
|乘除	|* / % ~/|
|加减	|+ -|
|位移	|<< >>|
|按位与	|&|
|按位或||
|按位异或	|^|
|关系和类型测试	|>= > <= < as is is!|
|等于	|== !=|
|逻辑与	|&&|
|逻辑或  | |
|如果空	|??|
|条件	|expr1 ? expr2 : expr3|
|级联	|..|
|赋值	|= *= /= ~/= %= += -= <<= >>= &= ^= ??=|

操作符的优先级由上到下逐个减小，上面行内的操作符优先级大于下面行内的操作符。
例如，“乘法类型”操作符%的优先级比“等价”操作符==要高，而==操作符的优先级又比“逻辑与”操作符&&要高。注意使用运算符时的顺序

```Dart
// 1.使用括号来提高可读性
if ((n % i == 0) && (d % i == 0))
// 2.难以阅读，但是和上面等价
if (n % i == 0 && d % i == 0)
```

提示：对于二元运算符，其左边的操作数将会决定使用的操作符的种类
例如，当你使用一个Vector对象以及一个Point对象时，aVector + aPoint使用的 + 是由Vector 所定义的。

1. 算术运算符

```Dart
assert(2 + 3 == 5);
assert(2 - 3 == -1);
assert(2 * 3 == 6);
assert(5 / 2 == 2.5); // Result is a double
assert(5 ~/ 2 == 2); // Result is an int
assert(5 % 2 == 1); // Remainder
assert('5/2 = ${5 ~/ 2} r ${5 % 2}' == '5/2 = 2 r 1');
```

Dart还支持前缀和后缀递增和递减运算符。
```Dart
var a, b;

a = 0;
b = ++a; // Increment a before b gets its value.
assert(a == b); // 1 == 1

a = 0;
b = a++; // Increment a AFTER b gets its value.
assert(a != b); // 1 != 0

a = 0;
b = --a; // Decrement a before b gets its value.
assert(a == b); // -1 == -1

a = 0;
b = a--; // Decrement a AFTER b gets its value.
assert(a != b); // -1 != 0
```

2. 等式和关系运算符
```Dart
assert(2 == 2);
assert(2 != 3);
assert(3 > 2);
assert(2 < 3);
assert(3 >= 3);
assert(2 <= 3);
```

3. 类型检测操作符
> as, is, is!在运行时，操作符可以方便地检查类型。

```Dart
if (emp is Person) {
  // Type check
  emp.firstName = 'Bob';
}

//使用as运算符使代码更短:
(emp as Person).firstName = 'Bob';

//注意:以上代码不相等。如果emp为空或不为Person，第一个示例(带is)什么也不做;第二个(带有as)抛出异常。
```

4. 赋值操作符
正如您已经看到的，可以使用=操作符赋值。如果指定的变量为空，则使用??=运算符。

```Dart

a = value; // 赋值给a

b ??= value; // 如果指定的变量为空 // 如果b为空，则赋值给b;否则，b保持不变
```

5. 复合赋值运算符(如+=)将操作与赋值组合在一起。
> = -= /= %= >>= ^=
> += *= ~/= <<= &= |=

```Dart
var a = 2; // 使用=赋值
a *= 3; // 相乘后赋值: a = a * 3
assert(a == 6);
```

6. 逻辑运算符
> !expr	反转, '||' 逻辑或 &&	逻辑与 

7. 按位和移位操作符

```Dart
final value = 0x22;
final bitmask = 0x0f;

assert((value & bitmask) == 0x02); // AND 按位与
assert((value & ~bitmask) == 0x20); // AND NOT 一元位补码(0变成1;1变成0)
assert((value | bitmask) == 0x2f); // OR 按位或
assert((value ^ bitmask) == 0x2d); // XOR 异或运算符
assert((value << 4) == 0x220); // Shift left 左移
assert((value >> 4) == 0x02); // Shift right 右移
```

8. 级联符号(..)
> 级联(..)允许对同一对象进行一系列操作。除了函数调用外，您还可以访问同一对象上的字段。
```Dart
querySelector('#confirm') // Get an object.
  ..text = 'Confirm' // Use its members.
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'));
```
第一个方法调用querySelector()返回选择器对象。级联表示法后面的代码操作这个选择器对象，忽略可能返回的任何后续值

```Dart
var button = querySelector('#confirm');
button.text = 'Confirm';
button.classes.add('important');
button.onClick.listen((e) => window.alert('Confirmed!'));
```

嵌套你的级联

```Dart
final addressBook = (AddressBookBuilder()
      ..name = 'jenny'
      ..email = 'jenny@example.com'
      ..phone = (Phone  numberBuilder()
            ..  number = '415-555-0100'
            ..label = 'home')
          .build())
    .build();
//要小心在返回实际对象的函数上构造级联。例如，以下代码失败:

var sb = StringBuffer();
sb.write('foo')
  ..write('bar'); // Error: method 'write' isn't defined for 'void'.
//调用sb.write()返回void，并且不能在void上构造级联。
//注意:严格地说，级联的“双点”符号不是运算符。这只是Dart语法的一部分。
```

9. 其他运算符

|运算符|	名称	|含义|
|:----|:----|:----|
|()	|函数|	表示函数调用|
|[]	|list	|指List中指定索引处的值|
|.	|成员访问	|指表达式的属性;例子:foo. 从表达式foo中选择属性栏|
|?.	|有条件的成员访问|	类似 .，但最左边的操作数可以为空;例: foo?.bar 从表达式foo中选择属性bar，除非foo为空(在这种情况下foo的值是?.bar为空)|

### 3.5　流程控制语句

Dart语言的流程控制语句如下：
   * if和else
   * for（循环）
   * while和do-while（循环）
   * break和continue
   * switch和case
   * assert（断言）
   * try-catch和throw
   
```Dart
// for循环
var arr = [0, 1, 2, 3, 4, 5, 6];
for (var v in arr) {
  print(v);
}

//switch / case 语句使用 == 操作来比较整数、字符串或其他编译过程中的常量，从而实现分支的作用
//switch / case 语句的前后操作数必须是相同类型的对象实例。
// 每一个非空的case子句最后都必须跟上break语句
String today = 'Monday';
switch (today) {
  case 'Monday':
    print('星期一');
    break;
  case 'Tuesday':
    print('星期二');
    break;
}

//当assert 判断的条件为false时发生中断,抛出一个断言错误异常AssertionError
assert(text != null);
```

### 3.6　异常处理
异常是表示发生了意外的错误，如果没有捕获异常，引发异常的隔离程序将被挂起，并且程序将被终止。

> Dart的所有异常都是未检查的异常。方法不声明它们可能抛出哪些异常，也不需要捕获任何异常。
> Dart提供了异常和错误类型以及许多预定义的子类型。当然，也可以定义自己的异常。然而，Dart程序可以抛出任何非空对象

1. 抛出异常 
    `throw FormatException('抛出一个FormatException异常');`
    你也可以抛出任意对象：`throw '数据非法!';`
> 提示： 稳定健壮的程序一定是做了大量异常处理的，所以建议你在编写程序时尽量考虑到可能发生异常的情况。

2. 捕获异常

你可以指定一个或两个参数来捕获异常（catch），第一个是抛出的异常，第二个是堆栈跟踪（StackTrace对象）

```Dart
try {

  // ···
} on Exception catch (e) {
  print('Exception details:\n $e');
} catch (e, s) {
  print('Exception details:\n $e');
  print('Stack trace:\n $s');
}
```
3. Finally
要确保某些代码能够运行，无论是否抛出异常，请使用finally子句。
如果没有catch子句匹配异常，则异常在finally子句运行后传播

```Dart
try {
  // ...
} on Exception catch (e) {
  print('Exception details:n $e');
} catch (e, s) {
  print('Exception details:n $e');
  print('Stack trace:n $s');
} finally {
  print('Do some thing:n');
}
```

### 3.7　面向对象
> Dart作为高级语言支持面向对象的很多特性，并且支持基于mixin的继承方式。
基于mixin的继承方式是指：一个类可以继承自多个父类，相当于其他语言里的多继承。
所有的类都有同一个基类Object，这个特性类似于Java语言，Java所有的类也都是继承自Object，也就是说一切皆为对象。
使用new语句实例化一个类， `var user = new User('张三', 20);`

#### 3.7.1　实例化成员变量

```Dart
// 定义一个User类，在里类里添加两个成员变量name与age
class User{
  String name; //name成员变量
  int age; //age成员变量
}
// 类定义中所有的变量都会隐式的定义 setter 方法，针对非空的变量会额外增加 getter 方法。

main() {
var user = new User();
user.name = '张三';//相当于使用了name的setter方法
user.age = 20;

}
```

#### 3.7.2　构造函数

1. 常规构造函数
> 构造函数是用来构造当前类的函数，是一种特殊的函数，函数名称必须要和类名相同才行。如下代码为User类添加了一个构造函数，函数里给User类的两个成员变量初始化了值：

```Dart
class User{
  String name;
  int age;

  User(String name,int age){
    this.name = name;
    this.age = age;
  }
}
```

this关键字指向了当前类的实例。构造函数的简化：　`User(this.name,this.age);`

2. 命名的构造函数

使用命名构造函数从另一类或现有的数据中快速实现构造函数

```Dart
class User {
  String name;
  int age;

  User(this.name, this.age);

  //命名的构造函数
  User.fromJson(Map json) {
    name = json['name'];
    age = json['age'];
  }
}
```

3. 构造函数初始化列表
除了调用父类的构造函数，也可以通过初始化列表在子类的构造函数运行前来初始化实例的成员变量值

```Dart
class User {
final String name;
final int age;
User(name, age)
  : name = name,
    age = age;
}

main() {
 var p = new User('张三', 20);
}
```

#### 3.7.3　读取和写入对象
get()和set()方法是专门用于读取和写入对象的属性的方法
每一个类的实例，系统都隐式地包含有get()和set() 方法

例如: 定义一个矩形的类，有上、下、左、右四个成员变量：top、bottom、left、right，使用get及set关键字分别对right及bottom进行获取和设置值。代码如下所示：

```Dart
class Rectangle {
  num left;
  num top;
  num width;
  num height;
  Rectangle(this.left, this.top, this.width, this.height);
  //获取right值
  
  num get right => left + width;
  //设置right值 同时left也发生变化
  set right(  num value) => left = value - width;

  //获取bottom值
  num get bottom => top + height;
  //设置bottom值 同时top也发生变化
  set bottom(  num value) => top = value - height;
}

main() {
  var rect = new Rectangle(3, 4, 20, 15);

  print('left:'+rect.left.toString());
  print('right:'+rect.right.toString());
  rect.right = 30;
  print('更改right值为30');
  print('left:'+rect.left.toString());
  print('right:'+rect.right.toString());

  print('top:'+rect.top.toString());
  print('bottom:'+rect.bottom.toString());
  rect.bottom = 50;
  print('更改bottom值为50');
  print('top:'+rect.top.toString());
  print('bottom:'+rect.bottom.toString());
}
```

#### 3.7.4　重载操作
例子:定义一个Vector向量类，编写两个方法分别用于重载加号及减号，那么当两个向量相加，就表示它们的x值及y值相加，当两个向量相减，就表示它们的x值及y值相减。完整的示例代码如下：

```Dart
//定义一个向量类
class Vector {
  final int x;
  final int y;
  const Vector(this.x, this.y);

  //重载加号 + (a + b).
  Vector operator +(Vector v) {
    return new Vector(x + v.x, y + v.y);
  }

  //重载减号 - (a - b).
  Vector operator -(Vector v) {
    return new Vector(x - v.x, y - v.y);
  }
}

main() {
//实例化两个向量
final v = new Vector(2, 3);
final w = new Vector(2, 2);

final r1 = v + w;
print('r1.x='+r1.x.toString() + ' r1.y=' + r1.y.toString());

final r2 = v - w;
print('r2.x='+r2.x.toString() + ' r2.y=' + r2.y.toString());
}
```
上面代码的输出结果为：
flutter: r1.x=4 r1.y=5
flutter: r2.x=0 r2.y=1

#### 3.7.5　继承类
> 继承就是子类继承父类的特征和行为，使得子类对象（实例）具有父类的实例域和方法；或子类从父类继承方法，使得子类具有父类相同的行为。Dart里使用extends 关键字来创建一个子类，super关键子来指定父类。

```Dart
class Animal {
  void eat(){}
  void run(){}
}
class Human extends Animal {
  void eat(){}
  void run(){}
  void say(){}
}
```

#### 3.7.6　抽象类
抽象类类似于Java语言中的接口。抽象类里不具体实现方法，只是写好定义接口，具体实现留着调用的人去实现。
抽象类可以使用abstract关键字定义类。
```Dart
//数据库操作抽象类
abstract class DateBaseOperate {
  void insert(); //定义插入的方法
  void delete(); //定义删除的方法
  void update(); //定义更新的方法
  void query(); //定义一个查询的方法
}
class DateBaseOperateImpl extends DateBaseOperate {

void insert(){
print('实现了插入的方法');
}

void delete(){
print('实现了删除的方法');
}

void update(){
print('实现了更新的方法');
}
void query(){
print('实现了一个查询的方法');
}
}

```

#### 3.7.7　枚举类型
枚举类型是一种特殊的类，通常用来表示相同类型的一组常量值。
每个枚举类型都用于一个index的getter，用来标记元素的元素位置。第一个枚举元素的索引是0：

因为枚举类里面的每个元素都是相同类型，可以使用switch 语句来针对不同的值做不同的处理，示例代码如下：
```Dart
e  num Color {
 red,
 green,
 blue
}
//定义一个颜色变量 默认值为蓝色
Color aColor = Color.blue;
switch (aColor) {
  case Color.red:
    print('红色');
    break;
  case Color.green:
    print('绿色');
    break;
  default: //默认颜色
   print(aColor);  // 'Color.blue'
}
List colors = Color.values;
```

#### 3.7.8　Mixins
Mixins（混入功能）相当于多继承，也就是说可以继承多个类。
使用with关键字来实现Mixins的功能：

```
class S {
 a() {print("S.a");}
}

class A {
 a(){print("A.a");}
 b(){print("A.b");}
}

class T = A with S;

main(List args) {
 T t = new T();
 t.a();
 t.b();
}
```

上面代码的输出内容如下所示，从结果上来看T具有了S及A两个类的方法：
S.a
A.b

### 3.8　泛型

> 泛型通常是为了类型安全而设计的，适当地指定泛型类型会生成更好的代码，可以使用泛型来减少代码重复

1. 用于集合类型: 

```Dart
var names = ['张三', '李四', '王五'];
var weeks = {

'Monday' : '星期一',
'Tuesday': '星期二',
'Wednesday' : '星期三',
'Thursday': '星期四',
'Friday': '星期五',
'Saturday': '星期六',
'Sunday': '星期日',
};
```

2. 在构造函数中参数化

Map 类型的例子如下：` var users = new Map(); `

#### 3.9　库的使用

1. 引用库
> 通过import 语句在一个库中引用另一个库的文件。需要注意以下事项：
* 在import语句后面需要接上库文件的路径。 `import 'dart:io';`'
* 对Dart 语言提供的库文件使用dart:xx 格式。
* 第三方的库文件使用package:xx格式。 `import 'package:utils/utils.dart'`

2. 指定一个库的前缀
当引用的库拥有相互冲突的名字，可以为其中一个或几个指定不一样的前缀

```Dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;
// ...
Element element1 = new Element(); // 使用lib1中的Element
lib2.Element element2 = new lib2.Element(); // 使用lib2中的Element
```

lib1/lib1.dart及lib2/lib2.dart里都有Element类，如果直接引用就不知道具体引用哪个Element类，所以代码中把lib2/lib2.dart指定成lib2，这样使用lib2.Element就不会发生冲突。

3. 引用库的一部分

如果只需要使用库的一部分内容，可以有选择地引用，有如下关键字：
    * show 关键字：只引用一点。 ` import 'package:lib1/lib1.dart' show foo; // 导入foo `
    * hide 关键字：除此之外都引用。 ` import 'package:lib2/lib2.dart' hide foo; // 除了foo导入其他所有内容 `

### 3.10　异步支持
Dart 使用async函数和await表达式实现异步操作。
Dart 库提供asynchronous功能，该功能提供接口来进行耗费时间的操作，比如文件读写、网络请求。
该功能返回Future或Stream对象。

通过如下的方式来获取asynchronous功能返回的Future对象的值：
  * 使用async函数和await表达式。
  * 使用Future功能提供的API。

通过如下的方式来获取asynchronous 功能返回的Stream对象的值：
  * 使用async 和一个异步的循环(await for)。
  * 使用Stream的相关API。
  
下面的示例代码使用了async或await异步处理，虽然代码看起来像是同步处理的：
```Dart
await readFile()
// 必须在一个使用了async关键字标记后的函数中使用await表达式：
fileOperate () async {
  var file = await readFile();　//读取文件
　　//其他处理
}

```


### 3.11　元数据
> 使用元数据给代码添加更多的信息。元数据是以@开始的修饰符，在@后面接着编译时的常量或调用一个常量构造函数。

目前Dart语言提供三个@修饰符：
* @deprecated 被弃用的。
* @override 重写。
* @proxy 代理。

元数据可以修饰library（库）、class（类）、typedef（类型定义）、type parameter（类型参数）、constructor（构造函数）、factory（工厂函数）、function（函数）、field（作用域）、
parameter（参数）、variable declaration（变量声明）。

### 3.12　注释
> Dart 支持三种注释类型：单行注释、多行注释、文档注释

1.单行注释: 以//开头

2.多行注释 /* 开头　*/结尾

3.文档注释　以///开头 或者 /** 开头　*/结尾
