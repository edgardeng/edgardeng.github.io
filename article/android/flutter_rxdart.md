## Flutter进阶开发之 Rxdart
> RxDart就是一个响应式编程，与之相关的还有他自己的全家桶（RxKotlin,RxJava,RxJS,RxSwift…）。。。
  
  [RxDart](https://github.com/ReactiveX/rxdart) 是基于 ReactiveX 的响应式函数编程库。Dart本身有 Stream API，RxDart在其上增加了其他方法。
  
  ReactiveX是一个强大的库，用于通过使用可观察序列来编写异步和基于事件的程序。它突破了语言和平台的限制，让我们编写异步程序更加的简单。

### rxdart的功能

可以将Stream想成是管道（pipe）的两端，它只允许从一端插入数据并通过管道从另外一端流出数据。
  
  * 在Flutter中，称作Stream
  * 为了控制Stream，我们通常可以使用StreamController来进行管理；
  * 为了向Stream中插入数据，StreamController提供了类型为StreamSink的属性sink作为入口；
  * StreamController提供stream属性作为数据的出口
  
```
  Sink  ---> Stream Controller ----> Stream ---> 监听（subsript）
```

中间进行处理的时候，完全是处于异步状态的，也就是说无法立刻返回一个值。我们不知道stream什么时候会“吐”出处理结果，所以必须要一个观察者来守着这个出口。

``` 
                Subject             Observable
  Sink  ---> Stream Controller ----> Stream ---> 观察者（subsript）
```
Observable 实现并扩展了Stream。它将常用的stream和streamTransformer组合成了非常好用的api。你可以把它想像成stream。

Subject实现并扩展了StreamController,它符合StreamController的所有规范。假如您之前使用的StreamController,那么你可以直接替换为Subject。你可以把它想像成streamController。

从一个Stream中创建 可观察对象——Observable

``` 
 var obs = Observable(Stream.fromIterable([1,2,3,4,5]));
 obs.listen(print);
```

### 常用操作符
1、迭代地处理数据：map
  > map方法能够让我们迭代的处理每一个数据并返回一个新的数据

map最常见的使用场景就是：当你从REST API或者数据库中读取数据时，需要将这些数据转化为你需要的自定义类型：

```dart
var obs = Observable(Stream.fromIterable([1,2,3,4,5]))
    .map((item)=>++item);
    
obs.listen(print);

// 输出：2 3 4 5 6
```
 
2、扩展流：expand
  > expand方法能够让我们把每个item扩展至多个流
  
```dart
 var obs = Observable(Stream.fromIterable([1,2,3,4,5]))
   .expand((item)=> [item,item.toDouble()]);

 obs.listen(print);
 // 输出：1 1.0 2 2.0 3 3.0 4 4.0 5 5.0
```

3、合并流：merge
  > merge方法能够让我们合并多个流,请注意输出。
```dart
var obs = Observable.merge([
    Stream.fromIterable([1,2,3]),
    Stream.fromIterable([4,5,6]),
    Stream.fromIterable([7,8,9]),
  ]);

  obs.listen(print);
  // 输出：1 4 7 2 5 8 3 6 9
```
 
4、检查每一个item：every
  > every会检查每个item是否符合要求，然后它将会返回一个能够被转化为 Observable 的 AsObservableFuture< bool>。

```dart
  var obs = Observable.fromIterable([1,2,3,4,5]);
  obs.every((x)=> x < 10).asObservable().listen(print);
```

其他操作符：Where：数据过滤 Debounce：数据拦截 Distinct：过滤相同数据

### Subject对象
> Subject是RxDart的流控制器（StreamController），但Subject但行为跟StreamControllers还是有些区别的：

1、 PublishSubject

> 普通的广播 StreamController一样，但是返回的是一个 Observable 而不是 Stream

特点：PublishSubject 是最直接的一个 Subject。当一个数据发射到 PublishSubject 中时，PublishSubject 将立刻把这个数据发射，并且接收到订阅之后的所有数据。
允许向监听者发送数据、错误和完成的事件。

默认情况下，PublishSubject 是一个广播（又称hot）控制器，可多次订阅。

2、 BehaviorSubject

特点：只保留最后一个值。在创建的时候可以指定一个初始值，这样可以确保订阅者订阅的时候可以立刻收到一个值，并且接收到订阅前的最后一条数据和订阅后的所有数据。

作为一个特殊的StreamController，捕获添加进控制器的最新项，并且作为第一项发送给新的监听者。

允许向监听者发送数据、错误和完成的事件。把添加进来的最新项发送给新的监听者，之后，新事件将适当的发送给监听者。如果没有新项加入，可能提供原始值。
默认情况下，BehaviorSubject 是一个广播（又称hot）控制器，可多次订阅。

subject和操作符的结合 (过滤操作判断奇偶数)：

```dart
var subject = new PublishSubject<int>();

subject.where((val) => val.isOdd)
    .listen( (val) => print('奇数: $val'));


subject.where((val) => val.isEven)
.listen( (val) => print('偶数: $val'));


subject.add(1);
subject.add(2);
subject.add(3);
// 输出： 奇数: 1 偶数: 2 奇数: 3
```
 
> Subject的释放 为了防止内存泄漏，当你不再收听Subject，或者Subject不再使用时，请务必释放它。
> 调用subscription的cancel()方法让某个听众取消收听，或者Subject.close()，关闭整个流
