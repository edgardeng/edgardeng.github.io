# Django的路由
> 路由简单的来说就是根据用户请求的 URL 链接来判断对应的处理程序，并返回处理结果， 也就是 URL 与 Django 的视图建立映射关系。

1. Django 路由在 urls.py 配置，urls.py 中的每一条配置对应相应的处理方法
2. Django 不同版本 urls.py 配置有点不一样

## Django 如何处理一个请求 

当一个用户请求 Django 站点的一个页面，下面是 Django 系统决定的执行算法：

1. Django 确定使用根 URLconf 模块。通常，这是 ROOT_URLCONF 设置的值，但如果传入 HttpRequest 对象拥有 urlconf 属性（通过中间件设置），它的值将被用来代替 ROOT_URLCONF 设置。
2. Django 加载该 Python 模块并寻找可用的 urlpatterns 。它是 django.urls.path() 和(或) django.urls.re_path() 实例的序列(sequence)。
3. Django 会按顺序遍历每个 URL 模式，然后会在所请求的URL匹配到第一个模式后停止，并与 path_info 匹配。
4. 一旦有 URL 匹配成功，Djagno 导入并调用相关的视图，视图会获得如下参数：
    * 一个 HttpRequest 实例。
    * 如果匹配的 URL 包含未命名组，那么来自正则表达式中的匹配项将作为位置参数提供。
    * 关键字参数由路径表达式匹配的任何命名部分组成，并由 django.urls.path() 或 django.urls.re_path() 的可选 kwargs 参数中指定的任何参数覆盖。
5. 如果没有 URL 被匹配，或者匹配过程中出现了异常，Django 会调用一个适当的错误处理视图。参加下面的错误处理( Error handling )。

## URLconf

### path 字符路由
> path(route, view, kwargs=None, name=None) 返回一个元素，以便包含在 urlpatterns 中
 
```python
from django.urls import include, path

urlpatterns = [
    path('index/', views.index, name='main-view'),
    path('bio/<username>/', views.bio, name='bio'),
    path('articles/<slug:title>/', views.article, name='article-detail'),
    path('articles/<slug:title>/<int:section>/', views.section, name='article-section'),
    path('blog/', include('blog.urls')),
    ...
]
```

### re_path 正则路由
> re_path(route, view, kwargs=None, name=None) 返回一个元素，以便包含在 urlpatterns 中
>
```python
from django.urls import include, re_path

urlpatterns = [
    re_path(r'^index/$', views.index, name='index'),
    re_path(r'^bio/(?P<username>\w+)/$', views.bio, name='bio'),
    re_path(r'^blog/', include('blog.urls')),
]
```
 
备注：
 > 1. 正则路径中的无名分组 按位置传参，一一对应
 > 2. views 中除了 request，其他形参的数量要与 urls 中的分组数量一致。
 > 3. 正则路径中的有名分组 (?P<组名>正则表达式)，按关键字传参，与位置顺序无关。


### include 路由分发
> 1. 使用路由分发（include），让每个app目录都单独拥有自己的 urls
> 2. 接收一个完整的 Python 导入路径到另一个应该被 “包含” 在这里的 URLconf 模块

* include(module, namespace=None)¶
* include(pattern_list)
* include((pattern_list, app_namespace), namespace=None)

参数:
 * module -- URLconf 模块（或模块名称）
 * namespace (str) -- 包含的 URL 条目的实例命名空间。
 * pattern_list -- 可迭代的 path() 和／或 re_path() 实例。
 * app_namespace (str) -- 被包含的 URL 条目的应用命名空间

```python
from django.contrib import admin
from django.urls import path,include # 从 django.urls 引入 include
urlpatterns = [
    path('admin/', admin.site.urls),
    path("app01/", include("app01.urls")),
    path("app02/", include("app02.urls")),
]
```

### static 
> static.static(prefix, view=django.views.static.serve, **kwargs) 返回在调试模式下服务文件的 URL 模式的辅助函数

```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
# ... the rest of your URLconf goes here ...
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
```

## 反向解析

