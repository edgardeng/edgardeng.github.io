## Flutter Study - 2. Basic
> Flutter基础知识:入口程序,Material Design,Flutter主题,无状态组件和有状态组件,使用包资源,Http请求

### 2.1　入口程序
每一个Flutter项目的/lib目录下都有一个main.dart文件，打开该文件，里面应该有一个main()函数。

Flutter使用Dart语言开发，而在Dart语言中，main()函数是Dart程序的入口

```
void main() => runApp(Widget app);
```
Dart语言特有的速写形式，将其展开后：
```dart
void main() {
    return runApp(Widget app);
}
```

### 2.2　Material Design设计风格

每一个.dart文件的第一行几乎都会`import 'package:flutter/material.dart'`

material.dart包是Flutter实现Material Design设计风格的基础包，里面有文本输入框（Text）、图标（Icon）、图片（Image）、行排列布局（Row）、列排列布局（Column）、Decoration（装饰器）、动画等组件。

Material Design是谷歌推出的一套视觉设计语言

### 2.3　Flutter主题

为了在整个应用中使用同一套颜色和字体样式，可以使用“主题”这种方式。

定义主题有两种方式：
  1. 全局主题
  2. 使用Theme来定义局部的颜色和字体样式。

定义一个主题后，就可以在我们自己的Widget中使用它，Flutter提供的Material Widgets将使用主题为AppBars、Buttons、Checkboxes等设置背景颜色和字体样式。

#### 2.3.1　创建应用主题

创建主题的方法是将ThemeData提供给MaterialApp构造函数，这样就可以在整个应用程序中共享包含颜色和字体样式的主题。

如果没有提供主题，Flutter将创建一个默认主题。主题数据的示例代码如下：

```dart
new MaterialApp(
  title: title,
  theme: new ThemeData(
    brightness: Brightness.dark,
    primaryColor: Colors.lightBlue[800],
    accentColor: Colors.cyan[600],
  ),
);
```


#### 2.3.2　局部主题
如果我们想在应用程序的某一部分使用特殊的颜色，那么就需要覆盖全局的主题

__1. 创建特有的主题数据__
实例化一个ThemeData并将其传递给Theme对象，代码如下：
```Dart
new Theme(
    //创建一个特有的主题数据
    data: new ThemeData(
        accentColor: Colors.yellow,
    ),
    child: new FloatingActionButton(
        onPressed: () {},
        child: new Icon(Icons.add),
    ),
);
```

__2. 扩展父主题__
扩展父主题时无须覆盖所有的主题属性，我们可以通过使用copyWith方法来实现，代码如下：
```Dart
new Theme(
  //覆盖accentColor为Colors.yellow
  data: Theme.of(context).copyWith(accentColor: Colors.yellow),
  child: new FloatingActionButton(
    onPressed: null,
    child: new Icon(Icons.add),
  ),
);
```

#### 2.3.3　使用主题
函数Theme.of(context)可以通过上下文来获取主题，方法是查找最近的主题，如果找不到就会找整个应用的主题。
下面来看一个简单的示例，应用的主题颜色定义为绿色，界面中间再加一个带有背景色的文本。

```Dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(new MyApp());
}

class MyApp extends StatelessWidget {
@override
Widget build(BuildContext context) {

final appName = '自定义主题';

return new MaterialApp(
  title: appName,
  theme: new ThemeData(
    brightness: Brightness.light,//应用程序整体主题的亮度
    primaryColor: Colors.lightGreen[600],//App主要部分的背景色
    accentColor: Colors.orange[600],//前景色（文本、按钮等）
  ),
  home: new MyHomePage(
    title: appName,
  ),
);
}
}

class MyHomePage extends StatelessWidget {
final String title;

MyHomePage({Key key, @required this.title}) : super(key: key);

@override
Widget build(BuildContext context) {

return new Scaffold(
  appBar: new AppBar(
    title: new Text(title),
  ),
  body: new Center(
    child: new Container(
      //获取主题的accentColor
      color: Theme.of(context).accentColor,
      child: new Text(
        '带有背景颜色的文本组件',
        style: Theme.of(context).textTheme.title,
      ),
    ),
  ),
  floatingActionButton: new Theme(
    //使用copyWith的方式获取accentColor
    data: Theme.of(context).copyWith(accentColor: Colors.grey),
    child: new FloatingActionButton(
      onPressed: null,
      child: new Icon(Icons.computer),
    ),
  ),
);
}
}
```

 
### 2.4　无状态组件和有状态组件
无状态组件（StatelessWidget）是不可变的，这意味着它们的属性不能改变，所有的值都是最终的。

