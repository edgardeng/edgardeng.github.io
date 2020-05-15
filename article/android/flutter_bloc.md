# Flutter进阶开发之BLoC
> 业务逻辑组件 (Business Logic Component) , 是响应式编程的一种设计模式design pattern.

## 1. 流 Stream

> 考虑一个有两端的管道，只有一个允许放入东西。当你将放入管道时，会在管道内流动并从另一端流出。

通常使用流控制器（StreamController）来控制 流（Stream）

放入时，StreamController公开了一个"入口"：StreamSink，通过sink属性进行访问；通过stream属性公开了Stream的出口

**Stream可以传递什么？**

所有类型值都可以通过流传递。从值，事件，对象，集合，映射，错误或甚至另一个流，可以由stream传达任何类型的数据。


**怎么知道Stream传递的东西？**

当你需要通知Stream传达某些内容时，只需要订阅（subscript）StreamController 的stream属性。

定义订阅者时，通过StreamSubscription对象，接收由Stream发生变化而触发通知。

只要有至少一个活动订阅者，Stream就会开始生成事件，以便每次都通知活动的 StreamSubscription对象：

  * 一些数据来自流，
  * 当一些错误发送到流时，
  * 当流关闭时
  
StreamSubscription对象也可以允许以下操作：
  * 停止
  * 暂停
  * 恢复
  
  
**Stream允许在流出之前处理流入的数据**

使用流转换器（StreamTransformer ），控制Stream内部数据的处理：

StreamTransformer是：一个“捕获” Stream内部流动数据的函数，对数据做一些处理，转变的结果也是一个Stream

可以按顺序使用多个StreamTransformer。

StreamTransformer可以用进行任何类型的处理，例如：

  * 过滤(filtering)：根据任何类型的条件过滤数据，
  * 重新组合(regrouping)：重新组合数据，
  * 修改(modification)：对数据应用任何类型的修改，
  * 将数据注入其他流，
  * 缓冲，
  * 处理(processing)：根据数据进行任何类型的操作/操作，
  
### Stream流的类型

* 单订阅Stream

  > 只允许在该Stream的整个生命周期内使用单个监听器。
    即在第一个订阅被取消后，也无法在此类流上收听两次。

* 广播流
  > 允许任意数量的监听器。
    可以随时向广播流添加监听器。新的监听器将在它开始收听Stream时收到事件。

__例子: 任何类型的数据__

```dart
// 显示“单订阅” 流，打印输入的数据
import 'dart:async';

void main() {
  /// 初始化“单订阅”流控制器
  final StreamController ctrl = StreamController();
  
  /// 初始化一个只打印数据的监听器
  final StreamSubscription subscription = ctrl.stream.listen((data) => print('$data'));

  // 往Stream中放入数据
  ctrl.sink.add('my name');
  ctrl.sink.add(1234);
  ctrl.sink.add({'a': 'element A', 'b': 'element B'});
  ctrl.sink.add(123.45);
  
  // 释放控制器
  ctrl.close(); 
}

```
__例子: 广播流，它传达整数值并仅打印偶数__

```dart
import 'dart:async';

void main() {
  final StreamController<int> ctrl = StreamController<int>.broadcast();
  
  // 初始化监听器，过滤奇数打印偶数
  // Initialize a single listener which filters out the odd numbers and
  // only prints the even numbers
  final StreamSubscription subscription = ctrl.stream
                          .where((value) => (value % 2 == 0))
                          .listen((value) => print('$value'));
  for(int i=1; i<11; i++){
    ctrl.sink.add(i);
  }
  ctrl.close();
}
```

## 2. RxDart
> RxDart包是用于执行 Dart 所述的ReactiveX API, 扩展了原始 Dart Stream API符合ReactiveX标准

Dart和RxDart之间的相关性。

Dart	  > RxDart
Stream	> Observable
StreamController	> Subject

RxDart 扩展了原始的Dart Streams API并提供了StreamController的 3个主要变体：

> Stream返回一个Observable，而不是Stream

* PublishSubject:  。发送在订阅之后添加到Stream的事件。

