# MySQL的函数
> MySQL的安装和介绍

## 聚合函数 aggregation function

> 在一个行的集合（一组行）上进行操作，对每个组给一个结果。

### 组函数：

* AVG([distinct] expr) 求平均值

* COUNT({*|[distinct] } expr) 统计行的数量

* MAX([distinct] expr) 求最大值

* MIN([distinct] expr) 求最小值

* SUM([distinct] expr) 求累加和

 ① 每个组函数接收一个参数

 ② 默认情况下，组函数忽略列值为null的行，不参与计算

 ③ 有时，会使用关键字distinct剔除字段值重复的条数

注意：

　　1）当使用组函数的select语句中没有group by子句时，中间结果集中的所有行自动形成一组，然后计算组函数；

　　2）组函数不允许嵌套，例如：count(max(…))；

　　3）组函数的参数可以是列或是函数表达式；

　　4）一个SELECT子句中可出现多个聚集函数。

##### 1、count函数

① count(*)：返回表中满足where条件的行的数量
```mysql
select count(*) from salary_tab where salary='1000'; # 2
select count(*) from salary_tab; # 5没有条件，默认统计表数据行数
```

②count(列)：返回列值非空的行的数量

```mysql
select count(salary) from salary_tab; # 4
```

③count(distinct 列)：返回列值非空的、并且列值不重复的行的数量

```mysql
select count(distinct salary) from salary_tab; # 3
```

④count(expr)：根据表达式统计数据

```mysql
select UNIT as '单位', 
  COUNT(TO_DAYS(DATE)=TO_DAYS(NOW()) or null) as '今日统计',
  COUNT(YEAR(DATE)=YEAR(NOW()) or null) as '今年统计'
  from v_jjd
  group by JJDW;
```

##### 2、max和min函数---统计列中的最大最小值

```mysql
select max(salary) from salary_tab; # 3000
select min(salary) from salary_tab; # 1000
```
注意：如果统计的列中只有NULL值，那么MAX和MIN就返回NULL

##### 3、sum和avg函数---求和与求平均
> ！！表中列值为null的行不参与计算

```mysql
select sum(salary) from salary_tab; # 60000
select avg(salary) from salary_tab; # 3500
select avg(ifnull(salary,0)) from salary_tab; # 1400
```
> 注意：要想让列值为NULL的行也参与组函数的计算，必须使用IFNULL函数对NULL值做转换。

### 分组 SELECT

```mysql
SELECT select_expr [, select_expr ...]
  [FROM table_references
  [PARTITION partition_list]
  [WHERE where_condition]
  [GROUP BY {col_name | expr | position}
  [ASC | DESC], ... [WITH ROLLUP]]
  [HAVING where_condition]
  [ORDER BY {col_name | expr | position}
  [ASC | DESC], ...]
```

[LIMIT {[offset,] row_count | row_count OFFSET offset}]

分组SELECT的基本格式：

```mysql
select [聚合函数] 字段名 from 表名
  [where 查询条件]
  [group by 字段名]
  [having 过滤条件]
```

##### 1、group by子句

> 根据给定列或者表达式的每一个不同的值将表中的行分成不同的组，使用组函数返回每一组的统计信息

规则：

　　① 出现在SELECT子句中的单独的列，必须出现在GROUP BY子句中作为分组列

　　② 分组列可以不出现在SELECT子句中

　　③ 分组列可出现在SELECT子句中的一个复合表达式中

　　④ 如果GROUP BY后面是一个复合表达式，那么在SELECT子句中，它必须整体作为一个表达式的一部分才能使用。

```mysql
# 1）指定一个列进行分组
select salary, count(*) from salary_tab 
  where salary >= 2000
  group by salary; # 

# 2）指定多个分组列，‘大组中再分小组’
select userid,count(salary) from salary_tab
  where salary>=2000
  group by salary, userid;
  
# 3）根据表达式分组
select year(payment_date),count(*)
  from PENALTIES
  group by year(payment_date);  

# 4）带有排序的分组：如果分组列和排序列相同，则可以合并group by 和order by子句
select teamno,count(*)
  from MATCHES
  group by teamno
  order by teamno desc;  
select teamno,count(*)
  from MATCHES
  group by teamno desc;  # 可以把desc(或者asc)包含到group by子句中简化
      
```

