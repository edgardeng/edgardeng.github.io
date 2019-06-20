# MongoDB Aggregation

> Mongodb本身也提供了aggregation、mapreduce特性，以支持对大数据的计算、统计、分类等需求。

## 测试环境

### 基本配置: 

* MongoDB: 3.6
* Robot 3T: 1.3
* Python: 3.6 

### 测试数据

```json
{
  "name": "Bill",
  "age": 10,
  "gender": 0,
  "hobby":["football", ""],
  "results": [
    {"subject": "math", "score": "123456"}
  ],
  "home": {
    "area": "", "address": "", "location": [120,30]
  }
}
```

测试数据的生成代码
```python
import random
import pymongo
from faker import Faker, Factory
fake = Factory.create()

hobbies = ["football", "basketball", "skate", "dance", "sing"]
areas = ["Y.P", "J.D", "B.S", "X.H", "H.P","J.A","Q.P","J.S","H.K","P.D"]
grades = ["G.One", "G.Two", "G.Three", "G.Four","G.Five", "G.Six","G.Seven", "G.Eight", "G.Nine"]

def create_data():
    db_client = pymongo.MongoClient("mongodb://127.0.0.1:27017")
    database = db_client["db_test"]
    collection = database["student"]
    for i in range(200):
        student = {
            "name": fake.name(),
            "age": random.randint(1, 20),
            "grade": random.choice(grades),
            "gender": random.randint(0, 1),
            "results": [
                {"subject": "Math", "score": random.randint(20, 100)},
                {"subject": "Science", "score": random.randint(10, 100)}
            ],
            "hobby": random.sample(hobbies, 2),
            "home": {
                "area": random.choice(areas),
                "address": fake.address(),
                "location": [120 + random.random(), 30 + random.random()],
            }
        }
        collection.insert_one(student)
```

## Aggregation 操作

### 三个“单一用途的” aggregation方法

* count: 计算符合query的documents的总个数 `db.getCollection('student').count({"gender":1})`

* distinct：获取符合query中指定filed的不同值的列表 `collection.distinct("name",{"gender" : 0})`

* group: 分组统计 (Mongodb 3.4 deprecate，Use aggregate() with the $group stage or mapReduce() instead.) 

### aggregation特性

    1）支持多种stages
    2）可以将计算结果保存在collection中，在sharding环境中仍然适用，而且在output之前可以对结果数据进行“修剪”；
    3）同一种stage可以出现多次
    4）stages中可以使用内置的多种计算操作、表达式
    
### Aggregation Pipeline 聚合管道

MongoDB’s aggregation framework is modeled on the concept of data processing pipelines. Documents enter a multi-stage pipeline that transforms the documents into an aggregated result.

```python
db.student.aggregate([
   { $match: { gender: 1 } },
   { $group: { _id: "$grade", total: { $sum: "$age" } } }
])
```
#### Pipeline Stage 操作符

Pipeline是有多个stages组成，每个stage提供不同的数据操作，stages在声明时是数组结构，具有有序性，当前stage的计算结果将作为下一个stage的输入，除$out之外，每种stages均可以在pipeline中出现多次，

|Name|Description|说明|
|:----|:----|:----|
|$project|Reshapes a document stream. $project can rename, add, or remove fields as well as create computed values and sub-documents.||
|$match|Filters the document stream, and only allows matching documents to pass into the next pipeline stage.$match uses standard MongoDB queries.|
|$limit|Restricts the number of documents in an aggregation pipeline.||
|$skip|Skips over a specified number of documents from the pipeline and returns the rest.||
|$unwind|Takes an array of documents and returns them as a stream of documents.||
|$group|Groups documents together for the purpose of calculating aggregate values based on a collection of documents.||
|$sort|Takes all input documents and returns them in a stream of sorted documents.||
|$geoNear|Returns an ordered stream of documents based on proximity to a geospatial point.||
|$redact|Restricts the contents of the documents ||
|$push|Returns an array of all values that result from applying an expression to each document by key.||
|$out|writes result to a specified collection.|输出文档|


##### 1. $project
> 数据投影，主要用于重命名、增加和删除字段

```
db.student.aggregate([
   { $project: { _id : 0 , name: 1 , age: 1} }
])
// 结果中就只还有name,age了，默认情况下_id字段是被包含的

db.student.aggregate([
   { $project: { _id : 0 , name: 1 , xu_sui : { $add:["$age", 1] } } }
])
// 使用$add给age字段的值加1

db.student.aggregate([
   { $project: { _id : 0 , name: 1 , district : "$home.area" } }
])
// 重命名字段名和子文档的字段名

db.student.aggregate([
   { $project: { _id : 0 , name: 1 , info : { age: "$age" } } }
]) 
// 添加子文档
```

##### 2. match
> 滤波操作，筛选符合条件文档，作为下一阶段的输入. 语法和查询表达式(db.collection.find())的语法相同

```
db.student.aggregate([
    { $match : { age : { $gt : 10, $lte : 20 } } },
    { $group: { _id: null, count: { $sum: 1 } } }
])
// 求数量
```

