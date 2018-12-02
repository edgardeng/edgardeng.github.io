# Flask-Login

> 在使用flask_login之前，了解flask怎么使用，设置配置启动

## 配置

1. 安装flask_login `pip install flask_login`

2. 在flask项目中配置flask_login
```python
app.config['SECRET_KEY']='secret'
login_manager = LoginManager()
login_manager.init_app(app)
```

3. 设置session及其验证

    1. 提供user_loader的回调函数，通过获取user对象存储到session中，自己实现最好启用缓存
    ```python
       @login_manager.user_loader
       def load_user(user_id):
           return User.get(user_id)
    ```

    2. 自定义的user类需要提供以下几个属性：

　　  * is_authenticated 属性，用来判断是否是已经授权了，如果通过授权就会返回true

　　  * is_active 属性，判断是否已经激活

　　  * is_anonymous 属性，判断是否是匿名用户

　　  * get_id() 方法，返回用户的唯一标识

这些属性和方法也可以直接继承于userMixin的默认方法和属性:
```python
class User(UserMixin,db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password= db.Column(db.String(128))

    def __init__(self,id,username,email):
        self.id = id
        self.username = username
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.username
```

## 例子

### 登陆操作

```python
@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        login_user(user)
        flask.flash('Logged in successfully.')
        next = flask.request.args.get('next')
        if not is_safe_url(next):
            return flask.abort(400)
        return flask.redirect(next or flask.url_for('index'))
return flask.render_template('login.html', form=form)
```

登陆的请求操作，通过用户查询，判断是否有权限，然后通过login_user(user)，其实也是调用user_loads()把用户设置到session中

next参数可能有安全问题而不能直接跳转，可以考虑使用is_safe_url去过滤

### 登陆判断

在视图中直接使用：
```python
{% if current_user.is_authenticated %}
  Hi {{ current_user.name }}!
{% endif %}

```

权限要求，通过@login_required 来装饰
```python
@app.route("/settings")
@login_required
def settings():
    pass
```

### 退出登陆，清除cookie和session
```python
@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(somewhere)

```

## 自定义登陆操作

### 未登录的默认操作
> 未登陆的用户访问了@login_required视图的操作，可能直接报401的错误

1. 设置登陆视图，用于未授权的跳转： `login_manager.login_view = 'users.login' `

2. 设置快闪消息，用于提示用户：`login_manager.login_message = 'Bonvolu ensaluti por uzi tiun paĝon.' `

3. 设置未登录跳转可以携带消息的路径 `login_manager.login_message_category = 'info' `

在一个用户页面，session过期，要跳转到登陆页面，那么会把当前的链接当参数存放到next里面传递到登陆请求中。
也可以设置USE_SESSION_FOR_NEXT =True 这样就把链接放session里面了；链接必须在info的路径下。

4. 自己定义未登录的处理引擎

```python
@login_manager.unauthorized_handler
def unauthorized():
    pass
    return a_response
```


## 定义客户端登陆

有时候你想要不使用cookies来登录用户，比如使用头部值或者作为查询参数传递的api键值。 
在这些情况下，您应该使用request_loader回调。 这个回调应该和你的user_loader回调一样，只是它接受Flask请求而不是user_id。

通过路径的参数或者请求头里携带的Authorzation消息进行验证用户：

```python
@login_manager.request_loader
def load_user_from_request(request):

　　# first, try to login using the api_key url arg
　　api_key = request.args.get('api_key')
　　if api_key:
　　  user = User.query.filter_by(api_key=api_key).first()
　　  if user:
　　  return user

    # next, try to login using Basic Auth
　　api_key = request.headers.get('Authorization')
　　if api_key:
　　  api_key = api_key.replace('Basic ', '', 1)
　　  try:
　　      api_key = base64.b64decode(api_key)
　　  except TypeError:
　　      pass
　　  user = User.query.filter_by(api_key=api_key).first()
　　  if user:
　　      return user
　　return None # finally, return None if both
```

## 匿名用户

默认是指没有登陆的用户，会设置一个AnonymousUserMixin对象到current_user里面,其属性和方法：
```
is_active=False
is_authenticated=False
is_active=False
is_anonymous=True
get_id() returns None
```
如果你的系统要求需要记住匿名用户的一些操作：`login_manager.anonymous_user = MyAnonymousUser`

