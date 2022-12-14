# Django中的模板
>  Django 需要一种方便的方式来动态生成 HTML。最常见的方法是依靠模板。
> 一个模板包含了所需 HTML 输出的静态部分，以及一些特殊的语法，描述了如何插入动态内容。

## Django template language (DTL)

### Sysntax 语法

1. 变量 使用`{{ }}`
   
   如：`My first name is {{ first_name }}. My last name is {{ last_name }} `
   `{{ my_dict.key }}`
   
2. 标签 使用`{% %}`

   如：` {% csrf_token %}`
       `{% cycle 'odd' 'even' %}`
      `{% if user.is_authenticated %}Hello, {{ user.username }}.{% endif %}` 
3. 过滤器
   如： {{ django|title }}  {{ my_date|date:"Y-m-d" }}
4. 注释
    如： `{# this won't be rendered #} `
   使用 {% comment %} 标签可以写多行注释

### 组件

1. 引擎

  django.template.Engine 封装了 Django 模板系统的实例。直接实例化 Engine 的主要原因是为了在 Django 项目之外使用 Django 模板语言。

  django.template.backends.django.DjangoTemplates 是一个简单封装，使 django.template.Engine 适应 Django 的模板后端API。

2. 模板
    django.template.Template 代表已编译的模板。模板可以通过 Engine.get_template() 或 Engine.from_string() 获得。

    同样 django.template.backends.django.Template 是一个简单封装，使 django.template.Template 适应通用模板 API。

3. 上下文 
    django.template.Context 除了上下文数据外，还保存了一些元数据。它被传递给 Template.render() 来渲染模板。

    django.template.RequestContext 是 Context 的子类，它储存当前的 HttpRequest 并运行模板上下文处理器。

    通用 API 没有对应的概念。
    上下文数据以普通的 dict 传递，而当前的 HttpRequest 则根据需要单独传递。

4. 加载器
    > 模板加载器负责定位模板，加载模板，并返回 Template 对象。
    Django 提供了几个 内建模板加载器 并且支持 自定义模板加载器。

5. 上下文处理器 
    上下文处理器是接收当前的 HttpRequest 作为参数，并返回一个 dict 的数据添加到渲染上下文的函数。
    主要用途是将所有模板共享的通用数据添加到上下文中，而无需在每个视图中重复代码。
    Django 提供了许多 内置上下文处理器，你也可以实现自己的其他上下文处理器

## 模板引擎的支持

### 一、配置
> 模板引擎是通过 TEMPLATES 进行配置。这是一个配置列表，每个引擎都有一个。默认值为空。
> 在startproject 命令生成的 settings.py 中定义：
```python
TEMPLATES = [
  {
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [],
    'APP_DIRS': True,
    'OPTIONS': {
        # ... some options here ...
    },
  },
]
```

#### 配置参数

* __BACKEND__ 是实现 Django 模板后端API 的模板引擎类(点分隔 Python 路径)。
  内置的后端有 django.template.backends.django.DjangoTemplates 和 django.template.backends.jinja2.Jinja2。

由于大多数引擎都是从文件中加载模板，因此每个引擎的顶层配置都包含两个常见的配置：

* __DIRS__ 定义了目录列表，引擎应在其中按搜索顺序查找模板源文件。
* __APP_DIRS__ 告诉引擎是否应该在已安装的应用程序中寻找模板。
  每个后端都为应用程序中存储模板的子目录定义了一个惯用名称。
* __OPTIONS__ 包含特定于后端的配置。


### 二、使用

