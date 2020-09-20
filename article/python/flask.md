# Python的Web开发框架Flask

> Flask是Python语言下的一个非常轻量级的Web开发框架，提供了搭建 Web 服务的必要组件，同时具有良好的扩展性。

## 关于Flask 

### Flask的安装

#### 虚拟环境

虚拟环境是 Python 解释器的一个私有副本，在该环境中你可以安装私有包，而且不会影响系统中安装的全局 Python 解释器

Linux下安装虚拟环境

```
$ sudo apt-get install python-virtualenv
$ virtualenv --version // 查看版本

$ cd flask 
$ virtualenv venv // 创建虚拟环境，命名为 venv
$ source venv/bin/activate  // 激活虚拟环境
```

Mac OS X 系统下
```
$ sudo easy_install virtualenv
```

#### 使用pip安装Python包

在虚拟环境中安装 Flask
```
(venv) $ pip install flask
```

### Flask程序的基本结构

> 所有Flask程序都必须创建一个程序实例。Web服务器使用一种名为 Web 服务器网关接口 (Web Server Gateway Interface，WSGI)的协议，把接收自客户端的所有请求都转交给这个对象处理
  
一个完整的程序 （app.py）
```python
from flask import Flask
app = Flask(__name__) # 创建实例

@app.route('/') # 使用修饰器声明路由
def index():
  return '<h1>Hello World!</h1>'

if __name__ == '__main__':
  app.run(debug=True) # 启动服务器
```

输入命令启动程序`python app.py`,打开浏览器 http://127.0.0.1:5000/即可:

#### 请求与响应

请求对象，封装了客户端发送的 HTTP 请求。

Flask 使用上下文临时把某些对象变为全局可访问。

```text
from flask import request

@app.route('/')
def index():
  user_agent = request.headers.get('User-Agent') 
  return '<p>Your browser is %s</p>' % user_agent

```

Flask上下文全局变量

|变量名|上下文|说明|
|:---- | :---- |:----  |
|current_app|程序上下文|当前激活程序的程序实例|
|g|程序上下文|处理请求时用作临时存储的对象。每次请求都会重设这个变量|
|request|请求上下文|请求对象，封装了客户端发出的 HTTP 请求中的内容|
|session|请求上下文|用户会话，用于存储请求之间需要“记住”的值的词典|

####请求调度

URL 映射是 URL 和视图函数之间的对应关系。处理 URL 和函数之间关系的程序称为路由。
```python
from app import app
app.url_map # 查看映射
```  

#### 请求钩子
为了避免在每个视图函数中都使用重复的代码， Flask 提供了注册通用函数的功能，注册的函数可在请求被分发到视图函数之前或之后 调用。

* before_first_request:注册一个函数，在处理第一个请求之前运行。
* before_request:注册一个函数，在每次请求之前运行。
* after_request:注册一个函数，如果没有未处理的异常抛出，在每次请求之后运行。
* teardown_request:注册一个函数，即使有未处理的异常抛出，也在每次请求之后运行。

#### 响应

HTTP响应就是一个简单的字符串，作为HTML页面回送客户端。另一重要的部分是状态码，Flask默认设为200
```python
@app.route('/')
def index():
  return '<h1>Bad Request</h1>', 400 # 自定义状态码
```

创建一个响应对象，设置 cookie:
```python
@app.route('/')
def index():
  response = make_response('<h1>This document carries a cookie!</h1>')
  response.set_cookie('answer', '42')
  return response
```

重定向函数 ` redirect('http://www.example.com')`
特殊响应函数 `abort(404)`

### 模板

