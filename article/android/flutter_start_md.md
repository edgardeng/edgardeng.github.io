## Flutter Study - 6. Material Design

> Material Design　是由 Google 推出一种非常有质感的设计风格. Flutter中提供了多种Material Design 风格组件:App结构和导航组件,按钮和提示组件等等

|组件|中文名称|简单说明|
|:----|:----|:----|
|AppBar		        |应用按钮|应用的工具按钮|
|AlertDialog	    |对话框|有操作按钮的对话框|
|BottomNavigationBar |底部导航条|底部导航条,可以很容易地在 tap 之间切换和浏览顶级视图|
|Card               |卡片组件| 带有边框阴影的卡片组件|
|Drawer             |抽屉组|　实现类似拍屉拉开关闭的效果|
|FloatingActionButton |浮动按钮组件| 应用的主要功能操作按钮|
|FlatButton         |扁平按钮组件| 扁平化风格的按钮|
|MaterialApp        |Material 应用组件 |Material设计风格的应用|
|PopupMenuButton    |弹出菜单组件 |弹出菜单按钮|
|Scaffold           |脚手架组件| 实现了基本的 Material Design布局|
|SnackBar           |轻量提示组件| 一个轻量级消息提示组件 ,在屏幕的底部显示|
|SimpleDialog       |简单对话框| 只起提示作用,没有交互|
|TabBar             | 水平选项卡及视图组件 | 一个显示水平选项卡|
|TextField          |文本框组件 | 可接受应用输入文本|

### 6.1 MaterialApp (应用组件)


#### 6.1.1 MaterialApp的属性

|属性|类型|说明|
|:----|:----|:----|
|title          |String|应用程序的标题|
|theme          |ThemeData|定义应用所使用的主题
|color          |Color|应用的主要颜色|
|home           |Widget|-|
|routes         |Map <String, WidgetBuilder>| 路由：页面跳转规则|
|initialRout    | String |初始化路由|home
|onGenerateRoute| RouteFactory|路由|
|onLocaleChanged||系统修改语言，回调函数|
|navigatorObservers|List<NavigatorObserver> |导航观察器|
|debugShowMaterialGrid  |bool| 是否显示布局网格|
|showPerformanceOverlay |bool| 显示性能标签|


#### 6.1.2 路由

1. 通过 routes 可以给 MaterialApp组件初始化一个路由列表,跳转到指定页面

```
    new MaterialApp(
        title: 'Hello Flutter',
        home: HomePage(),
        routes: {
          '/page_one': (BuildContext context) => PageOne(),
          '/page_two': (BuildContext context) => PageTwo()
        },
      initialRoute: '/page_one'
    );
```

2. initialRoute, 指定初始化界面处在哪个路由

3. 路由跳转: `Navigator.pushNamed(context, '/page_two'); `

### 6.2 Scaffold (脚手架组件)

> Scaffold 实现了基本的 Material Design 布局结构

### 6.2.1  属性说明

|属性	|备注说明|
|:----	|:----|
|appBar	                |显示在界面顶部的一个 AppBar。|
|body	                |当前界面所显示的主要内容 Widget。|
|floatingActionButton	|Material 设计中所定义的 FAB，界面的主要功能按钮。|
|persistentFooterButtons|固定在下方显示的按钮，比如对话框下方的确定、取消按钮。|
|drawer	                |抽屉菜单控件。|
|backgroundColor	    |内容的背景颜色，默认使用的是 ThemeData.scaffoldBackgroundColor 的值。|
|bottomNavigationBar	|显示在页面底部的导航栏。|
|resizeToAvoidBottomPadding	|类似于 Android 中的 android:windowSoftInputMode=‘adjustResize’，控制界面内容 body 是否重新布局来避免底部被覆盖了，比如当键盘显示的时候，重新布局避免被键盘盖住内容。默认值为 true。|

```
        new Scaffold(
          appBar: AppBar(title: Text('主页'),),
          body: Center(child:Text('主页')),
          bottomNavigationBar: new BottomNavigationBar(),
          //侧边栏 左滑可以拉出来
          drawer: Drawer( child: ListView (),)
          //悬浮按钮
          floatingActionButton: FloatingActionButton()
        )
```

### 6.3  AppBar/SliverAppBar 标题栏
> 类似 Android 中的 Toolbar AppBar 和 SliverAppBar 都是继承自 StatefulWidget两者 的 区别在于 AppBar 位置是固定，在应用最上面的;而SliverAppBar 是可以跟随内容滚动的

