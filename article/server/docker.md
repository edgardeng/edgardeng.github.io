# Docker的基本使用

> Docker 是一个开源的应用容器引擎，基于Go语言 并遵从Apache2.0协议开源。可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

## Docker架构

* Docker 镜像(Images) -- 用于创建 Docker 容器的模板。

* Docker 容器(Container) -- 独立运行的一个或一组应用。

* Docker 客户端(Client) -- 通过命令行或者其他工具使用 Docker API (https://docs.docker.com/reference/api/docker_remote_api) 与 Docker 的守护进程通信。

* Docker 主机(Host) -- 一个物理或者虚拟的机器用于执行 Docker 守护进程和容器。

* Docker 仓库(Registry) -- 保存镜像，可以理解为代码控制中的代码仓库。 Docker Hub(https://hub.docker.com) 提供了庞大的镜像集合供使用。

* Docker Machine -- 一个简化Docker安装的命令行工具，通过一个简单的命令行即可在相应的平台上安装Docker，比如VirtualBox、 Digital Ocean、Microsoft Azure。


## 镜像

当运行容器时，使用的镜像如果在本地中不存在，docker 就会自动从 docker 镜像仓库中下载，默认是从 Docker Hub 公共镜像源下载。

### 相关命令

* 列出镜像列表 `$ docker images` 或 `docker images python:3.5`

    输出结果: REPOSITORY：表示镜像的仓库源,
        TAG：镜像的标签IMAGE, 
        ID：镜像ID, 
        CREATED：镜像创建时间, 
        SIZE：镜像大小

* 运行容器，`docker run -t -i ubuntu:15.10 /bin/bash `

* 查找镜像 `docker search httpd`

   > 从 Docker Hub 网站来搜索镜像，Docker Hub 网址为： https://hub.docker.com/

* 拖取镜像 `docker pull httpd`

* 更新镜像 `docker commit -m="has update" -a="runoob" e218edb10161 runoob/ubuntu:v2`

    各个参数说明：-m:提交的描述信息, 
                -a:指定镜像作者, 
                e218edb10161：容器ID,
                runoob/ubuntu:v2:指定要创建的目标镜像名

* 通过Dockerfile文件，`docker build -t runoob/centos:6.7 . `命令来构建一个镜像

```text
FROM centos:6.7
MAINTAINER Author "author@**.com"
RUN /bin/echo 'root:123456' |chpasswd
RUN useradd test
```

## 容器

Docker 允许你在容器内运行应用程序， 使用 docker run 命令来在容器内运行一个应用程序。

### 相关命令

#### 启动容器

* 后台启动容器 `docker run -d -P training/webapp python app.py`
    参数说明: -d:让容器在后台运行。 -P:将容器内部使用的网络端口映射到我们使用的主机上。

* 设置不一样的端口 `docker run -d -p 5000:5000 training/webapp python app.py `

* 网络端口的快捷方式 `docker port containner 5000/tcp -> 0.0.0.0:5000`

#### 其他

* 查看 WEB 应用程序日志 `docker logs -f bf08b7f2cd89`

* 查看WEB应用程序容器的进程 `docker top wizardly_chandrasekhar`

* 检查 WEB 应用程序 `docker inspect wizardly_chandrasekhar`   
        
* 停止 WEB 应用容器  `docker stop wizardly_chandrasekhar`

* 重启WEB应用容器  `docker start wizardly_chandrasekhar`

* 查询容器  
    `docker ps -l ` 查询最后一次创建的容器：
    `docker ps  ` 查询运行的容器：
    `docker ps -a ` 查询所有的容器：

* 移除WEB应用容器 `docker rm wizardly_chandrasekhar `

### 25个基本命令

__Working with Docker Containers__

* Creating a Container `docker create [IMAGE_NAME] `
* Creating and Running a Container ` docker run [IMAGE_NAME] `
* Starting ` docker start [CONTAINER_NAME] `
* Stopped Container `docker stop [CONTAINER_NAME] `
* Restarting a Running Container ` docker restart [CONTAINER_NAME] `
* Pausing a Running Container ` docker pause [CONTAINER_NAME] `
* Resume `docker unpause [CONTAINER_NAME]` 
* List Running Containers `docker ps` or `docker container ls`
* Removing a Container `docker rm [CONTAINER_NAME] `

__Working with Docker Container Images__

* Building an Image from a Dockerfile: ` docker build -f [DOCKERFILE_PATH] `
* Building an Image from a Container: `docker commit [CONTAINER_NAME] [IMAGE_NAME]`
* Pulling an Image from the Docker Hub: ` docker image pull [IMAGE_NAME] `
* Pushing an Image to the Docker Hub: ` docker image push [IMAGE_NAME] `
  > create an account at the docker hub and login from your terminal:  `docker login`
* List Container Images: `docker image ls` or `docker image ls`
* Deleting an Image from your System: `docker image remove [IMAGE_NAME]`

__Working with Docker Volumes__

* Create a Docker Volume `docker volume create [VOLUME_NAME] `
* Remove a Docker Volume `docker volume rm [VOLUME_NAME] `
* Inspect a Docker Volume `docker volume inspect [VOLUME_NAME]`
* List all Docker Volumes `docker volume ls`

__Working with Docker Networks__

* Creating a Docker Network ` docker network create [NETWORK_NAME] `
  >  create a bridge network on your system that connects containers to each other and shares the network and internet connection of the host machine. Replace [NETWORK_NAME] with the name you want your network to have.

* Connecting a Container to a Network `docker network connect [NETWORK_NAME] [CONTAINER_NAME] `
* Disconnecting a Container from a Network `docker network disconnect [NETWORK_NAME] [CONTAINER_NAME]`
* Inspecting a Network `docker network inspect [NETWORK_NAME]`
* Listing all Networks `docker network ls`
* Removing a Network `docker network rm [NETWORK_NAME]`


