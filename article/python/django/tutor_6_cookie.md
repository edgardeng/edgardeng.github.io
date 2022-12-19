# Django中的Cookie和Session


## Cookies
> Cookie 是存储在客户端计算机上的文本文件，并保留了各种跟踪信息

1. HTTP 是一种"无状态"协议，这意味着每次客户端检索网页时，客户端打开一个单独的连接到 Web 服务器，服务器会自动不保留之前客户端请求的任何记录。
2. 一个 Web 服务器可以分配一个唯一的 session 会话 ID 作为每个 Web 客户端的 cookie，对于客户端的后续请求可以使用接收到的 cookie 来识别。
3. 在Web开发中，使用 session 来完成会话跟踪，session 底层依赖 Cookie 技术
4. Cookie保存在客户端，注意不要保存敏感信息

### Cookie的用法

设置 cookie:

* `rep.set_cookie(key,value,...)`
* `rep.set_signed_cookie(key,value,salt='加密盐',...)`

获取 cookie:
* `HttpRequest.COOKIE.get(key)`
* `HttpRequest.get_signed_cookie(key)`

删除 cookie:
* rep =HttpResponse || render || redirect
`rep.delete_cookie(key,path,domain)`

示例

```python
def login(request):
    if request.method == "GET":
        return render(request, "login.html")
    username = request.POST.get("username")
    password = request.POST.get("pwd")

    user_obj = models.UserInfo.objects.filter(username=username, password=password).first()
    print(user_obj.username)

    if not user_obj:
        return redirect("/login/")
    else:
        rep = redirect("/index/")
        rep.set_cookie("is_login", True)
        return rep
       
def index(request):
    print(request.COOKIES.get('is_login'))
    status = request.COOKIES.get('is_login') # 收到浏览器的再次请求,判断浏览器携带的cookie是不是登录成功的时候响应的 cookie
    if not status:
        return redirect('/login/')
    return render(request, "index.html")


def logout(request):
    rep = redirect('/login/')
    rep.delete_cookie("is_login")
    return rep # 点击注销后执行,删除cookie,不再保存用户状态，并弹到登录页面
   
def order(request):
    print(request.COOKIES.get('is_login'))
    status = request.COOKIES.get('is_login')
    if not status:
        return redirect('/login/')
    return render(request, "order.html")
```

## Session

工作原理
1. 浏览器第一次请求获取登录页面 login。
2. 浏览器输入账号密码第二次请求，若输入正确，服务器响应浏览器一个 index 页面和一个键为 sessionid，值为随机字符串的 cookie，即 set_cookie ("sessionid",随机字符串)。
3. 服务器内部在 django.session 表中记录一条数据。

   django.session 表中有三个字段
    * session_key：存的是随机字符串，即响应给浏览器的 cookie 的 sessionid 键对应的值。
    * session_data：存的是用户的信息，即多个 request.session["key"]=value，且是密文。
    * expire_date：存的是该条记录的过期时间（默认14天）

4. 浏览器第三次请求其他资源时，携带 cookie :{sessionid:随机字符串}，服务器从 django.session 表中根据该随机字符串取出该用户的数据，供其使用（即保存状态）

> 注意: django.session 表中保存的是浏览器的信息，而不是每一个用户的信息。 因此， 同一浏览器多个用户请求只保存一条记录（后面覆盖前面）,多个浏览器请求才保存多条记录

> cookie 弥补了 http 无状态的不足，让服务器知道来的人是"谁"，但是 cookie 以文本的形式保存在浏览器端，安全性较差，且最大只支持 4096 字节，所以只通过 cookie 识别不同的用户，然后，在对应的 session 里保存私密的信息以及超过 4096 字节的文本


### Session的配置
1. 在Settings.py中配置

```
NSTALLED_APPS = [
    'django.contrib.sessions',
]

MIDDLEWARE = [
    'django.contrib.sessions.middleware.SessionMiddleware',
]

```
2. 数据迁移，生成session使用的数据库 ``

