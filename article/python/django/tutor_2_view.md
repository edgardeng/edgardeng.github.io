# Django中的视图
> 一个视图函数，简称视图，是一个简单的 Python 函数, 接受 Web 请求并且返回 Web 响应。

1. 响应可以是一个 HTML 页面、一个 404 错误页面、重定向页面、XML 文档、或者一张图片

2. 每个视图函数都负责返回一个 HttpResponse 对象，对象中包含生成的响应。

3. 视图层中有两个重要的对象：请求对象(request)与响应对象(HttpResponse)。

视图有2种:

* FBV（function base views） 基于函数的视图，就是在视图里使用函数处理请求。

* CBV（class base views） 基于类的视图，就是在视图里使用类处理请求。

## 视图的使用

在 `polls/views.py`中添加视图函数 
```python
def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)
```

在 `polls/urls.py`中添加路由调用

```python
from django.urls import path
from . import views

urlpatterns = [
    # ex: /polls/
    path('', views.index, name='index'),
    # ex: /polls/5/
    path('<int:question_id>/', views.detail, name='detail'),
    # ex: /polls/5/results/
    path('<int:question_id>/results/', views.results, name='results'),
    # ex: /polls/5/vote/
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
```
当用户请求“/polls/34/”， Django加载应用路由后，通过路由规则匹配到 'polls/'。
将参数'34/'匹配给'<int:question_id>/',从而调用detial视图函数，`detail(request=<HttpRequest object>, question_id=34)`
 

##  请求对象: HttpRequest
> Django 规定了，视图函数至少有一个参数，第一个参数必须是 request，request 是 HttpRequest 请求类型的对象，它携带了浏览器的请求信息

### HttpRequest的属性

#### 1、GET
> 数据类型是 QueryDict，一个类似于字典的对象，包含 HTTP GET 的所有参数。

> 有相同的键，就把所有的值放到对应的列表里。

```python
def handle_view(request):
    name = request.GET.get("name")
    return HttpResponse('姓名：{}'.format(name))
```

* get()：返回字符串，如果该键对应有多个值，取出该键的最后一个值。

#### 2、POST
> 数据类型是 QueryDict，一个类似于字典的对象，包含 HTTP POST 的所有参数。

常用于 form 表单，form 表单里的标签 name 属性对应参数的键，value 属性对应参数的值。

```python
def handle_view(request):
    name = request.POST.get("name")
    return HttpResponse('姓名：{}'.format(name))
```

* get()：返回字符串，如果该键对应有多个值，取出该键的最后一个值。

#### 3、body
> 数据类型是二进制字节流，是原生请求体里的参数内容，在 HTTP 中用于 POST，因为 GET 没有请求体。

在 HTTP 中不常用，而在处理非 HTTP 形式的报文时非常有用，例如：二进制图片、XML、Json 等。

```python
def handle_view(request):
    name = request.body
    return HttpResponse(name)
```

#### 4、path

> 获取 URL 中的路径部分，数据类型是字符串。

```python
def handle_view(request):
    p = request.path
    return HttpResponse("路径："+ str(p))
```

#### 5、method
获取当前请求的方式，数据类型是字符串，且结果为大写。

```python
def handle_view(request):
    m = request.method
    return HttpResponse("method："+ str(m))
```

## 类视图
> 基于类的视图，就是使用了类来处理用户的请求，不同的请求我们可以在类中使用不同方法来处理，这样大大的提高了代码的可读性。

### 类试图的使用

1. 类视图 `views.py `

```python
from django.shortcuts import render,HttpResponse
from django.views import View

class User(View):
    def get(self,request):
        return HttpResponse("GET 方法")
    def post(self,request):
        user = request.POST.get("user")
        return HttpResponse("POST OK") if user == "test" else HttpResponse("POST Fail")
```

2. 路由配置 `urls.py`  

```python
urlpatterns = [
    path("user/", views.User.as_view()),
]
```
### 类试图的原理解析

#### 父类 View 原理：
1. 通过父类 View 提供的一个静态方法 as_view() ，as_view 方法是基于类的外部接口， 返回一个视图函数
2. 执行对应请求的方法前会优先执行 dispatch 方法(在get/post/put...方法前执行)，
3. dispatch()方法会根据请求的不同调用相应的方法来处理。