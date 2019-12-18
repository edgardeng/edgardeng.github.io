## Flutter Study - 5. Layout
> Flutter的常用布局: Row 水平布局, Column 垂直布局, Stack 堆叠布局

### 1. Row 水平布局

#### 1.1 不灵水平布局
> 根据Row子元素的大小，进行布局。如果子元素不足，它会留有空隙，如果子元素超出，它会警告。


例如: 三个按钮，横排，但没有充满一行

```Dart
          new Row(
            children: <Widget>[
              new RaisedButton(
                  onPressed: (){

                  },
                  color:Colors.redAccent,
                  child:new Text('红色按钮')
              ),
              new RaisedButton(
                onPressed: (){

                },
                color:Colors.orangeAccent,
                child: new Text('黄色按钮'),
              ),
              new RaisedButton(
                  onPressed: (){

                  },
                  color:Colors.pinkAccent,
                  child:new Text('粉色按钮')
              )
            ],
          )
```

#### 1.2 灵活水平布局

使用 Expanded,将按钮撑大，使3个按钮充满一行

```Dart
          new Row(
            children: <Widget>[
              Expanded(child:new RaisedButton(
                onPressed: (){
                },
                color:Colors.redAccent,
                child:new Text('红色按钮')
              )),
              Expanded(child:new RaisedButton(
                onPressed: (){
                  },
                  color:Colors.orangeAccent,
                  child: new Text('黄色按钮'),
                )

              ),
              Expanded(child:new RaisedButton(
                onPressed: (){
                },
                color:Colors.pinkAccent,
                child:new Text('粉色按钮')
              )
              )
            ],
          )
```

#### 1.3 灵活和不灵活的混用

例子:  中间的按钮大，而两边的按钮保持真实大小，充满一行. 只需要保留第中间的　Expanded　即可

### 2. Column 垂直布局

```Dart
         new Column(
            children: <Widget>[
              Text('Hello Flutter 1'),
              Text('Hello Flutter 2'),
              Text('Hello Flutter 3')
            ],
          )
```


### 2.1 垂直布局属性

* crossAxisAlignment
    * CrossAxisAlignment.start：居左对齐。
    * CrossAxisAlignment.end：居右对齐。
    * CrossAxisAlignment.center：居中对齐。

* 主轴和副轴的辨识
    * main轴：如果你用column组件，那垂直就是主轴，如果你用Row组件，那水平就是主轴。
    * cross轴：cross轴我们称为幅轴，是和主轴垂直的方向。比如Row组件，那垂直就是幅轴，Column组件的幅轴就是水平方向的

* mainAxisAlignment
    * MainAxisAlignment.center,

```Dart
// 垂直居中，水平居左
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text('Hello Flutter 1'),
              Text('Hello Flutter 2 Hello Flutter 2'),
              Text('Hello Flutter 3')
            ],
          )
```

让文字相对于水平方向居中，其实只要加入Center组件就可以轻松解决 `Center(child:Text('Hello Flutter 1'))`

* Expanded属性的使用
    `Expanded(child:Text('Hello Flutter 2 Hello Flutter 2')),`  让中间区域变大

### 3. Stack 层叠布局

例子:　图片上显示文字

```
class MyApp6 extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
    var stack = new Stack(
      alignment: const FractionalOffset(0.5, 0.8),
      children: <Widget>[
        new CircleAvatar(
          backgroundImage: new NetworkImage('https://edgardeng.github.io/resource/image/favicon.jpg'),
          radius: 100.0,
        ),
        new Text('Hello Flutter'),
      ],
    );
    return MaterialApp(
      title:'Flutter',
      home:Scaffold(
        body:Center(child:stack),
      ),
    );
  }
}
```
> CircleAvatar 一个用于头像的图片组件

### 3.1　Stack的属性
上节课已经学习了Stack组件，并且进行了两个组件的层叠布局，但是如果是超过两个组件的层叠该如何进行定位那?这就是我们加今天要学的主角Positioned组件了。这个组件也叫做。


* Positioned组件 层叠定位组件
    * bottom: 距离层叠组件下边的距离
    * left：距离层叠组件左边的距离
    * top：距离层叠组件上边的距离
    * right：距离层叠组件右边的距离
    * width: 层叠定位组件的宽度
    * height: 层叠定位组件的高度

```
    var stack2 = new Stack(
      children: <Widget>[
        new CircleAvatar(
          backgroundImage: new NetworkImage('http://jspang.com/static//myimg/blogtouxiang.jpg'),
          radius: 100.0,
        ),
        new Positioned(
          top:10.0,
          left:10.0,
          child: new Text('Left Top'),
        ),
        new Positioned(
          bottom:10.0,
          right:10.0,
          child: new Text('Right Bottom'),
        )
      ],
    );
```



### 4. 卡片组件布局

> 以物理卡片的形态进行展示。
> 卡片式布局默认是撑满整个外部容器的，如果你想设置卡片的宽高，需要在外部容器就进行制定。制作的效果如图。

```
    var card = new Card(
      child: Column(
        children: <Widget>[
          ListTile(
            title:new Text('标题 1',style: TextStyle(fontWeight: FontWeight.w500),),
            subtitle: new Text('副标题 1'),
            leading: new Icon(Icons.account_box,color: Colors.lightBlue,),
          ),
          new Divider(),
          ListTile(
            title:new Text('标题　2',style: TextStyle(fontWeight: FontWeight.w500),),
            subtitle: new Text('副标题 2'),
            leading: new Icon(Icons.account_box,color: Colors.lightBlue,),
          ),
        ],
      ),
    );
```

使用SizedBox规定大小

```Dart
  var card = new SizedBox(
  　height: 300,
    child: new Card(
      child: new Column(
        children: <Widget>[
        ]
      )
    )
  );
```