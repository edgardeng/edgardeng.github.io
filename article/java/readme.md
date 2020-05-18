# Java
> 

## 1. java基础知识

### 1.1 Java的语言基础

  1. 语言概述
  2. 基本变量类型
  3. 运算法
  4. 字符串
  5. 流程控制
  6. 数组
  7. Annotation 
  8. Lambda表达式

### 1.2 Java的面向对象 
  1. 类的定义与使用
  2. 静态属性及方法
  3. 继承
  4. 包管理
  5. 枚举
  6. 反射
  7. 接口与抽象类
  8. 链表
  9. 代码块
  10. 范型
  ClassLoader类加载器

### 1.3 Java的集合
  1. 集合接口
  2. 列表
  3. Map
  4. 树
  5. 排序与查找
  
  
### 1.4 异常

### 1.5 高级开发

#### 多线程

1. 进程与线程（1课时）
2. Java多线程实现（5课时）
3. 多线程常用操作方法（3课时）
4. 线程的同步与死锁（3课时）
5. 线程池（2课时）
6. 常用类（6课时）

#### 网络编程

#### 正则表达式

#### I/O操作

 1. File文件操作类（4课时）
 2. 字节流与字符流（7课时）
 3. 字符编码（2课时）
 4. 内存操作流（2课时）
 5. Stream数据流（3课时）

#### 其他

  * 比较器

  * 国际化程序

## 2. 工具

### Maven

包管理
pom文件
内置命令
插件
私服

### Gradle

## 3. Spring框架

> 理念：使现有技术更加实用。本身是大杂烩，整合现有的框架技术。
  
> 优点：轻量级框架，IOC容器控制反转，Aop面向切面编程，对事务的支持，对框架的支持...

### 3.1 单元测试

junit

### 3.2 Spring Core

* Ioc
    * 依赖注入
    * Application Context
    * Bean配置
    * SpEL
    * 零配置
* AOP
    * AOP意义
    * 实现方法
    * 基本概念
    * 两种配置
    * Spring事务
    
依赖控制
容器
自动装配
切面编程（AOP， Aspects）

### 3.3 Web
  * http协议
  * http method GET/POST
  * HttpClient
  * json
  * xml
  * Servlet
  
### 3.3 Spring Boot

  * 入门与配置
    * yml 语法介绍
    * @ConfigurationProperties注解将.yml/.properties 配置文件值注入到Java Bean
    * 注解@ConfigurationProperties 和 @Value 对比
    * @PropertySource 注解的使用
    * @ImportResource 注解的使用
    * 注解方式将组件添加到 IOC 容器
    * profile 多环境支持
    * 内部/外部配置文件加载、优先级问题
    * 自动配置原理分析
    
  * 日志
    *  slf4j + logback 的日志组合
    * 【日志多环境下按指定条件滚动输出】
    * 【异常发送邮件提醒】
  * web
    * rest
    * 路径映射 参数传递
    * 集成FreeMarker
    * 集成Thymeleaf
    * 使用WebJars
    * 国际化(i18n)使用
    * 文件上传下载
    * 邮件发送
    * 对 js、css 等静态资源的映射规则
    * Spring Boot 错误处理机制源码分析
    * Spring Boot 自定义异常内容
    * 修改嵌入式 Servlet 容器配置
    * 自定义 Servlet
    * 自定义 Filter
    * 自定义 Listener
    
  *  数据访问
    * 整合 JDBC
      * 核心API
      * DriverManager
      * Driver
      * Connection
      * Statement
      * ResultSet
      * RowSet
      * DatabaseMetaData
      * ResultSetMetaData
      * Types
      * SQLException    
    * 整合 druid
    * 整合 MyBatis 
    * 整合 通用 Mapper & 代码生成器使用
    * 整合 MyBatis Plus，
  * 缓存
  * 消息
  * 自定义starters
  * 任务
  * 安全
    * shiro安全管理
    * 使用SpringSecurity
  * 监控学习
    * Actuator监控
    * Admin监控
    * 阿里巴巴Druid监控
  * 在 Intellij IDEA 开发中的热部署
  * 
  * 权限控制
  * JDBC
    
  * 操作步骤
      1 加载驱动 2 创建连接 3 创建语句 4 执行语句 5 操作结果集 6 释放资源
  * 事务
  * 连接池

### 3.4 Spring Cloud


#### 组件

## 4. 应用服务

### Mysql

### Mybatis

### 缓存

### NoSQL （MongoDB）

### 队列

### 反向代理

### Linux

### Docker

## 参考

* [6种 @Transactional 注解失效场景](https://blog.csdn.net/hollis_chuang/article/details/105525239)

* [spring-boot:第一优化-bean的加载](https://blog.csdn.net/geyunfei_hit/article/details/105132010)

* [JVM笔记-性能监控与分析工具](https://mp.weixin.qq.com/s/GzPRP6TZYwsr-omHMbCMlA)