对于分组聚合注意：
　　通过select在返回集字段中，这些字段要么就要包含在group by语句后面，作为分组的依据，要么就要被包含在聚合函数中。我们可以将group by操作想象成如下的一个过程：首先系统根据select语句得到一个结果集，然后根据分组字段，将具有相同分组字段的记录归并成了一条记录。这个时候剩下的那些不存在与group by语句后面作为分组依据的字段就很有可能出现多个值，但是目前一种分组情况只有一条记录，一个数据格是无法放入多个数值的，所以这个时候就需要通过一定的处理将这些多值的列转化成单值，然后将其放在对应的数据格中，那么完成这个步骤的就是前面讲到的聚合函数，这也就是为什么这些函数叫聚合函数了。

#### 2、GROUP_CONCAT()函数

　　函数的值等于属于一个组的指定列的所有值，以逗号隔开，并且以字符串表示。

```mysql
# 1：对于每个球队，得到其编号和所有球员的编号
select teamno,group_concat(playerno)
  from MATCHES
  group by teamno; # 1 | 27,104,112,112,8 

# 2：得到所有的罚款编号列表

select group_concat(paymentno) from PENALTIES; # 1,2,3,4,5,6,7,8
```
如果没有group by子句，group_concat返回一列的所有值

##### 3、with rollup子句
> 用来要求在一条group by子句中进行多个不同的分组

用的比较少点，但是有时可以根据具体的需求使用

　　如果有子句GROUP BY E1,E2,E3,E4 WITH ROLLUP

　　那么将分别执行以下分组：[E1,E2,E3,E4]、[E1,E2,E3]、[E1,E2]、[E1]、[]

注意：[ ] 表示所有行都分在一组中

```mysql
# 按照球员的性别和居住城市，统计球员的总数；统计每个性别球员的总数；统计所有球员的总数
select sex,town,count(*)
  from PLAYERS
  group by sex,town with rollup;
  +-----+-----------+----------+
  | sex | town      | count(*) |
  +-----+-----------+----------+
  | F   | Eltham    |        2 |
  | F   | Inglewood |        1 |
  | F   | Midhurst  |        1 |
  | F   | Plymouth  |        1 |
  | F   | NULL      |        5 |
  | M   | Douglas   |        1 |
  | M   | Inglewood |        1 |
  | M   | Stratford |        7 |
  | M   | NULL      |        9 |
  | NULL | NULL      |       14 |
  +-----+-----------+----------+
```

##### 4、HAVING子句：对分组结果进行过滤

> 注意： 不能使用WHERE子句对分组后的结果进行过滤, 不能在WHERE子句中使用组函数，仅用于过滤行
```mysql
select playerno
  from PENALTIES
  where count(*)>1
  group by playerno;
# ERROR 1111 (HY000): Invalid use of group function
```
因为WHERE子句比GROUP BY先执行，而组函数必须在分完组之后才执行，且分完组后必须使用having子句进行结果集的过滤。

基本语法：
```mysql
SELECT select_expr [, select_expr ...]
   FROM  table_name
   [WHERE where_condition]
   [GROUP BY {col_name | expr} [ASC | DESC], ... [WITH ROLLUP]]
[HAVING where_condition]
```
__where子句 在分组前对记录进行过滤__

__having子句 在分组后对记录进行过滤__

```mysql
select salary,count(*) from salary_tab
  where salary>=2000
  group by salary
  having count(*)>=0;
  
select town,count(*)
  from PLAYERS
  group by town
  having birth_date>'1970-01-01';
# ERROR 1054 (42S22): Unknown column 'birth_date' in 'having clause'

select town,count(*)
  from PLAYERS
  group by town
  having town in ('Eltham','Midhurst');
```

