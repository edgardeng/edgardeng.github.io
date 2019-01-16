# MongoDB 

> MongoDB是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。他支持的数据结构非常松散，是类似json的bson格式，因此可以存储比较复杂的数据类型。

Mongo最大的特点是他支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引。

## MongoDB的安装

### mac的安装与启动

```
brew install mongodb
mkdir data 
mongod --dbpath='./data'
```
可视化工具 [Robo 3T](https://robomongo.org/)

### docker安装

```text
docker pull mongo:3.2
docker run -p 27017:27017 -v $PWD/db:/data/db -d mongo:3.2
```

## MongoDB的使用

### 基本的CRUD

### 数据库的操作

```text
show dbs  # 查看mongodb中存在的数据库

use school  #切换到school数据库，如果不存在就新建school数据库

db.getName() # 当前数据库

db.dropDatabase() # 删除数据库
```

### 集合的操作

```

db.school.help() # 查看集合帮助
show collections # 当前数据库的集合
db.createCollection('grade3') # 创建集合

```

### 文档的操作

```

db.grade1.insert({name:'xfy'}) # 在集合grade1里新增一条数据（grade1不存在会新建）
db.grade2.insert([{name:'xfy',age:22,sex:'男'},{name:'stefan',age:23,sex:'男'}]) # 在集合grade2里新增多条数据（grade2不存在会新建）
db.grade1.save({_id: '1',name: 'Han Meimei', age: 9}) # 存在{_id:1},则更新 不存在则创建

# 更新文档
# 语法 & 参数说明
db.collection.update(
   <query>,
   <updateObj>,
   {
     upsert: <boolean>,
     multi: <boolean>
   }
)
query 查询条件,指定要更新符合哪些条件的文档
update 更新后的对象或指定一些更新的操作符(set,inc)
upsert 可选，这个参数的意思是，如果不存在符合条件的记录时是否插入updateObj. 默认是false,不插入。
multi 可选，mongodb 默认只更新找到的第一条记录，如果这个参数为true,就更新所有符合条件的记录。

# 累加 { $inc: { <field1>: <amount1>, <field2>: <amount2>, ... } }
db.grade1.update({name: 'Tom'}, {$inc: {age:10}}) # age累加 10
db.grade2.update({},{'$inc':{age:2}},{multi:true}) #修改多条（第三个参数是设置修改多条）

# 添加 { $push: { <field1>: <value1>, ... } }
db.grade1.update({name:'Tom'}, {$push: {'hobby':'reading'} }) # 不会覆盖已有的

# 给数组添加或者设置一个值 { $addToSet: { <field1>: <value1>, ... } }
db.grade1.update({_id:3}, {$addToSet: {friends:'huge'}}) # 有 - do nothing, 没有 - 添加
db.grade1.update({_id:3}, {$addToSet: {friends:'huge'}})

# 删除数组的第一个或者最后一个元素 { $pop: { <field>: <-1 | 1>, ... } }
db.grade1.update({_id:3}, {$pop:{friends: 1}}) # 传入1删除最后一个元素
db.grade1.update({_id:3}, {$pop:{friends: -1}}) # 传入-1删除第一个元素

# 使用addToSet加上each操作多个值 { $addToSet: { <field>: { $each: [ <value1>, <value2> ... ] } } }

db.grade1.update({_id:3}, {$addToSet:{friends:{$each: ['huangbo','zhangyixing']}}}) # 添加
db.grade1.update({_id:3}, {$addToSet:{friends:{$each: ['huangbo','zhangyixing']}}}) # 有了就不加

# 在push上使用each { $push: { <field>: { $each: [ <value1>, <value2> ... ] } } }
db.grade1.update({_id:3}, {$push:{friends:{$each: ['huangbo','zhangyixing']}}}) # 不管有没有，都添加


# 不等于 {field: {$ne: value} }
db.grade1.update({name: 'Han Meimei', hobby:{$ne:'reading'}, _id: {$ne:'2'}}, {$push: {hobby: 'drinking'}}) // 给 name为'' && hobby中不等于'' && _id不等于'2'的文档的hobby 属性 添加一个 'drinking'

# { $set: { <field1>: <value1>, ... } }
# 原来的数据：{_id:3, info:{id: '11'}, friends:['liudehua', 'zhourunfa']}
db.grade1.update({_id:3}, {$set:{"info11":{id:'11'}}}) # 设置字段的第一层的值（Set Top-Level Fields）
db.grade1.update({_id:3}, {$set:{"info.id":'22'}}) # 设置嵌套字段的值 （Set Fields in Embedded Documents）
db.grade1.update({_id:3}, {$set:{"friends.1":'zhangmanyu'}}) # 修改指定索引元素


# 删除指定的键 { $unset: { <field1>: "", ... } }
db.grade1.update({name: 'Tom'}, {$unset:{'age':''}})

# 不带条件查询
db.grade2.find() #查询grade2中的所有数据
db.grade2.findOne()#查询grade2中的一条数据
db.grade2.find().sort({age:1}) #查询出来的数据按年龄升序
db.grade2.find().sort({age:-1})#查询出来的数据按年龄降序

# 带条件查询
db.grade2.findOne({name:'xfy'})
db.grade2.find({sex:'男'},{_id:0}) #查询的第一个参数是条件，第二个参数要显示哪些字段，默认是都显示，0是不显示，1是显示
db.grade2.find({age:{'$gte':22}})  #查询大于等于22岁的人，mongodb不支持数学字符
db.grade1.find({sex:'男', age: 9}) # 与 查询22岁男性
db.grade2.find('$or':[{age:22},{sex:'男'}])  # 或 查询年龄为22或者性别是男的人
db.grade1.find({age: 9,$or:[{name: 'Tom'}, {age: 11}]}) # 联合使用 9岁或者11岁的tom 

db.collectoin_name.find().limit(number)  # 读取指定数量的数据记录 语法
db.collectoin_name.find().skip(number) # 跳过指定数量的数据
db.collectoin_name.find().sort({field:1}) # 1为升序排列
db.collectoin_name.find().sort({field:-1}) # -1为降序排列

db.grade1.find({}).skip((pageIndex - 1) * pageSize).limit(pageSize).sort({username: 1}); # 分页升序

# ObjectId查询
db.grade1.find({_id: '5ae1b6e3e4366d57f3307239'}).count() #  0
db.grade1.find({_id:ObjectId('5ae1b6e3e4366d57f3307239')}).count() # 1
db.grade1.find({name: /^T/}) #  以`T`开头的数据 正则表达式


# 查询操作符
# 非 $not, 大于 $gt， 大于等于 $gte， 小于$lt， 小于等于$lte， $ne 不等于
db.grade1.find({age:{$in:[9,11]}}) # in 范围内
db.grade1.find({age:{$nin:[9,11]}}) # nin 范围外
db.grade1.find({age:{$not:{$lt:11}}}) #lt小于


#删除
db.grade2.remove({}) # 删除所有
db.grade1.remove({'name': 'Han Meimei'}, {justOne: true}) # 删除匹配到的第一条文档
db.grade2.remove({name:'xfy'})  # 删除匹配到的所有文档

```


mongodb的修改器：

* $inc 对指定的键做加法操作，如果指定的关键不存在，则新创建这个键，并且赋值为$inc指定的值。
* $set 为指定的键赋值，如果指定的键不存在，则自动创建。设值的情况比较复杂，比如为内嵌文档的某个Key设值，复杂点在于需要指定MongoDB能够解析到指定Key的表达式
* $unset $set的反操作，即它用来清除一个Key及其值
* $push 对数组进行操作(在MongoDB中，只有Javascript数组一种集合类型，其它语言如Java的各种集合类型都会保存为Javascript的数组),$push将一个元素追加到集合的末尾(不管这个元素是否存在于数组中)，如果数组不存在，则首先创建数组
* $pushAll $push操作的批量版本，如果给$push操作提供一个数组作为参数，那么$push认为是把整个数组作为一个元素加入到指定的数组末尾.
* $addToSet $pushAll的去重版本，即$addToSet实现了Java的Set集合的特性(Set中不能包含相同的元素)
* $pop 从数组中移除一个元素{$pop:{"key":1}}从数组末尾删除；pop:{"key":-1}}从数组开头删除；
* $pull 从数组中移除指定的元素
* $pullAll $pull的批量版本
* $rename 修改指定键的键名

[更多说明](https://docs.mongodb.com/)