## 记住我操作

默认情况下，当用户关闭浏览器时，Flask会话被删除，用户注销。 “记住我”可以防止用户在关闭浏览器时意外退出。

Flask-Login中只需将remember = True传递给login_user调用即可。

Cookie将被保存在用户的计算机上，如果不在会话中，Flask-Login将自动从该Cookie恢复用户ID。 
cookie到期前的时间可以通过REMEMBER_COOKIE_DURATION配置进行设置，也可以通过login_user进行设置。 
cookie是防篡改的，如果用户篡改它（即插入别人的用户ID代替他们自己的），cookie将仅仅被拒绝。

## 可选的令牌token
> 使用令牌token来代替存放用户信息到session里面,具有更多的灵活性。
```python
@login_manager.user_loader
def load_user(session_token):
    return User.query.filter_by(session_token=session_token).first()
```

如果使用token来验证，则你必须改user类的get_id方法：
```python
def get_id(self):
    return unicode(self.session_token)
````

当用户更改密码时，您可以自由地将用户的会话标记更改为新的随机生成的值。
会话令牌仍然必须唯一标识用户，可将其视为第二个用户标识。

## 刷新登陆

特殊场景：修改了用户的密码或个人信息，会要求你重新登陆，这里就设计session的清除然后重新加载等的问题。

### 配置参数
```python
login_manager.refresh_view = "accounts.reauthenticate"
login_manager.needs_refresh_message = ("To protect your account, please reauthenticate to access this page.")
login_manager.needs_refresh_message_category = "info"
```
配置刷新后跳转的视图，提示信息，可传递参数路径

### 自定义处理引擎：
```python
@login_manager.needs_refresh_handler
def refresh():
　　# do stuff
　　return a_response

```
然后再需要刷新的方法里调用confirm_login()函数，具体可查看API

### cookie 的细节可以在应用设置中定义。

　　REMEMBER_COOKIE_NAME	存储“记住我”信息的 cookie 名。 默认值： remember_token
　　REMEMBER_COOKIE_DURATION	cookie 过期时间，为一个 datetime.timedelta 对象。 默认值： 365 天 (1 非闰阳历年)
　　REMEMBER_COOKIE_DOMAIN	如果“记住我” cookie 应跨域，在此处设置域名值 （即 .example.com 会允许 example 下所有子域 名）。 默认值： None
　　REMEMBER_COOKIE_PATH	限制”记住我“ cookie 存储到某一路径下。 默认值： /
　　REMEMBER_COOKIE_SECURE	限制 “Remember Me” cookie 在某些安全通道下有用 （典型地 HTTPS）。默认值： None 
　　REMEMBER_COOKIE_HTTPONLY	保护 “Remember Me” cookie 不能通过客户端脚本访问。 默认值： False

## 会话保护

会话 cookie 有时是脆弱的。Flask-Login包含了会话保护来帮助阻止用户会话被盗用。

在LoginManager上配置会话保护: `login_manager.session_protection = 'strong' `
禁用:`login_manager.session_protection = None `
默认，被激活为 "basic" 模式。

当启用了会话保护，每个请求，生成一个用户电脑的标识（基本上是 IP 地址和 User Agent 的 MD5 hash 值）。
如果会话不包含相关的标识，则存储生成的。如果存在标识，则匹配生成的，之后请求可用。

在 basic 模式下或会话是永久的，如果该标识未匹配，会话会简单地被标记为非活 跃的，且任何需要活跃登入的东西会强制用户重新验证。
（当然，你必须已经使用了活跃登入机制才能奏效。）

在 strong 模式下的非永久会话，如果该标识未匹配，整个会话（记住的令牌如果存在，则同样）被删除。

## 本地化

默认情况下，当用户需要登录，LoginManager 使用 flash 来显示信息。但信息都是英文的。dz
如果你需要本地化，设置 LoginManager 的 localize_callback 属性为一个函数，该函数在消息被发送到 flash 的时候被调用，比如，gettext。

 
## 参考：

* [外文文档](https://flask-login.readthedocs.io/en/latest/)

* [中文文档](http://www.pythondoc.com/flask-login/)
