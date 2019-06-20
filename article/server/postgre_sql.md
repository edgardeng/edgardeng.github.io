<!--2019-05-21 12:00-->
# PostgreSQL 介绍
>PostgreSQL是一个功能强大的开源对象关系数据库管理系统(ORDBMS)。 用于安全地存储数据; 支持最佳做法，并允许在处理请求时检索它们

## Install

###  use docker

    1. pull image `docker pull postgres:9`
    
    2. run container `docker run --name postgres9 -e POSTGRES_PASSWORD=123456 -p 5432:5432 -d postgres:9`
    
    3. exec `docker exec -ti postgres9 /bin/sh`

### use source 

## Basic

1. 登录

    ```sql
    psql -U username -d dbname -h hostip -p port
    ```
    
2. 创建数据库

    ```sql
    CREATE DATABASE database_name;
     \l  # 列出所有的数据库
    drop database database_name;
    ```
    
3. 创建用户

    ```sql
    create user test ;
    create database db_test owner test;
    alter user test password '123456';
    grant all on DATABASE db_test to test;
    ```
    
4. 切换数据库

    ```sql
    \c dbname
    ```
    
5. 列出当前数据库的所有表

    ```sql
    \d 
    ```

6. 查看指定表的所有字段

    ```SQL
    \d  tablename
    ```

7. 查看指定表的基本情况

    ```SQL
    \d+  tablename
    ```

8. 退出操作

    ```SQL
    q
    ```

## Operate 操作

### Table 表操作

1. 新建表
    ```SQL
    create table student(
    id INTEGER,
    class_name character(100), 
    age INTEGER,
    name character(100),
    description TEXT,
    PRIMARY KEY(id,class_name)
    );
    
    create table CREATETASK_CHKID_N( 
    id SERIAL PRIMARY KEY, 
    chk_id TEXT, 
    n INTEGER
    );
    # 其中SERIAL代表自增，默认从1开始增加，每次自增1。
    
    ```
2. 清空表
    ```sql
    delete from [表名]
    
    TRUNCATE TABLE  [表名]  
    ```
    区别：Truncate table 表名 (注:不带where语句) 速度快,而且效率高。
    
    因为DELETE 语句每次删除一行，并在事务日志中为所删除的每行记录一项。TRUNCATE TABLE 通过释放存储表数据所用的数据页来删除数据，并且只在事务日志中记录页的释放

3. 删除表
    ```SQL
    drop table [表名];
    ```

4. 修改表结构

    ```sql
    # 添加字段
    alter table [表名] add column [字段名] [类型];
    
    # 更改字段
    alter table [表名] rename column [旧字段名] to [新字段名];
    
    # 例：把表table_ex字段col_1限制非空去掉：
    ALTER TABLE table_eg ALTER col_1 drop not NULL
    
    # 更改字段属性，含空格
    
    # 如果把字段colname把属性Text转化为int，原来text里面存在空啥的，可以
    ALTER TABLE tablename ALTER COLUMN colname TYPE int USING (trim(colname)::integer);
    
    # 更改字段由int4-->int8
    alter table test_data alter column task_id type bigint using task_id::bigint
    
    # 删除字段
    alter table [表名] drop column [字段名];
    ```
  
### Data 数据操作

1. 表中插入一行数据

    ```sql
    insert into [表名] (字段1,字段2) values (值1,值2);

    insert into assist_info (id, maat_id, block_type) values ('F006', 'F7775', 1)  

    insert into test (no, "Name") values ('123', 'jihite');

    ```

    如果表中字段有大写的字段，则需要对应的加上双引号。例：

    值用单引号引起来('')，不能用双引号（""）

2. 表中删除一行数据
    ```sql
    delete from [表名] where [该行特征];
    ```

3. 修改表中数据

    ```sql
    update [表名] set [目标字段名]=[目标值] where [该行特征]
    ```
    
4. 排序
    ```sql
    SELECT column-list  
    FROM table_name  
    [WHERE condition]  
    [ORDER BY column1, column2, .. columnN] [ASC | DESC];
    
    SELECT *   
    FROM EMPLOYEES 
    ORDER BY name , address DESC;
    ```
    
5.  条件查询 `AND, OR ,AND & OR ,NOT ,LIKE ,IN ,NOT IN ,BETWEEN`

    ```sql
    SELECT * FROM EMPLOYEES WHERE SALARY > 120000 AND ID <= 4; 

    SELECT * FROM EMPLOYEES WHERE SALARY > 120000 OR SALARY < 1000;

    SELECT * FROM EMPLOYEES WHERE (NAME = 'Minsu' AND ADDRESS = 'Delhi')  OR (ID>= 8);

    SELECT * FROM EMPLOYEES WHERE address IS NOT NULL;

    SELECT * FROM EMPLOYEES WHERE AGE IN (19, 21); 

    SELECT * FROM EMPLOYEES WHERE NAME LIKE 'Ma%'; # Ma 开头的

    SELECT * FROM EMPLOYEES WHERE address LIKE '%大道%';  # 含‘大道‘的

    SELECT * FROM EMPLOYEES WHERE AGE BETWEEN 24 AND 27; # 在24~27之间(含24，27)的
    ```
