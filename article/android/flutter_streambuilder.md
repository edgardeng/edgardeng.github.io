## Flutter进阶开发之StreamBuilder

### StreamBuilder类
> StreamBuilder<T>类本质是一种Widget。

继承关系: StreamBuilder > StreamBuilderBase > StatefulWidget

#### StreamBuilder类构造方法
```Dart
const StreamBuilder({
    Key key,
    this.initialData,
    Stream<T> stream,
    @required this.builder,
}) : assert(builder != null),
      super(key: key, stream: stream);
```

Stream<T>是监听流，由StreamController类提供，
builder方法，返回Widget(其中包含监听到改变的数据)。

```Dart
builder: (BuildContext context, AsyncSnapshot<int> snapshot) {
             return Text('You click me: ${snapshot.data} times');
         }),
// 返回Widget类型是Text，改变的数据在AsyncSnapshot.data中获取。
```

#### StreamBuilder的State类构造方法

StreamBuilder是StatefulWidget类型，State定义_StreamBuilderBaseState。

```Dart
class _StreamBuilderBaseState<T, S> extends State<StreamBuilderBase<T, S>> {
  StreamSubscription<T> _subscription;
  S _summary;

  @override
  void initState() {
    super.initState();
    #这个初始化类型S，在StreamBuilder重写的initial()方法，返回AsyncSnapshot<T>
    _summary = widget.initial();
    #订阅监听
    _subscribe();
  }

  @override
  Widget build(BuildContext context) => widget.build(context, _summary);
}
```

在initState()方法，widget.initial()方法初始化_summary，这是State类持有一种数据类型，用于注册和监听。
build()方法构建时，调用Widget的builder()方法，(StreamBuilderBase定义的抽象方法)，传入S，即AsyncSnapshot<T>。
_summary是AsyncSnapshot<T>类，其中data包装<T>类型数据。

#### StreamBuilder内部定义builder
```Dart

final AsyncWidgetBuilder<T> builder;
final T initialData;

# StreamBuilder重写的initial()方法，返回AsyncSnapshot<T>
@override
AsyncSnapshot<T> initial() 
            => AsyncSnapshot<T>.withData(ConnectionState.none, initialData);

# StreamBuilder继承的 build()方法，由State调用。
Widget build(BuildContext context, AsyncSnapshot<T> currentSummary) 
            => builder(context, currentSummary);
```

StreamBuilder类重写的build()方法，调用外部传入的builder。
因此，外部传入的builder在StreamBuilder基类StatefulWidget对应State类的build()方法时调用。

### StreamController类
> StreamController类负责管理Stream流。

```dart
abstract class StreamController<T> implements StreamSink<T> {
  factory StreamController(
      {void onListen(),
      void onPause(),
      void onResume(),
      onCancel(),
      bool sync: false}) {
    return sync
        ? new _SyncStreamController<T>(onListen, onPause, onResume, onCancel)
        : new _AsyncStreamController<T>(onListen, onPause, onResume, onCancel);
  }
}
```

factory构造方法创建StreamControl，默认是_AsyncStreamController对象。
```
//with的类提供sendXxx方法
class _AsyncStreamController<T> = _StreamController<T>
    with _AsyncStreamControllerDispatch<T>;
```

因此，返回的对象是_StreamController类型。

### Stream

在_StreamController类中定义的stream和sink分别是

 * Stream<T> get stream => new _ControllerStream<T>(this);
 * StreamSink<T> get sink => new _StreamSinkWrapper<T>(this);

stream流，交给StreamBuilder，让Widget去监听流，(listen方法，数据出口)。

sink，利用sink(StreamSink<T>)添加数据流(T)，add(T)方法，通知流的监听者，(数据入口)。

### 出口(等待接收)

#### 订阅监听
在_StreamBuilderBaseState初始化initState()方法时，调用_subscribe()订阅方法，该方法触发Widget的Stream，(即StreamBuilder构造方法传入Stream)，listen()监听。
```
_subscription = widget.stream.listen((T data) {
  setState(() {
  _summary = widget.afterData(_summary, data);
  });
}, onError: (Object error) {
}, onDone: () {
});
```

该方法返回一个StreamSubscription<T>，当收到data数据时，onData回调，setState()刷新UI，其他参数onError，onDone。

