# Android Knowledge Map

## Component
>


### Activity

#### 启动模式
#### Intent Flag
#### taskAffinity
#### 生命周期

### Service

#### 绑定
* startService

* binService
####　sticky/non-sticky

#### Intent Flag
#### taskAffinity
#### 生命周期


### ContentProvider

#### 数据源

### BroadcastReceiver

####　注册方式
* 静态
* 动态
####　传递方式
* 有序
* 无序
####　注册方式
* 系统
* 自定义
####　传递方式
* 本地
* 全局

### Application


## 界面

### UI加载过程


### 自定义组件

#### 绘制

* onMeasure

* onLayout

* onDraw/dispatchDraw

#### 事件分发
*　dispatchTouchEvent
* onInterceptTouchEvent　拦截事件
* onTouchEvent事件被消费掉

#### 监听

* onTouch
* onClick
* onTouchEvent

#### 工具

* GestureDetector
* VelocityTracker
* ViewConfiguration

## 进程

### 异步

#### 原生异步

* Handler
* Looper
* MessageQueue
* HandlerThread

#### Timer

#### Thread

#### AsyncTask

#### IntentService

#### ThreadPoolExector

### 事件

#### 回调

#### 观察者
#### 事件总线

* EventBus
* RxJava

### 进程优先级

* 前台程序
* 可见程序
* 服务程序
* 后台程序
* 空程序

### IPC


#### Binder
#### Messageer
#### AIDL
#### BroadcastReceiver
#### ContentProvider
#### 数据持久化


###　应用保活

#### 白色保活 -　启动前台service
#### 黑色保活 -　广播互相唤醒
#### 灰色保活 -　系统漏洞

## UI

### 组件

#### 布局
* RelativeLayout
* LinearLayout
...
#### Fragment
#### ViewPager
#### ListView
#### WindowManager
#### Support Libray

#### Toast

#### Dialog

#### Notification

### Animation

### Resource

#### Drawable
#### mipmap

## 网络

### Http

### Socket

## 推送

## 数据

### 本地存储
### 序列号

* Serializable
* Parcelable

### 缓存

#### 三级缓存

* 内存
* 文件
* 网络

## 延迟

## Runtime
### Dalvik/ART
### ANR
### Force Close

## 内存

### 内存泄露

### OOM
* 原理
* 避免


## JNI/NDK

## 安全

### 安全机制
* 进程沙箱
* 应用签名
* 进程通讯
* 访问控制
* 权限声明
* 内存管理

### 混淆
### 反编译
### arm汇编

## Framework

### init
### zygote
### 服务
#### 系统服务
* java系统服务
* 本地系统服务
#### 应用服务
* 本地服务
* 远程服务

## 开发框架

### MVC

### MVP

### MVVM












