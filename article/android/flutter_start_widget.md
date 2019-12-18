## Flutter Study - 4. Widget
> Flutter常用组件: Text , Container, Image, ListView, Form 和一些表单组件(TextField,Radio,CheckBox)

### 4.1 Text 文本组件

以下是最简单的Text组件使用，所有属性都是默认的的

```Dart
class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
      return MaterialApp(
        title:'Text widget',
        home:Scaffold(
          body:Center(
            child:Text('Hello Flutter')
          ),
        ),
      );
  }
}
```

#### 4.1.1 Text的属性

* TextAlign属性  对齐方式
    	* center: 文本以居中形式对齐,这个也算比较常用的了。
	* left:左对齐，经常使用，让文本居左进行对齐，效果和start一样。
	* right :右对齐，使用频率也不算高。
	* start:以开始位置进行对齐，类似于左对齐。
	* end: 以为本结尾处进行对齐，不常用。有点类似右对齐.

* maxLines属性 最多显示的行数
* overflow属性 文本溢出
	* clip：直接切断，剩下的文字就没有了，感觉不太友好，体验性不好。
	* ellipsis:在后边显示省略号，体验性较好，这个在工作中经常使用。
	* fade: 溢出的部分会进行一个渐变消失的效果，当然是上线的渐变，不是左右的哦。
* style属性 样式

```Dart
//字体大小为25.0,颜色为粉红色,并且有一个下划线
Text(
  'Hello Flutter  ,非常喜欢前端，并且愿意为此奋斗一生。我希望可以出1000集免费教程。',
  textAlign:TextAlign.left,
  overflow:TextOverflow.ellipsis,
  maxLines: 1,
  style: TextStyle(
    fontSize:25.0,
    color:Color.fromARGB(255, 255, 150, 150),
    decoration:TextDecoration.underline,
    decorationStyle:TextDecorationStyle.solid,
  ),
)

```