* BehaviorSubject: 将最后发送的事件发送给刚刚订阅的监听器。

* ReplaySubject: 将Stream已经发出的所有事件作为第一个事件发送给任何新的监听器。

__关于资源的重要说明__

  * 经常释放不再需要的资源是一种非常好的做法。
  * StreamSubscription - 当你不再需要监听Stream时，取消订阅;
  * StreamController - 当你不再需要StreamController时，关闭它;
  * 同样适用于RxDart主题，当你不再需要BehaviourSubject，PublishSubject ...时，请将其关闭。

## StreamBuilder

> Flutter中的由Stream提供的数据构建Widget

StreamBuilder监听Stream，每当某些数据输出Stream时，它会自动重建，调用其builder callback。

```
StreamBuilder<T>(
    key: ...可选...
    stream: ...需要监听的stream...
    initialData: ...初始数据，否则为空...
    builder: (BuildContext context, AsyncSnapshot<T> snapshot){
        if (snapshot.hasData){
            return ...基于snapshot.hasData返回的控件
        }
        return ...没有数据的时候返回的控件
    },
)
```

模仿默认的 “计数器” 应用程序，但使用Stream而不再使用任何setState。

```dart
import 'dart:async';
import 'package:flutter/material.dart';

class CounterPage extends StatefulWidget {
  @override
  _CounterPageState createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  int _counter = 0;
  final StreamController<int> _streamController = StreamController<int>();

  @override
  void dispose(){
    _streamController.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Stream version of the Counter App')),
      body: Center(
      // 我们正在监听流，每次有一个新值流出这个流时，我们用该值更新Text ;
        child: StreamBuilder<int>(
          stream: _streamController.stream,
          initialData: _counter,
          builder: (BuildContext context, AsyncSnapshot<int> snapshot){
            return Text('You hit me: ${snapshot.data} times');
          }
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: (){
        //当我们点击FloatingActionButton时，增加计数器并通过sink将其发送到Stream；
        //事实上 注入到stream中值会导致监听它(stream)的StreamBuilder重建并 ‘刷新’计数器;
          _streamController.sink.add(++_counter);
        },
      ),
    );
  }
}
```

> 为页面使用StatefulWidget的唯一原因，仅仅是因为我们需要通过dispose方法第15行释放StreamController

__什么是响应式编程__

* 使用异步数据流进行编程
* 组件之间不再存在紧密耦合。

## BLoC
> BLoC(业务逻辑组件 Business Logic Component)模式由Paolo Soares 和 Cong Hui设计，并谷歌在2018的 DartConf 首次提出

Business Logic需要：

  * 转移到一个或几个BLoC，
 * 尽可能从表示层(Presentation Layer)中删除。换句话说，UI组件应该只关心UI事物而不关心业务
 * 依赖 Streams 独家使用输入（Sink）和输出（stream）
 * 保持平台独立
 * 保持环境独立
 
> BLoC模式最初被设想为允许独立于平台重用相同的代码：Web应用程序，移动应用程序，后端


* Widgets 通过 Sinks 向 BLoC 发送事件(event)
* BLoC 通过流(stream)通知小部件(widgets)
* 由BLoC实现的业务逻辑不是他们关注的问题

业务逻辑与UI的分离的好处：

* 可以随时更改业务逻辑，对应用程序的影响最小
* 可能会更改UI而不会对业务逻辑产生任何影响，
* 测试业务逻辑变得更加容易

BLoC 模式应用的目的：

1. 责任分离
2. 可测试性: 只需要测试IncrementBloc类。
3. 自由组织布局
4. 减少“build”的次数

只有一个约束的BLoC

* 通过全局单例

      这种方式很有简单，但不是真的推荐。此外，由于Dart中没有类析构函数，因此你永远无法正确释放资源。

* 作为局部变量(本地实例)

      你可以实例化BLoC的本地实例。在某些情况下，此解决方案完全符合某些需求。在这种情况下，你应该始终考虑在StatefulWidget中初始化，以便你可以利用dispose（）方法来释放它。

