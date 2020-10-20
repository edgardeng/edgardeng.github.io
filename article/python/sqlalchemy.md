# SQLAlchemy

> SQLAlchemy 是Python编程语言下的一款ORM框架，该框架建立在数据库API之上，使用关系对象映射进行数据库操作，简言之便是：将对象转换成SQL，然后使用数据API执行SQL并获取执行结果。

> SQLAlchemy本身无法操作数据库，其必须以来pymysql等第三方插件，Dialect用于和数据API进行交流，根据配置文件的不同调用不同的数据库API，从而实现对数据库的操作

```
MySQL-Python
    mysql+mysqldb://<user>:<password>@<host>[:<port>]/<dbname>
  
pymysql
    mysql+pymysql://<username>:<password>@<host>/<dbname>[?<options>]
  
MySQL-Connector
    mysql+mysqlconnector://<user>:<password>@<host>[:<port>]/<dbname>
  
cx_Oracle
    oracle+cx_oracle://user:pass@host:port/dbname[?key=value&key=value...]
```
## 使用Sqlalchemy连接Mysql
  
安装：
```python
pip install pymysql
pip install sqlalchemy
```

### 底层处理
使用 Engine/ConnectionPooling/Dialect 进行数据库操作，Engine使用ConnectionPooling连接数据库，然后再通过Dialect执行SQL语句。

```python
from sqlalchemy import create_engine

engine = create_engine("mysql+pymysql://test:123456@127.0.0.1:3306/test", max_overflow=5)
engine.execute("INSERT INTO user (name) VALUES ('my_name')") #执行sql语句
result = engine.execute('select * from user')
res = result.fetchall()
print(res)
```

### ORM功能使用
使用 ORM/Schema Type/SQL Expression Language/Engine/ConnectionPooling/Dialect 所有组件对数据进行操作。
根据类创建对象，对象转换成SQL，执行SQL。

#### 创建表

```python
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint, Index
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy import create_engine

engine = create_engine("mysql+pymysql://test:123456@127.0.0.1:3306/test", max_overflow=5)

Base = declarative_base()

# 创建单表
class Users(Base):
__tablename__ = 'users'
id = Column(Integer, primary_key=True)
name = Column(String(32))
extra = Column(String(16))

__table_args__ = (
UniqueConstraint('id', 'name', name='uix_id_name'),
   Index('ix_id_name', 'name', 'extra'),
)

# 一对多
class Favor(Base):
__tablename__ = 'favor'
nid = Column(Integer, primary_key=True)
caption = Column(String(50), default='red', unique=True)

class Person(Base):
__tablename__ = 'person'
nid = Column(Integer, primary_key=True)
name = Column(String(32), index=True, nullable=True)
favor_id = Column(Integer, ForeignKey("favor.nid"))

# 多对多
class ServerToGroup(Base):
__tablename__ = 'servertogroup'
nid = Column(Integer, primary_key=True, autoincrement=True)
server_id = Column(Integer, ForeignKey('server.id'))
group_id = Column(Integer, ForeignKey('group.id'))

class Group(Base):
__tablename__ = 'group'
id = Column(Integer, primary_key=True)
name = Column(String(64), unique=True, nullable=False)

class Server(Base):
__tablename__ = 'server'

id = Column(Integer, primary_key=True, autoincrement=True)
hostname = Column(String(64), unique=True, nullable=False)
port = Column(Integer, default=22)

Base.metadata.create_all(engine)  #创建表
# Base.metadata.drop_all(engine)   #删除表 

```

#### 数据库基本操作

* 增
```python
obj = Users(name="alex0", extra='sb')
session.add(obj)
session.add_all([
    Users(name="alex1", extra='sb'),
    Users(name="alex2", extra='sb'),
])
session.commit()
```

* 删
```python
session.query(Users).filter(Users.id > 2).delete()
session.commit()

query = Article.query.filter_by(id=id)
query.delete()
db.session.commit() # delete 只有一定要commit;
```

