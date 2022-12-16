# Django的模型和数据库

模型准确且唯一的描述了数据。它包含您储存的数据的重要字段和行为。一般来说，每一个模型都映射一张数据库表。[官方文档](https://docs.djangoproject.com/zh-hans/4.1/topics/db)

## 数据库的使用

### 数据库配置

> 需要在项目配置`mysite/settings.py`添加数据库配置DATABASES 

 * ENGINE
    * 'django.db.backends.sqlite3'
    * 'django.db.backends.postgresql'
    * 'django.db.backends.mysql'
    * 'django.db.backends.oracle'
    *  Other backends are also available.
 * NAME – 数据库名称.(SQLite地址  BASE_DIR / 'db.sqlite3') 

### 使用mysql

#### 使用 mysql-client

1. ` brew install mysql-client ` mac安装mysqlclient
2. ` echo 'export PATH="/usr/local/opt/mysql-client/bin:$PATH"' >> ~/.bash_profile`
3. ` export PATH="/usr/local/opt/mysql-client/bin:$PATH" `
4. ` pip install mysqlclient`  在虚拟环境中安装依赖
5. 在配置文件中修改数据库配置

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'hello_django',
        'HOST': 'lochost',
        'PORT': 3306,
        'USER': 'test',
        'PASSWORD': '123456',
    }
}
```

#### 使用pymysql

1.  ` pip3 install pymysql ` 在虚拟环境中安装依赖
2. 在配置文件中修改数据库配置, 如之前settings.py配置
3. 在最开始的项目包下的__init__.py中进行如下配置
```python
"""
setting中的配置默认为sqlite3数据库 当需要修改成MySql时
并且在setting.py的同级目录的__init__.py 加入如下配置
否则会报错： Error loading MySQLdb module.
"""
import pymysql
pymysql.version_info = (1, 4, 13, "final", 0)
pymysql.install_as_MySQLdb()
```

## 模型的创建
每个模型被表示为 django.db.models.Model 类的子类。每个模型有许多类变量，它们都表示模型里的一个数据库字段

1. 在子应用的polls/models.py 文件,添加模型
```python
from django.db import models

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```
2. 在工程配置`mysite/settings.py`文件的INSTALLED_APPS 中添加设置`INSTALLED_APPS = ['polls.apps.PollsConfig',]`

3. 执行迁移命令 `python manage.py makemigrations polls` (迁移是 Django 对于模型定义的变化的储存形式（磁盘上的文件）。被储存在 polls/migrations/0001_initial.py 里)

4. 执行迁移结果查询命令 `python manage.py sqlmigrate polls 0001` 输出sql语句

5. 执行迁移文件 `python manage.py migrate` 得到表 polls_question, polls_choice

## 数据迁移

### 1.Model --> DB （模型 to 数据库）
1. 迁移步骤:
   生成迁移文件 `python manage.py makemigrations`
   执行迁移文件 `python manage.py migrate`
2. 迁移文件的生成
   根据models文件生成对应的迁移文件
   根据models和已有迁移文件差别 生成新的迁移文件
3. 迁移原理 了解
   1. 先去迁移记录查找，哪些文件未迁移过
   2. app_label + 迁移文件名字
   3. 执行未迁移的文件
   4. 执行完毕，记录执行过的迁移文件
4. 可以指定迁移的app
   python manage.py makemigrations app（注意app的名字后面不允许加/）
   python manage.py migrate
5. 注意：对已经迁移过的模型添加字段时没有给默认值，再次迁移会报错
6. 重新迁移
   删除迁移文件
   migrations所涉及的迁移文件
   删除迁移文件产生的表
   删除迁移记录
   django-migrations

### 2.DB --> Model （数据库 to 模型）

 1. 反向生成到指定得app下 `·` python manager.py inspectdb > App/models.py`
 2. 元信息中包含一个属性 managed=False 不支持迁移
    如果自己的模型不想被迁移系统管理，也可以使用 managed=False进行声明
    
## ORM

### 模型字段