* 由父类提供

        使其可访问的最常见方式是通过祖先 Widget，实现为StatefulWidget。

__通用 BlocProvider的示例__

```dart
//所有BLoC的通用接口
abstract class BlocBase {
  void dispose();
}

//通用BLoC提供商
class BlocProvider<T extends BlocBase> extends StatefulWidget {
  BlocProvider({
    Key key,
    @required this.child,
    @required this.bloc,
  }): super(key: key);

  final T bloc;
  final Widget child;

  @override
  _BlocProviderState<T> createState() => _BlocProviderState<T>();

  static T of<T extends BlocBase>(BuildContext context){
    final type = _typeOf<BlocProvider<T>>();
    BlocProvider<T> provider = context.ancestorWidgetOfExactType(type);
    return provider.bloc;
  }

  static Type _typeOf<T>() => T;
}

class _BlocProviderState<T> extends State<BlocProvider<BlocBase>>{
  @override
 /// 便于资源的释放
  void dispose(){
    widget.bloc.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context){
    return widget.child;
  }
}
```


__如何将其作为provider使用?__

```
home: BlocProvider<IncrementBloc>(
          bloc: IncrementBloc(),
          child: CounterPage(),
        ),

```

实例化一个新的BlocProvider，它将处理一个IncrementBloc，并将CounterPage作为子项呈现

从BlocProvider开始的子树的任何小部件部分都将能够通过以下代码访问IncrementBloc：

`IncrementBloc bloc = BlocProvider.of<IncrementBloc>(context);`


__可以使用多个BLoC吗__

* （如果有任何业务逻辑）每页顶部有一个BLoC
* 为什么不是ApplicationBloc来处理应用程序状态?
* 每个“足够复杂的组件”都有相应的BLoC。

以下示例代码在整个应用程序的顶部显示ApplicationBloc，然后在CounterPage顶部显示IncrementBloc。

该示例还显示了如何检索两个blocs。

```dart
void main() => runApp(
  BlocProvider<ApplicationBloc>(
    bloc: ApplicationBloc(),
    child: MyApp(),
  )
);

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context){
    return MaterialApp(
      title: 'Streams Demo',
      home: BlocProvider<IncrementBloc>(
        bloc: IncrementBloc(),
        child: CounterPage(),
      ),
    );
  }
}

class CounterPage extends StatelessWidget {
  @override
  Widget build(BuildContext context){
    final IncrementBloc counterBloc = BlocProvider.of<IncrementBloc>(context);
    final ApplicationBloc appBloc = BlocProvider.of<ApplicationBloc>(context);
    
    ...
  }
}
```

### 为什么不使用InheritedWidget？

在与BLoC相关的大多数文章中，你会看到通过InheritedWidget实现Provider。

然而一个InheritedWidget没有提供任何dispose方法

当然，没有什么能阻止你将InheritedWidget包装在另一个StatefulWidget中
最后，如果不受控制，使用InheritedWidget经常会导致副作用（请参阅下面的InheritedWidget上的提醒）

Flutter无法实例化泛型类型, 必须将BLoC的实例传递给BlocProvider。为了在每个BLoC中强制执行dispose()方法，所有BLoC都必须实现BlocBase接口。

__使用InheritedWidget的提醒__

在使用InheritedWidget并通过context.inheritFromWidgetOfExactType（...）来获得指定类型最近的widget, 每次InheritedWidget的父级或者子布局发生变化时，这个方法会自动将当前“context”（= BuildContext）注册到要重建的widget当中。。

请注意，为了完全正确，我刚才解释的与InheritedWidget相关的问题只发生在我们将InheritedWidget与StatefulWidget结合使用时。当你只使用没有State的InheritedWidget时，问题就不会发生。但是......我将在下一篇文章 中回到这句话。

## BLoC库
>  一个为Dart而生，可预测和管理状态的库，简单，测试性强

### 核心概念

#### 事件（Events)
> 事件(Event)会被输入到Bloc中，通常是为了响应用户交互（例如按下按钮)或者是生命周期事件（例如页面加载) 而添加它们

