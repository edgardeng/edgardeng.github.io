# DockerFile 和 DockerCompose

> Dockfile是一个用于编写docker镜像生成过程的文件

## Dockfile

>在dockfile的文件夹路径下执行命令:docker build --tag name:tag .，就可以按照描述构建一个镜像了。name是镜像的名称，tag是镜像的版本或者是标签号，不写就是lastest。注意后面有一个空格和点。

### Dockfile语法

Dockerfile的基本指令有十三个，分别是：FROM、MAINTAINER、RUN、CMD、EXPOSE、ENV、ADD、COPY、ENTRYPOINT、VOLUME、USER、WORKDIR、ONBUILD。

#### 1. FROM

　　用法：`FROM <image>`

　　说明：第一个指令必须是FROM了，其指定一个构建镜像的基础源镜像，如果本地没有就会从公共库中拉取，没有指定镜像的标签会使用默认的latest标签，可以出现多次，如果需要在一个Dockerfile中构建多个镜像。

#### 2. MAINTAINER

　　用法：`MAINTAINER <name> <email>`

　　说明：描述镜像的创建者，名称和邮箱

#### 3. RUN
　　用法：`RUN "command" "param1" "param2"`

　　说明：RUN命令是一个常用的命令，执行完成之后会成为一个新的镜像，这里也是指镜像的分层构建。一句RUN就是一层，也相当于一个版本。这就是之前说的缓存的原理。我们知道docker是镜像层是只读的，所以你如果第一句安装了软件，用完在后面一句删除是不可能的。所以这种情况要在一句RUN命令中完成，可以通过&符号连接多个RUN语句。RUN后面的必须是双引号不能是单引号（没引号貌似也不要紧），command是不会调用shell的，所以也不会继承相应变量，要查看输入RUN "sh" "-c" "echo" "$HOME"，而不是RUN "echo" "$HOME"。

#### 4. CMD
　　用法：`CMD command param1 param2`

　　说明：CMD在Dockerfile中只能出现一次，有多个，只有最后一个会有效。其作用是在启动容器的时候提供一个默认的命令项。如果用户执行docker run的时候提供了命令项，就会覆盖掉这个命令。没提供就会使用构建时的命令。

#### 5. EXPOSE
　　用法：`EXPOSE <port> [<port>...]`

　　说明：告诉Docker服务器容器对外映射的容器端口号，在docker run -p的时候生效。

#### 6. ENV
　　用法：`EVN <key> <value>`只能设置一个, `EVN <key>=<value>`允许一次设置多个

　　说明：设置容器的环境变量，可以让其后面的RUN命令使用，容器运行的时候这个变量也会保留。

#### 7. ADD
　　用法：`ADD <src>   <dest>`

　　说明：复制本机文件或目录或远程文件，添加到指定的容器目录，支持GO的正则模糊匹配。路径是绝对路径，不存在会自动创建。如果源是一个目录，只会复制目录下的内容，目录本身不会复制。ADD命令会将复制的压缩文件夹自动解压，这也是与COPY命令最大的不同。

#### 8 COPY
　　用法：`COPY <src> <dest>`

　　说明：COPY除了不能自动解压，也不能复制网络文件。其它功能和ADD相同。

#### 9. ENTRYPOINT
　　用法：`ENTRYPOINT "command" "param1" "param2"`

　　说明：这个命令和CMD命令一样，唯一的区别是不能被docker run命令的执行命令覆盖，如果要覆盖需要带上选项--entrypoint，如果有多个选项，只有最后一个会生效。

#### 10. VOLUME
　　用法：`VOLUME ["path"]`

　　说明：在主机上创建一个挂载，挂载到容器的指定路径。docker run -v命令也能完成这个操作，而且更强大。这个命令不能指定主机的需要挂载到容器的文件夹路径。但docker run -v可以，而且其还可以挂载数据容器。

#### 11. USER
　　用法：`USER daemon`

　　说明：指定运行容器时的用户名或UID，后续的RUN、CMD、ENTRYPOINT也会使用指定的用户运行命令。

#### 12. WORKDIR
　　用法: `WORKDIR path`

　　说明：为RUN、CMD、ENTRYPOINT指令配置工作目录。可以使用多个WORKDIR指令，后续参数如果是相对路径，则会基于之前的命令指定的路径。如：WORKDIR  /home　　WORKDIR test 。最终的路径就是/home/test。path路径也可以是环境变量，比如有环境变量HOME=/home，WORKDIR $HOME/test也就是/home/test。

