# Spring Boot的第一步

>　Spring Boot

## 搭建项目


### Intellij IDEA 搭建Srping　Boot项目

1 选择File New Project Spring Initialer点击next

2 修改Project的Group,Artifact,Name

3 选择Dependencies,勾选web>web,并选择最稳定的sb版本

4 选择Project存放的文件路径, finish后完成项目的创建

5 等待项目编译后,可删除　.mvn , mvnw, mvn.cmd这三个文件


#### 启动Srping Boot项目

1. 新建控制器

```java
package com.edgardeng.sbfirst.controller;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
public class WebController {

    @RequestMapping("/")
    private String index() {
        return "hello,spring boot";
    }
} 
```
2. 开启spring服务

方式一：　右键Application文件, 选择Run
方式二: 在菜单栏配置Run Configures ,点击Run　即可

3. 输入localhost:8080即可查看网页内容

#### 导出项目的jar包

1. 打开Project Structure 
2. 选择Artifacts,　+ JAR from modules dependencies
3. 选择module,main class,配置copy to output directory and link via manifest,并选择一个空路径
4. 打开Build > Build 选择Artifacts.
5. 初次打包点击build,如果不是请点击Rebuild
6. 在out目录下,运行 java -jar xxxx.jar 即可启动服务