更详细Text属性资料可以参看[网址](https://docs.flutter.io/flutter/painting/TextStyle-class.html)

其实程序员最重要的一个能力就是查看文档的能力，我这里也只是讲些最常使用的，在实际工作中，还是要多查稳定。

### 4.2 Container 容器组件

> Container（容器控件）在Flutter是经常使用的控件，每个页面或者说每个视图都离不开它。

```Dart
class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
      return MaterialApp(
        title:'Text widget',
        home:Scaffold(
          body:Center(
           child:Container(
             child:new Text('Hello Flutter',style: TextStyle(fontSize: 40.0),),
             alignment: Alignment.center,
           ),
          ),
        ),
      );
  }
}
```

#### 4.2.1 Container的属性

* Alignment属性  对齐方式

	* bottomCenter:下部居中对齐。
	* botomLeft: 下部左对齐。
	* bottomRight：下部右对齐。* 
	* center：纵横双向居中对齐。
	* centerLeft：纵向居中横向居左对齐。
	* centerRight：纵向居中横向居右对齐。
	* topLeft：顶部左侧对齐。
	* topCenter：顶部居中对齐。
	* topRight： 顶部居左对齐。

* Width 宽

* Height 高

* Color 颜色

* padding 内边距
	* `EdgeInsets.all(10.0)` 左右上下全部为10
	* `EdgeInsets.fromLTRB(value1,value2,value3,value4)` 左、上、右、下

* margin属性 外边距
    > 赋值方法同padding

* decoration属性 背景和边框等修饰器
    * 使用BoxDecoration类,添加gradient渐变，设置border边框

```Dart
          Container(
            child:new Text('Hello Flutter',style: TextStyle(fontSize: 40.0),),
            alignment: Alignment.topLeft,
            width:500.0,
            height:400.0,
            padding:const EdgeInsets.fromLTRB(10.0,30.0,0.0,0.0),
            margin: const EdgeInsets.all(10.0),
            decoration:new BoxDecoration(
              gradient:const LinearGradient(
                colors:[Colors.lightBlue,Colors.greenAccent,Colors.purple]
              ),
              border:Border.all(width:2.0,color:Colors.red)
            ),
          ),
```

### 4.3 Image 图片组件

加入图片的几种方式
* Image.asset:　加载项目资源目录中的图片，使用相对路径。
* Image.network:　网络资源图片，网络路径地址。
* Image.file:　加载本地图片，绝对路径
* Image.memory: 加载Uint8List资源图片

```Dart
class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
      return MaterialApp(
        title:'Text widget',
        home:Scaffold(
          body:Center(
          child:Container(
            child:new Image.network(
              'https://edgardeng.github.io/resource/image/favicon.jpg',
              scale:1.0,
            ),
            width:300.0,
            height:200.0,
            color: Colors.lightBlue,
          ),
          ),
        ),
      );
  }
}
```

### 4.3.1 Image 图片属性

* fit　拉伸和挤压属性
    * BoxFit.fill:全图显示，图片会被拉伸，并充满父容器。

    * BoxFit.contain:全图显示，显示原比例，可能会有空隙。

    * BoxFit.cover：显示可能拉伸，可能裁切，充满（图片要充满整个容器，还不变形）。

    * BoxFit.fitWidth：宽度充满（横向充满），显示可能拉伸，可能裁切。

    * BoxFit.fitHeight ：高度充满（竖向充满）,显示可能拉伸，可能裁切。

    * BoxFit.scaleDown：效果和contain差不多，但是此属性不允许显示超过源图片大小，可小不可大。

* colorBlendMode 图片的混合模式
    > 图片混合模式（colorBlendMode）和color属性配合使用，能让图片改变颜色,效果也是非常丰富

* repeat图片重复方式
    * ImageRepeat.repeat : 横向和纵向都进行重复，直到铺满整个画布。
    * ImageRepeat.repeatX: 横向重复，纵向不重复。
    * ImageRepeat.repeatY：纵向重复，横向不重复。

来个全部重复的代码。

```Dart
new Image.network(
              'https://edgardeng.github.io/resource/image/favicon.jpg',
              scale:1.0,
                color:Colors.amberAccent,
                colorBlendMode: BlendMode.colorBurn,
                repeat: ImageRepeat.repeat
            )
```

### 4.5 ListView 列表组件

```Dart
class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return MaterialApp(
      title:'Hello Flutter',
      home:Scaffold(
        appBar:new AppBar(
          title:new Text('ListView Widget')
        ),
        body: new ListView(
          children:<Widget>[
            new ListTile(
              leading:new Icon(Icons.access_time),
              title:new Text('access_time')
            ),
            new ListTile(
              leading:new Icon(Icons.account_balance),
              title:new Text('account_balance')
            )
          ]
        ),
      ),
    );
  }
}
```

#### 4.5.1 图片列表

```
new ListView(
  children:<Widget>[
   new Image.network(
      'https://edgardeng.github.io/resource/image/favicon.jpg'
    ),
     new Image.network(
      'https://edgardeng.github.io/resource/image/favicon.jpg'
    ),
     new Image.network(
      'https://edgardeng.github.io/resource/image/favicon.jpg'
    ),new Image.network(
      'https://edgardeng.github.io/resource/image/favicon.jpg'
    )
  ]
),
```

#### 4.5.2 横向列表

在ListView组件里加一个ScrollDirection属性。

```Dart
            new ListView(
              scrollDirection: Axis.horizontal,
              children: <Widget>[
                new Container(
                  width:180.0,
                  color: Colors.lightBlue,
                ), new Container(
                  width:180.0,
                  color: Colors.amber,
                ), new Container(
                  width:180.0,
                  color: Colors.deepOrange,
                ),new Container(
                  width:180.0,
                  color: Colors.deepPurpleAccent,
                ),
              ],
            )
```

* scrollDirection属性
    * Axis.horizontal:横向滚动或者叫水平方向滚动。
    * Axis.vertical:纵向滚动或者叫垂直方向滚动。

#### 4.5.3 优化代码

* 嵌套代码分离
    >声明一个MyList的类，然后把嵌套的代码放到这个类里

```Dart
class MyList extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return ListView(
        scrollDirection: Axis.horizontal,
        children: <Widget>[
          new Container(
            width:180.0,
            color: Colors.lightBlue,
          ), new Container(
            width:180.0,
            color: Colors.amber,
          ), new Container(
            width:180.0,
            color: Colors.deepOrange,
          ),new Container(
            width:180.0,
            color: Colors.deepPurpleAccent,
          ),
        ],
    );
  }
}
```

在MyAPP类里直接使用这个类，减少嵌套

```Dart
class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
      return MaterialApp(
        title:'ListView widget',
        home:Scaffold(
          body:Center(
          child:Container(
            height:200.0,
            child:MyList()
            ),
          ),
        ),
      );
  }
}
```

### 4.6 动态列表的使用

```Dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp(
  items: new List<String>.generate(1000, (i)=> "Item $i")
));

class MyApp extends StatelessWidget{

  final List<String> items;
  MyApp({Key key, @required this.items}):super(key:key);
  @override
  Widget build(BuildContext context ){
      return MaterialApp(
        title:'ListView widget',
        home:Scaffold(
          body:new ListView.builder(
            itemCount:items.length,
            itemBuilder:(context,index){
              return new ListTile(
                title:new Text('${items[index]}'),
              );
            }
          )
        ),
      );
  }
}
```

> 代码说明:
    > 1. MyApp声明了构造函数，并需要接收一个参数item
    > 2. main函数创建了一个List,并传递给了MyApp

### 4.7 GridView 网格列表组件

```Dart
            GridView.count(
            padding:const EdgeInsets.all(20.0),
            crossAxisSpacing: 10.0,
            crossAxisCount: 3,
            children: <Widget>[
              const Text('Hello Flutter 1'),
              const Text('Hello Flutter 2'),
              const Text('Hello Flutter 3'),
              const Text('Hello Flutter 4'),
              const Text('Hello Flutter 5'),
              const Text('Hello Flutter 6')
            ],
          )
```

#### 4.7.1  网格组件常用属性

* padding: 表示内边距
* crossAxisSpacing: 网格间的空当
* crossAxisCount: 网格的列数

#### 4.7.2 图片网格列表
```
          GridView(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                mainAxisSpacing: 2.0,
                crossAxisSpacing: 2.0,
                childAspectRatio: 0.7
            ),
            children: <Widget>[
              new Image.network(url,fit: BoxFit.cover),
              new Image.network(url,fit: BoxFit.cover),
              new Image.network(url,fit: BoxFit.cover),
              new Image.network(url,fit: BoxFit.cover),
              new Image.network(url,fit: BoxFit.cover),
              new Image.network(url,fit: BoxFit.cover),
              new Image.network(url,fit: BoxFit.cover),
              new Image.network(url,fit: BoxFit.cover),
              new Image.network(url,fit: BoxFit.cover),
            ],
          )
```

* childAspectRatio: 宽高比

#### 4.9  表单组件

>表单是一个包含表单元素的区域 。表单元素允许用户输入内容, 比 如 : 文本域 、 下拉列表、单选框 、复选框等

```Dart
class RegisterPage extends StatefulWidget {
  @override
  _RegisterState createState() => new _RegisterState();
}

class _RegisterState extends State<RegisterPage> {
  GlobalKey<FormState> form = new GlobalKey<FormState>();
  String username;
  String password;
  void login() {
    var loginForm = form.currentState; // 读取当前的 Form 状态
    if (loginForm.validate()) {
      loginForm.save() ;
      print ('username :' + username + ' password : ' + password);
    }
  }
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
        title: 'Hello Flutter',
        home: new Scaffold(
            appBar: new AppBar(
                title: new Text ('Form 表单示例')
            ),
            body: new Column(
                children: <Widget>[
                  new Container(
                      padding: const EdgeInsets.all(16.0),
                      child: new Form(
                          key: form,
                          child: new Column(
                              children: <Widget>[
                                new TextFormField(
                                  decoration: new InputDecoration(
                                      labelText: '请输入用户名'),
                                  onSaved: (value) {
                                    username = value;
                                  },
                                  onFieldSubmitted: (value) {},
                                ),
                                new TextFormField(
                                  decoration: new InputDecoration(
                                      labelText: '请输入密码'),
                                  obscureText: true,
                                  validator: (value) { return value.length < 6 ? '密码长度不够 6 位' : null; },
                                  onSaved: (value) {
                                    password = value;
                                  },
                                ),
                              ]
                          )
                      )
                  ),
                  new SizedBox(
                      width: 340.0,
                      height: 42.0,
                      child: new RaisedButton(
                          onPressed: login,
                          child: new Text(
                              '提交',
                              style: TextStyle(fontSize: 18.0,)
                          )
                      )
                  )
                ]
            )
        )
    );
  }
}
```

> 说明:为了获取表单的实例,需要设置一个全局类型的 key ,通过这个 key 的属性,来获取表单对象。此处使用了GlobalKey



### 4.10 输入组件

#### 4.10.1 TextField 输入框

```
    TextEditingController controller= TextEditingController(); // 添加文本编辑控制器监听文本输入内容变化
    controller.addListener(() {
      print ('input :${ controller.text }');
    });

              TextField(
                controller: controller, // 绑定 controller
                maxLength: 30, // 最大长度 右下角有一个输入数量的统计字符串
                maxLines: 1, // 最大行数
                autocorrect: true, // 是否自动更正
                autofocus: true,// 是否自动对焦
                obscureText: false,// 是否是密码
                textAlign: TextAlign.center, // 文本对齐方式
                style: TextStyle(fontSize: 26.0, color: Colors.green), // 输入文本的样式
                onChanged: (text) { print ( '文本内容改变时回调 $text '); }, // 文本内容改变时回调
                onSubmitted: (text) { print ( '文本提交改变时回调 $text '); },  // 内容提交时回调
                enabled: true ,// 是否禁用
                decoration: InputDecoration (// 添加装饰效果
                    fillColor: Colors.grey.shade200 , // 添加灰色填充色
                    filled: true,
                    helperText: '请输入用户名',
                    prefixIcon: Icon(Icons.person), // 左侧图标
                    suffixText: '用户名' , // 右侧提示
                )
              ),
```

#### 4.10.2 Radio　单选组件
> RadioListTile  是一个 Radio 的上层封装，可设置图标和文字

```Dart
  updateCheckValue (bool value) {
    setState(() {
      this.sCheck = value;
      print ('updateCheckValue :${sCheck ? 'true':'false'}');
    });
  }

    var cardRadio =  new Card(
      child: new Row(
        children: <Widget>[
          Radio(
            groupValue: sRadio,
            activeColor: Colors.blue,
            value: 'Radio One',
            onChanged: updateGroupValue,
          ),
          Radio(
            groupValue: sRadio,
            activeColor: Colors.blue,
            value: 'Radio Two',
            onChanged: updateGroupValue,
          ),
        ]
      )
    );

    var cardRadioTile =  new Card(
        child: new Column(
            children: <Widget>[
              RadioListTile(
                secondary: const Icon(Icons.sentiment_dissatisfied),
                controlAffinity: ListTileControlAffinity.trailing,
                groupValue: this.sRadio,
                activeColor: Colors.blue,
                value: 'Radio Two',
                title: const Text('选项二'),
                onChanged: updateGroupValue,
              ),
              RadioListTile(
                secondary: const Icon(Icons.sentiment_dissatisfied),
                controlAffinity: ListTileControlAffinity.trailing,
                groupValue: this.sRadio,
                activeColor: Colors.blue,
                value: 'Radio One',
                title: const Text('选项一'),
                onChanged: updateGroupValue,
              ),
            ]
        )
    );

```

#### 4.10.3 Checkbox　复选组件
> CheckboxListTile  是一个 Checkbox 的上层封装，可设置图标和文字

```Dart
    new SizedBox(
      child: new Card(
        child: new Column(
          children: <Widget> [
            new CheckboxListTile(
              secondary: const Icon(Icons.sentiment_dissatisfied),
              title: const Text('复选框1'),
              value: this.sCheck,
              onChanged: updateCheckValue,
            ),
            new CheckboxListTile(
              secondary: const Icon(Icons.sentiment_neutral),
              title: const Text('复选框2'),
              value: this.sCheck2,
            ),
          ]
        )
      )
    );
    new SizedBox(
        child: new Card(
            child: new Column(
                children: <Widget> [
                  new Checkbox(
                    value: this.sCheck,
                    onChanged: updateCheckValue,
                  ),
                  new Checkbox(
                    value: this.sCheck2,
                  ),
                ]
            )
        )
    );

```

#### 4.10.4 Slider　滑块组件

```Dart
    Slider(
      value: this.sliderValue,
      max: 100.0,
      min: 0.0,
      activeColor: Colors.lightGreen,
      inactiveColor: Colors.blueGrey,
      label: 'label',
      onChanged: (double val) {
          this.setState(() {
              this.sliderValue = val;
              print ('update Slider Value :${val}');
          });
      },
    )

    RangeSlider(
      values: slideRangeValues,
      divisions: 10,
      max: 100.0,
      min: 0.0,
      onChanged: (RangeValues value) {
          this.setState(() {
              this.slideRangeValues = value;
              print ('update Slider Value :${value.start} - ${value.end}');
          });
      },
    ),
    // 使用　SliderTheme
    SliderTheme(
        data: SliderTheme.of(context).copyWith(
          activeTrackColor: Colors.greenAccent, //已拖动的颜色
          inactiveTrackColor: Colors.green, //未拖动的颜色
          valueIndicatorColor: Colors.green,// 提示进度的气泡的背景色
          //提示进度的气泡文本的颜色
          valueIndicatorTextStyle: TextStyle(
            color:Colors.white,
          ),
          thumbColor: Colors.blueAccent, // 滑块中心的颜色
          overlayColor: Colors.white, // 滑块边缘的颜色
          //divisions对进度线分割后，断续线中间间隔的颜色
          inactiveTickMarkColor: Colors.white,
        ),
        child: Slider()
    )
        
```

### 4.11 其他组件

#### 4.11.1 进度条

```Dart
    new LinearProgressIndicator(
        backgroundColor: Colors.blue,
//      value: 0.5,
        valueColor: new AlwaysStoppedAnimation<Color>(Colors.red),
   ),
   Divider(),
   new CircularProgressIndicator(
        strokeWidth: 4.0,
        backgroundColor: Colors.blue,
        value: 0.8,
        valueColor: new AlwaysStoppedAnimation<Color>(Colors.red),
   ),

```