|字段名称|字段说明|参数|
|:----|:----|:----|
| AutoField| 自增长类型，映射到数据库中是11位的整数，使用此字段时，必须传递primary_key=True，否则在生成迁移脚本文件时，就会报错，一个模型不能有两个自增长字段。一般情况下我们用不到这个字段，如果不定义主键，django会自动的为我们生成id字段作为主键||
| BigAutoField| 自增长类型，用法同AutoField。映射到数据库中会成为20位的bigint类型
| CharField | 字符串类型，映射到数据库中会转换成varchar类型，使用时必须传入max_length属性以定义该字符串的最大长度，如果超过254个字符，就不建议使用CharField了，此时建议使用TextField|
| TextField|大量的文本类型|
| IntegerField|整数类型，映射到数据库中会变成11位的int类型|
| DecimalField
| FloatField|浮点数类型，映射到数据库中会变成double类型|
| BooleanField|布尔类型(True/False)，映射到数据库中会变成长度只有1位的tinyint类型，这个Field不接受null参数，要想使用可以为null的布尔类型的字段，就要使用NullBooleanField|
| NullBooleanField
| DateField|日期 类型(在python中对应的是datetime.date类型，在映射到数据库中是date类型)|auto_now:每次保存对象时，自动设置当前时间； auto_now_add:每次创建时设置当前时间；default: 这三个参数不能同时共存|
| TimeField|时间类型(在python中对应的是datetime.time类型，在映射到数据库中是time类型)|如果在setting.py中配置了USE_TZ=True，那么上两个默认值都来自于django.utils.timezone.now所转化来的值| 
| DateTimeField|日期时间类型在python中对应的是datetime.datetime类型,在映射到数据库中也是datetime类型|
| FileField|来存储文件的|
| ImageField|用来存储图片文件的|
| EmailField：|在数据库底层也是一个varchar类型，默认最大长度是254个字符，当然也可以自己传递max_length参数，这个Field在数据库层面不会限制一定要传递符合email条件的字符串，只是以后在使用ModelForm表单验证时，会起作用|
| URLField：类似于CharField，在数据库底层也是一个varchar类型，只不过只能用来存储url格式的字符串。并且默认的max_length是200，同EmailField
| BigIntegerField| 大整形。值的区间是-9223372036854775808——9223372036854775807|
| PositiveIntegerField| 正整形。值的区间是0——2147483647|
| SmallIntegerField：| 小整形。值的区间是-32768——32767|
| PositiveSmallIntegerField| 正小整形。值的区间是0——32767|
| DecimalField|一个固定精度的十进制数类型，使用时必须要传递两个参数，max_digits数字的最大总长度(不含小数点),decimal_places小数部分的长度|



### 字段选项

> 每一种字段都需要指定一些特定的参数（参考 模型字段 ）实现字段的约束。 例如， CharField （以及它的子类）需要接收一个 max_length 参数，用以指定数据库存储 VARCHAR 数据时用的字节数。
 

|可选参数|字段说明|
|:----|:----|
| null      | 为True， 将NULL作为空值。默认false|
| blank     |True，允许为空|
| db_column | 指明表中的名称|
| db_index  |索引|
| unique    |是否唯一|
| primary_key| 索引|
| default   | 默认值|
| choices   |在一个范围内选择出一项 `TYPE_CHOICES = ((1, '第一类'),(2, '第二类'),(3, '第三类'),)type = models.IntegerField(default=0,choices=TYPE_CHOICES)`| 


### 定义模型

#### Meat中常用的设置 
* db_table 数据库中的表名
* abstract 当设置为True时，说明模型时抽象基类
* managed 当设置为True时， 则迁移不会创建或删除表，默认True
* ordering  用于记录排序 ordering =['pub_date'] 或 ordering =['-pub_date']

```python
from django.db import models

class User(models.Model):
    # 字段名不能使用python关键字
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20,unique=True)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)

    # 元数据 （表/模型 本身的信息）
    class Meta:
        # managed = False # 修改后不影响数据库
        db_table = 'user'  # 指定表名
        ordering = ['username'] # 排序
```
 
### 模型的使用
1. 数据模型创建后，Django有一套数据库抽象 API，允许你创建，检索，更新和删除对象
2. 一个模型类代表一张数据表，一个模型类的实例代表数据库表中的一行记录。

#### 插入

* save ()

```python
from blog.models import Blog
b = Blog(name='Beatles Blog', tagline='All the latest Beatles news.')
b.save() # 执行了 INSERT SQL 语句
b5.name = 'New name'
b5.save() # 执行了 UPDATE
```


#### 查询

1. 从数据库检索对象，要通过模型类的 Manager 构建一个 QuerySet。(每个模型至少有一个 Manager，默认名称是 objects。)
2. 一个 QuerySet 代表来自数据库中对象的一个集合。它可以有 0 个，1 个或者多个 filters. 
   Filters，可以根据给定参数缩小查询结果量。在 SQL 的层面上， QuerySet 对应 SELECT 语句，而*filters*对应类似 WHERE 或 LIMIT 的限制子句。
3. 过滤器根据给定的参数缩小查询结果范围
4. 查询集经过过滤器筛选后返回新的查询集，链式过滤 (每次精炼一个 QuerySet，你就会获得一个全新的 QuerySet)
5. 惰性执行：创建查询集不会带来任何数据库的访问，指导调用数据时，才访问数据库
6. 对查询集求值： 迭代、切片、序列号、if合用  repr / print / len /list /bool
  * 限制条目数, `Entry.objects.all()[:5]` (不支持负索引)
 