django.template.loader 模块定义了两个加载模板的函数

 * get_template(template_name, using=None) 通过名称加载模板返回Template对象

 * select_template(template_name_list, using=None) 接受一个模板名称的列表。它按顺序尝试每个名字，并返回第一个存在的模板

 如果加载模板失败，则可能会引发在 django.template 中定义的以下两个异常
 * TemplateDoesNotExist(msg, tried=None, backend=None, chain=None) 找不到模板
    > 接受以下可选参数在调试页面上填充 模板事后检验 ：
    backend 产生异常的模板后端实例。
    tried 查找模板时尝试过的来源列表。它的格式为包含 (origin, status) 的元组列表，其中 origin 是一个 类 origin 对象而 status 是一个说明找不到模板原因的字符串。
    chain 尝试加载模板时引发的一系列中间 TemplateDoesNotExist 异常列表。这由函数使用，例如：get_template()，这些函数尝试从多个引擎加载给定的模板。
 * TemplateSyntaxError(msg) 语法错误 

 * Template.render(context=None, request=None) 使用给定的上下文渲染此模板
    > context ， 必须是 dict。如果未提供，则引擎将使用空上下文渲染模板。
    > request，它必须是 HttpRequest。同时引擎必须使它和 CSRF 令牌在模板中可用。如何实现这一点由每个引擎决定。

 * render_to_string(template_name, context=None, request=None, using=None) 加载并渲染模板的的快捷函数
    > 加载一个模板 get_template() ，并立即调用它的 render() 方法。它需要下面的参数。
    > * template_name 加载和呈现模板的名称。如果是模板名称列表
    > * context dict 用作模板的渲染上下文。
    > * request 可选项 HttpRequest 在模板的渲染过程中可用。
    > * using 可选的模板引擎 NAME。对模板的搜索将限于该引擎。
 * render 函数 （也是调用了 render_to_string）  

```python
from django.template.loader import render_to_string
rendered = render_to_string('my_template.html', {'foo': 'bar'})
```
 
#### 一个模板搜索算法的例子

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            '/home/html/example.com',
            '/home/html/default',
        ],
    },
    {
        'BACKEND': 'django.template.backends.jinja2.Jinja2',
        'DIRS': [
            '/home/html/jinja2',
        ],
    },
]
```
 * 如果你调用 get_template('story_detail.html')，以下是 Django 将按顺序查找的文件：
   1. /home/html/example.com/story_detail.html （'django' 引擎）
   2. /home/html/default/story_detail.html （'django' 引擎）
   3. /home/html/jinja2/story_detail.html （'jinja2' 引擎）
     
 * 如果你调用 select_template(['story_253_detail.html', 'story_detail.html'])，Django 将寻找以下内容：
   1. /home/html/example.com/story_253_detail.html （'django' 引擎）
   2. /home/html/default/story_253_detail.html （'django' 引擎）
   3. /home/html/jinja2/story_253_detail.html （'jinja2' 引擎）
   4. /home/html/example.com/story_detail.html （'django' 引擎）
   5. /home/html/default/story_detail.html （'django' 引擎）
   6. /home/html/jinja2/story_detail.html （'jinja2' 引擎）
  当 Django 发现一个模板存在时，它就会停止寻找。
>
提示: 类似 select_template(['story_%s_detail.html' % story.id, 'story_detail.html'])灵活加载模板

#### 子目录中的模板
1. 最好是在每个包含模板的目录内的子目录中组织模板 。
2. 惯例是为每个 Django 应用程序创建一个子目录，根据需要在这些子目录中包含子目录。
3. 要加载子目录中的模板，请使用斜杠，`get_template('news/story_detail.html')`
   使用与上述相同的 TEMPLATES 选项，这将尝试加载以下模板：

   1. /home/html/example.com/news/story_detail.html （'django' 引擎）
   2. /home/html/default/news/story_detail.html （'django' 引擎）
   3. /home/html/jinja2/news/story_detail.html （'jinja2' 引擎） 

## 模板引擎

### Django template language (DTL)

DjangoTemplates 引擎接受以下 OPTIONS:

 * __autoescape__ 否启用 HTML 自动转义。 默认为 True。 (警告:只有当你渲染非 HTML 模板时，才将其设置为 False)

 * context_processors 填充上下文的可调用项， （Python 路径列表）。 默认为空 
 * debug'：开启／关闭模板调试模式的布尔值。如果是 True，错误页面将显示模板渲染过程中出现的任何异常的详细报告
 * loaders ：模板加载器（Python 路径列表）。每个 Loader 类都知道如何从特定源导入模板。可以选择使用元组来代替字符串。
   元组中的第一项应该是 Loader 类名，随后的项在初始化期间传递给 Loader。
   默认值取决于 DIRS 和 APP_DIRS 的值。
 * string_if_invalid ：模板系统对无效变量（如拼写错误）应将此字符串输出。 默认为空字符串。
 * file_charset ：用于读取磁盘上模板文件的字符集。 默认为 'utf-8'。
 * libraries ：模板标签模块的标签字典和(点分隔 Python 路径)，用于向模板引擎注册。 这可用于添加新库或为现有库提供替代标签。例如：
   > 可以通过将相应的字典键传递到 {% load %} 标签来加载库。
 * builtins ：要添加的 内置模板标签和过滤器（Python类路径）
   > 可以使用内置库中的标签和过滤器，而不需要先调用 {% load %} 标签

```python
OPTIONS={
  'libraries': {
    'myapp_tags': 'path.to.myapp.tags',
    'admin.urls': 'django.contrib.admin.templatetags.admin_urls',
  },
  'builtins': ['myapp.builtins'],
}
```


### Jinja2
> 需要额外安装：python -m pip install Jinja2

Jinja2 引擎 接受以下 OPTIONS:
 
 * environment ：环境的可调用对象,默认为 'jinja2.Environment'。Django 调用该可调用对象并传递其他选项作为关键字参数。
 * autoescape'：True
 * loader ：为 DIRS 和 APP_DIRS 配置的加载器
 * auto_reload ：settings.DEBUG
 * undefined ：DebugUndefined if settings.DEBUG else Undefined
 * context_processors ：当模板被请求渲染时，用于填充上下文的可调用项
  > 不建议将上下文处理器与 Jinja2 模板一起使用。

#### 同时使用django风格

如果一个模板被请求渲染（例如使用 render()），Jinja2会在上下文中添加 request，csrf_input 和 csrf_token。
除此之外，不会创建 Django 风格的环境。 也不知道 Django 过滤器和标签。 
为了使用 Django 特有的 API，你必须将它们配置到环境中。

例如，您可以使用以下内容创建 myproject/jinja2.py 

```python
from django.templatetags.static import static
from django.urls import reverse