* 改
```python
session.query(Users).filter(Users.id > 2).update({"name" : "099"})
session.query(Users).filter(Users.id > 2).update({Users.name: Users.name + "099"}, synchronize_session=False)
session.query(Users).filter(Users.id > 2).update({"num": Users.num + 1}, synchronize_session="evaluate")
session.commit() # update 只有一定要commit;
```

* 查
```python
ret = User.query.filter_by(id=user_id).first()
ret = session.query(Users).all()
ret = session.query(Users.name, Users.extra).all()
ret = session.query(Users).filter_by(name='alex').all()
ret = session.query(Users).filter_by(name='alex').first()
```

*  多条件
```python

ret = session.query(Users).filter(Users.id > 1, Users.name == 'eric').all()
ret = session.query(Users).filter(Users.id.between(1, 3), Users.name == 'eric').all()
ret = session.query(Users).filter(Users.id.in_([1,3,4])).all()
ret = session.query(Users).filter(~Users.id.in_([1,3,4])).all()
ret = session.query(Users).filter(Users.id.in_(session.query(Users.id).filter_by(name='eric'))).all()

from sqlalchemy import and_, or_
ret = session.query(Users).filter(and_(Users.id > 3, Users.name == 'eric')).all()
ret = session.query(Users).filter(or_(Users.id < 2, Users.name == 'eric')).all()
ret = session.query(Users).filter(
    or_(
        Users.id < 2,
        and_(Users.name == 'eric', Users.id > 3),
        Users.extra != ""
    )).all()
```

* 通配符
```python
ret = session.query(Users).filter(Users.name.like('e%')).all()
ret = session.query(Users).filter(~Users.name.like('e%')).all()
```

* 限制
```python
ret = session.query(Users)[1:2]
```

* 排序
```python
ret = session.query(Users).order_by(Users.name.desc()).all()
ret = session.query(Users).order_by(Users.name.desc(), Users.id.asc()).all()
```

* 分组
```python
from sqlalchemy.sql import func

ret = session.query(Users).group_by(Users.extra).all()
ret = session.query(
    func.max(Users.id),
    func.sum(Users.id),
    func.min(Users.id)).group_by(Users.name).all()

ret = session.query(
    func.max(Users.id),
    func.sum(Users.id),
    func.min(Users.id)).group_by(Users.name).having(func.min(Users.id) >2).all()
```

* 连表
```python
ret = session.query(Users, Favor).filter(Users.id == Favor.nid).all()
ret = session.query(Person).join(Favor).all()
ret = session.query(Person).join(Favor, isouter=True).all()
```

* 组合
```python
q1 = session.query(Users.name).filter(Users.id > 2)
q2 = session.query(Favor.caption).filter(Favor.nid < 2)
ret = q1.union(q2).all()

q1 = session.query(Users.name).filter(Users.id > 2)
q2 = session.query(Favor.caption).filter(Favor.nid < 2)
ret = q1.union_all(q2).all()
```

### ORM解决中文编码问题 sqlalchemy 默认使用latin-1进行编码。

当出现中文时就会报如下错误：UnicodeEncodeError: 'latin-1' codec can't encode characters in position 39-41: ordinal not in range(256)

解决方法：

在连接数据库的时候直接指定字符编码：
`#engine = create_engine("mysql+pymysql://fuzj:123.com@127.0.0.1:3306/fuzj?charset=utf8", max_overflow=5,encoding='utf-8')`
 

### 自定义返回

ORM 指定查询返回数据格式 默认使用query查询返回的结果为一个对象
```python
res = session.query(User).all()
for i in res:
    print(i.name)
```