#### 13. ONBUILD
　　用法：`ONBUILD [INSTRUCTION]`

　　说明：配置当前所创建的镜像作为其它新创建镜像的基础镜像时，所执行的操作指令。意思就是，这个镜像创建后，如果其它镜像以这个镜像为基础，会先执行这个镜像的ONBUILD命令。

###  Dockerfile例子

一个使用安装包安装的tomcat例子：
```dockerfile
FROM centos
MAINTAINER nobody "xx@qq.com"
RUN mkdir -p /opt/jdk/
RUN mkdir -p /opt/tomcat/
ADD jdk1.7.0_79 /opt/jdk/
ADD tomcat  /opt/tomcat/
ENV CATALINA_HOME /opt/tomcat
ENV JAVA_HOME /opt/jdk
EXPOSE 8080
ENV PATH $PATH:$JAVA_HOME/bin
CMD ["/opt/tomcat/bin/catalina.sh","run"]
```

安装Nginx的例子

1.拉取基础镜像 `docker   pull   centos`

2.下载源代码软件包 `nginx-1.6.0.tar.gz `

3.编辑dockerfile文件

```dockerfile
FROM  centos

MAINTAINER 2018-04-011 lipengcheng 777@qq.com
RUN  yum -y install gcc*  make pcre-devel zlib-devel
ADD nginx-1.6.0.tar.gz  /usr/src/
WORKDIR /usr/src/nginx-1.6.0/
RUN useradd -s /sbin/nologin -M nginx
RUN ./configure --prefix=/usr/local/nginx --user=nginx --group=nginx --with-http_stub_status_module && make && make install
RUN ln -s /usr/local/nginx/sbin/* /usr/local/sbin/
EXPOSE 80
WORKDIR /
RUN nginx
CMD ["nginx", "-g", "daemon off;"]
```

4.执行dockerfile文件 `docker build -t centos-nginx:test ./ `

5.创建nginx的容器,并做端口映射 `docker run -itd --name nginx1 -p 80:80 9b9494bee7cc（镜像ID）`


## Compose
 
> Compose负责实现对 Docker 容器集群的快速编排。Compose定位是:定义和运行多个 Docker 容器的应用（Defining and running multicontainer Docker applications）

### 安装与卸载

* 二进制包安装

从 官方 GitHub Release 处直接下载编译好的二进制文件即可。
```text
sudo curl -L https://github.com/docker/compose/releases/download/1.17.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

```
卸载,删除二进制文件即可。`sudo rm /usr/local/bin/docker-compose`

* PIP 安装

将 Compose 当作一个Python应用来从 pip 源中安装。`sudo pip install -U docker-compose`

卸载命令： `sudo pip uninstall docker-compose`


### 两个重要的概念：

* 服务 ( service )：一个应用的容器，实际上可以包括若干运行相同镜像的容器实例

* 项目 ( project )：由一组关联的应用容器组成的一个完整业务单元，在 dockercompose.yml 文件中定义。


### 简单的例子

用docker创建一个Python网站应用容器

1. 编写web应用
```python
# app.py
from flask import Flask
from redis import Redis

app = Flask(__name__)
redis = Redis(host="redis",port=6379)

@app.route("/")
def hello():
    count = redis.incr('hits')
    return 'hello world! {}'.format(count)

if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)
```

2. 编写Dockerfile文件
```dockerfile
FROM python:3.6-alpine
ADD . /code
WORKDIR /code
RUN pip install redis flask
CMD ["python","app.py"]
```

3. 编写 docker-compose.yml 文件
```yaml
version: '3'
services:
    web:
        build: .
        ports:
            - "5000:5000"
    redis:
        images: "redis:alpine"
```

4. 运行 compose 项目 `docker-compose up`. 此时访问本地 5000 端口，每次刷新页面，计数就会加 1。
```dockerfile
  mongo:
    build: ./mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example

  nginx:
    build: ./nginx
    depends_on:
      - php-fpm
    links:
      - php-fpm:php-fpm
    volumes:
      - ../app:/data/www:rw
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./nginx/certs/:/etc/nginx/certs
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ../logs/nginx:/var/log/nginx
    ports:
      - "80:80"
      - "8080:8080"
      - "443:443"
    restart: always
    command: nginx -g 'daemon off';
```