随着功能的增加，路由层的 url 发生变化，就需要去更改对应的视图层和模板层的 url。

当路由层 url 发生改变，在视图层和模板层动态反向解析出更改后的 url，免去修改的操作。

反向解析一般用在模板中的超链接及视图中的重定向。

#### 普通路径下的反向解析

 1. 在 urls.py 中给路由起别名  `path("login1/", views.login, name="login")`

 2. 在 views.py 中，从 django.urls 中引入 reverse，利用 reverse("路由别名") 反向解析: `return redirect(reverse("login"))`

 3. 在模板 templates 中的 HTML 文件中，利用 {% url "路由别名" %} 反向解析。 `<form action="{% url 'login' %}" method="post"> `

#### 正则路径（无名分组）下的反向解析

 1. 在 urls.py 中给路由起别名，`re_path(r"^login/([0-9]{2})/$", views.login, name="login")`

 2. 在 views.py 中，从 django.urls 中，利用 reverse("路由别名"，args=(符合正则匹配的参数,)) 反向解析。`return redirect(reverse("login",args=(10,)))`

 3. 在模板 templates 中的 HTML 文件中利用 {% url "路由别名" 符合正则匹配的参数 %} 反向解析。`<form action="{% url 'login' 10 %}" method="post"> `

#### 正则路径（有名分组）下的反向解析
 1. 在 urls.py 中给路由起别名， `re_path(r"^login/(?P<year>[0-9]{4})/$", views.login, name="login")`
 2. 在 views.py 中，从 django.urls 中利用 reverse("路由别名"，kwargs={"分组名":符合正则匹配的参数}) 反向解析。`return redirect(reverse("login",kwargs={"year":3333}))`
 3. 在模板 templates 中的 HTML 文件中，利用 {% url "路由别名" 分组名=符合正则匹配的参数 %} 反向解析。

`<form action="{% url 'login' year=3333 %}" method="post">`


### 命名空间

命名空间（英语：Namespace）是表示标识符的可见范围。

一个标识符可在多个命名空间中定义，它在不同命名空间中的含义是互不相干的。

一个新的命名空间中可定义任何标识符，它们不会与任何重复的标识符发生冲突，因为重复的定义都处于其它命名空间中。

存在问题：路由别名 name 没有作用域，Django 在反向解析 URL 时，会在项目全局顺序搜索，当查找到第一个路由别名 name 指定 URL 时，立即返回。

当在不同的 app 目录下的urls 中定义相同的路由别名 name 时，可能会导致 URL 反向解析错误。

Namespace的使用：

1. 定义命名空间（include 里面是一个元组）格式如下： `include(("app名称：urls"，"app名称"))` ，如： `path("app01/", include(("app01.urls","app01"))) `

2. 在 app01/urls.py 中起相同的路由别名。`path("login/", views.login, name="login")`

3. 在 views.py 中使用名称空间，语法格式如下： `reverse("app名称：路由别名")` / `return redirect(reverse("app01:login")`

4. 在 templates 模板的 HTML 文件中使用名称空间，语法格式如下： `{% url "app名称：路由别名" %}` / `<form action="{% url 'app01:login' %}" method="post">`


## 静态文件管理

### [配置静态文件](https://docs.djangoproject.com/en/4.1/howto/static-files/)
 1. 确保 INSTALLED_APPS 包含了 django.contrib.staticfiles。
 2. 在配置文件`settings.py`中，定义 STATIC_URL，例子: `STATIC_URL = 'static/'`
 3. 在模板中，用 static 模板标签基于配置 STATICFILES_STORAGE 位给定的相对路径构建 URL。
    `{% load static %}
    <img src="{% static 'my_app/example.jpg' %}" alt="My image">`
 4. 将你的静态文件保存至 static 目录中。例如 my_app/static/my_app/example.jpg。
 5. 除了使用 static/ 目录，可以在配置文件中定义一个目录列表 (STATICFILES_DIRS) ，Django 会从中寻找静态文件。
   `STATICFILES_DIRS = [
    BASE_DIR / "static",
    '/var/www/static/',
    ]`