定义这些事件(Event) 

```
   enum CounterEvent { increment, decrement } 
```
可以使用enum表示事件，但是对于更复杂的情况，就会可能需要使用类(也就是我们常说的class)，尤其是在要将信息传递给Bloc的情况下。


#### 状态（States)
> 状态(State)是Bloc所输出的东西，是程序状态的一部分。它可以通知UI组件，并根据当前状态(State)重建（build) 其自身的某些部分

上面已经定义了两个事件：CounterEvent.increment和CounterEvent.decrement。

如何表示应用程序的状态状态(State)？

一个计数器，那状态就非常的简单：一个整数，代表了计数器的当前值。

#### 转换（Transitions)
> 从一种状态状态(State)到另一种状态状态(State)的变动称之为转换（Transitions) 。转换是由当前状态，事件和下一个状态组成。

当用户与计数器应用程序进行交互时，他们将触发递增（加号按键)和递减（减号按键) 事件，更新计数器的状态。 所有这些状态变化都可以描述为一系列的“转换”

点击了加号按钮，我们将看到以下转换：

```json
{
  "currentState": 0,
  "event": "CounterEvent.increment",
  "nextState": 1
}
```

由于记录了每个状态的更改，所以我们能够非常轻松地对我们的应用程序进行检测，并在任何位置跟踪所有的用户交互和状态更改

#### 流（Streams)
> 流（Stream) 是一系列非同步的数据.如上面介绍的一样
  
Bloc建立在[RxDart](https://pub.dev/packages/rxdart)的基础之上; 然而，Bloc抽象出了所有特定于RxDart的实现细节。

可以通过编写async *函数在Dart中创建一个Stream。

```dart
Stream<int> countStream(int max) async* {
    for (int i = 0; i < max; i++) {
        yield i;
    }
}
```

返回所有整数Stream的总和，则它可能类似于：

```dart

Future<int> sumStream(Stream<int> stream) async {
    int sum = 0;
    await for (int value in stream) {
        sum += value;
    }
    return sum;
}
```

将它们放在一起：

```dart
void main() async {
    /// Initialize a stream of integers 0-9
    Stream<int> stream = countStream(10);
    /// Compute the sum of the stream of integers
    int sum = await sumStream(stream);
    /// Print the sum
    print(sum); // 45
}
```

#### Blocs
> Bloc（业务逻辑组件) 是将传入事件的流（Stream) 转换为传出状态（State) 的流（Stream) 的组件。Bloc可以被视为是整个业务逻辑组件的大脑。

> 每个Bloc必须扩展（extend) 基本Bloc类，因为它是bloc核心包中的一部分。

__每个Bloc必须定义一个初始状态，该状态是接收任何事件之前的状态(State)。__

__每个Bloc都必须实现一个名为mapEventToState的函数。__ 
该函数将传入的事件(Event)作为参数，并且必须返回(return)被表现层(Presentation)所用的新状态(State)的流(Stream)。我们可以随时使用state属性来访问当前的状态. （简单的说就是返回的这状态State记住它是一个流Stream，要被表现层 例如前端 所用)

一个功能齐全的CounterBloc。

```dart
import 'package:bloc/bloc.dart';

enum CounterEvent { increment, decrement }

class CounterBloc extends Bloc<CounterEvent, int> {
  @override
  int get initialState => 0;

  @override
  Stream<int> mapEventToState(CounterEvent event) async* {
    switch (event) {
      case CounterEvent.decrement:
        yield state - 1;
        break;
      case CounterEvent.increment:
        yield state + 1;
        break;
    }
  }
}

```

Bloc将会忽略重复的状态（State) 。如果Bloc产生state nextState状态，并且其中state == nextState，则不会发生任何转换，并且不会对流的状态（Stream ) 进行任何更改。

__如何将事件通知Bloc?__

每个Bloc都有一个add方法。 Add接受一个事件(Event)并触发mapEventToState。可以从表示层(Presentaion)或在Bloc内部调用Add，并通知Bloc新的事件(Event)。

