<!-- 2020-09-20 09:00 -->
## Gunicorn
> Gunicorn `Green Unicorn` 是一个 UNIX 下的 WSGI HTTP 服务器, 是一个 移植自 Ruby 的 Unicorn 项目的 pre-fork worker 模型. 其高并发性能极大提升服务器请求负载。python自带的有个web服务器，叫做wsgiref

在管理 worker 上，使用了 pre-fork 模型，即一个 master 进程管理多个 worker 进程，所有请求和响应均由 Worker 处理。Master 进程是一个简单的 loop, 监听 worker 不同进程信号并且作出响应。比如接受到 TTIN 提升 worker 数量，TTOU 降低运行 Worker 数量。如果 worker 挂了，发出 CHLD, 则重启失败的 worker, 同步的 Worker 一次处理一个请求

Gunicorn的优势在于，它使用了pre-fork worker模式，gunicorn在启动时，会在主进程中预先fork出指定数量的worker进程来处理请求，gunicorn依靠操作系统来提供负载均衡

推进的worker数量是 (2*$num_cores)+1

python是单线程的语言，当进程阻塞时，后续请求将排队处理。


### gunicorn安装

由于Windows上不支持gunicorn,故以下代码在Linux下执行有效

```
pip install gunicorn  # 前提是安装好python
gunicorn -h # 代表gunicorn执行成功!

```

### 使用gunicorn启动python

1. 编写flask代码 flask-gunicorn.py

```
from flask import Flask
from flask_script import Manager

app = Flask(__name__)
manager = Manager(app)

@app.route("/")
def index():
    return "<h1>Hello world<h1>"


if __name__ == '__main__':
    manager.run()
```
2 . 使用gunicorn监听请求， `gunicorn -w 2 -b 127.0.0.1:4000 flask-gunicorn:app`

#### gunicorn相关参数

1) -c CONFIG,–config=CONFIG             指定一个配置文件（py文件）
2) -b BIND,–bind=BIND                   与指定socket进行板顶
3) -D,–daemon                           后台进程方式运行gunicorn进程
4) -w WORKERS,–workers=WORKERS          工作进程的数量
5) -k WORKERCLASS,–worker-class=WORKERCLASS     工作进程类型，包括sync（默认）,eventlet,gevent,tornado,gthread,gaiohttp
6) –backlog INT                                 最大挂起的连接数
7) –log-level LEVEL                             日志输出等级
8) –access-logfile FILE                         访问日志输出文件
9) –error-logfile FILE                          错误日志输出文件


* workers模式
   > 每个worker都是一个加载python应用程序的UNIX进程 worker之间没有共享内存

   > 建议workers 数量是 (2*CPU) + 1

* 多线程模式

gunicorn 还允许每个worker拥有多个线程

在这种模式下，每个worker都会加载一次，同一个worker生成的每个线程共享相同的内存空间

使用threads模式，每一次使用threads模式，worker类就会是gthread

`gunicorn -w 5 --threads=2  main:app`

最大的并发请求就是worker * 线程 ， 也就是10

建议最大并发数 是(2*CPU) +1

* 伪线程 gevent (协程)

    `gunicorn --worker-class=gevent --worker-connections=1000 -w 3 main:app`

    work-connections 是对gevent worker类的特殊设置

    建议workers数量 仍然是 (2*CPU) + 1

    在这种情况下，最大的并发请求数 是3000（3个worker * 1000连接/worker)

##### 建议

* IO 受限 -建议使用gevent或者asyncio

* CPU受限 -建议增加workers数量

* 不确定内存占用? -建议使用gthread

* 不知道怎么选择？ -建议增加workers数量


#### gunicorn参数配置文件

> 使用 -c CONFIG,–config=CONFIG 指定一个配置文件（py文件）

>下面举列说明配置文件的写法，gunicorn.conf.py
```
bind = "127.0.0.1:8000"
workers = 2
```

运行以下命令: `gunicorn -c gunicorn.conf.py flask-gunicorn:app`
 
###  gunicorn并发比flask好的原因

* flask 代码的时候可以看到这个 WebServer 的名称也叫做 run_simple

```
from werkzeug.serving import run_simple
    run_simple('localhost', 5000, application, use_reloader=True)
```

1. 单 Worker

    > 只有一个进程在跑所有的请求，由于实现简陋性，内置 webserver 很容易卡死。

    > 并且只有一个 Worker 在跑请求。在多核 CPU 下，仅仅占用一核

2. 缺乏 Worker 的管理

    > 加入负载量上来了，Gunicorn 可以调节 Worker 的数量

    > flask内置的 Webserver 是不适合做这种事情的 

### gunicorn 几种 worker 性能测试比较
1.Gunicorn目前自带支持几种工作方式:

* sync (默认值) 
* eventlet 
* gevent 
* tornado

2.安装测试模块

```
gunicorn==19.7.1
flask==1.1.1
flask-redis==0.4.0
gevent==1.2.2
tornado==4.5.3
eventlet==0.25.1
```



5.测试结果

| Worker class | Time taken for tests | Complete requests | Failed requests | Requests per second | 用户平均请求等待时间 | 服务器平均处理时间 | 最小连接时间 | 平均连接时间 | 50%的连接时间 | 最大连接时间 |
| :----------- | -------------------: | :---------------: | :-------------: | :-----------------: | :------------------: | :----------------: | :----------: | :----------: | :-----------: | :----------: | 
| sync | 43.362s | 49719 | 157 | 1146.61 | 436.069ms | 0.872ms | 12ms | 55ms | 25ms | 33574ms | 
| gevent | 13.062s | 50000 | 0 | 3827.96 | 130.618ms | 0.261ms | 3ms | 129ms | 96ms | 1477ms |
| tornado | 27.925s | 50000 | 17 | 1790.50 | 279.252ms | 0.559ms | 16ms | 146ms | 27850ms | 53547ms |
| eventlet | 12.601s | 50000 | 0 | 3967.88 | 126.012ms | 0.252ms | 9ms | 125ms | 1377ms | 3123ms |

eventlet 和gevent两种方式效果最好，数据基本差不多.

 

