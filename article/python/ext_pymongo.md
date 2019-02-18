# PyMongo

> PyMongo是Python连接MongoDB的驱动


1. 安装 `pip3 install pymongo`

2. 基本使用

```python
import pymongo
myclient = pymongo.MongoClient('mongodb://localhost:27017/')
 
dblist = myclient.list_database_names()
# dblist = myclient.database_names() 
if "runoobdb" in dblist:
  print("数据库已存在！")
```

3. [更多API](http://api.mongodb.com/python/current/)


## Flask-MongoEngine

> MongoDB 是一个文档型数据库，是 NoSQL (not only SQL) 的一种，具有灵活、易扩展等诸多优点。
  MongoEngine 是一个用来操作 MongoDB 的 ORM 框架. 如果你不知道什么是 ORM，可以参考 Flask-SQLAlchemy。
  
1. 安装 ` pip install flask-mongoengine`

2. 配置, 在使用之前，请确保 mongo 服务已经开启。
```python
# -*- coding: utf-8 -*-

from flask import Flask
from flask_mongoengine import MongoEngine

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'test',
    'host': '127.0.0.1',
    'port': 27017
}

db = MongoEngine(app)
```
3. [更多API](http://docs.mongoengine.org)