|属性	|类型	|备注说明|
|:----	|:----|:----	|
|leading        |Widget | 在标题前面显示的一个控件，通常显示logo；在其他界面通常显示为返回按钮|
|title          |Widget | Toolbar 中主要内容，通常显示为当前界面的标题文字｜
|actions        |List | 一个 Widget列表，代表 Toolbar 中所显示的菜单，对于常用的菜单，通常使用 IconButton 来表示；对于不常用的菜单通常使用 PopupMenuButton 来显示为三个点，点击后弹出二级菜单| 
|bottom         |PreferredSizeWidget | 一个 AppBarBottomWidget 对象，通常是 TabBar。用来在 Toolbar 标题下面显示一个 Tab 导航栏。| 
|elevation      |double | 控件的 z 坐标顺序，默认值为 4，对于可滚动的 SliverAppBar，当 SliverAppBar 和内容同级的时候，该值为 0， 当内容滚动 SliverAppBar 变为 Toolbar 的时候，修改 elevation 的值| 
|flexibleSpace  |Widget | 一个显示在 AppBar 下方的控件，高度和 AppBar 高度一样，可以实现一些特殊的效果，该属性通常在 SliverAppBar 中使用| 
|backgroundColor|Color | Appbar 的颜色，默认值为 ThemeData.primaryColor。改值通常和下面的三个属性一起使用。| 
|brightness     |Brightness | Appbar 的亮度，有白色和黑色两种主题，默认值为 ThemeData.primaryColorBrightness| 
|iconTheme      |IconThemeData | Appbar 上图标的颜色、透明度、和尺寸信息。默认值为 ThemeData.primaryIconTheme| 
|textTheme      |TextTheme | Appbar 上的文字样式| 
|centerTitle    |bool | 标题是否居中显示，默认值根据不同的操作系统，显示方式不一样。| 
|toolbarOpacity |double| 透明度| 

```
          AppBar(
            centerTitle: true, //标题居中显示
            leading: Container(),//返回按钮占位
            actions: <Widget>[
              IconButton(icon: Icon(Icons.search),tooltip:'Search',onPressed:(){}),
              IconButton(icon: Icon(Icons.add), tooltip:'Add',onPressed:(){}),
            ],
            title: Text('主页'),
          )
```

### 6.4 BottomNavigationBar 底部导航条
> 在BottomNavigationBar上，通过tap之间的切换，来切换视图

```
          new BottomNavigationBar(
            //底部导航栏
            onTap: _onItemTapped,
            currentIndex: _selectedIndex, //默认选中的位置
            iconSize: 1,
            fixedColor: Colors.green, //选中的颜色
            items: <BottomNavigationBarItem>[
              new BottomNavigationBarItem(
                icon: new Icon(Icons.home,),
                title: new Text('Home',),
              ),
              new BottomNavigationBarItem(
                icon: new Icon( Icons.contacts,),
                title: new Text(
                  'Message',
                ),
              ),
              new BottomNavigationBarItem(
                icon: new Icon(
                  Icons.account_box,
                ),
                title: new Text(
                  'Account',
                ),
              ),
            ],
          ),
```

### 6.5 TabBar 一个显示水平选项卡
> TabBar 是一个显示水平选项卡的 Material Design 组件,通常需要配套 Tab 选项组件及 TabBarView 页面视 图组 件一起使用 。

#### 6.5.1 属性

*  TabBar属性

|属性	|类型	|备注说明|
|:----	|:----|:----	|
|isScrollable	|bool	        |是否可以水平移动|
|tabs	        |List<Widget>	|Tab选项列表|

* Tab 属性

|属性	|类型	|备注说明|
|:----	|:----|:----	|
|icon	|Widget	|Tab图标|
|text	|String	|Tab文本|

* TabBarView 属性

|属性	|类型	|备注说明|
|:----	|:----|:----	|
|controller	|TabController	|指定视图的控制器|
|children	|List<Widget>	|视图组件的child为一个列表，一个选项卡对应一个视图|

```
        DefaultTabController(
          length: items.length,
          child: new Scaffold(
            appBar: AppBar(
                centerTitle: true, //标题居中显示
                title: Text('主页'),
                bottom: TabBar(tabs: items.map((TabItemView item) {return Tab(text:item.title,icon:Icon(item.icon));}).toList(),)
            ),
            body: TabBarView(
              children: items.map((TabItemView item) {return SelectedView(item:item);}).toList()
            ) ,
          ),
        )
```

> 使用DefaultTabController把TabBar和TabBarView关联起来

### 6.6 Drawer 抽屉组件

>从侧边栏拉出导航面板, 类似抽屉拉出推入的效果

#### 6.6.1 Drawer常用属性

|属性	|类型	|备注说明|
|:----	|:----|:----	|
|child      |Widget |内容控件|
|elevation  |double |16 z坐标的顺序|


* DrawerHeader 抽屉顶部组件属性

|属性	|类型	|备注说明|
|:----	|:----|:----	|
|decoration |Decoration| 装饰，通常用来设置背景颜色或者背景图片|
|curve |Curve |设置变化曲线|
|child |Widget| 内容控件|
|padding |EdgeInsetsGeometry||
|margin |EdgeInsetsGeometry||

* UserAccountsDrawerHeader 抽屉顶部|用户信息组件属性

|属性	|类型	|备注说明|
|:----	|:----|:----	|
|decoration             |Decoration |装饰，通常用来设置背景颜色或者背景图片|
|margin                 |EdgeInsetsGeometry||
|currentAccountPicture  |Widget |用户头像|
|otherAccountPicture    |List<Widget> |其他账号的头像|
|accountName            |Widget |当前用户的名字|
|accountEmail           |Widget| 当前用户的|
|onDetailsPressed       |VoidCallback  |被点击所触发的回调函数|