#### 等待接收

> 继承关系: _ControllerStream ==> _StreamImpl ==> Stream

Stream定义为_ControllerStream对象，_StreamImpl的listen()方法。
```
StreamSubscription<T> listen(void onData(T data),
      {Function onError, void onDone(), bool cancelOnError}) {
    StreamSubscription<T> subscription =
        _createSubscription(onData, onError, onDone, cancelOnError);
    _onListen(subscription);
    return subscription;
}
```

_ControllerStream类重写_createSubscription()方法。
```
StreamSubscription<T> _createSubscription(void onData(T data),
          Function onError, void onDone(), bool cancelOnError) =>
    _controller._subscribe(onData, onError, onDone, cancelOnError);
```

在_ControllerStream构造方法创建时，入参this本质是_StreamController<T>对象，即初始化内部_controller：this._controller。

因此，_StreamController类的_subscribe()方法

```
StreamSubscription<T> _subscribe(void onData(T data), Function onError,
      void onDone(), bool cancelOnError) {
    _ControllerSubscription<T> subscription = new _ControllerSubscription<T>(
        this, onData, onError, onDone, cancelOnError);
    _PendingEvents<T> pendingEvents = _pendingEvents;
    _state |= _STATE_SUBSCRIBED;
    if (_isAddingStream) {
      _StreamControllerAddStreamState<T> addState = _varData;
      addState.varData = subscription;
      addState.resume();
    } else {
      _varData = subscription;
    }
    subscription._setPendingEvents(pendingEvents);
    subscription._guardCallback(() {
      _runGuarded(onListen);
    });
    return subscription;
}
```

返回创建_ControllerSubscription，内部包含onData、onError、onDone等回调方法。

> 继承关系: _ControllerSubscription ==> _BufferingStreamSubscription

因此，onData回调在_BufferingStreamSubscription。

在listen()方法时，执行_BufferingStreamSubscription构造方法中。

```
void onData(void handleData(T event)) {
  handleData ??= _nullDataHandler;
  _onData = _zone.registerUnaryCallback<dynamic, T>(handleData);
}
```

注册返回一个_onData，在_BufferingStreamSubscription里保存。

在发送时，发送数据进入到它到_sendData()方法。

`_BufferingStreamSubscription._sendData (stream_impl.dart:338)`

`_StreamBuilderBaseState._subscribe.<anonymous closure>.<anonymous closure> (async.dart:136)`

```
void _sendData(T data) {
  assert(!_isCanceled);
  assert(!_isPaused);
  assert(!_inCallback);
  bool wasInputPaused = _isInputPaused;
  _state |= _STATE_IN_CALLBACK;
  _zone.runUnaryGuarded(_onData, data);关键
  _state &= ~_STATE_IN_CALLBACK;
  _checkState(wasInputPaused);
}
```
最终执行这个_onData()回调方法。

### 入口(发送)

sink是_StreamSinkWrapper类型，创建时，入参this代表_StreamController对象，初始化内部_target。

```
void add(T data) {
  _target.add(data);
}
```

内部_target，即_StreamController的add()方法，内部_add()方法

```
 void _add(T value) {
    if (hasListener) {
      _sendData(value);
    } else if (_isInitialState) {
      _ensurePendingEvents().add(new _DelayedData<T>(value));
    }
}
```

_sendData()方法，负责发送数据，该方法基于_EventDispatch接口，具体方法在with类_AsyncStreamControllerDispatch中实现，_StreamController类未实现。

`_subscription._addPending(new _DelayedData<T>(data));`

_subscription是_ControllerSubscription<T>类型，在_StreamController中定义。

```
_ControllerSubscription<T> get _subscription {
  assert(hasListener);
  if (_isAddingStream) {
    _StreamControllerAddStreamState<T> addState = _varData;
    return addState.varData;
  }
  return _varData;
}
```

_ControllerSubscription类继承_BufferingStreamSubscription

```
class _ControllerSubscription<T> extends _BufferingStreamSubscription<T>

class _BufferingStreamSubscription<T>
    implements StreamSubscription<T>, _EventSink<T>, _EventDispatch<T>
```

_addPending()方法，是父类_BufferingStreamSubscription的方法。

创建一个_DelayedData<T>对象(_DelayedEvent是基类)，封装data数据。