1）HAVING可以单独使用而不和GROUP BY配合,如果只有HAVING子句而没有GROUP BY，表中所有的行分为一组

2）HAVING子句中可以使用组函数

3）HAVING子句中的列，要么出现在一个组函数中，要么出现在GROUP BY子句中(否则出错)

### 集合查询操作

union用于把两个或者多个select查询的结果集合并成一个
```mysql
SELECT ...
UNION [ALL | DISTINCT]
SELECT ...
[UNION [ALL | DISTINCT]
SELECT ...]
```

默认情况下，UNION = UNION DISTINCT

　　① 进行合并的两个查询，其SELECT列表必须在数量和对应列的数据类型上保持一致；

　　② 默认会去掉两个查询结果集中的重复行；默认结果集不排序；

　　③ 最终结果集的列名来自于第一个查询的SELECT列表

UNION ALL不去掉结果集中重复的行

注：联合查询结果使用第一个select语句中的字段名

```mysql
select * from t1;
+------+------+
| num  | addr |
+------+------+
|  123 | abc  |
|  321 | cba  |
+------+------+
select * from t2;
+------+------+
| id   | name |
+------+------+
|    1 | a    |
|    2 | A    |
+------+------+

select * from t1
  union
  select * from t2;
  +------+------+
  | num  | addr |
  +------+------+
  |  123 | abc  |
  |  321 | cba  |
  |    1 | a    |
  |    2 | A    |
  +------+------+
```

如果要对合并后的整个结果集进行排序，ORDER BY子句只能出现在最后面的查询中

## 查询函数

### 时间相关

##### datediff 返回值是相差的天数

```mysql
select datediff(now(), HIRE_DATE) from employee;  查询员工的雇佣天数
```

##### TIMESTAMPDIFF
> 参数设置，可以精确到天（DAY）、小时（HOUR），分钟（MINUTE）和秒（SECOND），使用起来比datediff函数更加灵活。对于比较的两个时间，时间小的放在前面，时间大的放在后面。

```mysql
# 相差1天
select TIMESTAMPDIFF(DAY, '2018-03-20 23:59:00', '2015-03-22 00:00:00');
# 相差49小时
select TIMESTAMPDIFF(HOUR, '2018-03-20 09:00:00', '2018-03-22 10:00:00');
# 相差2940分钟
select TIMESTAMPDIFF(MINUTE, '2018-03-20 09:00:00', '2018-03-22 10:00:00');
# 相差176400秒
select TIMESTAMPDIFF(SECOND, '2018-03-20 09:00:00', '2018-03-22 10:00:00');
# 获取当前时间
SET var_current_time = CONCAT(CURDATE(),' ',CURTIME());
# 时间比较
SET var_time_diff = TIMESTAMPDIFF(MINUTE, var_committime, var_current_time);

# 判断未审核的合同是否超过48小时未处理，如果超过则进行后续逻辑处理，否则不处理。
IF (var_time_diff > 2880) THEN 
    # 相关业务逻辑处理
```

### 字符相关

##### 1、LOWER(column|str)： 将字符串参数值转换为全小写字母后返回
```mysql
select lower('SQL Course');
```

##### 2、UPPER(column|str)： 将字符串参数值转换为全大写字母后返回
```mysql
select upper('Use MYsql');
```

##### 3、CONCAT(column|str1, column|str2,...)：将多个字符串参数首尾相连后返回

```mysql
select concat('My','S','QL');
select concat('My',null,'QL');
select concat(14.3,'mysql');

```
如果有任何参数为null，则函数返回null
如果参数是数字，则自动转换为字符串

##### 4、CONCAT_WS(separator,str1,str2,...)：将多个字符串参数以给定的分隔符separator首尾相连后返回
```mysql
select concat_ws(';','First name','Second name','Last name');
select concat_ws(',','id',null,'name');
```
> !!! 也就是函数圆括号里的第一个项目用来指定分隔符
注意：!!!如果有任何参数为null，则函数不返回null，而是直接忽略它

打开和关闭管道符号“|”的连接功能