#### 6.7.2 实例

``` Dart
          Drawer(
            child: ListView (
              children: <Widget > [
                UserAccountsDrawerHeader(
                    accountName: new Text('Edgar'),
                    accountEmail: new Text('**@qq.com'),
                    currentAccountPicture: CircleAvatar(backgroundImage: NetworkImage("*"),),
                    onDetailsPressed: () {},
//                  otherAccountsPictures: <Widget>[],
                ),
                ListTile(title: Text('Photo'), leading: new CircleAvatar(child: Icon (Icons.album ),)),
                ListTile(title: Text('Setting'), leading: new CircleAvatar(child: Icon (Icons.settings ),)),
              ],
            )
          ),

```

### 6.8 Button 按钮组件

#### 6.8.1  FloatingActionButton 浮动按钮

```Dart
          new FloatingActionButton(
              tooltip: '这里是长按提示的文字',
              backgroundColor: Colors.red,
              foregroundColor: Colors.white,
              elevation: 10.0, //阴影大小
              highlightElevation: 20.0, //设置高亮的阴影
              mini: true, //设置是否为小图标
              child: new Icon(Icons.add),
              shape: new CircleBorder(),
              isExtended: true,
              onPressed: () {
                Scaffold.of(context).showSnackBar(new SnackBar(
                  content: new Text (" FloatingActionButton Clicked"),
                ));
              }
          ),

```

#### 6.8.2  FlatButton 文字按钮

```
            FlatButton(
              onPressed: (){},
              textColor: Colors.teal,
              child: Text('文字按钮')
            ),
```

#### 6.8.3 PopupMenuButton 弹出菜单按钮

* child Widget 内容控件（放置菜单）
* icon Icon 如果提供,则弹出菜单使用此图标
* itemBuilder PopupMenuItemBuilder<T> 菜单项构造糕,菜单项为任意类型 , 文本,图标都可以
* onSelected PopupMenuItemSelected<T> 当某项菜单被选中 日才回调的方法

```Dart
           enum MenuItem { MenuItemOne, MenuItemTwo, MenuItemThree }

           PopupMenuButton<MenuItem>(
              onSelected: (MenuItem result) {},
              itemBuilder: (BuildContext context) => <PopupMenuEntry<MenuItem>>[
                const PopupMenuItem<MenuItem>( value: MenuItem.MenuItemOne, child: Text('MenuItemOne')),
                const PopupMenuItem<MenuItem>( value: MenuItem.MenuItemTwo, child: Text('MenuItemTwo')),
                const PopupMenuItem<MenuItem>( value: MenuItem.MenuItemThree, child: Text('MenuItemThree')),
              ],
            )],
```

### 6.9 对话框

#### 6.9.1 简易对话框

```
           SimpleDialog(
              title: Text('SimpleDilogTitle'),
              children: <Widget > [
                SimpleDialogOption( onPressed: () {} , child: Text('SimpleDilogOption 1')),
                SimpleDialogOption( onPressed: () {} , child: Text('SimpleDilogOption 1')),
              ],
              contentPadding: EdgeInsets.all(5),
              titlePadding: EdgeInsets.all(5),
            ),
```


#### 6.9.2 AlertDialog 提示对话框
>提示内容,还有一些操作按钮,如确定和取消

```Dart
            AlertDialog(
              title: Text ( 'AlertDialogTitle'), // 对话框标题
              contentPadding: EdgeInsets.all(0),
              content: SingleChildScrollView(
                child: ListBody(
                  children: <Widget>[ Text ('内容1'), Text ('内容.....2')],
                ),
              ),
              actions: <Widget> [
                FlatButton( child: Text ('yes'),),
                FlatButton( child: Text ('no'),)
              ]
            ),
```

#### 6.9.3 SnackBar 提示组件
> SnackBar 是一个轻量级消息提示组件,在屏幕的底部显示

|属性	|类型	|备注说明|
|:----	|:----|:----	|
|action |SnackBarAction |提示消息里执行的动作,比如用户想撤销时可以点击操作|
|animation |Animation<double> |给组件添加动画效果|
|content |Widget　|提示消息内容,通常为文本组件|
|duration |Duration |默认4.0 秒　动画执行的时长|
|backgroundColor |Color　|消息面板的背景色|

> 注意事项 当BuildContext在Scaffold之前时，调用Scaffold.of(context)会报错。这时可以通过Builder Widget来解决

```Dart
    new Builder(builder: (BuildContext context) {
            return new FloatingActionButton(
                child: new Icon(Icons.add),
                onPressed: () {
                  Scaffold.of(context).showSnackBar(new SnackBar(
                    content: new Text(" FloatingActionButton Clicked"),
                    backgroundColor: Colors.lightGreen,
                    duration: Duration( seconds: 3),
                    action: new SnackBarAction(
                      label: '撤消',
                      onPressed: () {
                        // do something to undo
                      },)
                    )
                  );
                }
            );
          }),

```