> 模板是一个包含响应文本的文件，其中包含用占位变量表示的动态部分，其具体值只在请求上下文中才能知道。使用[Jinja2模板引擎](http://docs.jinkan.org/docs/jinja2/)

模板文件，在根目录下，创建templates文件夹

```
<h1>Hello World!</h1>
<h2>Hello, {{ name }}!</h2>
```

渲染模板
```python
from flask import Flask, render_template

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/user/<name>')
def user(name):
  return render_template('user.html', name=name)
```

#### 变量
模版中使用变量
```
   <p>A value from a dictionary: {{ mydict['key'] }}.</p>
   <p>A value from a list: {{ mylist[3] }}.</p>
   <p>A value from a list, with a variable index: {{ mylist[myintvar] }}.</p>
   <p>A value from an object's method: {{ myobj.somemethod() }}.</p>
   <p> 过滤器修改变量 Hello, {{ name|capitalize }} </p>
```

Jinja2变量过滤器

* safe 渲染值时不转义
* capitalize 把值的首字母转换成大写，其他字母转换成小写
* lower 把值转换成小写形式
* upper 把值转换成大写形式
* title 把值中每个单词的首字母都转换成大写
* trim 把值的首尾空格去掉
* striptags 渲染之前把值中所有的 HTML 标签都删掉
 
#### 模板中的控制结构
```html
  {% if user %}
  Hello, {{ user }}!
  {% else %}
  Hello, Stranger!
  {% endif %}
  <ul>
    {% for comment in comments %}
    <li>{{ comment }}</li> {% endfor %}
  </ul>
```
Jinja2 还支持宏和模板继承，可查阅官网

#### 使用Flask-Bootstap
初始化 Flask-Bootstrap
```python
from flask.ext.bootstrap import Bootstrap
bootstrap = Bootstrap(app)
```

#### 自定义错误页面 
```python
@app.errorhandler(404)
def page_not_found(e):
  return render_template('404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
  return render_template('500.html'), 500
```

#### 链接
任何具有多个路由的程序都需要可以连接不同页面的链接, 用 url_for() 生成动态地址时，
```python
url_for ('user', name='john', _external=True) 
# http://localhost:5000/user/john。
url_for ('index', page=2) # 返回结果是 /?page=2
```
#### 静态文件
静态文件，例如 HTML代码中引用的图片、JavaScript 源码文件和 CSS。

对静态文件的引用被当成一个特殊的路由，即 /static/<filename>。
调用 url_for('static', filename='css/styles.css', _external=True) 是 http://localhost:5000/static/css/styles.css。

默认设置下，Flask 在程序根目录中名为 static 的子目录中寻找静态文件。

### 表单

[Flask-WTF](http://pythonhosted.org/Flask-WTF/)扩展可以高效处理 Web 表单的过程。
对独立的 [WTForms](http://wtforms.simplecodes.com)包进行了包装，方便集成到Flask中。

pip 安装: `(venv) $ pip install flask-wtf`

为了实现 CSRF 保护，Flask-WTF 需要程序设置一个密钥。使用这个密钥生成加密令牌，再用令牌验证请求中表单数据的真伪。
设置Flask-WTF:
```python
app = Flask(__name__)
app.config['SECRET_KEY'] = 'hard to guess string'
```
定义表单类
```python
from flask.ext.wtf import Form
from wtforms import StringField, SubmitField from wtforms.validators import Required
class NameForm(Form):
name = StringField('What is your name?', validators=[Required()]) submit = SubmitField('Submit')

```

在`templates/index.html`:模板中使用 `{{ wtf.quick_form(form) }}` 即可

路由方法中渲染模版
```python
@app.route('/', methods=['GET', 'POST'])
def index():
  name = None
  form = NameForm()
  if form.validate_on_submit():
    name = form.name.data
    form.name.data = ''
  return render_template('index.html', form=form, name=name)
```
     
####Flash消息

使用确认消息、警告或者错误提醒。

一个典型例子是，用户提交了有一项错误的登录表单后，服务器发回的响应重新 渲染了登录表单，并在表单上面显示一个消息，提示用户用户名或密码错误。
```python
from flask import Flask, render_template, session, redirect, url_for, flash

@app.route('/', methods=['GET', 'POST'])
def index():
  form = NameForm()
  if form.validate_on_submit():
    old_name = session.get('name')
    if old_name is not None and old_name != form.name.data:
      flash('Looks like you have changed your name!') session['name'] = form.name.data
      return redirect(url_for('index'))
    return render_template('index.html',form = form, name = session.get('name'))
```

最好在 基模板中渲染 Flash 消息，所有页面都能使用这些消息。
Flask 把 get_flashed_ messages() 函数开放给模板，用来获取并渲染消息
渲染Flash消息时，在`templates/base.html`中使用: ` for message in get_flashed_messages() `

### 大型项目的结构

多文件 Flask 程序的基本结构
```
|-flasky 
  |-app/
    |-templates/
    |-static/
    |-main/
      |-__init__.py
      |-errors.py
      |-forms.py
      |-views.py
    |-__init__.py
    |-email.py
    |-models.py
  |-migrations/
  |-tests/
    |-__init__.py
    |-test*.py
  |-venv/
  |-requirements.txt  依赖包
  |-config.py   存储配置;
  |-manage.py   启动程序以及其他的程序任务。

```

#### 配置选项

程序经常需要设定多个配置。使用层次结构的配置类。
`config.py`:程序的配置 
```python
import os
basedir = os.path.abspath(os.path.dirname(__file__))
class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard to guess string' 
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    FLASK_MAIL_SUBJECT_PREFIX = '[Flask]'
    FLASK_MAIL_SENDER = 'Flask Admin <flasky@example.com>' 
    FLASK_ADMIN = os.environ.get('FLASK_ADMIN')
    @staticmethod
    def init_app(app):
        pass
class DevelopmentConfig(Config): 
    DEBUG = True
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or \
              'sqlite:///' + os.path.join(basedir, 'data-dev.sqlite')
class TestingConfig(Config): TESTING = True
          SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or \
              'sqlite:///' + os.path.join(basedir, 'data-test.sqlite')
class ProductionConfig(Config):
        SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
              'sqlite:///' + os.path.join(basedir, 'data.sqlite')
              
config = {
    'development': DevelopmentConfig, 
    'testing': TestingConfig, 
    'production': ProductionConfig,
    'default': DevelopmentConfig }         
```
基类 Config 中包含通用配置，子类分别定义专用的配置。如果需要，你还可添加其他配 置类。

在这个配置脚本末尾，config 字典中注册了不同的配置环境，而且还注册了一个默认配置 (本例的开发环境)。

#### 使用程序工厂函数

运行脚本时，程序实例已经创建，再修改配置为时已晚。
延迟创建程序实例，把创建过程移到可显式调用的工厂函数中。不仅可以给脚本留出配置程序的时间，还能够创建多个程序实例，

程序包的构造文件`app/__init__.py` :
```python
from flask import Flask, render_template 
from flask.ext.bootstrap import Bootstrap 
from flask.ext.mail import Mail
from flask.ext.moment import Moment
from flask.ext.sqlalchemy import SQLAlchemy 
from config import config

bootstrap = Bootstrap()
mail = Mail()
moment = Moment()
db = SQLAlchemy()
def create_app(config_name):
  app = Flask(__name__) app.config.from_object(config[config_name]) 
  config[config_name].init_app(app)
  bootstrap.init_app(app)
  mail.init_app(app)
  moment.init_app(app)
  db.init_app(app)
  # 附加路由和自定义的错误页面 
  return app
```

工厂函数返回创建的程序示例，不过要注意，现在工厂函数创建的程序还不完整，因为没有路由和自定义的错误页面处理程序。

####  在蓝本中实现程序功能

程序实例存在于全局作用域中，路由可以直接使用 app.route 修饰器定义。

在蓝本中定义的路由处于休眠状态，直到蓝本注册到程序上后，路由才真正成为程序的一部分。使用位于全局作用域中的蓝本时，定义路由的方法几乎和单脚本程序一样。
和程序一样，蓝本可以在单个文件中定义，也可使用更结构化的方式在包中的多个模块中创建。
为了获得最大的灵活性，程序包中创建了一个子包，用于保存蓝本。

在app/main/__init__.py:创建蓝本 
```python
from flask import Blueprint
     main = Blueprint('main', __name__)
     from . import views, errors
```

通过实例化一个 Blueprint 类对象可以创建蓝本。
在`app/__init__.py`脚本的末尾导入，注册蓝本
```python
def create_app(config_name):
    pass
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    return app
```

`app/main/errors.py`: 蓝本中的错误处理程序,如果使用 errorhandler 修饰器，那么只有蓝本中的
错误才能触发处理程序。
注册程序全局的错误处理程序，必须使用 app_errorhandler。

`app/main/views.py`:蓝本中定义的程序路由
```python
from flask import render_template, session, redirect, url_for
from . import main
from .forms import NameForm
@main.route('/', methods=['GET', 'POST'])
def index():
    form = NameForm()
    if form.validate_on_submit():
        pass
        return redirect(url_for('.index'))
    return render_template('index.html',form=form, name=session.get('name'))
``` 
 
在蓝本中编写视图函数主要有两点不同:
第一，和前面的错误处理程序一样，路由修饰器 由蓝本提供;
第二，url_for() 函数的用法不同。你可能还记得，url_for() 函数的第一 个参数是路由的端点名，在程序的路由中，默认为视图函数的名字。

例如，在单脚本程序 中，index() 视图函数的 URL 可使用 url_for('index') 获取。在蓝本中就不一样了，Flask 会为蓝本中的全部端点加上一个命名空间.
在不同的蓝本中使用相同的端点名定义视图函数，而不会产生冲突。命名空间就是蓝本的名字 (Blueprint 构造函数的第一个参数)，所以视图函数 index() 注册的端点名是 main.index，其URL使用 url_for('main.index') 获取。

url_for()在蓝本中可以省略蓝本名，例如 url_for('. index')。在这种写法中，命名空间是当前请求所在的蓝本。
同一蓝本中的重定向可以使用简写形式，但跨蓝本的重定向必须使用带有命名空间的端点名。

#### 启动脚本
顶级文件夹中的 manage.py 文件用于启动程序。脚本内容如示例 7-8 所示。
`manage.py`:启动脚本
```python
#!/usr/bin/env python
import os
from app import create_app, db
from app.models import User, Role
from flask.ext.script import Manager, Shell
from flask.ext.migrate import Migrate, MigrateCommand
app = create_app(os.getenv('FLASK_CONFIG') or 'default') 
manager = Manager(app)
migrate = Migrate(app, db)
def make_shell_context():
    return dict(app=app, db=db, User=User, Role=Role)

manager.add_command("shell", Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
         manager.run()
```

如果已经定义了环境变量 FLASK_CONFIG，则从中读取配置名;否则 使用默认配置。
初始化 Flask-Script、Flask-Migrate 和为 Python shell 定义的上下文。

在基于 Unix 的操作系统中可以通过 `./manage py`执行脚本。

程序中必须包含一个 requirements.txt 文件，用于记录所有依赖包及其精确的版本号。
```shell
(venv) $ pip freeze >requirements.txt
(venv) $ pip install -r requirements.txt
```

####  单元测试

tests/test_basics.py:单元测试
```python
import unittest
from flask import current_app 
from app import create_app, db
class BasicsTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()
    def test_app_exists(self):
        self.assertFalse(current_app is None)
    def test_app_is_testing(self): 
        self.assertTrue(current_app.config['TESTING'])
```
   
在 manage.py 脚本中添加一个自定义命令。在`manage.py`启动单元测试的命令
```python
@manager.command
def test():
    import unittest
    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)
```    
    
manager.command 修饰器让自定义命令变得简单。修饰函数名就是命令名，函数的文档字符串会显示在帮助消息中。
test() 函数的定义体中调用了 unittest 包提供的测试运行函数。
单元测试可使用命令`python manage.py test` 运行:


#### 创建数据库

如果使用 Flask-Migrate 跟 踪迁移，可使用如下命令创建数据表或者升级到最新修订版本:
```shell
(venv) $ python manage.py db upgrade
```