```
void _addPending(_DelayedEvent event) {
    _StreamImplEvents<T> pending = _pending;
    if (_pending == null) {
      pending = _pending = new _StreamImplEvents<T>();
    }
    pending.add(event);
    if (!_hasPending) {
      _state |= _STATE_HAS_PENDING;
      if (!_isPaused) {
        _pending.schedule(this);
      }
    }
}
```

定义一个_pending，_StreamImplEvents类型(基类_PendingEvents)，先将_DelayedData添加到_pending内部，然后进一步_pending.schedule(this);方法，this本身代表_BufferingStreamSubscription，本质是实现_EventDispatch。

```
void schedule(_EventDispatch<T> dispatch) {
    if (isScheduled) return;
    assert(!isEmpty);
    ...
    scheduleMicrotask(() {
      int oldState = _state;
      _state = _STATE_UNSCHEDULED;
      if (oldState == _STATE_CANCELED) return;
      handleNext(dispatch);
    });
    _state = _STATE_SCHEDULED;
}
```

scheduleMicrotask()将{}加入到队列，当队列执行{}时，子类_StreamImplEvents实现handleNext()方法，处理该_EventDispatch。

```
void handleNext(_EventDispatch<T> dispatch) {
    assert(!isScheduled);
    _DelayedEvent event = firstPendingEvent;
    firstPendingEvent = event.next;
    if (firstPendingEvent == null) {
      lastPendingEvent = null;
    }
    event.perform(dispatch);
}
```

内部_DelayedEvent，处理_EventDispatch，event.perform(dispatch);

基类_DelayedEvent，子类_DelayedData(封装value)。

```
class _DelayedData<T> extends _DelayedEvent<T> {
  final T value;
  _DelayedData(this.value);
  void perform(_EventDispatch<T> dispatch) {
    dispatch._sendData(value);
  }
}
```

入参_EventDispatch将派发_sendData()方法，发送value。

再一次回到_BufferingStreamSubscription类的方法，(传入的_EventDispatch始终是该类)，即_sendData()方法。
```
void _sendData(T data) {
    bool wasInputPaused = _isInputPaused;
    _state |= _STATE_IN_CALLBACK;
    _zone.runUnaryGuarded(_onData, data);
    _state &= ~_STATE_IN_CALLBACK;
    _checkState(wasInputPaused);
}
```

因此，当外部调用StreamController对象内部sink的add(T)方法时，发送T类型数据，最终会走到_BufferingStreamSubscription类的_sendData(T data)方法。

_BufferingStreamSubscription类的基类是StreamSubscription，被观察者。

### Demo Counter

```dart
class CounterPage extends StatefulWidget {
  @override
  _CounterPageState createState() => _CounterPageState();
}

class _CounterPageState extends State {
  int _counter = 0;
  final StreamController _streamController = StreamController();

  @override
  void dispose() {
    _streamController.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Stream version of the Counter App')),
      body: Center(
        child: StreamBuilder(
            // 监听Stream，每次值改变的时候，更新Text中的内容
            stream: _streamController.stream,
            initialData: _counter,
            builder: (BuildContext context, AsyncSnapshot snapshot) {
              return Text('You hit me: ${snapshot.data} times');
            }
          ),
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
                // 每次点击按钮，更加_counter的值，同时通过Sink将它发送给Stream；
                // 每注入一个值，都会引起StreamBuilder的监听，StreamBuilder重建并刷新counter
                _streamController.sink.add(++_counter);
              },
            ),
          ),
          Padding(
            padding: EdgeInsets.symmetric(vertical: 5.0),
            child: FloatingActionButton(
              child: Icon(Icons.remove),
              onPressed: () {
                // 每次点击按钮，更加_counter的值，同时通过Sink将它发送给Stream；
                // 每注入一个值，都会引起StreamBuilder的监听，StreamBuilder重建并刷新counter
                _streamController.sink.add(--_counter);
              },
            ),
          ),
        ],
      ),
    );
  }
}
``` 

### 参考

  * [Flutter之StreamBuilder](https://www.jianshu.com/p/889ea7f9734a)
  * [Flutter之StreamBuilder的封装](https://blog.csdn.net/qq_38774121/java/article/details/104405572)