一个从0到3的简单应用程序。

```dart
  CounterBloc bloc = CounterBloc();
  for (int i = 0; i < 3; i++) {
     bloc.add(CounterEvent.increment);
  }
```

在当前状态下，除非覆盖onTransition，否则我们将看不到任何这些转换

onTransition是一种可以被重写以处理每个本地Bloc Transition的方法。在更新Bloc的状态（State) 之前，将调用onTransition。

> 提示: ontransition是添加特定Bloc的日志记录以及分析的好地方。

```dart
@override
void onTransition(Transition<CounterEvent, int> transition) {
    print(transition);
    super.onTransition(transition);
}
```

__处理抛出的异常(Exceptions)__

onError是一个可以重写以处理每个本地Bloc抛出的Exception的方法。默认情况下，所有异常都将被忽略，而Bloc功能将不受影响。

> 注意: 如果状态流（Stream) 收到一个没有StackTrace的错误，则stackTrace的参数可能为空null。

> 提示: onError是添加特定Bloc处理错误的好地方。

```dart
@override
void onError(Object error, StackTrace stackTrace) {
  print('$error, $stackTrace');
}
```

#### BlocDelegate

> Bloc的另一个好处是，我们可以在一处访问所有的Transitions

如果我们希望能够对所有转换Transitions做出响应，我们可以简单地创建自己的BlocDelegate。

```dart
class SimpleBlocDelegate extends BlocDelegate {
  @override
  void onTransition(Bloc bloc, Transition transition) {
    print(transition);
    super.onTransition(bloc, transition);
  }
}
```

对所有添加的事件（Event) 做出响应，那么我们也可以在SimpleBlocDelegate中重写onEvent方法。
```dart
@override
  void onEvent(Bloc bloc, Object event) {
    print(event);
    super.onEvent(bloc, event);
  }
```

对Bloc中抛出的所有异常（Exceptions) 做出响应，那么我们也可以在SimpleBlocDelegate中重写onError方法

> 注意: BlocSupervisor是一个实例，负责监督所有Bloc，并将职责委托给BlocDelegate。

### Flutter Bloc的核心理念

Bloc Widgets

#### BlocBuilder
> 一个Flutter部件(Widget)，它需要Bloc和builder两个方法。处理构建部件用来响应新的状态(State)。BlocBuilder 与 StreamBuilder十分相像，但是它有一个简单的接口来减少一部分必须的模版代码。builder方法会被潜在的触发很多次并且应该是一个返回一个部件(Widget)以响应该状态(State)的纯方法

* 省略了bloc中的参数，则BlocBuilder将使用BlocProvider和当前的BuildContext自动执行查找

 ```dart
 BlocBuilder<BlocA, BlocAState>(
   builder: (context, state) {
    // return widget here based on BlocA's state
   }
  )
 ```
 
* 提供一个范围仅限于单个部件(widget)且无法通过父代BlocProvider和当前BuildContext访问的块时，才指定Bloc。

```dart
BlocBuilder<BlocA, BlocAState>(
  bloc: blocA, // provide the local bloc instance
  builder: (context, state) {
    // return widget here based on BlocA's state
  }
)
```

对何时调用builder函数的时间进行控制，可以向BlocBuilder提供可选的条件（condition) 。条件（condition)获取先前的Bloc的状态和当前的bloc的状态并返回bool值。如果condition返回true，将使用state调用builder，并且部件(widget)将重新构建。如果condition返回false，则不会用state调用builder，也不会进行重建。

```dart
BlocBuilder<BlocA, BlocAState>(
  condition: (previousState, state) {
    // return true/false to determine whether or not
    // to rebuild the widget with state
  },
  builder: (context, state) {
    // return widget here based on BlocA's state
  }
)
```

#### BlocProvider
> Flutter部件(widget)，可通过BlocProvider.of <T>（context)向其子级提bloc。

> 被作为依赖项注入（DI)部件(widget)，以便可以将一个bloc的单个实例提供给子树中的多个部件(widgets)。