PIPES_AS_CONCAT：将“||”视为字符串的连接操作符而非或运算符  || 管道连接符：

基本格式：
```mysql
select  列名1 || 列名2 || 列名3   from   表名;
select s_no || s_name || s_age from student;
```

在mysql中，进行上式连接查询之后，会将查询结果集在一列中显示(字符串连接)，列名是‘列名1 || 列名2 || 列名3’；

注意：

　　①如果不显示结果，是因为sql_mode参数中没有PIPES_AS_CONCAT，只要给sql_mode参数加入PIPES_AS_CONCAT，就可以实现像CONCAT一样的功能；

　　②如果不给sql_mode参数加入PIPES_AS_CONCAT的话，|| 默认是or的意思，查询结果是一列显示是1。

##### 5、SUBSTR(str,pos[,len])：从源字符串str中的指定位置pos开始取一个字串并返回

注意：
    ①len指定子串的长度，如果省略则一直取到字符串的末尾；len为负值表示从源字符串的尾部开始取起。
　　 ②函数SUBSTR()是函数SUBSTRING()的同义词。
```mysql
select substring('hello world',5); # 返回 o world 
select substr('hello world',5,3); # 返回 o w
select substr('hello world',-5); # 返回 word
```

##### 6、LENGTH(str)：返回字符串的存储长度

```mysql
select length('text'),length('你好'); # 返回 4, 6
```
注意：编码方式不同字符串的存储长度就不一样(‘你好’:utf8是6，gbk是4)


##### 7、CHAR_LENGTH(str)：返回字符串中的字符个数

```mysql
select char_length('text'),char_length('你好'); # 返回 4, 2
```
 

##### 8、INSTR(str, substr)：从源字符串str中返回子串substr第一次出现的位置
```mysql
select instr('foobarbar','bar'); # 返回 4
```
 

##### 9、LPAD(str, len, padstr)：在源字符串的左边填充给定的字符padstr到指定的长度len，返回填充后的字符串
```mysql
select lpad('hi',5,'??'); # 返回 ???hi
```

##### 10、RPAD(str, len, padstr)：在源字符串的右边填充给定的字符padstr到指定的长度len，返回填充后的字符串
```mysql
select rpad('hi',6,'??'); # 返回 hi???? 
```

##### 11、TRIM([{BOTH | LEADING | TRAILING} [remstr] FROM] str), TRIM([remstr FROM] str)：

从源字符串str中去掉两端、前缀或后缀字符remstr并返回；

如果不指定remstr，则去掉str两端的空格；

不指定BOTH、LEADING、TRAILING ，则默认为 BOTH。

```mysql
select trim('  bar  '); # 返回 bar
select trim(leading 'x' from 'xxxbarxxx'); # barxxx
select trim(both 'x' from 'xxxbarxxx'); # bar
select trim(trailing 'xyz' from 'barxxyz'); # barx
```

##### 12、REPLACE(str, from_str, to_str)：在源字符串str中查找所有的子串form_str（大小写敏感），找到后使用替代字符串to_str替换它。返回替换后的字符串

```mysql
select replace('www.mysql.com','w','Ww'); # WwWwWw.mysql.com
```
##### 13、LTRIM(str)，RTRIM(str)：去掉字符串的左边或右边的空格(左对齐、右对齐)

```mysql
SELECT  ltrim('   barbar   ') rs1, rtrim('   barbar   ') rs2; # barbar, barbar
```

##### 14、REPEAT(str, count)：将字符串str重复count次后返回

```mysql
mysql> select repeat('MySQL',3); # MySQLMySQLMySQL
```

##### 15、REVERSE(str)：将字符串str反转后返回

```mysql
select reverse('abcdef'); # fedcba
```

##### 16、CHAR(N,... [USING  charset_name])：将每个参数N解释为整数（字符的编码），并返回每个整数对应的字符所构成的字符串(NULL值被忽略)。
```mysql
select char(77,121,83,81,'76'),char(77,77.3,'77.3'); # MySQL, MM
#默认情况下，函数返回二进制字符串，若想返回针对特定字符集的字符串，使用using选项

SELECT charset(char(0x65)), charset(char(0x65 USING utf8)); # binary, utf8
```

