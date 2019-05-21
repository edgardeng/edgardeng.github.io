<!--2019-05-21 12:00-->
# PostgreSQL
>PostgreSQL是一个功能强大的开源对象关系数据库管理系统(ORDBMS)。 用于安全地存储数据; 支持最佳做法，并允许在处理请求时检索它们

## Install

###  use docker

1. pull image `docker pull postgres:9`

2. run container `docker run --name postgres9 -e POSTGRES_PASSWORD=123456 -p 5432:5432 -d postgres:9`

3. exec `docker exec -it postgres9 /bin/sh`

### use source 

## Basic


CREATE DATABASE database_name 