使用__repr__定义返回的数据
```python
class User(Base):
    __tablename__ = 'user'
    nid = Column(Integer,primary_key=True,autoincrement=True)
    name = Column(String(10),nullable=False)
    role = Column(Integer,ForeignKey('role.rid'))
    group = relationship("Role",backref='uuu')    #Role为类名

    def __repr__(self):
        output = "(%s,%s,%s)" %(self.nid,self.name,self.role)
        return output
        
res = session.query(User).all()
print(res)
```

### ORM 一对多具体使用

mysql表中一对多指的是表A中的数据和表B中的数据存在对应的映射关系
表A中的数据在表B中对应存在多个对应关系，如表A存放用户的角色 DBA，SA，表B中存放用户，表B通过外键关联之表A中，多个用户可以属于同一个角色

user 表中存放用户，role表中存放用户角色，role表中角色对应user表中多个用户，user表中一个用户只对应role表中一个角色，中间通过外键约束

```python
class Role(Base):
    __tablename__ = 'role'
    rid = Column(Integer, primary_key=True, autoincrement=True)    #主键，自增
    role_name = Column(String(10))

    def __repr__(self):
        output = "(%s,%s)" %(self.rid,self.role_name)
        return output

class User(Base):
    __tablename__ = 'user'
    nid = Column(Integer,primary_key=True,autoincrement=True)
    name = Column(String(10),nullable=False)
    role = Column(Integer,ForeignKey('role.rid'))  #外键关联

    def __repr__(self):
        output = "(%s,%s,%s)" %(self.nid,self.name,self.role)
        return output
```

* 普通连表查询

```python
res = session.query(User,Role).join(Role).all()    # 查询所有用户,及对应的role id
res = session.query(User.name,Role.role_name).join(Role).all()  # 查询所有用户和角色,
res = session.query(User.name,Role.role_name).join(Role,isouter=True).filter(Role.role_name=='sa').all()  # 查询所有DBA的用户
```

* 使用relationship 添加影射关系进行查询
```python
class User(Base):
    __tablename__ = 'user'
    nid = Column(Integer, primary_key=True,autoincrement=True)
    name = Column(String(10), nullable=False)
    role = Column(Integer, ForeignKey('role.rid'))
    group = relationship("Role", backref='role')    # Role为类名
```

* 正向查询
```python
res = session.query(User).all()  #查询所有的用户和角色
for i in res:
    print(i.name,i.group.role_name)    #此时的i.group 就是role表对应的关系
res = session.query(User).filter(User.name=='test').first()  #查询fuzj用户和角色
print(res.name,res.group.role_name)
```

* 反向查找
```python
res = session.query(Role).filter(Role.role_name =='admin').first()   #查找admin组下的所有用户
for i in res.uuu:
    print(i.name,res.role_name)
```

relationship 在user表中创建了新字段，这个字段只用来存放user表中和role表中的对应关系，在数据库中并不实际存在
正向查找： 先从user表中查到符合name的用户之后，此时结果中已经存在和role表中的对应关系，group对象即role表，所以直接使用obj.group.role_name就可以取出对应的角色
反向查找：relationship参数中backref='role'，会在role表中的每个字段中加入role，而uuu对应的就是本字段在user表中对应的所有用户，所以，obj.role.name会取出来用户名
所谓正向和反向查找是对于relationship关系映射所在的表而说，如果通过该表（user表）去查找对应的关系表（role表），就是正向查找，反正通过对应的关系表（role表）去查找该表（user表）即为反向查找。
relationship往往会和ForeignKey共存在一个表中。

### ORM 多对多具体使用

Mysql多对多关系指的是两张表A和B本没有任何关系，而是通过第三张表C建立关系，通过关系表C，使得表A在表B中存在多个关联数据，表B在表A中同样存在多个关联数据

创建三张表 host表 hostuser表 host_to_hostuser表
host表中存放主机，hostuser表中存放主机的用户， host_to_hostuser表中存放主机用户对应的主机.
hostuser表中用户对应host表中多个主机，host表中主机对应hostuser表中多个用户，中间关系通过host_to_hostuser表进行关联。
host_to_hostuser和host表、user表进行外键约束