```python
from polls.models import Choice, Question

Question.objects.all() # <QuerySet [<Question: What's up?>]>
Question.objects.filter(id=1) # <QuerySet [<Question: What's up?>]>
Question.objects.filter(headline__startswith='What')
  .exclude(pub_date__gte=datetime.date.today())
  .filter(  pub_date__gte=datetime.date(2005, 1, 30)) # 链式过滤器

```

|管理器方法|返回类型|说明|
|:----|:----|:----|    
|object.all()        | QuerySet | 所有数据|
|object.filter()     | QuerySet | 符合条件的数据|
|object.exclude()    | QuerySet | 不符合条件的数据|
|object.order_by()   | QuerySet | 排序|
|object.values()     | QuerySet ||
|object.values_list()   | QuerySet ||
|object.reverse()    | QuerySet | |
|object.only(field)  | QuerySet |只显示指定字段|
|object.defer(field) | QuerySet |去除指定字段|
|object.get()        | 模型对象 ||
|object.first()      | 模型对象 ||
|object.last()        | 模型对象 ||
|object.earliest()    | 模型对象 ||
|object.latest(field) | 模型对象 ||
|object.exists()      | bool ||
|object.count(field)  | int ||

##### 字段查询
> 相当于sql语句中的where子句子，为filter，exculde，get提供参数

|操作符|说明|示例|
|:----|:----|:----| 
|exact      |精确判等          |name='admin' name__exact='admin'|
|iexact     |不区分大小写精确判等| |
|contains   | 模糊查询         |(headline__contains='Lennon') : WHERE headline LIKE '%Lennon%'|
|icontains  | 不区分大小写模糊查询||
|startwith  | 以*开头         | |
|istartwith | 以*开头         | |
|endwith    | 以*结尾         | |
|iendwith   | 以*结尾         | |
|isnull     | 判断空          | |
|in         | 包含           |`id__in=[1,2,5]`|
|range      | 范围           | `id__range=[2,5]` # >=2 <=5 |
|gt/gte     | 大于/大于等于   | |
|lt/lte     | 小于/小于等于   | |
|regex      | 正则           | |
|iregex     | 包含           | |

日期查询

| year | month |day|week_day|
|:----|:----|:----|:----|
|hour |minute |second||

```python
Entry.objects.filter(pub_date__lte='2006-01-01')
Entry.objects.get(headline__exact="Cat bites dog") # WHERE headline = 'Cat bites dog';
User.object.filter(time__year=2018)
```

#### F表达式

1. F() 的实例充当查询中的模型字段的引用。这些引用可在查询过滤器中用于在同一模型实例中比较两个不同的字段。
2. Django 支持对 F() 对象进行加、减、乘、除、求余和次方
3. 用双下划线在 F() 对象中通过关联关系查询
4. date 和 date/time 字段，你可以加上或减去一个 timedelta 对象
5. F() 对象通过 .bitand()， .bitor()， .bitxor()，.bitrightshift() 和 .bitleftshift() 支持位操作
```python
from django.db.models import F
Entry.objects.filter(number_of_comments__gt=F('number_of_pingbacks'))  # 查出所有评论数大于 pingbacks 的博客条目
Entry.objects.filter(number_of_comments__gt=F('number_of_pingbacks') * 2)
Entry.objects.filter(rating__lt=F('number_of_comments') + F('number_of_pingbacks')) # 评分低于 pingback 和评论总数之和的条目
Entry.objects.filter(authors__name=F('blog__name'))
Entry.objects.filter(mod_date__gt=F('pub_date') + timedelta(days=3))
F('somefield').bitand(16) # Oracle 不支持按位 XOR 操作。
```

#### Q表达式
一个 Q 对象 (django.db.models.Q) 用于压缩关键字参数集合

```python
from django.db.models import Q,F
User.object.filter(Q(id=2) | Q(id=3)) # where id=2orid=3
User.object.filter(Q(id_gte=2) | Q(id__lte=3))
User.object.filter(~Q(id=2))
Q(question__startswith='Who') | Q(question__startswith='What')

```

#### 其他表达式  Min、OuterRef, Subquery, Sum

#### QuerySet 缓存

1. 一旦要计算 QuerySet 的值，就会执行数据查询，将查询结果保存在 QuerySet 的缓存中，并返回这些显式请求的缓存
2. 数组切片或索引的 限制查询结果集 不会填充缓存..若全部查询结果集已被检出，就会去检查缓存.
3. 会触发计算全部的查询结果集，并填充缓存的过程
4. 只是打印查询结果集不会填充缓存(调用 __repr__() 仅返回了完整结果集的一个切片)

