# Django中的响应
> 当服务器接收到客户端发送过来的请求后，Django会将提交上来的数据封装成httpRequest对象,传给视图函数。
> 处理完相关逻辑后，需要返回一个响应给浏览器。这个响应必须返回HttpResponseBase或者他的子类的对象

## HttpResponseBase 类

 1. HttpResponseBase是Http响应的基类，不处理任务内容
 2. 不能直接使用
 3. 默认状态码是200 

 
## 常用的响应

### HttpResponse 

```python
    from django.http import HttpResponse
    def handle_view(request):
        # return HttpResponse("Hello World")
        return HttpResponse("<a href='https://www.baidu.com/'>Hello World</a>")
    # HttpResponse(content='响应体', content_type='响应体数据类型默认为text/html', status='状态码，默认为200')
```

### JsonResponse：响应JSON
 1. 继承自HttpResponse
 1. 响应的数据转换为JSON字符串
 2. 响应头Content-Type为 application/json 

```python
def index(request):
    dict_data = { 'name': 'lx', 'age': 100}
    return JsonResponse(dict_data) 
```

### HttpResponseRedirect 或 redirect 重定向
 
1. 重定向，跳转新页面 
2. redirect()：。参数为字符串，字符串中填写页面路径。一般用于 form 表单提交后，跳转到新页面。
3. redirect：底层继承的是 HttpResponse 对象

```python
def handle_view(request):
    return redirect("/index/")
```

#### 反向解析
1. 重定向的地址可能会在某次版本更新迭代的时候被修改，如果很多地方都用到了这个地址，那么是不是这些地方都要做修改？
2. 路由反向解析 是使用路由的别名，动态的解析出该路由中的真实地址

在项目根路由的配置中
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    # 这里的namespace是可以使用任意的名字，但是为了易于理解可以使用子应用的名字
    # 如果定义了namespace，那么一定要定义app_name 不然会报错
    path('', include(('pratice_1.urls',"pratice_1"),namespace="pratice_1"))
]  
```
在视图函数中
```python
from django.shortcuts import redirect, render,reverse
def handle_view(request):       #总路由别名:子路由别名
    redirect_url = reverse('demo:index')
    return redirect(redirect_url)
```

### render 模板渲染
1.  render(): 返回文本，第一个参数为 request，第二个参数为字符串（页面名称），第三个参数为字典（可选参数，向页面传递的参数：键为页面参数名，值为views参数名）。
2. render：底层返回的也是 HttpResponse 对象

```python
def index(request):
    return render(request,"index.html",{"name": "Hello World"})
```

### 错误响应

|响应类|错误码|说明|父类|
|-----|-----|-----|-----|
|Http404 或get_object_or_404 |404|页面找不到|Exception|
|HttpResponseNotFound  |404|页面找不到|HttpResponse|
|HttpResponseServerError     |500|系统错误|HttpResponse|
|HttpResponseGone     |410|系统错误|HttpResponse|
|HttpResponseForbidden     |403|未授权|HttpResponse|
|HttpResponseNotAllowed     |405|权限不足|HttpResponse|
|HttpResponseBadRequest     |400|请求错误|HttpResponse|
