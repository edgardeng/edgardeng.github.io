# conda的使用
> 在Anaconda中conda可以理解为一个工具，也是一个可执行命令，其核心功能是包管理与环境管理。所以对虚拟环境进行创建、删除等操作需要使用conda命令。

## conda 本地环境常用操作

* 获取版本号  ` conda --version / conda -V `
  
* 检查更新当前conda  `conda update conda`

* 查看当前存在哪些虚拟环境 `conda env list 或 conda info -e`

* 查看--安装--更新--删除包
  *  `conda list`
  *  `conda search package_nam`
  *  `conda install package_name`
  *  `conda install package_name=1.5.0`
  *  `conda update package_name`
  *  `conda remove package_name`
  *  `conda list -e > requirements.txt`

* conda创建虚拟环境 


 * 创建名为your_env_name的环境 `conda create --name your_env_name`
 * 创建制定python版本的环境 `conda create --name your_env_name python=2.7`
 * 创建包含某些包（如numpy，scipy）的环境 `conda create --name your_env_name numpy scipy`
 * 创建指定python版本下包含某些包的环境 `conda create --name your_env_name python=3.6 numpy scipy`

### 激活虚拟环境：

使用如下命令即可激活创建的虚拟环境 `conda activate your_env_name`

     * Windows  `conda activate your_env_name`

退出虚拟环境： `conda deactivate env_name`

* 删除虚拟环境：`conda remove -n your_env_name --all` 
* 复制某个环境 `conda create --name new_env_name --clone old_env_name`

在指定环境中管理包
conda list -n your_env_name
conda install --name myenv package_name
conda remove --name myenv package_name

使用国内 conda 软件源加速
 * conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
 * conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
 * conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
 * conda config --set show_channel_urls yes

### 使用国内pip软件源加速,更多详情请点击：pip的使用和清华镜像源的设置
1. 临时设置方法：

可以在使用pip的时候加在最后面加上参数 -i https://pypi.tuna.tsinghua.edu.cn/simple

例如：pip install jieba -i https://pypi.tuna.tsinghua.edu.cn/simple  # jieba 是一个包

2. 永久设置方法：

pip install pip -U
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

配置完之后就可以像平常一样安装包 `pip install jieba`

* 分享环境 ` conda env export > environment.yml `
  
* 复制分享的环境 ` conda env create -f environment.yml` 

## 使用技巧

* 在Windos使用全路径python.exe可能需要添加 `~\Miniconda3\envs\env_name\Library\bin`到环境变量中
 ```python
     import numpy
     print(numpy.__version__)
  ```
  
  运行： `conda activate env_name;  python test.py ` 不报错
  
  运行：`~\Miniconda3\envs\env_name\python.exe test.py` 报错 DLL找不到