注意：
1. 不能在$match操作符中使用$where表达式操作符。
2. $match尽量出现在管道的前面，这样可以提早过滤文档，加快聚合速度。
3. 如果$match出现在最前面的话，可以使用索引来加快查询。
##### 3. limit
> 限制经过管道的文档数量, $limit的参数只能是一个正整数
```
db.student.aggregate([
    { $limit : 5 }
])
```

#### 4. skip
> 从待操作集合开始的位置跳过文档的数目,$skip参数也只能为一个正整数
```
  db.student.aggregate([
      { $skip : 5 }
  ])
```
#### 5. unwind：将数组元素拆分为独立字段
```
db.student.aggregate({$project: {name:1,hobby:1}}, {$unwind:"$hobby"}) 
```
注意：
* {$unwind:"$tags"}) 不要忘了$符号
* 如果$unwind目标字段不存在的话，那么该文档将被忽略过滤掉
* 如果$unwind目标字段不是一个数组的话，将会产生错误
* 如果$unwind目标字段数组为空的话，该文档也将会被忽略。

##### 6. group 
> 对数据进行分组, 必须要指定一个_id域，同时也可以包含一些算术类型的表达式操作符
```
db.student.aggregate([
    { $group: { _id: "$home.area", count: { $sum: 1 } , age_sum : { $sum : "$age" }} }
])
```
注意 
1. $group的输出是无序的。
2. $group操作目前是在内存中进行的，所以不能用它来对大量个数的文档进行分组

##### 7. sort 
> 对文档按照指定字段排序
```
db.student.aggregate([
    { $sort : { gender: 1 ,age:-1 } }
])
// 先性别升序，后年龄降序
```
注意：
1. 如果将$sort放到管道前面的话可以利用索引，提高效率
2. 在管道中如果$sort出现在$limit之前的话，$sort只会对前$limit个文档进行操作，这样在内存中也只会保留前$limit个文档，从而可以极大的节省内存
3. $sort操作是在内存中进行的，如果其占有的内存超过物理内存的10%，程序会产生错误

##### 8. goNear
> 返回一些坐标值，这些值以按照距离指定点距离由近到远进行排序   

|Field|Type|Description|
|:----|:----|:----|
|near |GeoJSON (point orlegacy coordinate pairs)|The point for which to find the closest documents.|
|distanceField|string|The output field that contains the calculated distance. To specify a field within a subdocument, use dot notation.|
|limit|number|Optional. The maximum number of documents to return. The default value is 100. See also the num option.|
|num|number|Optional. The num option provides the same function as the limitoption. Both define the maximum number of documents to return. If both options are included, the num value overrides the limit value.|
|maxDistance|number|Optional. A distance from the center point. Specify the distance in radians. MongoDB limits the results to those documents that fall within the specified distance from the center point.|
|query|document|Optional. Limits the results to the documents that match the query. The query syntax is the usual MongoDB read operation query syntax.|
|spherical|Boolean|Optional. If true, MongoDB references points using a spherical surface. The default value is false.|
|distanceMultiplier|number|Optional. The factor to multiply all distances returned by the query. For example, use the distanceMultiplier to convert radians, as returned by a spherical query, to kilometers by multiplying by the radius of the Earth.|
|includeLocs|string|Optional. This specifies the output field that identifies the location used to calculate the distance. This option is useful when a location field contains multiple locations. To specify a field within a subdocument, usedot notation.|
|uniqueDocs|Boolean|Optional. If this value is true, the query returns a matching document once, even if more than one of the document’s location fields match the query. If this value is false, the query returns a document multiple times if the document has multiple matching location fields. See $uniqueDocsfor more information. |    

```
db.student.aggregate([
      {"$geoNear": {
          "near": [120.5, 30.5],
          "distanceField": "home.distance",
          "maxDistance": 0.001,
          "num": 5,
          "spherical": true
      }}
  ])
```
dist.calculated中包含了计算的结果，而dist.location中包含了计算距离时实际用到的坐标

注意：
1. 使用$goNear只能在管道处理的开始第一个阶段进行
2. 必须指定distanceField，该字段用来决定是否包含距离字段
3. 地理信息的检索必须存在有索引的支持 `db.student.createIndex({"home.location": "2d"});`
4. $gonNear和geoNear命令比较相似，但是也有一些不同:distanceField在$geoNear中是必选的，而在geoNear中是可选的；includeLocs在$geoNear中是string类型，而在geoNear中是boolen类型。

##### 9.$lookup

> “left outer join”功能；从事过大数据开发的人都知道，如果仅仅基于mapreducer计算模式，实现跨文件“join”还是一件比较复杂的事情；mongodb提供了$lookup以支持简单的join，以当前collection作为主表（左端），将另一个non-sharded collection作为辅表参与join。语法：

```
{  
    $lookup:  
    {  
        from: <参与join的辅表>,  
        localField: <参与join匹配的本表字段>  
        foreignField: <参与join的辅表字段>  
        as: <将辅表数据输出到此字段中>  
    }  
}
```

```json  
{  
    "$lookup": {  
        "from":"products",  
        "localField":"product_id",  
        "foreignField":"id",  
        "as":"products"  
    }  
}  
```