from jinja2 import Environment


def environment(**options):
    env = Environment(**options)
    env.globals.update({
        'static': static,
        'url': reverse,
    })
    return env
```

并将 'environment' 选项设置为 'myproject.jinja2.environment'。

这样你就可以在 Jinja2 模板中使用以下构造：

`<img src="{{ static('path/to/company-logo.png') }}" alt="Company Logo">`

`<a href="{{ url('admin:index') }}">Administration</a>`



## 模板的使用案例

### 一、添加配置

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'], # 默认在template 可以进行额外配置
        'APP_DIRS': True, # 是否在应用中查找
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

### 二、加载与渲染

```
def load_template(request):
    temp = loader.get_template('example.html') # 加载模版文件，生成模版对象
    res = temp.render(context={'content':'hello index'}) # 渲染结果
    return HttpResponse(res)

def render_template(request):
    return render(request,'example.html',context={'content':'hello index'})
```

### 三、使用过滤器

> 使用管道符，串联调用 {变量 |过滤方法 }

1、add ：将value的值增加2。使用形式为：{{ value | add: "2"}}。

2、addslashes：在value中的引号前增加反斜线。使用形式为：{{ value | addslashes }}。

3、capfirst：value的第一个字符转化成大写形式。使用形式为：{{ value | capfirst }}。

4、cut：从给定value中删除所有arg的值。使用形式为：{{ value | cut:arg}}。

5、date: 格式化时间格式。使用形式为：{{ value | date:"Y-m-d H:M:S" }}

6、default：如果value是False，那么输出使用缺省值。使用形式：{{ value | default: "nothing" }}。例如，如果value是“”，那么输出将是nothing

7、default_if_none：如果value是None，那么输出将使用缺省值。使用形式：{{ value | default_if_none:"nothing" }}，例如，如果value是None，那么输出将是nothing

8、dictsort：如果value的值是一个字典，那么返回值是按照关键字排序的结果
使用形式：{{ value | dictsort:"name"}}，例如，
如果value是：
[{'name': 'python'},{'name': 'java'},{'name': 'c++'},]
那么，输出是：
[{'name': 'c++'},{'name': 'java'},{'name': 'python'}, ]

9、dictsortreversed：如果value的值是一个字典，那么返回值是按照关键字排序的结果的反序。使用形式：与dictsort过滤器相同。

10、divisibleby：如果value能够被arg整除，那么返回值将是True。使用形式：{{ value | divisibleby:arg}}，如果value是9，arg是3，那么输出将是True

11、escape：替换value中的某些字符，以适应HTML格式。使用形式：{{ value | escape}}。例如，< 转化为 &lt;> 转化为 &gt;' 转化为 &#39;" 转化为 &quot;

13、filesizeformat：格式化value，使其成为易读的文件大小。使用形式：{{ value | filesizeformat }}。例如：13KB，4.1MB等。

14、first：返回列表/字符串中的第一个元素。使用形式：{{ value | first }}

16、iriencode：如果value中有非ASCII字符，那么将其进行转化成URL中适合的编码，如果value已经进行过URLENCODE，改操作就不会再起作用。使用形式：{{value | iriencode}}

17、join：使用指定的字符串连接一个list，作用如同python的str.join(list)。使用形式：{{ value | join:"arg"}}，如果value是['a','b','c']，arg是'//'那么输出是a//b//c

18、last：返回列表/字符串中的最后一个元素。使用形式：{{ value | last }}

19、length：返回value的长度。使用形式：{{ value | length }}

20、length_is：如果value的长度等于arg的时候返回True。使用形式：{{ value | length_is:"arg"}}。例如：如果value是['a','b','c']，arg是3，那么返回True

21、linebreaks：value中的"\n"将被<br/>替代，并且整个value使用</p>包围起来。使用形式：{{value|linebreaks}}

22、linebreaksbr：value中的"\n"将被<br/>替代。使用形式：{{value |linebreaksbr}}

23、linenumbers：显示的文本，带有行数。使用形式：{{value | linenumbers}}

24、ljust：在一个给定宽度的字段中，左对齐显示value。使用形式：{{value | ljust}}

25、center：在一个给定宽度的字段中，中心对齐显示value。使用形式：{{value | center}}

26、rjust：：在一个给定宽度的字段中，右对齐显示value。使用形式：{{value | rjust}}

27、lower：将一个字符串转换成小写形式。使用形式：{{value | lower}}

30、random：从给定的list中返回一个任意的Item。使用形式：{{value | random}}

31、removetags：删除value中tag1,tag2....的标签。使用形式：{{value | removetags:"tag1 tag2 tag3..."}}

32、safe：将字符串标记为安全，不需要转义。当系统设置autoescaping打开的时候，该过滤器使得输出不进行escape转换。使用形式：{{value | safe}}

33、safeseq：与safe基本相同，但有一点不同的就是：safe是针对字符串，而safeseq是针对多个字符串组成的sequence

34、slice：与python语法中的slice相同。使用形式：{{some_list | slice:"2"}}

37、striptags：删除value中的所有HTML标签.使用形式：{{value | striptags}}

38、time：格式化时间输出。使用形式：{{value | time:"H:i"}}或者{{value | time}}

39、title：转换一个字符串成为title格式。

40、truncatewords：将value切成truncatewords指定的单词数目。使用形式：{{value | truncatewords:2}}。例如，如果value是Joel is a slug 那么输出将是：Joel is ...

42、upper：转换一个字符串为大写形式

43、urlencode：将一个字符串进行URLEncode

46、wordcount：返回字符串中单词的数目

#### 自定义过滤器 

1. 创建 templatetags 包
2. 添加自定义过滤器函数
 ```python
    from django import template
    register = template.Library() # 建立模版对象
    @register.filter(name='sub1')
    def sub(value):  # 参数最多2个
        return value - 1
 ```

3. 在模版中使用
 ```html
      {%  load mytag %}
      <html lang="en">
          <body>
        <p> {{ 5 | sub1}}</p>
        </body>
      </html>
 ```

### 四、使用内置标签

* if 标签
> 表达式可使用 <> =,in,is,not,and,or
> 不要表达式使用 （）
> 不支持 if 3< b <6

```
{% if express %}
{% elif express %}
{% else express %}
{% endif %}
```

* for 标签
  ` {% for value in list %} {% empty %} 数据为空或   不存在 {% endfor %} `
  ` {% for value in list reversed %} ` 反向迭代

遍历字典: 可以直接用字典 .items 方法，用变量的解包分别获取键和值

在 {% for %} 标签里可以通过 {{forloop}} 变量获取循环序号。
* forloop.counter: 顺序获取循环序号，从 1 开始计算
* forloop.counter0: 顺序获取循环序号，从 0 开始计算
* forloop.revcounter: 倒叙获取循环序号，结尾序号为 1
* forloop.revcounter0: 倒叙获取循环序号，结尾序号为 0
* forloop.first（一般配合if标签使用）: 第一条数据返回 True，其他数据返回 False
* forloop.last（一般配合if标签使用）: 最后一条数据返回 True，其他数据返回 False

* ifequal / ifnotequal 标签

* 注释  `{# #}` 单行

* 模板导入 include
> 导入html文件，实现模板的复用： `{% include '路径/xx.html' %}`

*  url 标签

使用反向解析

```html
<iframe src={% url 'App:public_header' %}> </iframe>
<a herf="{% url 'App:index' %}">
<a herf="{% url 'App:index' 1 2 %}">带参数的路由
<a herf="{% url 'App:index' num1=1 num2=2 %}" 带关键字参数的路由
```

### 五、模板继承

#### 父模板
标签 `block...endblock`: 父模板中的预留区域，该区域留给子模板填充差异性的内容，不同预留区域名字不能相同。

```
{% block 名称 %} 
预留给子模板的区域，可以设置设置默认内容
{% endblock 名称 %}
```

####子模板
子模板使用标签 extends 继承父模板： `{% extends "父模板路径"%} `

1. 继承父模板 ` {% extends "app/base.html" %} `
2. 重载块    ` {% block ** %}  {% endsblock %} `
3. 调用父模板的代码 {{ block.super }}


### 六、静态资源
1. 在项目根目录下创建 statics 目录
2. 在 settings 文件的最下方配置添加以下配置

```python
STATIC_URL = '/static/'
STATICFILES_DIRS = [ 
  os.path.join(BASE_DIR, 'static') # 可以是多个
]
```

3. 在 statics 目录下创建 css 目录，js 目录，images 目录，plugins 目录， 分别放 css文件，js文件，图片，插件。

4. 把 bootstrap 框架放入插件目录 plugins。

5. 在 HTML 文件的 head 标签中引入 bootstrap。

```
{% load static %}
<img  src="/static/img/a.jpg/"> 
<img  src="{% static 'img/a.jpg' %}">  # 建议使用 动态编码
```


### 七、自定义错误页面
1. 将项目settings.py文件中的DEBUG字段改为False：

```
   DEBUG = False
   ALLOWED_HOSTS = ['*']
```

2. 404错误：page_not_found 找不到指定文件, 需要在templates目录下自定义一个404.html文件：

3. 403错误：permission_denied 权限拒绝

4. 500错误：server_error服务器内部错误(代码问题) 在template下创建500.html即可


## 八、jinja2 模板引擎
> 使用多个模板引擎

1. 安装jinja2 `pip install jinja2`

2. 创建一个jinja2 的环境变量 `helloworld/jinjia2_env.py`

```python
from jinja2 import Environment
from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import reverse

def environment(**options):
    env = Environment(**options)
    env.globals.update({
        'static': staticfiles_storage.url,
        'url': reverse
    })
    return env
```

3. 在配置文件中修改模板配置

```
# 只使用jinja2
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.jinja2.Jinja2',
        'DIRS': [BASE_DIR / 'jinja_templates'], # 默认在template 可以进行额外配置
        'APP_DIRS': True,
        'OPTIONS': {
            'environment': 'helloworld.jinjia2_env.environment', # 配置模版环境文件
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

4. [使用模板](https://www.jianshu.com/p/f04dae701361)