有状态组件（StatefulWidget）持有的状态可能在Widget生命周期中发生变化。实现一个StatefulWidget至少需要两个类：
 * 一个StatefulWidget类。
 * 一个State类。StatefulWidget类本身是不变的，但是State类在Widget生命周期中始终存在

Flutter的官方给出一个有状态组件的示例:
> 计数器案例　代码中MyHomePage必须继承自StatefulWidget类

```Dart

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          // horizontal).
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}

```

### 2.5　使用包资源
> Flutter包类似于Java语言里的jar包，由全球众多开发者共同提供第三方库。例如:网络请求（http）、自定义导航/路由处理（fluro）、集成设备API（如url_launcher＆battery） 以及第三方平台SDK（如Firebase）等

1. 包仓库
所有包（package）都会发布到[Dart的包仓库](https://pub.dartlang.org)里

2. 包使用示例
    1. 打开pubspec.yaml文件，在dependencies下添加包的名称及版本 `url_launcher:^4.0.1`
    2. 点击Packages get命令来获取工程配置文件中所添加的引用包，或者打开命令行窗口执行flutter packages get命令
    > 注意：在更新包资源的过程中注意观察控制台消息，可能有版本错误、网络问题，这些都会导致更新失败。
    3. 打开main.dart文件，导入url_launcher.dart包： `import 'package:url_launcher/url_launcher.dart'`
    4. 使用launch方法来打开url地址了： `const url = 'https://www.baidu.com'; launch(url);`

完整的main.dart代码如下所示：
```Dart
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
@override
Widget build(BuildContext context) {

return new MaterialApp(
  title: '使用第三方包示例',
  home: new Scaffold(
    appBar: new AppBar(
      title: new Text('使用第三方包示例'),
    ),
    body: new Center(
      child: new RaisedButton(
        onPressed: () {
          //指定url并发起请求
          const url = 'https://www.baidu.com';
          launch(url);
        },
        child: new Text('打开百度'),
      ),
    ),
  ),
);
}
}
```

### 2.6　Http请求
> HTTP协议通常用于做前后端的数据交互

#### 1. Http请求方式

在使用Http方式请求网络时，需要导入http包。

```Dart
import 'package:http/http.dart' as http;
void main() => runApp(new MyApp());
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
  
  return new MaterialApp(
    title: 'http请求示例',
    home: new Scaffold(
      appBar: new AppBar(
        title: new Text('http请求示例'),
      ),
      body: new Center(
        child: new RaisedButton(
          onPressed: () {
            var url = 'http://httpbin.org/';
            //向http://httpbin.org/发送get请求
            http.get(url).then((response) {
              print("状态： ${response.statusCode}");
              print("正文： ${response.body}");
            });
          },
          child: new Text('发起http请求'),
        ),
      ),
    ),
  );
  }
}
```

#### 2. HttpClient请求方式

> 在使用HttpClient方式请求网络时，需要导入io及convert包，示例中使用HttpClient请求了一条天气数据,如下所示：

```Dart
import 'package:flutter/material.dart';
import 'dart:convert';
import 'dart:io';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {

  //获取天气数据
  void getWeatherData() async {
  
  try {
    //实例化一个HttpClient对象
    HttpClient httpClient = new HttpClient();
    //发起请求
    HttpClientRequest request = await httpClient.getUrl(
        Uri.parse("http://t.weather.sojson.com/api/weather/city/101030100"));
  
    //等待服务器返回数据
    HttpClientResponse response = await request.close();
  
    //使用utf8.decoder从response里解析数据
    var result = await response.transform(utf8.decoder).join();
    //输出响应头
    print(result);
  
    //httpClient关闭
    httpClient.close();
  
  } catch (e) {
    print("请求失败：$e");
  } finally {
  
  }
  }
  
  @override
  Widget build(BuildContext context) {
  
  return MaterialApp(
    title: 'httpclient请求',
    home: Scaffold(
      appBar: AppBar(
        title: Text('httpclient请求'),
      ),
      body: Center(
        child: RaisedButton(
          child: Text("获取天气数据"),
          onPressed: getWeatherData,
        ),
      ),
    ),
  );
  }
}
```

> 注意：返回的数据是JSON格式，所以后续还需要做JSON处理。另外还需要使用utf8.decoder从response里解析数据。

如果请求里需要带参数，可以在URI里增加查询参数，具体的请求地址和参数要根据实际需要编写，代码如下所示：
```Dart
Uri uri = Uri(scheme: "https", host: "t.weather.sojson.com", queryParameters: {
"_id": 26,
"city_code": "101030100",//接口需要的city_code
"city_name": "天津"
});

```