在大多数情况下，应该使用BlocProvider来创建新的blocs，并将其提供给其余子树。在这种情况下，由于BlocProvider负责创建bloc，它将自动处理关闭bloc

#### MultiBlocProvider
> Flutter部件(widget)，将多个BlocProvider部件合并为一个

MultiBlocProvider提高了可读性，并且消除了嵌套多个BlocProviders的需要。 通过使用MultiBlocProvider，我们可以从：

```dart
BlocProvider<BlocA>(
  create: (BuildContext context) => BlocA(),
  child: BlocProvider<BlocB>(
    create: (BuildContext context) => BlocB(),
    child: BlocProvider<BlocC>(
      create: (BuildContext context) => BlocC(),
      child: ChildA(),
    )
  )
)
```

变为:
```
MultiBlocProvider(
  providers: [
    BlocProvider<BlocA>(
      create: (BuildContext context) => BlocA(),
    ),
    BlocProvider<BlocB>(
      create: (BuildContext context) => BlocB(),
    ),
    BlocProvider<BlocC>(
      create: (BuildContext context) => BlocC(),
    ),
  ],
  child: ChildA(),
)
```

#### BlocListener

> Flutter部件（widget)，它接受一个BlocWidgetListener和一个可选的Bloc，并调用listener以响应该状态(state)的变化。
> 它应用于每次状态更改都需要发生一次的功能，
 
 如果省略了bloc参数，则BlocListener将使用BlocProvider和当前的BuildContext自动执行查找。
```dart
 BlocListener<BlocA, BlocAState>(
   listener: (context, state) {
     // do stuff here based on BlocA's state
   },
   child: Container(),
 )
``` 

当您无法通过BlocProvider和当前的BuildContext访问的bloc时，才指定bloc。
 
 ```dart
 BlocListener<BlocA, BlocAState>(
   bloc: blocA,
   listener: (context, state) {
     // do stuff here based on BlocA's state
   }
 )
 ```
 
 对任何时候调用监听器的函数进行十分缜密的控制，则可以向BlocListener提供可选的条件（condition) 。 条件（condition) 获取先前的bloc的状态（State) 和当前的bloc的状态（State) 并返回bool值。如果条件（condition) 返回true，listener将被state调用。如果条件返回false，则不会使用状态调用listener。
 
 ` condition: (previousState, state) {
      // return true/false to determine whether or not
      // to call listener with state
    }, 
 `
 
MultiBlocListener
> MultiBlocListener 是Flutter的部件（widget)，将多个BlocListener部件合并为一个 
 
```dart
MultiBlocListener(
  listeners: [
    BlocListener<BlocA, BlocAState>(
      listener: (context, state) {},
    ),
    BlocListener<BlocB, BlocBState>(
      listener: (context, state) {},
    ),
    BlocListener<BlocC, BlocCState>(
      listener: (context, state) {},
    ),
  ],
  child: ChildA(),
)
```

#### BlocConsumer
> BlocConsumer 公开一个builder和listener以便对新状态(State)做出反应。
BlocConsumer与嵌套的BlocListener和BlocBuilder类似，但是减少了所需的样板代码的数量。
仅在有必要重建UI并执行其他反应来声明bloc中的状态(State)更改时，才应使用BlocConsumer。
 
>  BlocConsumer需要一个必需的BlocWidgetBuilder和BlocWidgetListener，以及一个可选的bloc，BlocBuilderCondition和BlocListenerCondition。
 
 如果省略bloc参数，则BlocConsumer将使用以下命令自动执行查找BlocProvider和当前的BuildContext。

```dart
 BlocConsumer<BlocA, BlocAState>(
   listener: (context, state) {
     // do stuff here based on BlocA's state
   },
   builder: (context, state) {
     // return widget here based on BlocA's state
   }
 )
``` 

可选的listenWhen和buildWhen，以更精细地控制何时调用listener和builder

```dart
  listenWhen: (previous, current) {
    // return true/false to determine whether or not
    // to invoke listener with state
  },
  listener: (context, state) {
    // do stuff here based on BlocA's state
  },
  
```
 
