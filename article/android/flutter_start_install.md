## Flutter Study - 1. Start

> Flutter包括一个现代的响应式框架、一个2D渲染引擎、现成的组件和开发工具。这些组件可以帮助你快速地设计、构建、测试和调试应用程序

### 1.1　Flutter的特点与核心概念
Flutter的特点如下所示：
* 跨平台：现在Flutter至少可以跨5种平台(MacOS、Windows、Linux、Android、iOS)，甚至支持嵌入式开发

* 丝滑般的体验：使用Flutter内置高大上的Material Design和Cupertino风格组件、丰富的motion API、平滑而自然的滑动效果和平台感知

* 响应式框架：使用Flutter的、响应式框架和一系列基础组件，可以轻松构建用户界面。 
* 支持插件：通过Flutter的插件可以访问平台本地API，如相机、蓝牙、WiFi等。借助现有的Java、Swift、Objective C、C++代码实现对原生系统的调用。
* 60fps超高性能：Flutter采用GPU渲染技术，所以性能极高

#### 1.1.1　一切皆为组件
> 组件（Widget）是Flutter应用程序用户界面的基本构建块。不仅按钮、输入框、卡片、列表这些内容可作为Widget，甚至将布局方式、动画处理都视为Widget。所以Flutter具有一致的统一对象模型：Widget。

Widget可以定义为：
* 一个界面组件（如按钮或输入框）。
* 一个文本样式（如字体或颜色）。
* 一种布局（如填充或滚动）。
* 一种动画处理（如缓动）。
* 一种手势处理（GestureDetector）。

Widget具有丰富的属性及方法，属性通常用来改变组件的状态（颜色、大小等）及回调方法的处理（单击事件回调、手势事件回调等）。方法主要是提供一些组件的功能扩展。

比如：TextBox是一个矩形的文本组件，其属性及方法如下：
 * bottom：底部间距属性。
 * direction：文本排列方向属性。
 * left：左侧间距属性。
 * right：右侧间距属性。
 * top：上部间距属性。
 * toRect：导出矩形方法。
 * toString：转换成字符串方法。

#### 1.1.2　组件嵌套
复杂的功能界面通常都是由一个一个简单功能的组件组装完成的。有的组件负责布局，有的负责定位，有的负责调整大小，有的负责渐变处理，等等。这种嵌套组合的方式带来的最大好处就是解耦。

比如：界面中添加了一个居中组件Center，居中组件里嵌套了一个容器组件Container，容器组件里嵌套了一个文本组件Text和一个装饰器BoxDecoration

```dart
return new Center(
//添加容器
child: new Container(

//添加装饰器
decoration: new BoxDecoration(
),
child: new Text(
//添加文本组件
),
),
),
```

最基础的组件类是Widget，其他所有的组件都是继承Widget的。
紧接着下面有两大类组件：有状态组件及无状态组件。
有状态组件是界面会发生变化的组件，如Scrollable、Animatable等，
无状态的组件即界面不发生变化的组件，如Text、AssetImage等。

####  1.1.3　构建Widget
可以重写Widget的build方法来构建一个组件，如下代码所示：

```
@protected Widget build(BuildContext context);
```

build即为创建一个Widget的意思，返回值也是一个Widget对象，不管返回的是单个组件还是返回通过嵌套的方式组合的组件，都是Widget的实例。

#### 1.1.4　处理用户交互

如果Widget需要根据用户交互或其他因素进行更改，则该Widget是有状态的。

比如：如果一个Widget的计数器在用户点击一个按钮时递增，那么该计数器的值就是该Widget的状态。当该值发生变化时，需要重新构建Widget以更新UI。

这些Widget将继承StatefulWidget（而不是State）并将它们的可变状态存储在State的子类中

每当你改变一个State对象时（例如增加计数器），必须调用setState()来通知框架，框架会再次调用State的构建方法来更新用户界面。

有了独立的状态和Widget对象，其他Widget可以以同样的方式处理无状态和有状态的Widget，而不必担心丢失状态。

父Widget可以自由地创造子Widget的新实例且不会失去子Widget的状态，而不是通过持有子Widget来维持其状态。

框架在适当的时候完成查找和重用现有状态对象的所有工作。

