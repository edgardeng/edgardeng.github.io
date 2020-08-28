conda的使用

conda info

conda list


conda install flask


conda list -e > requirements.txt
(tiny-mall) Edgar-Mac-Air:~ edgar$ conda install

在Anaconda中conda可以理解为一个工具，也是一个可执行命令，其核心功能是包管理与环境管理。所以对虚拟环境进行创建、删除等操作需要使用conda命令。

conda 本地环境常用操作
#获取版本号
conda --version 或 conda -V

#检查更新当前conda
conda update conda

#查看当前存在哪些虚拟环境
conda env list 或 conda info -e

#查看--安装--更新--删除包

conda list：
conda search package_name# 查询包
conda install package_name
conda install package_name=1.5.0
conda update package_name
conda remove package_name

conda创建虚拟环境：
使用 conda create -n your_env_name python=X.X（2.7、3.6等），anaconda 命令创建python版本为X.X、名字为your_env_name的虚拟环境。your_env_name文件可以在Anaconda安装目录envs文件下找到。 指定python版本为2.7，注意至少需要指定python版本或者要安装的包， 在不指定python版本时，自动安装最新python版本。

#创建名为your_env_name的环境
conda create --name your_env_name
#创建制定python版本的环境
conda create --name your_env_name python=2.7
conda create --name your_env_name python=3.6
#创建包含某些包（如numpy，scipy）的环境
conda create --name your_env_name numpy scipy
#创建指定python版本下包含某些包的环境
conda create --name your_env_name python=3.6 numpy scipy

激活虚拟环境：
使用如下命令即可激活创建的虚拟环境

#Linux
source activate your_env_name

#Windows
activate your_env_name

退出虚拟环境：
使用如下命令即可退出创建的虚拟环境

#Linux
source deactivate your_env_name

#Windows
deactivate env_name

删除虚拟环境：
conda remove -n your_env_name --all

conda remove --name your_env_name --all

复制某个环境
conda create --name new_env_name --clone old_env_name

在指定环境中管理包
conda list -n your_env_name
conda install --name myenv package_name 
conda remove --name myenv package_name

使用国内 conda 软件源加速
$ conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
$ conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
$ conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
$ conda config --set show_channel_urls yes

使用国内pip软件源加速,更多详情请点击：pip的使用和清华镜像源的设置
1.临时设置方法：

可以在使用pip的时候加在最后面加上参数 -i https://pypi.tuna.tsinghua.edu.cn/simple

例如：pip install jieba -i https://pypi.tuna.tsinghua.edu.cn/simple  # jieba 是一个包

2.永久设置方法：

pip install pip -U
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

配置完之后就可以像平常一样安装包，速度提升几十倍

例如：pip install jieba

分享环境
#首先通过activate target_env要分享的环境target_env，然后输入下面的命令会在当前工作目录下生成一个environment.yml文件
conda env export > environment.yml
#小伙伴拿到environment.yml文件后，将该文件放在工作目录下，可以通过以下命令从该文件创建环境
conda env create -f environment.yml
————————————————
版权声明：本文为CSDN博主「hejp_123」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/hejp_123/java/article/details/92151293