#### RepositoryProvider
> Flutter部件(widget)，可通过RepositoryProvider.of <T>（context)向其子级提供存储库
 
 ```dart
 RepositoryProvider(
   create: (context) => RepositoryA(),
   child: ChildA(),
 );
 ```

 #### MultiRepositoryProvider
 > MultiRepositoryProvider 是Flutter部件(widget)，将多个RepositoryProvider部件(widgets)合并为一个
 
```dart
MultiRepositoryProvider(
  providers: [
    RepositoryProvider<RepositoryA>(
      create: (context) => RepositoryA(),
    ),
    RepositoryProvider<RepositoryB>(
      create: (context) => RepositoryB(),
    ),
    RepositoryProvider<RepositoryC>(
      create: (context) => RepositoryC(),
    ),
  ],
  child: ChildA(),
)
```

__计数器用例__

```dart
class CounterPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final CounterBloc counterBloc = BlocProvider.of<CounterBloc>(context);

    return Scaffold(
      appBar: AppBar(title: Text('Counter')),
      body: BlocBuilder<CounterBloc, int>(
        builder: (context, count) {
          return Center(
            child: Text(
              '$count',
              style: TextStyle(fontSize: 24.0),
            ),
          );
        },
      ),
      floatingActionButton: Column(
        crossAxisAlignment: CrossAxisAlignment.end,
        mainAxisAlignment: MainAxisAlignment.end,
        children: <Widget>[
          Padding(
            padding: EdgeInsets.symmetric(vertical: 5.0),
            child: FloatingActionButton(
              child: Icon(Icons.add),
              onPressed: () {
                counterBloc.add(CounterEvent.increment);
              },
            ),
          ),
          Padding(
            padding: EdgeInsets.symmetric(vertical: 5.0),
            child: FloatingActionButton(
              child: Icon(Icons.remove),
              onPressed: () {
                counterBloc.add(CounterEvent.decrement);
              },
            ),
          ),
        ],
      ),
    );
  }
}
```

### BLoc构架

```
     <--- states ---       --- async Request --->
  UI                 BLoc                        Data
     --- event  --->       <-- async response ---
```

使用Bloc可以将应用程序分为三层：

* 数据层（Data)
  * 数据提供者（Data Provider)
  * 数据源/库（Repository )
* 业务逻辑（Business Logic)
* 表现层（Presentation)

#### 数据层（Data Layer)
> 数据层的责任是从一个或多个数据源或库中检索/处理数据。

* 数据提供者
  
  > 责任是提供原始数据。数据提供者所提供的数据应该是能在各个语言间通用。

作为数据层的一部分，我们可能有一个createData，readData，updateData和deleteData的方法。
```
class DataProvider {
    Future<RawData> readData() async {
        // Read from DB or make network request etc...
    }
}
```
 
* 数据源/库 Repository
> 存储库层是与Bloc层进行通信的一个或多个数据提供程序的包装。

```dart
class Repository {
    final DataProviderA dataProviderA;
    final DataProviderB dataProviderB;
    Future<Data> getAllDataThatMeetsRequirements() async {
        final RawDataA dataSetA = await dataProviderA.readData();
        final RawDataB dataSetB = await dataProviderB.readData();
        final Data filteredData = _filterData(dataSetA, dataSetB);
        return filteredData;
    }
}
```

#### Bloc 业务逻辑层 (Business Logic) Layer
> Bloc层的职责是以新状态（State) 响应表示层(Presentation)的事件(Event)。Bloc层可以依赖一个或多个存储库来检索建立应用程序状态(State)所需的数据。

将块层视为用户界面（表示层) 和数据层之间的桥梁。
Bloc层接受由用户输入生成的事件(Event)，然后与存储库进行通信，以建立供表示层使用的新状态(State)。

```dart
class BusinessLogicComponent extends Bloc<MyEvent, MyState> {
    final Repository repository;

    Stream mapEventToState(event) async* {
        if (event is AppStarted) {
            try {
                final data = await repository.getAllDataThatMeetsRequirements();
                yield Success(data);
            } catch (error) {
                yield Failure(error);
            }
        }
    }
}
```