### Session的使用

* session 设置： `request.session["key"] = value`
  1. 生成随机字符串
  2. 把随机字符串和设置的键值对保存到 django_session 表的 session_key 和 session_data 里
  3. 设置 cookie：set_cookie("sessionid",随机字符串) 响应给浏览器
    
* session 获取： `request.session.get('key')`
  1. 从 cookie 中获取 sessionid 键的值，即随机字符串。
  2. 根据随机字符串从 django_session 表过滤出记录。
  3. 取出 session_data 字段的数据
    
* session 删除
  1. `request.session.flush()` 删除整条记录（包括 session_key、session_data、expire_date 三个字段）：
  2. `del request.session["key"]` 删除 session_data 里的其中一组键值对： 
 

```python
def login(request):
    if request.method == "GET":
        return render(request, "login.html")
    username = request.POST.get("username")
    password = request.POST.get("pwd")

    user_obj = UserInfo.objects.filter(username=username, password=password).first()
    if not user_obj:
        return redirect("/session_login/")
    else:
        request.session['is_login'] = True
        request.session['user'] = username
        return redirect("/s_index/")

def s_index(request):
    status = request.session.get('is_login')
    if not status:
        return redirect('/session_login/')
    return render(request, "s_index.html")

def s_logout(request):
   # del request.session["is_login"] # 删除session_data里的一组键值对
    request.session.flush() # 删除一条记录包括(session_key session_data expire_date)三个字段
    return redirect('/session_login/')
```

## Django中的用户认证模块

