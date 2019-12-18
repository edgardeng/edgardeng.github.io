## Flutter Study - 5. Navi

> Flutter在多页面切换时，需要进行使用导航器　Navigator

### 1. 导航

```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: FirstScreen(),
    );
  }
}

class FirstScreen extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return new Scaffold(
        appBar: AppBar(title:Text('导航页面')),
        body:Center(
            child:RaisedButton(
              child:Text('下一页'),
              onPressed: (){
                Navigator.push(context,new  MaterialPageRoute(
                    builder:(context) =>new SecondScreen())
                );
              },
            )
        )
    );
  }
}

class SecondScreen extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return Scaffold(
        appBar:AppBar(title:Text('第2页')),
        body:Center(child:RaisedButton(
            child:RaisedButton(
              child:Text('返回'),
              onPressed: (){
                Navigator.pop(context);
              },
            )
        ))
    );
  }
}

```

##### RaisedButton 按钮组件

两个最基本的属性：

 * child：可以放入容器，图标，文字。让你构建多彩的按钮。
 * onPressed：点击事件的相应，一般会调用Navigator组件。

##### Navigator 导航器

* Navigator.push：是跳转到下一个页面，它要接受两个参数一个是上下文context，另一个是要跳转的函数。

* Navigator.pop：是返回到上一个页面，使用时传递一个context（上下文）参数，使用时要注意的是，你必须是有上级页面的，也就是说上级页面使用了Navigator.push。


#### 1.1 导航参数的传递和接收

1. 声明数据结构类

```Dart
class Product {
  final String name;  // 名称
  final String number;  //　编码
  Product(this.name, this.number);
}
```

2. 第1页　商品列表
```Dart
class FirstScreen extends StatelessWidget{
  final List<Product> products;
  FirstScreen({Key key,@required this.products}):super(key:key);
  @override
  Widget build(BuildContext context){
    return new Scaffold(
        appBar: AppBar(title:Text('第1页')),
    body:ListView.builder(
      itemCount:products.length,
      itemBuilder: (context,index){
        return ListTile(
          title:Text(products[index].name),
          onTap:(){
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder:(context)=> new SecondScreen(product:products[index])
                )
            );
          }
        );
      },
    ));
  }
}
```

3. 第2页　获取商品参数
```Dart
class SecondScreen extends StatelessWidget{
  final Product product;
  SecondScreen({Key key ,@required this.product}):super(key:key);
  @override
  Widget build(BuildContext context){
    return Scaffold(
        appBar:AppBar(title:Text('第2页')),
        body:Center(child: Text('${product.number}'),)
    );
  }
}
```

4. 主程序传递参数 `FirstScreen(products: List.generate( 20, (i)=>Product('商品 $i','NO.$i'))),`

#### 1.2 页面跳转并返回数据

##### 异步请求和等待
> Dart中的异步请求和等待, 使用async...await就可以实现

##### SnackBar 组件
> SnackBar是用户操作后，显示提示信息的一个控件，类似Tost，会自动隐藏。SnackBar是以Scaffold的showSnackBar方法来进行显示的。

```
class FirstScreen extends StatelessWidget{
  final List<Product> products;
  FirstScreen({Key key,@required this.products}):super(key:key);

  _navigateToNext(BuildContext context, int index) async{ //async是启用异步方法
    //等待
    final result = await Navigator.push(
        context,
        MaterialPageRoute(builder: (context)=> new SecondScreen(product:products[index]))
    );
    Scaffold.of(context).showSnackBar(SnackBar(content:Text('$result')));
  }

  @override
  Widget build(BuildContext context){
    return new Scaffold(
        appBar: AppBar(title:Text('第1页')),
    body:ListView.builder(
      itemCount:products.length,
      itemBuilder: (context, index){
        return ListTile(
          title:Text(products[index].name),
          onTap:(){
            _navigateToNext(context, index);
          }
        );
      },
    ));
  }
}

class SecondScreen extends StatelessWidget{
  final Product product;
  SecondScreen({Key key ,@required this.product}):super(key:key);

  @override
  Widget build(BuildContext context){
    return Scaffold(
        appBar:AppBar(title:Text('第2页')),
        body:Center(
          child:Column(
            children: <Widget>[
              Text('${product.number}'),
              RaisedButton(
                child: Text('卖出'),
                onPressed: (){
                  Navigator.pop(context,' ${product.name} 卖出 -1');
                },
              ) ,
              RaisedButton(
                child: Text('买入'),
                onPressed: (){
                  Navigator.pop(context,' ${product.name} 买入 +1');
                },
              ) ,
            ],
          )
        )
    );
  }
}

```

### 2 静态资源和项目图片的处理

#### 2.1 pubspec.yaml 配置文件

1. 在项目根目录下新建了一个images文件夹，文件夹下放入图片a.jpg

2. 在pubspec.yaml文件里就要写如下代码进行声明

```yaml
  assets:
    - images/a.jpg
```

3. 项目中使用图片资源　｀Image.asset('images/a.jpg')｀

### 3. Flutter客户端打包

#### 3.1 配置APP的图标

* android项目

    1. 找打目录/android/app/src/main/res/
    2. mipmap-为前缀命名的文件夹，后边的是像素密度，可以看出图标的分辨率。
    3. 将对应像素密度的图片放入对应的文件夹
    4. 配置AndroidManifest.xml (APP的名称、图标和系统权限), 文件在项目目录/android/app/src/main/AndroidManifest.xml
    5. 生成 keystore `keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key` 或者Android Studio生成
    6. 有了这个key.jks文件,到项目目录下的android文件夹下，创建一个名为key.properties的文件
        ```
        storePassword=123123 //输入上一步创建KEY时输入的 密钥库 密码
        keyPassword=123123   //输入上一步创建KEY时输入的 密钥 密码
        keyAlias=key
        storeFile=D:/key.jks //key.jks的存放路径
        ```
    7. 在build.gradle文件中进行配置
        1. 进入项目目录的/android/app/build.gradle文件，在android{ 这一行前面,加入如下代码：
        ```
        def keystorePropertiesFile = rootProject.file("key.properties")
        def keystoreProperties = new Properties()
        keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
        ```
        2. 把`buildTypes { . }` 进行替换成:
        ```
        signingConfigs {
            release {
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
                storeFile file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
            }
        }
        buildTypes {
            release {
                signingConfig signingConfigs.release
            }
        }
        ```
    8. 生成apk `flutter build apk`


|后缀|质量|DPI|launcher |
|:----|:----|:----|:----
|mdpi   |中 | 160 |48*48|
|hdpi   |（高）| ~240dip|72*72|
|xhdpi  |（超高）| ~320dip|96*96|
|xxhdpi | （超超高）| ~480dip|144*144|
|xxxhdpi|（超超超高）| ~640dip|192*192|




