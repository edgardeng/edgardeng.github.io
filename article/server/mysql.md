<!--2019-04-05 22:00-->
# MySQL
> MySQL的安装和介绍

## 安装

### 使用Docker安装Mysql
```
   docker pull mysql        # 拉取镜像
   docker images            # 查看镜像
   docker run --name mysqldb -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql  # 启动容器
   （docker run -p 3306:3306 --name mymysql -v $PWD/conf/my.cnf:/etc/mysql/my.cnf -v $PWD/logs:/logs -v $PWD/data:/mysql_data -e MYSQL_ROOT_PASSWORD=123456 -d mysql:latest
    
   docker start mysqldb                 # 启动容器
   docker exec -it mysqldb /bin/bash    # 进入容器
   docker stop mysqldb                  # 关闭容器

```

### Linux安装Mysql
```
  https://www.mysql.com/downloads/
  
  sudo service mysql start  # 启动mysql
  sudo service mysql stop  # 停止mysql
  sudo service mysql status # 查看mysql
  
```

## 服务管理



## 连接mysql

1. 启动Mysql
```
    mysqld
    # mysqld: ready for connections. Version: '5.7.18'  socket: '/tmp/mysql.sock'  port: 3306  Homebrew
```
2. root用户登录
```
    mysql -h localhost -u root                                  # 以root身份进入，一开始不需要密码
    > set password for root@localhost = password('123456');     # 修改root用户的密码
    > exit;                                                     # 退出                                 
    mysql -h localhost -u root -p                               # 以root身份重新进入，需要密码
    # Enter password: 
```

## 使用Mysql 

> 进入mysql后，数据库语句需要分号;

### 创建用户

```
    > grant all privileges on test.* to user_test@localhost identified by '123456'
      # 创建一个密码123456的user_test用户，并拥有test数据库的所有权限

    > create user 'test' identified by '123456'  # 创建用户
    > delete from user where User='test' and Host='localhost';
    > update user set host = '%' where user = 'root';
    > ALTER USER 'root'@'localhost' IDENTIFIED BY '123456'; # 修改密码
    > grant all privileges on test.* to 'user_test'@'localhost'
      # 授权给user_test用户，并拥有test数据库的所有权限
    > use mysql;                    # root用户进入 mysql
    > select user,host from user ;  # 查看数据库用户
    > show grants for test;         # 查看test用户的权限
    > flush privileges;             # 刷新权限；        
    
```
###  创建数据库
```
  > create database dearabao;
  > show databases;
  > use dearabao;
  > create table niuzi (name varchar(20));
  > show tables;
```

### 执行sql脚本

* 方法一:
```
  mysql -h localhost -u root -p123456 < db.sql
```

* 方法二: (已连接数据库,此时的提示符为 mysql> )
```
  source F:\hello world\niuzi.sql (注意路径不用加引号的) 
  # 或者 \. F:\hello world\niuzi.sql (注意路径不用加引号的) 回车即可
```

### 遇到的问题

#### Mysql无法远程连接

  __1. 确定用户授权正确__

```
mysql> update user set host = '%' where user = 'root';
mysql> select host, user from user;
mysql> FLUSH PRIVILEGES;
mysql> GRANT ALL PRIVILEGES ON *.* TO 'myuser'@'%' IDENTIFIED BY 'mypassword' WITH GRANT OPTION;
```

  __2. 确定my.cnf配置正确__

>注释skip-networking和bind-address。配置文件在linux的位置: /etc/mysql/my.cnf。可能需要修改:/etc/mysql/mysql.conf.d/mysqld.cnf

```
#skip-external-locking
#bind-address = 127.0.0.1
bind-address = 0.0.0.0
#skip-name-resolve
```

  __3. 确定mysql的端口正确且可以被访问__