__Bloc和Bloc之间的交流__
每个bloc都有一个状态流（Stream)，其他bloc可以订阅该状态流，以便对bloc内部的变化做出反应。

示例中，MyBloc依赖于OtherBloc，并且可以响应OtherBloc中的状态(State)更改而添加事件(Event)。为了避免内存泄漏，在MyBloc的close替代中关闭了StreamSubscription。

```dart

class MyBloc extends Bloc {
  final OtherBloc otherBloc;
  StreamSubscription otherBlocSubscription;

  MyBloc(this.otherBloc) {
    otherBlocSubscription = otherBloc.listen((state) {
        // React to state changes here.
        // Add events here to trigger changes in MyBloc.
    });
  }

  @override
  Future<void> close() {
    otherBlocSubscription.cancel();
    return super.close();
  }
}
```

#### 表现层（也可理解为用户界面)
> 表示层的职责是弄清楚如何基于一个或多个bloc的状态（State) 进行渲染。另外，它应该处理用户输入和应用程序生命周期事件。

大多数应用程序流程将从AppStart事件开始，该事件触发应用程序获取一些数据以呈现给用户。

```dart
class PresentationComponent {
    final Bloc bloc;

    PresentationComponent() {
        bloc.add(AppStarted());
    }

    build() {
        // render UI based on bloc state
    }
}
```

### 测试
> Bloc的设计使得其非常易于测试。
    
编写测试之前需要添加 test 和 bloc_test 到 pubspec.yaml文件之中.

```dart
 dev_dependencies:
   test: ^1.3.0
   bloc_test: ^5.1.0
``` 

为CounterBloc创建测试文件counter_bloc_test.dart

```dart
import 'package:test/test.dart';
import 'package:bloc_test/bloc_test.dart';

void main() {
    group('CounterBloc', () {

    });
}

```

> 注意: 组是用于组织单个测试以及创建context，在该context中您可以在所有单个测试中共享通用的setUp和tearDown。

编写单个的测试了

```dart
group('CounterBloc', () {
    CounterBloc counterBloc;

    setUp(() {
        counterBloc = CounterBloc();
    });

    test('initial state is 0', () {
        expect(counterBloc.initialState, 0);
    });
});
```

通过 pub run test 该命令来运行我们所有的测试.

使用bloc_test 包.
```dart
blocTest(
    'emits [1] when CounterEvent.increment is added',
    build: () async => counterBloc,
    act: (bloc) async => bloc.add(CounterEvent.increment),
    expect: [1],
);

blocTest(
    'emits [-1] when CounterEvent.decrement is added',
    build: () async => counterBloc,
    act: (bloc) async => bloc.add(CounterEvent.decrement),
    expect: [-1],
);

```

### 命名约定

#### 事件的命名约定（Event Conventions)
> 以过去时来命名，因为从bloc的角度来看，事件是已经发生的事情.

构成: BlocSubject + Noun (optional) + Verb (event)

初始加载事件应遵循以下约定：BlocSubject +Started

✅ __推荐的命名__

CounterStarted CounterIncremented CounterDecremented CounterIncrementRetried

❌ __不推荐的命名__

Initial CounterInitialized Increment DoIncrement IncrementCounter

#### 命名状态（State)
状态应该是名词，因为状态只是特定时间点的快照。

构成: BlocSubject + Verb (action) + State

状态（State) 应为以下之一： 成功| 失败| 在过程中和初始状态应遵循以下约定：BlocSubject +Initial。
 
✅ __推荐的命名__

CounterInitial CounterLoadInProgress CounterLoadSuccess CounterLoadFailure

❌ __不推荐的命名__

Initial Loading Success Succeeded Loaded Failure Failed

## 参考
  * [Flutter - BLoC 第一讲](https://www.jianshu.com/p/4d5e712594b4) 
  
  * [bloc(Github)包](https://github.com/felangel/bloc)
  
  * [bloc包文档](https://bloclibrary.dev/#/)