```python
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String,ForeignKey
from sqlalchemy.orm import sessionmaker,relationship
from sqlalchemy import create_engine
class Host(Base):
    __tablename__ = 'host'
    nid = Column(Integer, primary_key=True,autoincrement=True)
    hostname = Column(String(32))
    port = Column(String(32))
    ip = Column(String(32))

class HostUser(Base):
    __tablename__ = 'host_user'
    nid = Column(Integer, primary_key=True,autoincrement=True)
    username = Column(String(32))

class HostToHostUser(Base):
    __tablename__ = 'host_to_host_user'
    nid = Column(Integer, primary_key=True,autoincrement=True)

    host_id = Column(Integer,ForeignKey('host.nid'))
    host_user_id = Column(Integer,ForeignKey('host_user.nid'))

Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

```

* 普通多次查询
```python
host_id = session.query(Host.nid).filter(Host.hostname=='c2').first()   #查找hostbane对应的hostid,返回结果为元组(2,)
user_id_list = session.query(HostToHostUser.host_user_id).filter(HostToHostUser.host_id==host_id[0]).all()  #查询hostid对应的所有userid
user_id_list = zip(*user_id_list)   #user_id_list 初始值为[(2,), (4,), (3,)],使用zip转换为[2,4,3]对象
#print(list(user_id_list))    #结果为[(2, 4, 3)]
user_list = session.query(HostUser.username).filter(HostUser.nid.in_(list(user_id_list)[0])).all()  #查询符合条件的用户
print(user_list)

#或者：
user_id_list = session.query(HostToHostUser.host_user_id).join(Host).filter(Host.hostname=='c2').all()
user_id_list = zip(*user_id_list)
user_list = session.query(HostUser.username).filter(HostUser.nid.in_(list(user_id_list)[0])).all()
print(user_list)
```

* 使用relationship映射关系查询

首先在关系表Host_to_hostuser中加入relationship关系映射
```python
class HostToHostUser(Base):
    __tablename__ = 'host_to_host_user'
    nid = Column(Integer, primary_key=True,autoincrement=True)

    host_id = Column(Integer,ForeignKey('host.nid'))
    host_user_id = Column(Integer,ForeignKey('host_user.nid'))
    host = relationship('Host',backref='h') #对应host表
    host_user = relationship('HostUser',backref='u') #对应host_user表
```

* 查询
查找一个服务器上有哪些用户
```python
res = session.query(Host).filter(Host.hostname=='c2').first()  #返回的是符合条件的服务器对象
res2 = res.h    #通过relationship反向查找 Host_to_Hostuser中的对应关系
for i in res2:   #i为host_to_hostuser表和host表中c2主机有对应关系的条目
    print(i.host_user.username)        #正向查找, 通过relationship ,找到host_to_hostuser中对应的hostuser 即i.host_user
```

查找此用户有哪些服务器
```python
res = session.query(HostUser).filter(HostUser.username=='sb').first()
for i in res.u:
    print(i.host.hostname)
```

扩展查询

不查询关系表，直接在hostuser表中指定关系表，然后获取host表

在host表中使用 relationship的secondary指定关系表。

```python
class Host(Base):
    __tablename__ = 'host'
    nid = Column(Integer, primary_key=True,autoincrement=True)
    hostname = Column(String(32))
    port = Column(String(32))
    ip = Column(String(32))
    host_user = relationship('HostUser',secondary=lambda :HostToHostUser.__table__,backref='h')
```
注意使用lambda是为了使表的顺序不在闲置

```python
host_obj = session.query(Host).filter(Host.hostname=='c1').first()
for i in host_obj.host_user:
    print(i.username)
```

## 相关文档

* [sqlalchemy Docs](https://docs.sqlalchemy.org/en/latest/)

* [mysql sqlalchemy](https://www.cnblogs.com/pycode/p/mysql-orm.html)