#### Pipeline Expression 管道表达式
> 例子中{$match:{status:"A"}}，$match称为管道操作符，而{status:"A"}称为管道表达式

| Name | 说明 | Description |
|:----|:----|:----|
|$addToSet |添加|Returns an array of all the unique values for the selected field among for each document in that group.
|$first |首项|Returns the first value in a group.|
|$last|尾项| Returns the last value in a group.|
|$max|最大值|Returns the highest value in a group.|
|$min|最小值|Returns the lowest value in a group.|
|$avg|平均值|Returns an average of all the values in a group.|
|$push|-|Returns an array of all values for the selected field among for each document in that group.|
|$sum|求和|Returns the sum of all the values in a group.|

```
$group:{_id:"author","bookIds":{$push:"$bookId"}}  
##获取每个作者的图书ID的列表  

$group:{_id:"categoryId","shopIds":{$addToSet:"$shopId"}}  
##获取每个品类下，不同商铺的ID 

$group:null,"total":{$sum:{$multiply:["$price","$quantity"]}}  
```
 
Bool类型聚合操作符： `$and`, `$or`, `$not`

比较类型聚合操作符: `$cmp`, `$eq`, `$gt`, `$gte`, `$lt`, `$lte`, `$ne`

算术类型聚合操作符 `$add`, `$divide`, `$mod`, `$multiply`, `$subtract`

条件类型聚合操作符:  `$cond` , `$ifNull`

[More Aggregation Pipeline Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/)

#### [Pipeline Optimization](https://docs.mongodb.com/manual/core/aggregation-pipeline-optimization/)

* __$sort  +  $skip  +  $limit 顺序优化__

如果在执行管道聚合时，如果$sort、$skip、$limit依次出现的话，例如：

{ $sort: { age : -1 } },
{ $skip: 10 },
{ $limit: 5 }

那么实际执行的顺序为：

{ $sort: { age : -1 } },
{ $limit: 15 },
{ $skip: 10 }

$limit会提前到$skip前面去执行。

此时$limit = 优化前$skip+优化前$limit

这样做的好处有两个:1.在经过$limit管道后，管道内的文档数量个数会“提前”减小，这样会节省内存，提高内存利用效率。2.$limit提前后，$sort紧邻$limit这样的话，当进行$sort的时候当得到前“$limit”个文档的时候就会停止。

* __$limit + $skip + $limit + $skip Sequence Optimization__

如果聚合管道内反复出现下面的聚合序列：

  { $limit: 100 },
  { $skip: 5 },
  { $limit: 10},
  { $skip: 2 }

首先进行局部优化为：可以按照上面所讲的先将第二个$limit提前：

  { $limit: 100 },
  { $limit: 15},
  { $skip: 5 },
  { $skip: 2 }
  
进一步优化：两个$limit可以直接取最小值 ，两个$skip可以直接相加:

 { $limit: 15 },
 { $skip: 7 }

* __Projection Optimization__

    提前使用$project投影，设置需要使用的字段，去掉不用的字段，可以大大减少内存。
    
    过早使用$match、$limit、$skip操作符，提前减少管道内文档数量，减少内存占用，提供聚合效率。
    
    $match尽量放到聚合的第一个阶段，如果这样的话$match相当于一个按条件查询的语句，使用索引，加快查询效率。

### 聚合管道的限制

1. 类型限制

    在管道内不能操作 Symbol, MinKey, MaxKey, DBRef, Code, CodeWScope类型的数据( 2.4版本解除了对二进制数据的限制).

2. 结果大小限制

    管道线的输出结果不能超过BSON 文档的大小（16M),如果超出的话会产生错误.

3. 内存限制

    如果一个管道操作符在执行的过程中所占有的内存超过系统内存容量的10%的时候，会产生一个错误。

    当$sort和$group操作符执行的时候，整个输入都会被加载到内存中，如果这些占有内存超过系统内存的%5的时候，会将一个warning记录到日志文件。同样，所占有的内存超过系统内存容量的10%的时候，会产生一个错误。

### Python 例子

[其他数据源](http://media.mongodb.org/zips.json)

男女的分布和平均年龄:
```python
    db_client = pymongo.MongoClient("mongodb://127.0.0.1:27017")
    db = db_client["db_test"]
    # 男女分布
    pipeline = [
        {"$project": {"_id": 1, "age": 1, "gender": 1}},
        {"$group": {
            "_id": "$gender",
            "count": {"$sum": 1},
            "avg_age": {"$avg": "$age" }
        }}
    ]
    print('get gender count & average age')
    result_gender = list(db.student.aggregate(pipeline))
```
   
地区的性别个数:
```json
[
        {"$group": {
            "_id": {"area": "$home.area", "gender": "$gender"},
            "count": {"$sum": 1}
        }}
]
```

数量前三的兴趣
```json
[
  {"$unwind": "$hobby"},
  {"$group": {
    "_id": {"area": "$hobby"},
    "count": {"$sum": 1}
  }},
  {"$project": {"area": "$_id.area", "_id": 0, "count": 1}},
  {"$sort": {"count": -1}},
  {"$limit": 3}
]
``` 
    