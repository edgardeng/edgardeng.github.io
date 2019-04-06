# Oracle
> Oracle的安装和基本使用

## 安装

### Docker安装 Oracle-xe-11g

1. docker pull wnameless/oracle-xe-11g
   (Ubuntu16.04: docker pull wnameless/oracle-xe-11g:16.04)

2. docker run --name oracle11g -d -p 1521:1521 -e ORACLE_ALLOW_REMOTE=true wnameless/oracle-xe-11g  # 启动容器

3. hostname: localhost
   port: 1521
   sid: xe 或 XE
   username:system
   password:oracle
 
4. docker exec -it oracle11g /bin/bash    # 进入容器
   docker exec -it --privileged=true oracle11g /bin/bash # 给权限进入容器
```
   sqlplus  进入命令行工具
   SQL> create tablespace heisai LOGGING datafile '/u01/app/oracle/oradata/heisai.dbf' SIZE 100M 创建表空间
   SQL> conn hr/123456 切换用户 (如果是使用sys登录，必须加上[as sysdba]，否则无法登录。)
```

5. docker stop oracle11g # 关闭容器

6. docker start oracle11g # 启动容器

### Oracle连接器

#### jdbc6 

1. 下载Oracle Database [12.1.0.2 JDBC Driver](https://www.oracle.com/technetwork/database/application-development/jdbc/downloads/index.html) .(`!!!无法在maven中直接下载jdbc6`)

2. 使用mvn命令，安装到本地库
```
./mvn install:install-file \
    -Dfile=/Users/dengxixi/Downloads/OJDBC-Full/ojdbc6-12.1.0.2.jar \
    -DgroupId=com.oracle \
    -DartifactId=ojdbc6 \
    -Dversion=12.1.0.2 \
    -Dpackaging=jar \
    -DgeneratePom=true
```    

### 在Spring Boot中使用 oracle

在配置文件中，添加相关参数

```yaml
master:
  datasource:
    url: jdbc:oracle:thin:@192.168.0.11:1521:sid
    username: heisai
    password: 123456
    driver-class-name: oracle.jdbc.driver.OracleDriver
    hikari:
      minimum-idle: 5
      maximum-pool-size: 15
      connection-test-query: select 1
      max-lifetime: 1800000
      connection-timeout: 30000
      pool-name: FebsHikariCP
```

在pom文件中，添加依赖项目

```xml
 <!-- Spring Boot JDBC --> 
 <dependencies>
    <dependency> 
	    <groupId>org.springframework.boot</groupId>
	    <artifactId>spring-boot-starter-jdbc</artifactId>
    </dependency>
    <dependency>
       <groupId>com.oracle</groupId>
       <artifactId>ojdbc14</artifactId>
       <version>10.2.0.4.0</version>
    </dependency>
 </dependencies>
```

## Oracle的使用

### 命令行语句

#### 用户
```
> show user;  # 查询当前用户

> grant connect,resource,dba to username; # 添加用户权限
> grant create session to username;
> grant craete view to 用户 # 授权给 用户创建视图

> create user 用户名 identified by 口令;  # 创建用户
> alter user 用户名 identified by 改变的口令; # 修改密码
> create user 用户名 identified by 123456 default tablespace 表空间 ; # 创建用户，并且指定默认表空间：
> alter user 用户名 default tablespace 表空间; # 修改指定表空间

> drop user 用户名; # 删除用户
> drop user 用户名 cascade; # 删除用户（当用户拥有对象是）
> grant connect, resource to 用户名;       # 授权
> revoke connect, resource from test;     # 取消授权

> grant select on SDE.student_view to test; # 将视图授权给用户
> grant all on SDE.student to test;         # 将表授权给用户

```

#### 数据库（表空间）
```
# 创建数据库
> CREATE TABLESPACE MyDataBase LOGGING DATAFILE 'D:\Oracle\database\MyDataBase.dbf' SIZE 100M AUTOEXTEND ON NEXT 32M MAXSIZE 500M EXTENT MANAGEMENT LOCAL;
# 创建临时数据库  
> create temporary TABLESPACE MyDataBase_temp tempfile 'D:\Oracle\database\MyDataBase_temp.dbf' SIZE 100M AUTOEXTEND ON NEXT 32M MAXSIZE 500M EXTENT MANAGEMENT LOCAL;
# 删除数据库
> drop tablespace MyDataBase including contents and datafiles;  
> drop tablespace MyDataBase_temp including contents and datafiles;
# 查看所有的表空间
> SELECT tablespace_name FROM dba_tablespaces
# 查看所有的表
> select * from all_tables where owner='HEISAI';
# 查看所有的视图
> select * from all_views where owner='HEISAI';
> select * from tabs; # 查看所有的表
> select table_name from user_tables; # 查看当前用户创建的表
# 查看表的列
> select * from user_tab_columns where table_name = 'ACCESS_CARD_BRUSH_LOG_VIEW';
# 查看表的列注释
> select table_name,column_name,comments from user_col_comments;

```

#### 表单与视图

```
> create table user ( id number(4), passowrd char(18), name char(20), phone char(20), email varchar(32));
> alter table 表名 rename to 新表名 # 重命名表
> drop table 表名 # 删除表 
> alter table 表名 add (字段名 类型 默认值 空否)

> create view viewnames as select statement
> drop view viewname # 删除视图

```

#### 授权

__1. 授权角色__

oracle为兼容以前版本，提供三种标准角色（role）:connect/resource和dba.

```
1. connect role(连接角色)

--临时用户，特指不需要建表的用户，通常只赋予他们connect role. 
--connect是使用oracle简单权限，这种权限只对其他用户的表有访问权限，包括select/insert/update和delete等。
--拥有connect role 的用户还能够创建表、视图、序列（sequence）、簇（cluster）、同义词(synonym)、回话（session）和其他  数据的链（link）

2. resource role(资源角色)

--更可靠和正式的数据库用户可以授予resource role。
--resource提供给用户另外的权限以创建他们自己的表、序列、过程(procedure)、触发器(trigger)、索引(index)和簇(cluster)。
 
3. dba role(数据库管理员角色)

--dba role拥有所有的系统权限
--包括无限制的空间限额和给其他用户授予各种权限的能力。system由dba用户拥有
```
__2. 授权命令__

```
语法： grant connect, resource to 用户名;
例子： grant connect, resource to test;
```

__3. 撤销权限__

```
语法： revoke connect, resource from 用户名;
列子： revoke connect, resource from test;
```

__4. 自定义角色__

除了前面讲到的三种系统角色----connect、resource和dba，用户还可以在oracle创建自己的role。用户创建的role可以由表或系统权限或两者的组合构成。为了创建role，用户必须具有create role系统权限。

```
1. 创建角色
语法： create role 角色名;
例子： create role testRole;

2. 授权角色
语法： grant select on class to 角色名;
列子： grant select on class to testRole;

注：现在，拥有testRole角色的所有用户都具有对class表的select查询权限

3. 删除角色
语法： drop role 角色名;
例子： drop role testRole;

```

### 数据操作语句

#### 查询语句
```
--where子句
--查询部门编号是10的所有的员工
select * from emp where deptno = 10;

--查询部门中工资是3000的员工
select * from emp where sal = 3000;

--找到部门中编号是 7788的员工
select * from emp where empno = 7788;

--查询姓名为SCOTT的员工所有信息
--在使用where 查询条件，字符串是单引号而且区分大小写
select * from emp WHERE ename = 'SCOTT';

--查询所有在日期是1981年5月1日入职的员工信息
--select * from emp where hiredate = '1981-5-1';
--日期默认格式是   DD-MON-YYYY  查询条件按照日期来，日期也要加单引号
select * from emp where hiredate = '1/5月/1981';

--查询工资大于3000的员工
select * from emp where sal>=3000; ---注意：sal=>3000 是错误的！数据库将不认识此符号！

--查询工资范围在1500-3000的员工所有信息
select * from emp where sal>=1500 and sal<=3000;
-- between..and...表示介于 两个值之间，包涵边界值
select * from emp where sal between 1500 and 3000;

--查询姓名是KING和SCOTT的详细信息
select * from emp where ename = 'KING' or ename ='SCOTT';
--IN 表示出现在集合中的记录 
select * from emp where ename in ('KING','SCOTT');

--查询工资不等于3000的员工信息
select * from emp where sal <> 3000;    --method1
select * from emp where sal !=3000;    --method2
select * from emp where not sal = 3000;    --method3 取反运算

--查询所有没有提成的员工的信息
-- is null 表示某个字段为空   不为空 is not null
select * from emp where comm is not null;
-- 取反的意思 where not comm is null
select * from emp where not comm is null;
-- not 也可以代表取反的意思
select * from emp where  ename not in ('KING','SCOTT');

--查询所有姓名以s开头的员工信息
-- 使用 like 和 通配符
-- 两个通配符  %代表0个或者多个字符  _一个字符
select * from emp where ename like '%S';    ---字符（或是' '）里面严格区分大小写。建议全部大写书写语句！
--查询名字中带有0的
select * from emp where ename like '%O%';

--查询第二个字母是L的员工的所有信息
select * from emp where ename like '_L%';

--查询员工姓名中带有_的所有的信息
--ESCAPE ‘’ 相当于自己定义一个转义符
select * from emp where ename like '%a_%' ESCAPE 'a';

```  

#### 插入数据

```
> insert into 表名 values(所有列的值);  # 插入数据
> insert into test values(1,'zhangsan',20);
> insert into 表名(列) values(对应的值);
> insert into test(id,name) values(2,'lisi');
> insert into RESIDENT_INFO_VIEW values(5,1,2,'杨浦2',TO_DATE('1990-08-01','YYYY-MM-DD'),sysdate);
COMMIT ;
```

#### 修改数据
```
> update 表 set 列=新的值 [where 条件] -->更新满足条件的记录 # 更新数据
> update test set name='zhangsan2' where name='zhangsan'
> update 表 set 列=新的值 -->更新所有的数据
> update test set age=20;
> UPDATE tableA SET GENDER=2 WHERE GENDER=0;
>  commit;
> UPDATE tableA SET sal=8000,comm=9000 WHERE ename='SMITH';
> COMMIT ;
```
#### 删除数据

```
> delete from 表名 where 条件 -->删除满足条件的记录 #删除数据
> delete from test where id = 1;
> delete from test -->删除所有
  commit; -->提交数据
> rollback; -->回滚数据
  # delete方式可以恢复删除的数据，但是提交了，就没办法了 delete删除的时候，会记录日志 -->删除会很慢很慢
> truncate table 表名 # 删除所有数据，不影响表结构，不会记录日志，数据不能恢复 -->删除很快
> drop table 表名 # 删除所有数据，包括表结构一并删除，不会记录日志，数据不能恢复-->删除很快
```

#### 复制数据库

```
> insert into table1 (select * from table2); # 表数据复制
> create table table1 select * from table2 where 1>1;
> create table table1 select * from table2; # 复制表结构和数据
> create table table1 as select id, name from table2 where 1>1; # 复制指定字段

```

#### 注意事项

1. 执行 insert，update,delete 后，需要commit。才能真正改变数据库

2. 执行多条数据时应使用 begin和 end

```
 begin
 insert into test values(1,'zhangsan',20);
 commit;
 end;
```