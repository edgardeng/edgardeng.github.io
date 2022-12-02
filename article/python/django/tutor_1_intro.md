# Django的介绍

Django：Python 界最全能的 web 开发框架，各种功能完备，可维护性和开发速度很好。

## 特点

### 优点

 * 大和全（重量级框架）

* 自带orm，template，view

* 需要的功能也可以去找第三方的app

 * 注重高效开发

 * 全自动化的管理后台（只需要使用起ORM，做简单的定义，就能自动生成数据库结构，全功能的管理后台）

 * session功能

### 缺点：

 * template不怎么好用 

 * 数据库用nosql不方便 

 * 如果功能不多，容易臃肿

## 如何创建一个Django项目

### 1. 创建项目

```
cd project
pyenv activate django / conda activate env_django 激活你的虚拟环境
django-admin startproject helloworld # 创建一个helloworld项目
```

### 2. 项目结构

```
|__ /helloworld
    |__ /helloworld      # 项目目录
        ｜__ __init__.py     # 包标志
        ｜__ asgi.py         # django3.0的新特性是ASGI
        ｜__ settings.py     # wsgi接口
        ｜__ urls.py         # 路由配置文件
        ｜__ wsgi.py         # wsgi接口
    |__ manage.py            # 项目管理命令
```

manage.py 是Django用于管理项目的命令行工具 

### 3. 项目配置文件
> settings.py 文件
 
* BASE_DIR 根路径
* SECRET_KEY 随机码
* DEBUG = True
* ALLOWED_HOSTS = ['*']  运行访问的IP
* INSTALLED_APPS Application definition 安装/注册应用
* MIDDLEWARE 中间件
* ROOT_URLCONF = 'helloworld.urls' 根路由
* TEMPLATES = 模版配置
* WSGI_APPLICATION = 'helloworld.wsgi.application'
* DATABASES 数据库配置
* AUTH_PASSWORD_VALIDATORS 
* LANGUAGE_CODE = 'en-us' # zh-hans  语言
* TIME_ZONE = 'UTC' # Asia/Shanghai
* USE_I18N = True
* USE_L10N = True
* USE_TZ = True # False 不实用世界时间， 数据库存储时间和当地时间一直
* STATIC_URL = '/static/'
* STATICFILES_DIRS = [ os.path.join(BASE_DIR, 'static')]

###  4. 建立应用

执行 `python manage.py startapp app`

#### 查看应用目录接口

```
|__ /app
    |__ /migrations      # 项目目录
    ｜__ __init__.py     # 包标志
    ｜__ admin.py
    ｜__ apps.py
    ｜__ migrations
    ｜__ models.py
    ｜__ tests.py
    ｜__ views.py
```
### 5. 视图函数

在`app/views.py`编写视图函数
```python
from django.http import HttpResponse
def index(request):
    return HttpResponse("Hello, world. You're at the app index.")
```
 
### 6. 路由

先在应用`app.urls.py`添加路由

```python
from django.urls import path
from . import views
urlpatterns = [
  path('', views.index, name='index'),
]
```

然后在项目中  `hellowrod/urls.py`, 添加路由

```python
from django.contrib import admin
from django.urls import path, include
urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('app.urls'))
]
```

* 使用 path， 配置路径和对应的路径方法
* 使用include， 配置子路由
* 子路由 `app/urls.py` 和根目录的配置方法项目，但不要使用'/',即使用相对路径

> urlpatterns列表定义了URL和视图方法之间的映射。  映射是URL模式中的path对象


#### path对象

* 模式串
* 视图函数
* kwargs： 可选参数 额外传递的参数
* 名称（name）： 给路由命令（使用name进行反向解析， 由name获取用户请求路径）

> 可以使用re_path对象来进行正则匹配

#### 路径的模式串

path中的模式串，（一个普通字符串）， 用来匹配路由

**Django检测 不能使用 '/' 开头**

带参数的通配符：

* `path('hello/<name>/', views.hello)`
* `path('show/<name>/<int:age>', views.show)`
* `re_path(r'show/(\w+)/$', views.show)`


参数有以下类型：
* str： 默认字符串类型， 匹配除/和空字符串外的其他字符串
* int： 匹配 0 和正整数
* slug： 匹配由数字，字母和_组成的字符串
* path： 匹配任何非空字符串， 包括'/'

在re_path中，（）部分是正则的组，django在配置时，自动把匹配成功的内容，作为参数传递给视图函数


### 7. 启动服务
站点运行 `python manage.py runserver`
  `python manage.py runserver 0.0.0.0:9000`

### 视图函数
* 第1参数是：HttpRequest
* 返回 HttpResponse
  作用：
    * 响应模版
    * 重定向
    * 响应字符串
    * 错误模版

#### HttpRequest
> HttpRequest 是从web服务器传递过来的请求对象，经过Django框架封装产生的，封装了原始的http请求

* 服务器接受http请求后，Django会根据环境变量创建 HttpRequest对象
* Django.http 定义了HttpRequest
* 使用不同属性值，获取请求中的多种信息