```python
[entry for entry in queryset]
bool(queryset)
entry in queryset
list(queryset)
```

#### 删除对象

1. delete方法立刻删除对象，并返回被删除的对象数量和一个包含了每个被删除对象类型的数量的字典
2. 所有 QuerySet 都有个 delete() 方法，它会删除 QuerySet 中的所有成员
3. 当 Django 删除某个对象时，默认会模仿 SQL 约束 ON DELETE CASCADE 的行为——换而言之，某个对象被删除时，关联对象也会被删除（约束行为由 ForeignKey 的 on_delete 参数指定）
```python
e.delete() # (1, {'blog.Entry': 1})
Entry.objects.filter(pub_date__year=2005).delete() # (5, {'webapp.Entry': 5})
```
#### 修改

1. 通过 update()修改 QuerySet 中的所有对象的某个字段 
2. 修改非关联字段，需要用常量提供新值
3. 修改 ForeignKey 字段，将新值置为目标模型的新实例
4. 方法 update() 立刻被运行，并返回匹配查询调节的行数
5. 使用 F 表达式 基于同一模型另一个字段的值更新某个字段
6. 不能在update方法中使用 F() 对象的同时使用 join，会抛出一个 FieldError()。如`update(headline=F('blog__name'))
```python
Entry.objects.filter(pub_date__year=2007).update(headline='Everything is the same') # 
b = Blog.objects.get(pk=1)
Entry.objects.update(blog=b)
Entry.objects.update(number_of_pingbacks=F('number_of_pingbacks') + 1)
```

### 异步查询
> Django 4.1 新增

```python
async for entry in Authors.objects.filter(name__startswith="A"):
    pass

user = await User.objects.filter(username=my_input).afirst()
```
### 事务 
> Django 4.1 新增 ，异步查询和修改不支持事务

### 关联关系

关系型数据库的强大之处在于各表之间的关联关系。 Django 提供了定义三种最常见的数据库关联关系的方法：多对一，多对多，一对一

```python
from datetime import date
from django.db import models

class Blog(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.TextField()

class Author(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()

class Entry(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    headline = models.CharField(max_length=255)
    body_text = models.TextField()
    pub_date = models.DateField()
    mod_date = models.DateField(default=date.today)
    authors = models.ManyToManyField(Author)
    number_of_comments = models.IntegerField(default=0)
    number_of_pingbacks = models.IntegerField(default=0)
    rating = models.IntegerField(default=5)
```

* on_delete
   * CASCADE 默认， 默认级联删除数据
   * protect 保护， 当从表中存在级联记录的时候，删除主表会抛出保护异常。从表中不存在级联记录数据是允许删除的
   * set__null 外键字段允许为空 set__default 外键字段有默认值

* do_onthing 什么也不做

#### ForeignKey Manager 管理关联对象的额外方法
 * add(obj1, obj2, ...) 将特定的模型对象加入关联对象集合。
 * create(**kwargs) 创建一个新对象，保存，并将其放入关联对象集合中。返回新创建的对象。
 * remove(obj1, obj2, ...) 从关联对象集合删除指定模型对象。
 * clear() 从关联对象集合删除所有对象。
 * set(objs) 替换关联对象集合

#### 多对一的关联，使用 django.db.models.ForeignKey 类

1. 通过其属性访问关联（外部的）对象 `Entry.objects.get(id=2).blog`
2. 对外键的修改直到你调用 save() 后才会被存入数据库   
3. 若 ForeignKey 字段配置了 null=True （即其允许 NULL 值），你可以指定值为 None 移除关联
4. 会缓存关联关系

```python
from blog.models import Blog, Entry
entry = Entry.objects.get(pk=1)
cheese_blog = Blog.objects.get(name="Cheddar Talk")
entry.blog = cheese_blog
entry.save()
# e.blog = None
```

##### 跨关系查询

```python
Entry.objects.filter(blog__name='Beatles Blog') # 检索出所有的 Entry 对象，其 Blog 的 name 为 
Blog.objects.filter(entry__headline__contains='Lennon') #检索的所有 Blog 对象均拥有少一个 标题 含有 '' 的条目 
Blog.objects.filter(entry__authors__name='Lennon') # 跨多个关系进行筛选
Blog.objects.filter(entry__headline__contains='Lennon', entry__pub_date__year=2008) #  “Lennon” 的 2008 年的博客
```

#### 多对多的关联，使用 django.db.models.ManyToManyField 类

```python
from blog.models import Author
joe = Author.objects.create(name="Joe")
entry.authors.add(joe) # 一次调用 add() 时传入多个参数
```

#### 一对一的关联，使用 django.db.models.OneToOneField 类
