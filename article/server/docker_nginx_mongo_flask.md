# 使用Docker部署Nginx+Flask+Mongo的应用

> Nginx做为服务器，Mongo为数据库支持，Flask为Python语言的Web框架，利用Docker的容器特性，可以简单地部署在linux服务器上

## 项目准备

项目主要目录如下

```
__ project-name
    |__ docker-file
        |__ ningx
            |__ Dockerfile
            |__ conf
                |__ nginx.conf
        |__ flask
            |__ Dockerfile
            |__ requirements.txt
        |__ mongo
            |__ Dockerfile
            |__ setup.sh
        |__ docker-compose.yml
    |__ src
        |__ app
            |__ ...
        |__ run.py
```

__简要说明__

docker-file目录为docker部署的配置文件

src目录为flask应用的python代码

## Docker的详细配置

### docker-compose配置

```yaml
version: '2.2'
services:
  mongo:
    build: ./mongo
    volumes:
      - "./mongo/db:/data/db"
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: 123456
  flask:
    build: ./flask
    links:
      - mongo
    ports:
      - "5000:5000"
    expose:
      - "5000"
    volumes:
      - ../src:/home/web
  nginx:
      build: ./nginx
      links:
        - flask
      volumes:
        - "./nginx/log:/var/log/nginx"
        - "../:/usr/share/nginx/html"
      ports:
        - "80:80"
        - "8080:8080"
        - "443:443"
      restart: always
```

### MongoDB的配置

/mongo/Dockerfile的内容如下

```Dockerfile

FROM mongo:3.6
# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# 设置工作目录
ENV WORKDIR /usr/local/work
ENV AUTO_RUN_DIR /docker-entrypoint-initdb.d
ENV INSTALL_MONGO_SHELL setup.sh
RUN mkdir -p $WORKDIR
# 复制数据库的初始化命令
COPY ./$INSTALL_MONGO_SHELL $AUTO_RUN_DIR/
RUN chmod +x $AUTO_RUN_DIR/$INSTALL_MONGO_SHELL

```
/mongo/setup.sh的内容如下

> 该文件的目的是，启动MongoDB后创建一个密码为test的用户test，并赋予它数据库test的读写操作

```sh
#!/bin/bash
mongo <<EOF
use admin;
db.auth('root', '123456');
use dmx_aluminum;
db.createUser({user:'test',pwd:'test',roles:[{role:'readWrite',db:'test'}]});
db.createCollection("user");
EOF
```

### Flask应用的配置

/flask/Dockerfile的内容如下

```Dockerfile
FROM python:3.6
# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 设置工作区
RUN mkdir -p /home/web
WORKDIR /home/web
# 添加依赖
ADD requirements.txt /home/web/requirements.txt
RUN pip3 install -i https://pypi.douban.com/simple/ -r requirements.txt

# 使用gunicorn启动应用
CMD gunicorn -w 4 -b 0.0.0.0:5000 run:app
```

/src/app/run.py的代码
> 此处注释了调试用的 app.run()，发布时用gunicorn启动
```python
from app import create_app
app = create_app('default')
app.debug=False
# if __name__ == '__main__':
#    app.run()
```
### Nginx的配置

/nginx/Dockerfile的内容如下

```Dockerfile
FROM nginx:1.14
# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# 复制配置
COPY conf/nginx.conf /etc/nginx/nginx.conf
```

/nignx/conf/nginx.conf的内容如下

```conf
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    # 开启gzip
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    #gzip_http_version 1.0;
    gzip_comp_level 1;
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary off;
    gzip_disable "MSIE [1-6]\.";

    server {
        listen 80;
        server_name localhost;
        keepalive_timeout 5;
        root /usr/share/nginx/html;

        location /static/ {
            alias /usr/share/nginx/html/src/app/static/;
        }

        location / {
            # checks for static file, if not found proxy to app
            try_files $uri @flask_app;
        }

        location @flask_app {
            proxy_pass http://192.168.0.2:5000;  # 发布在阿里云上，应填写内网IP
            proxy_redirect off;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;

            #proxy_buffers 8 32k;
            #proxy_buffer_size 64k;

        }
    }


}


```

## 启动部署

1. 进入docker-flie目录 `cd docker-flie`
2. 启动docker `docker-compose up`
3. 查看容器状态 `docker ps` 
4. 本地部署浏览器输入 127.0.0.1即可



最后出现类似docker_file_nginx_1,docker_file_mongo_1, docker_file_flask_1的3个容器，说明成功！！！


## 踩坑吐槽

* 1 mongol容器中的初始化文件需要放在 docker-entrypoint-initdb.d 目录下

本人做过如下尝试，会显示 mongdb未启动。

```
ADD setup.sh /data/setup.sh
RUN chmod +x /data/setup.sh
CMD ["/data/setup.sh"]
```

* 2 flask应用无法连接mongo，本文使用link方式。

在数据库的配置应相应写成：
```
MONGODB_SETTINGS = {
        'db': 'test',
        'host': 'mongo',  # 127.0.0.1 host地址一定要写你配置的--link的名字
        'username': 'test',
        'password': 'test',
        'port': 27017
    }
```
本地测试时改回127.0.0.1

* 3 nginx中配置使用的代理模式，其中执行flask应用的IP，应为内网IP