#### 1.1.5　什么是状态
Flutter中的状态和React中的状态概念一致。React 的核心思想是组件化的思想，应用由组件搭建而成，而组件中最重要的概念是State（状态），State是一个组件的UI数据模型，是组件渲染时的数据依据。
Flutter程序的运行可以认为是一个巨大的状态机，用户的操作、请求API和系统事件的触发都是推动状态机运行的触发点，触发点通过调用setState方法推动状态机进行响应。

状态的生命周期如图所示:
![](../img/flutter_lifecycle.jpg)

#### 1.1.6　分层的框架
Flutter框架是一个分层的结构，每一层都建立在前一层之上. Flutter框架如图所示:上层比下层的使用频率更高。
![](../img/flutter_framework.webp)

> 提示:有关构成Flutter分层框架的完整库，请参阅官方的[API文档](https://docs.flutter.dev/)。

分层设计的目标是帮助开发者用更少的代码做更多的事情。例如，Material层通常组合来自Widget层的基本Widget， 而Widget层通过较低级对象渲染层来构建。


### 1.2　开发环境搭建
> 开发环境搭建还是非常烦琐的，任何一个步骤失败都会导致最终环境搭建不能完成。Flutter支持三种环境：Windows、MacOS和Linux

#### 1.2.1　Windows环境搭建
1. 使用镜像
首先解决网络问题。环境搭建过程中需要下载很多资源文件，当某个资源更新不到时，就可能会报各种错误。
在国内访问Flutter有时可能会受到限制，Flutter官方为中国开发者搭建了临时镜像

```
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

2. 安装Git
Flutter依赖的命令行工具为Git for Windows（Git命令行工具）。Windows版本的下载地址为：https://git-scm.com/download/win。

3. 下载安装Flutter SDK

去官网下载Flutter安装包，下载地址: https://flutter.io/sdk-archive/#windows

将安装包zip解压到你想安装Flutter SDK的路径（如：D:Flutter）。在Flutter安装目录的Flutter文件下找到flutter_console.bat，双击运行并启动Flutter命令行，接下来，你就可以在Flutter命令行运行flutter命令了。

> 注意 不要将Flutter安装到需要一些高权限的路径如C:Program Files。

4.添加环境变量,将Flutter文件的bin路径添加到系统path里去

5.运行flutter命令安装各种依赖　

运行`flutter doctor` 查看是否需要安装任何依赖项来完成安装：

6.编辑器设置
如果使用flutter命令行工具，可以使用任何编辑器来开发Flutter应用程序。输入flutter help在提示符下查看可用的工具。但是笔者建议最好安装一款功能强大的IDE来进行开发，毕竟开发调试运行打包的效率会更高。由于Windows环境只能开发Flutter的Android应用，所以接下来我们会重点介绍Android Studio这款IDE。
（1）安装Android Studio: [下载](https://developer.android.com/studio/index.html) 安装 启动
（2）设置你的Android设备: 需要安装Android 4.1（API level 16）或更高版本的Android设备。步骤如下：
（3）设置Android模拟器: 启动Android Studio→Tools→Android→AVD Manager?并选择?Create Virtual Device，打开虚拟设备面板，如图1-6所示。
（4）安装Flutter（运行、调试、热重载等）和Dart （输入代码时进行验证、代码补全等）插件: 打开Android Studio的系统设置面板，找到Plugins分别搜索，点击安装即可

#### 1.2.2　MacOS环境搭建

1.命令行工具
    Flutter依赖的命令行工具有bash、mkdir、rm、git、curl、unzip、which。

2.下载安装Flutter SDK,解压安装包,添加Flutter下bin目录到path

3.运行Flutter命令安装各种依赖 `flutter doctor`

4.添加环境变量
使用vim命令打开～/.bash_profile文件，添加如下内容：
```
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
export FLUTTER_HOME=/app/flutter/bin
export PATH=$FLUTTER_HOME:$PATH
```
设置好以后，请务必运行 source $HOME/.bash_profile? 刷新当前终端窗口，以使刚刚配置的内容生效。

5.编辑器设置
（1）安装 Xcode
    安装最新Xcode。通过链接下载：https://developer.apple.com/xcode/，或通过苹果应用商店下载：https://itunes.apple.com/us/app/xcode/id497799835。
（2）设置iOS模拟器
    在iOS模拟器上运行并测试你的Flutter应用。要打开一个模拟器，在MacOS的终端输入以下命令：  `open -a Simulator`
    如果想切换模拟器，可以打开Hardware下在Device菜单选择某一个模拟器
    接下来，在终端运行 `flutter run` 命令或者打开Xcode，点击运行按钮即可启动你的应用。
（3）安装到iOS设备
    要在苹果真机上测试Flutter应用，需要一个苹果开发者账户，并且还需要在Xcode中进行设置

1）安装Homebrew?工具，Homebrew是一款MacOS平台下的软件包管理工具，拥有安装、卸载、更新、查看、搜索等很多实用的功能。下载地址为：https://brew.sh。
2）打开终端并运行一些命令，安装用于将Flutter应用安装到iOS设备的工具，命令如下所示：
```
brew update
brew install --HEAD libimobiledevice
brew install ideviceinstaller ios-deploy cocoapods
pod setup
```

提示：如果这些命令中有任何一个失败并出现错误，请运行brew doctor并按照说明解决问题。

##### Xcode签名。

1. 在你Flutter项目目录中通过双击ios/Runner.xcworkspace打开默认的Xcode工程。

2. 在Xcode中，选择导航面板左侧中的Runner项目。

3. 在Runner target设置页面中，确保在General→Signing→Team（常规→签名→ 团队）下选择了你的开发团队，如图1-17所示。当你选择一个团队时，Xcode会创建并下载开发证书，为你的设备注册你的账户，并创建和下载配置文件。

4. 要开始你的第一个iOS开发项目，可能需要使用你的Apple ID登录Xcode。任何Apple ID都支持开发和测试。需要注册Apple开发者计划才能将你的应用分发到App Store。请查看https://developer.apple.com/support/compare-memberships/这篇文章。登录界面如图1-18所示。

5. 当你第一次添加真机设备进行iOS开发时，需要同时信任你的Mac和该设备上的开发证书。点击Trust即可，如图1-19所示。

6. 如果Xcode中的自动签名失败，请查看项目的Bundle Identifier值是否唯一。这个ID即为应用的唯一ID，建议使用域名反过来写，如图1-20所示。

7. 使用flutter run命令运行应用程序。

### 1.3　第一个Flutter程序

1. 在Android Studio 新建一个Flutter工程，选择Flutter Application

2. 点击Next按钮，打开应用配置界面，其中在Project name中填写helloworld， Flutter SDK path使用默认值，IDE会根据SDK安装路径自动填写，Project location填写为工程放置的目录，在Description中填写项目描述，任意字符即可，如图1-22所示。

3. 点击Next按钮，打开包设置界面，在Company domain中填写域名，注意域名要反过来写，这样可以保证全球唯一，Platform channel language下面的两个选项不需要勾选，如图1-23所示。

4. 点击Finish按钮开始创建第一个工程，等待几分钟，会创建如图1-24所示工程。

5. 工程建好后，可以先运行一下看看根据官方创建的示例运行的效果，点击Open iOS Simulator 打开iOS模拟器

6. 等待几秒钟后会打开模拟器，如图1-26所示。

7. 点击debug(调试)按钮，启动官方示例程序，点击+号按钮，可以自动加1，此示例是一个基于Material Design风格的应用程序，如图1-27所示。

8. 接下来我们打开工程目录下的main.dart文件，清空main.dart代码，如图1-28箭头所指。

9. 把Hello World代码粘贴至main.dart文件里，完整代码如下所示：
```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
@override
Widget build(BuildContext context) {

return MaterialApp(
  title: 'Welcome to Flutter',
  home: Scaffold(
    appBar: AppBar(
      title: Text('Welcome to Flutter'),
    ),
    body: Center(
      child: Text('Hello World'),
    ),
  ),
);
}
}
```

10. 重新运行此程序，标题栏显示Welcome to Flutter，页面中间显示Hello World。这样，第一个Flutter程序就运行出来啦，如图1-29所示。

 ### 1.4 Flutter 常用命令

* flutter run 

* flutter clean