Django 自带一个用户验证系统。它负责处理用户账号、组、权限和基于cookie的用户会话。[相关参考](https://docs.djangoproject.com/en/4.1/topics/auth/)

Django 用户认证（Auth）组件一般用在用户的登录注册上，用于判断当前的用户是否合法，并跳转到登陆成功或失败页面。


### 用户认证的配置

1. 在项目设置中配置应用 `INSTALLED_APPS  = ['django.contrib.auth','django.contrib.contenttypes']`
2. 在项目设置中配置中间件 `MIDDLEWARE   = ['django.contrib.sessions.middleware.SessionMiddleware ','django.contrib.auth.middleware.AuthenticationMiddlewareAuthenticationMiddleware ']`
3. 数据迁移，auth相关表

### 用户认证的使用

1. 命令行创建超级用户 `python manage.py createsuperuser --username=joe --email=joe@example.com`
   
2. 修改用户密码 `python manage.py changepassword *username* `

3. 用户对象的相关代码 

    * create()：创建一个普通用户，密码是明文的。
    * create_user()：创建一个普通用户，密码是密文的。
    * create_superuser()：创建一个超级用户，密码是密文的，要多传一个邮箱 email 参数。
        参数：
        * username: 用户名
        * password：密码
        * email：邮箱 (create_superuser 方法要多加一个 email)

```python
from django.contrib.auth.models import User 
User.objects.create(username='runboo',password='123')
User.objects.create_superuser(username='runboooo',password='123',email='runboo@163.com')
```

4. 用户验证 authenticate
```python
from django.contrib.auth import authenticate
user = authenticate(username='john', password='secret') # 如果验证成功，就返回用户对象，反之，返回 None。
```

5. 用户登录 login  `auth.login(request, user)`

6. 用户注销 logout  `auth.logout(request)` 清空 session 信息，将 request.user 赋值为匿名用户

7. 使用login_required装饰器
> 如果用户未登录，会重定向到settings.LOGIN_URL,
 
```python
from django.contrib.auth.decorators import login_required 
@login_required
def index(request):
  return HttpResponse("index页面。。。")
```

## CSRF_TOKEN跨站请求伪造

### 什么是csrf

CSRF（Cross-site request forgery）跨站请求伪造，也被称为“One Click Attack”或者Session Riding，通常缩写为CSRF或者XSRF，是一种对网站的恶意利用。尽管听起来像跨站脚本（XSS），但它与XSS非常不同，XSS利用站点内的信任用户，而CSRF则通过伪装来自受信任用户的请求来利用受信任的网站。与XSS攻击相比，CSRF攻击往往不大流行（因此对其进行防范的资源也相当稀少）和难以防范，所以被认为比XSS更具危险性

攻击者盗用了你的身份，以你的名义发送恶意请求，对服务器来说这个请求是完全合法的，但是却完成了攻击者所期望的一个操作，比如以你的名义发送邮件、发消息，盗取你的账号，添加系统管理员，甚至于购买商品、虚拟货币转账等。

### csrf攻击防范

1. 验证 HTTP Referer 字段
   > 根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，它记录了该 HTTP 请求的来源地址。
   > 只需要在最后给所有安全敏感的请求统一增加一个拦截器来检查 Referer 的值就可以. 使用验证 Referer 值的方法，就是把安全性都依赖于第三方（即浏览器）来保障，从理论上来讲，这样并不安全
   > 用户自己可以设置浏览器使其在发送请求时不再提供 Referer。当他们正常访问银行网站时，网站会因为请求没有 Referer 值而认为是 CSRF 攻击，拒绝合法用户的访问。

2. 在请求地址中添加 token 并验证
   > 通常使用的方法就是在每次页面加载时，使用 javascript 遍历整个 dom 树，对于 dom 中所有的 a 和 form 标签后加入 token。
   > 对于在页面加载之后动态生成的 html 代码，这种方法就没有作用，还需要程序员在编码时手动添加 token。
   该方法还有一个缺点是难以保证 token 本身的安全。 
   
3. 在 HTTP 头中自定义属性并验证
    > 把 token 放到 HTTP 头中自定义的属性里。通过 XMLHttpRequest 这个类，可以一次性给所有该类请求加上 csrftoken 这个 HTTP 头属性，并把 token 值放入其中。
   > 

### Django中的CSRF

1. 全站禁用：注释掉中间件 'django.middleware.csrf.CsrfViewMiddleware',

2. 局部禁用：用装饰器 
   在FBV中使用
   
```python
from django.views.decorators.csrf import csrf_exempt,csrf_protect
   # 不再检测，局部禁用（前提是全站使用）
   # @csrf_exempt
   # 检测，局部使用（前提是全站禁用）
   # @csrf_protect
   def csrf_token(request):#
       if request.method=='POST':
           print(request.POST)
           return HttpResponse('ok')
       return render(request,'csrf_token.html')#
```
在CBV中使用：
```python
 
   from django.views import View
   from django.views.decorators.csrf import csrf_exempt, csrf_protect
   from django.utils.decorators import method_decorator
   # CBV的csrf装饰器，只能加载类上（django的bug）
   # 给get方法使用csrf_token检测
   @method_decorator(csrf_exempt,name='get')，#不能直接放在函数上，可以放在分发函数dispatch上不需要指定名字，是什么请求就会分发到指定的函数上
   # 给post加
   @method_decorator(csrf_exempt,name='post')#
   # 给所有方法加
   @method_decorator(csrf_exempt)#
   class Foo(View):
       def get(self,request):#
           pass
       def post(self,request):#
           pass
```

## 图像验证码 django-simple-captcha

1. 安装 ` pip install  django-simple-captcha `
2. 添加应用 `INSTALLED_APPS = [ 'captcha', ]`
3. 数据迁移  python3 manager.py migrations 和 python3 manage.py migrate，生成captcha需要的数据库表。其中captcha_captchastore这张表保存的是图形验证码内容
4. 表单使用

```python
def some_view(request):
    if request.POST:
        form = CaptchaTestForm(request.POST)
        # Validate the form: the captcha field will automatically
        # check the input
        if form.is_valid():
            human = True
    else:
        form = CaptchaTestForm()
    return render(request, 'template.html', {'form': form})
```