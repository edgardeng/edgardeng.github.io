<!--2019-05-08 22:00-->
# MySQL系列 - 常用操作

> MySQL的的常用操作，查询，插入，修改，删除

## 数据库操作

创建和删除数据库
```mysql
CREATE DATABASE <db_name>;

drop database <db_name>;

use <db_name>; # 切换数据库
```

创建表

```mysql
CREATE TABLE IF NOT EXISTS `table_name`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `title` VARCHAR(100) NOT NULL,
   `author` VARCHAR(40) NOT NULL,
   `create_date` DATE,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

show TABLES ; # 显示当前表

DELETE FROM table_name; # 删除表数据

DROP TABLE table_name; # 删除表
```

## 表的操作

### 查询

查询数据通用的 SELECT 语法
`SELECT column_name,column_name
FROM table_name
[WHERE Clause]
[LIMIT N][ OFFSET M] `


```mysql
SELECT * FROM table_name; # 读取所有的记录

SELECT title,author FROM table_name; # 读取某几个字段
```

#### 时间查询

```mysql
select * from table where create_date like '2018-%'; # 某一年

select * from table where year(create_date)='2018'; # 某一年

select * from table where year(create_date)=year(now()); # 今年

select * from table where create_date >= date_sub(curdate(), interval 1 YEAR)  # 过去1 年

select * from table where create_date >= date_sub(curdate(), interval 1 MONTH)  # 过去1 年

select * from table where create_date >= date_sub(curdate(), interval 1 DAY) # 过去1天

```

#### Where 子句
```mysql
SELECT * from table_name WHERE author='**';
SELECT * from table_name WHERE age>1;
```

##### 在Where语句中使用 like
```mysql
SELECT * from table_name  WHERE author LIKE '%xyz'; # 查询xyz结尾的
SELECT * from table_name  WHERE author LIKE 'abc%'; # 查询abc开头的

```

#### UNION

> 连接两个以上的 SELECT 语句的结果组合到一个结果集合中。多个 SELECT 语句会删除重复的数据。

UNION 操作符语法格式：
`SELECT expression1, expression2, ... expression_n
FROM tables
[WHERE conditions]
UNION [ALL | DISTINCT]
SELECT expression1, expression2, ... expression_n
FROM tables
[WHERE conditions];`

```mysql
SELECT country FROM Websites UNION SELECT country FROM apps ORDER BY country; # 从 "Websites" 和 "apps" 表中选取所有不同的country
SELECT country FROM Websites UNION ALL SELECT country FROM apps ORDER BY country; # 选取所有的country（也有重复的值）
```
#### 排序

通用格式
`ORDER BY field1 [ASC [DESC][默认 ASC]], [field2...] [ASC [DESC][默认 ASC]]`

```mysql
SELECT * from table_name ORDER BY create_date ASC; # 时间正序
SELECT * from table_name ORDER BY create_date DESC; # 时间倒序
```

#### 分组

> 使用 GROUP BY 语法，对一个或多个列对结果集进行分组， 在分组的列上我们可以使用 COUNT, SUM, AVG,等函数。

通用格式
`SELECT column_name, function(column_name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name;`

```mysql
SELECT name, COUNT(*) FROM table_name GROUP BY name; # 按名字进行分组，并统计每个人有多少条记录：

```

#### 连接

> 可以在 SELECT, UPDATE 和 DELETE 语句中使用 Mysql 的 JOIN 来联合多表查询。

JOIN 按照功能大致分为如下三类：

* INNER JOIN（内连接,或等值连接）：获取两个表中字段匹配关系的记录。
* LEFT JOIN（左连接）：获取左表所有记录，即使右表没有对应匹配的记录。
* RIGHT JOIN（右连接）： 用于获取右表所有记录，即使左表没有对应匹配的记录。

```mysql
SELECT a.id, a.author, b.count FROM table_name a INNER JOIN table_name2 b ON a.author = b.author;

SELECT a.id, a.author, b.count FROM table_name a LEFT JOIN table_name2 b ON a.author = b.author;

SELECT a.id, a.author, b.count FROM table_name a RIGHT JOIN table_name2 b ON a.author = b.author;

```

### 插入

通用 SQL 语法：`INSERT INTO table_name ( field1, field2,...fieldN )  VALUES ( value1, value2,...valueN );`

```mysql
INSERT INTO table_name (title, author, submission_date) VALUES ("**", "***", NOW());
INSERT INTO table_name VALUE ("**", "***", NOW());
```                       
                       
### 修改

通用 SQL 语法：
`UPDATE table_name SET field1=new-value1, field2=new-value2
[WHERE Clause]`

```mysql
UPDATE table_name SET title='学习 C++' WHERE id=3;

```

### 删除

通用语法：`DELETE FROM table_name [WHERE Clause]`

```mysql
DELETE FROM table_name WHERE id=3;

```