**常用属性**

接收的request有如下属性：

* path：一个字符串，表示请求的页面的完整路径，不包含域名。
* method：一个字符串，表示请求使用的HTTP方法，常用值包括：'GET'、'POST'。
  在浏览器中给出地址发出请求采用get方式，如超链接。
  在浏览器中点击表单的提交按钮发起请求，如果表单的method设置为post则为post请求。
* encoding：一个字符串，表示提交的数据的编码方式。
  如果为None则表示使用浏览器的默认设置，一般为utf-8。
  这个属性是可写的，可以通过修改它来修改访问表单数据使用的编码，接下来对属性的任何访问将使用新的encoding值。
* GET：一个类似于字典的对象，包含get请求方式的所有参数。
* POST：一个类似于字典的对象，包含post请求方式的所有参数。
* FILES：一个类似于字典的对象，包含所有的上传文件。
* COOKIES：一个标准的Python字典，包含所有的cookie，键和值都为字符串。
* session：一个既可读又可写的类似于字典的对象，表示当前的会话，只有当Django 启用会话的支持时才可用，详细内容见"状态保持"。

Django将所有http header（包括你自定义的http header）都放在了HttpRequest.META:
> request.META.get('HTTP_CATEGORY', 'unkown')

* CONTENT_LENGTH – the length of the request body (as a string).
* CONTENT_TYPE – the MIME type of the request body.

* HTTP_ACCEPT_ENCODING – Acceptable encodings for the response.

* HTTP_ACCEPT_LANGUAGE – Acceptable languages for the response.

* HTTP_HOST – The HTTP Host header sent by the client.

* HTTP_REFERER – The referring page, if any.

* HTTP_USER_AGENT – The client’s user-agent string.

* QUERY_STRING – The query string, as a single (unparsed) string.

* REMOTE_ADDR – The IP address of the client.

* REMOTE_HOST – The hostname of the client.

* REMOTE_USER – The user authenticated by the Web server, if any.

* REQUEST_METHOD – A string such as "GET" or "POST".

* SERVER_NAME – The hostname of the server.

* SERVER_PORT – The port of the server (as a string).

#### HttpResponse

#### JsonResponse

### 重定向

` return HttpResponseRedirect('/user/') ` 或者 `return redirect('/user/') `

> HttpResponseRedirect 是 HttpResponse的子类


### 错误视图
常用的错误（django.views.defaults包下）
* 403错误： permission_denied 权限拒绝
* 404错误： page_not_found 文件找不到
* 500错误： server_error 系统错误

> 关闭或debug 才会显示标准的错误页面


## 模版

可以使用2中模版引擎
* Django 模版
* jinja2 模版

修改步骤
1. 在settings.py 配置文件中修改 ` TEMPLATES = [ { 'DIRS': [BASE_DIR / 'templates'], }]

2. 在 templates 文件夹下添加index.html文件

```
<html>
<head>
  <title> {{ title }}</title>
</head>
<body>
<h2> Hello {{ name }}</h2>
</body>
</html>
```

3. 修改视图文件 `def home(request): return render(request, 'index.html', context={'title': 'Django', 'name': 'World'})`

4. runserver 运行测试

## 数据模型

1. 在models.py文件中定义数据模型
```
class User(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=128)

    class Meta:
        db_table = 'user'  # 指定表名
```

2. 使用命令做生成迁移文件 `python manage.py makemigrations`

3. 使用命令做迁移数据 `python manage.py migrate`

4. 使用sqlite3 工具添加数据

5. 路径方法上，获取数据 ` users = User.objects.all() `

6. 在模版上显示数据

```
<ul>
  {%  for user in users %}
  <li> {{ user.username }}</li>
  {% endfor %}
</ul>
```


## 关于Django3

django3.0的三个重要特性是
* ASGI、
* 支持MariaDB10.1+
* 自定义枚举类型（TextChoices，IntegerChoices）。
> 相关信息大家可以查阅官方资料。https://www.djangoproject.com/weblog/2019/dec/02/django-3-released/


### ASGI

在django3.0之前django的Web服务器网关接口一直用的是WSGI

ASGI的A就是Async，也就是异步的意思，ASGI简单的来说就是异步的WSGI。

目录里比之前的django2多出了一个asgi.py文件，这就是之前我们所说的ASGI组件。

**用Uvicorn来启动ASGI组件**


ASGI服务器组件，我们有两种应用服务器可以来启动它，一种是用Uvicorn，Uvicorn是基于uvloop和httptools的ASGI服务器，它理论上是Python中最高性能的框架了。另一种是Daphne，Daphne是Django软件基金会开发的一个基于ASGI (HTTP/WebSocket)的服务器。

1. 先安装Uvicorn。 ` pip install uvicorn `

2. 来启动我们的项目 ` uvicorn django_cn.asgi:application `

> 注意:django_cn为我们的项目名称。


**用Daphne来启动ASGI组件**

1. 安装Daphne ` pip install daphne `

2.  启动项目 ` daphne djang_cn.asgi:application `


