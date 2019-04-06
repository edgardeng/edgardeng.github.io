# SQL Server
> Microsoft SQL Server 的简单使用和安装

## 安装

### Windows 安装
1. [下载地址](https://www.microsoft.com/zh-cn/sql-server/sql-server-downloads),选择中间的“Developer 版本

2. 选择以 管理员身份运行

3. **基本**安装,选择目录，即可完成安装

4. 安装[SSMS管理工具](https://docs.microsoft.com/zh-cn/sql/ssms/download-sql-server-management-studio-ssms)

### 在Docker上安装MSSQL(SQL Server)

1. 查找镜像 `docker search mssql`

2. 下载镜像 `docker pull mcr.microsoft.com/mssql/server:2017-GA-ubuntu`

3. 创建并运行容器 `docker run --name mssql2017 -m 512m -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=yourPassword' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2017-GA-ubuntu`

4. 修改密码 `sudo docker exec -it sql1 /opt/mssql-tools/bin/sqlcmd  -S localhost -U SA -P '<yourPassword>'  -Q 'ALTER LOGIN SA WITH PASSWORD="<YourNewStrong!Passw0rd>" `

5. 登录容器 `docker exec -it mssql2017 /bin/bash`

6. 使用sqlcmd连接数据库 `/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P '<Your!Passw0rd>'`

7. 执行SQL语句创建数据库 `CREATE DATABASE DB_Test`

8. 还原数据库

    在容器内先创建一个文件夹  `mkdir /var/opt/mssql/backup`
    
    在宿主把.bak备份文件复制到容器 `sudo docker cp /Users/front/Downloads/beifen.bak MSSQL_1433:/var/opt/mssql/backup`
    
    运行sqlcmd到逻辑文件名称和备份内的路径的列表容器内 `sudo docker exec -it MSSQL_1433 /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'yourStrong(!)Password' -Q 'RESTORE FILELISTONLY FROM DISK = "/var/opt/mssql/backup/beifen.bak"' | tr -s ' ' | cut -d ' ' -f 1-2 `

## 数据库使用

### 在Java中连接SQL Server

1. 依赖

```xml
<dependency>
    <groupId>com.microsoft.sqlserver</groupId>
    <artifactId>mssql-jdbc</artifactId>
    <version>7.2.1.jre8</version>
</dependency>
```

2. 连接测试

```java
import java.sql.Connection;
import java.sql.DriverManager;
public class test {
	public static void main(String[] srg) {
		String driverName = "com.microsoft.sqlserver.jdbc.SQLServerDriver"; 
		//加载JDBC驱动
		String dbURL = "jdbc:sqlserver://localhost:1433; DatabaseName=student"; 
		//连接服务器和数据库
		String userName = "sa"; //默认用户名
		String userPwd = "12345678"; //密码
		Connection dbConn;
		try {
		   Class.forName(driverName);
		   dbConn = DriverManager.getConnection(dbURL, userName, userPwd);
		   System.out.println("Connection Successful!"); 
		} catch (Exception e) {
		   e.printStackTrace();
		} 
	}
}

```

### 数据类型

__Character 字符串：__

|数据类型	|描述	|存储|
|----|----|----|
|char(n)	|固定长度的字符串。|最多 8,000 个字符。|
|varchar(n)	|可变长度的字符串。|最多 8,000 个字符。	 |
|varchar(max)	|可变长度的字符串。|最多 1,073,741,824 个字符。|	 
|text	|可变长度的字符串。|最多 2GB 字符数据。	 |

Unicode 字符串：

|数据类型	|描述	|存储|
|----|----|----|
|nchar(n)	|固定长度的 Unicode 数据。|最多 4,000 个字符。 |	 
|nvarchar(n)	|可变长度的 Unicode 数据。|最多 4,000 个字符。 |	 
|nvarchar(max)	|可变长度的 Unicode 数据。|最多 536,870,912 个字符。 |	 
|ntext	|可变长度的 Unicode 数据。|最多 2GB 字符数据。 |	 

Binary 类型：

|数据类型	|描述	|存储|
|----|----|----|
|bit	|允许 0、1 或 NULL||	 
|binary(n)	|固定长度的二进制数据|。最多 8,000 字节。	 |
|varbinary(n)	|可变长度的二进制数据。|最多 8,000 字节。|	 
|varbinary(max)	|可变长度的二进制数据。|最多 2GB 字节。|	 
|image	|可变长度的二进制数据。|最多 2GB。	| 

Int 类型

|数据类型	|描述	|存储|
|----|----|----|
|tinyint	 |允许从 0 到 255 的所有数字。 |	1 字节 |
|smallint	 |允许从 -32,768 到 32,767 的所有数字。 |	2 字节 |
|int	 |允许从 -2,147,483,648 到 2,147,483,647 的所有数字。	 |4 字节 |
|bigint	 |允许介于 -9,223,372,036,854,775,808 和 9,223,372,036,854,775,807 之间的所有数字。	 |8 字节 |

Date 类型：

|数据类型	|描述	|存储|
|----|----|----|
 |datetime	 |从 1753 年 1 月 1 日 到 9999 年 12 月 31 日，精度为 3.33 毫秒。	 |8 bytes|
 |smalldatetime	 |从 1900 年 1 月 1 日 到 2079 年 6 月 6 日，精度为 1 分钟。	|4 bytes|
 |date	 |仅存储日期。从 0001 年 1 月 1 日 到 9999 年 12 月 31 日。	|3 bytes|
 |time	 |仅存储时间。精度为 100 纳秒。	|3-5 bytes|
 |datetimeoffset	 |与 datetime2 相同，外加时区偏移。	|8-10 bytes|
 |timestamp	 |存储唯一的数字，每当创建或修改某行时，该数字会更新。timestamp 基于内部时钟，不对应真实时间。|每个表只能有一个 timestamp 变量。|	 

其他数据类型

|数据类型	|描述	|存储|
|----|----|----|
|sql_variant	|存储最多 8,000 字节不同数据类型的数据，除了 text、ntext 以及 timestamp。| |
|uniqueidentifier	|存储全局标识符 (GUID)。| |
|xml	|存储 XML 格式化数据。最多 2GB。| |
|cursor	|存储对用于数据库操作的指针的引用。| |
|table	|存储结果集，供稍后处理。| |


### 数据库命令

```shell
CREATE DATABASE TestDB  # 创建测试数据库
SELECT Name from sys.Databases # 查询以返回服务器上所有数据库的名称
GO # 执行命令

DROP DATABASE TestDB;  # 删除数据库，要先切换到其他数据库
GO # 执行命令

QUIT # 退出SQLCMD
```
> 必须在新行中键入 GO 才能执行以前的命令

#### 表

```
# 建表 （如果您是管理员，则 dbo 是默认架构。 dbo 代表数据库所有者）。
CREATE TABLE dbo.Products  
   (ProductID int PRIMARY KEY NOT NULL,  
   ProductName varchar(25) NOT NULL,  
   Price money NULL,  
   ProductDescription text NULL)  
GO  
# 删除表内容
DELETE FROM Products;  
# 删除表
DROP TABLE Products;
# 查看所有的表
SELECT table_name = T.name , T.create_date ,T.modify_date FROM sys.tables AS T
# 查看表的列
SELECT
A.name AS table_name,
B.name AS column_name,
C.value AS column_description
FROM sys.tables A
INNER JOIN sys.columns B ON B.object_id = A.object_id
LEFT JOIN sys.extended_properties C ON C.major_id = B.object_id AND C.minor_id = B.column_id
WHERE A.name = 'Sys_User'
# 查看表的列
select column_name,data_type from information_schema.columns 
where table_name = 'Sys_User'

```
#### 数据

```
# 插入数据
INSERT dbo.Products (ProductName, ProductID, Price, ProductDescription)  
    VALUES ('Screwdriver', 50, 3.17, 'Flat head')  
INSERT dbo.Products VALUES (75, 'Tire Bar', NULL, 'Tool for changing tires.')  
# 更新数据
UPDATE dbo.Products  SET ProductName = 'Flat Head Screwdriver' WHERE ProductID = 50 
# 查询数据
SELECT ProductID, ProductName, Price, ProductDescription FROM dbo.Products 
SELECT * FROM Products   
SELECT ProductID, ProductName, Price, ProductDescription FROM dbo.Products WHERE ProductID < 60  
SELECT ProductName, Price * 1.07 AS CustomerPays FROM dbo.Products 

```

#### 视图

```shell
# 创建视图
CREATE VIEW vw_Names AS SELECT ProductName, Price FROM Products; 
# 查询视图数据
SELECT * FROM vw_Names; 
# 删除视图
DROP VIEW vw_Names; 
```
