
ubuntu 18.08 安装opencv 3.4.15
> https://www.cnblogs.com/huangkai-blog/p/10202540.html
 
wget https://github.com/opencv/opencv/archive/refs/tags/3.4.15.tar.gz

sudo apt-get install build-essential cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev libjasper-dev

unzip opencv-3.4.1.zip
cd opencv-3.4.2/
mkdir build && cd build
sudo camke ..
sudo make -j7

8 配置环境

在配置之前，由于修改系统配置文件需要权限，请将身份转变成root

sudo -s
修改opencv.conf文件

sudo gedit /etc/ld.so.conf.d/opencv.conf
文本可能为空白，在文本里添加opencv库的安装路径

/usr/local/lib
保存，若无法保存请确定你的身份root；关闭后，会出现警告无需担心。

更新系统共享链接库

sudo ldconfig
再修改bash.bashrc文件

sudo vim /etc/bash.bashrc
在末尾加入

PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/lib/pkgconfig  
export PKG_CONFIG_PATH  
保存退出，然后执行如下命令使得配置生效

source /etc/bash.bashrc
在此就已经完成配置

验证是否配置成功

查看opencv版本

pkg-config --modversion opencv