##### 17、FORMAT(X,D[,locale])：以格式‘#,###,###.##’格式化数字X

D指定小数位数 locale指定国家语言(默认的locale为en_US)

```mysql
SELECT format(12332.123456, 4),format(12332.2,0); # 12,332.1235 | 12,332 
SELECT format(12332.2,2,'de_DE'); # 12.332,20 
```

##### 18、SPACE(N)：返回由N个空格构成的字符串
```mysql
select space(3);  #   
```

##### 19、LEFT(str, len)：返回最左边的len长度的子串
```mysql
select left('chinaitsoft',5); # china
```

##### 20、RIGHT(str, len)：返回最右边的len长度的子串
```mysql
select right('chinaitsoft',5); # tsoft
```

##### 21、STRCMP(expr1,expr2)：如果两个字符串是一样的则返回0；如果第一个小于第二个则返回-1；否则返回1
```mysql
select strcmp('text','text'); # 0
SELECT strcmp('text', 'text2'),strcmp('text2', 'text'); # -1, 1
```

### 数值函数
> 用来处理很多数值方面的运算，免去很多繁杂的判断求值的过程

##### 1、ABS(x)：返回 x 的绝对值

```mysql
select abs(-0.8),abs(0.8); # 0.8 0.8
```

##### 2、CEIL(x)：返回不小于 x 的最小整数，也就是说得大于或等于x的最小整数
同义词：ceiling(x)

```mysql
select ceil(1); # 1
select ceil(1.23),ceiling(-1.23) # 2 , -1
```

##### 3、FLOOR(x)：返回不大于 x 的最大整数(与CEIL的用法刚好相反)

```mysql
select floor(1.23),floor(-1.23); # 1, -2
```

##### 4、MOD(x，y)：返回数字x除以y后的余数：x mod y

和 x%y 的结果相同；模数和被模数任何一个为NULL(无效数)结果都为 NULL

```mysql
select mod(123,10),234%7,3 mod 2; #  3, 3, 1
select mod(3.14,3),mod(3,0); # 0.14 NULL 
```
注意：余数可以有小数；除数为0不抛出异常

##### 5、ROUND(X[,D])：将数字X四舍五入到指定的小数位数D

①如果不指定D，则默认为0

②如果D是负数，表示从小数点的左边进行四舍五入

```mysql
select round(1.58),round(1.298,1); # 2, 1.3
select round(1.58,0),round(1.298,-1); # 2, 0
```

##### 6、TRUNCATE(X,D)：将数字X截断到指定的小数位数D（不四舍五入）

①如果D为0，表示不要小数

②如果D是负数，表示从小数点的左边进行截断

```mysql
select truncate(1.999,1),truncate(1.999,0); # 1.9 1
select truncate(-1.999,1),truncate(123,-2); # -1.9 100
select round(1.235,2),truncate(1.235,2); # 1.24,  1.23 
```
注意：TRUNCATE 和 ROUND 的区别在于 TRUNCATE 仅仅是截断，而不进行四舍五入

##### 7、RAND()：返回一个随机浮点数v(0<=v<1.0)

```mysql
select rand(),rand(); # 0.7085628693071779 | 0.19879874978102627
select rand(1),rand(2),rand(1); #
select ceil(100*rand()),ceil(100*rand()) # 87, 75
```
RAND(x)：指定整数x，则用作种子值，产生一个可重复的数字序列

利用RAND()函数可以取任意指定范围内的随机数

①当在 WHERE 子句中使用RAND()时，每次当WHERE执行时都要重新计算 RAND()

②不能在ORDER BY子句中使用带有随机值的列
但是，可以以随机的顺序从表中检索行 `SELECT * FROM  players ORDER BY RAND();`

③ORDER BY RAND()常和LIMIT子句一起使用：`SELECT * FROM table1,table2 WHERE a=b AND c<d  ORDER BY RAND() LIMIT 1000;`