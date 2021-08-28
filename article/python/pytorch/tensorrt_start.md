# TensorRT的初使用

## 安装手册

> 官方参考 https://docs.nvidia.com/deeplearning/tensorrt/install-guide/index.html

tensorrt-801/sample-support-guide/index.html
https://docs.nvidia.com/deeplearning/tensorrt/archives/tensorrt-801/sample-support-guide/index.html


## 下载 Downloading TensorRT 
   Go to: https://developer.nvidia.com/tensorrt.
   Click Download Now.
   Select the version of TensorRT that you are interested in.
   Select the check-box to agree to the license terms.
   Click the package you want to install. Your download begins.
   
服务器配置：
Ubuntu: 18.04
Python 3.9.2
CUDA Version: 11.0  (/usr/local/cuda-11.0/bin/nvcc -V )
Tesla T4: 16GB
torch:  1.8.1+cu111

## 一、安装Tensor

参考： https://docs.nvidia.com/deeplearning/tensorrt/install-guide/index.html

下载地址 https://developer.nvidia.com/nvidia-tensorrt-8x-download

Early Access (EA) 

1. 下载文件 https://developer.nvidia.com/compute/machine-learning/tensorrt/secure/8.0.1/local_repos/nv-tensorrt-repo-ubuntu1804-cuda11.3-trt8.0.1.6-ga-20210626_1-1_amd64.deb

2. 编辑脚本，安装tensor

```
os="ubuntu1804"
tag="cuda11.0-trt8.0.1.6-ga-20210626"
sudo dpkg -i nv-tensorrt-repo-${os}-${tag}_1-1_amd64.deb
sudo apt-key add /var/nv-tensorrt-repo-${tag}/7fa2af80.pub

sudo apt-get update
sudo apt-get install tensorrt
```

3. 安装python 依赖
 sudo apt-get install python3-libnvinfer-dev

4. 安装完成后检查安装版本：  dpkg -l | grep TensorRT

5. 安装opencv
   sudo add-apt-repository ppa:timsc/opencv-3.4
   sudo apt-get update
   sudo apt install libopencv-dev

6. 查看安装版本
   dpkg -l | grep opencv

pip install nvidia-pyindex
 > Successfully installed nvidia-pyindex-1.0.9

pip install  nvidia-tensorrt
 > Successfully installed nvidia-cublas-11.5.1.101 nvidia-cuda-nvrtc-11.3.58 nvidia-cuda-runtime-11.3.58 nvidia-cudnn-8.2.0.51 nvidia-tensorrt-8.0.1.6

pip install pycuda 前提是将cuda添加到环境变量
 > Successfully installed MarkupSafe-2.0.1 appdirs-1.4.4 mako-1.1.4 pycuda-2021.1 pytools-2021.2.7
 
``` 
源码编译pycuda 
  下载pycuda源码 wget https://github.com/inducer/pycuda/archive/refs/tags/v2021.1.tar.gz
  下载 boost  wget https://boostorg.jfrog.io/artifactory/main/release/1.76.0/source/boost_1_76_0.tar.gz

   安装boost ./bootstrap.sh --prefix=/usr/local/boost --with-libraries=all --with-python=/usr/bin/python3.6m
     vim project-config.jam
     using python : 3.6 : /usr/bin/python3.6m : /usr/include/python3.6m : /usr/lib/python3.6 ;
    编译boost ./b2 --with-date_time --with-thread --with-python include="/usr/include/python3.6m"

$ cd pycuda-VERSION # if you're not there already
$ python configure.py \
--boost-inc-dir=/usr/local/boost \
--boost-lib-dir=/usr/local/boost/lib \
--boost-python-libname=libboost_python36 \
--boost-thread-libname=libboost_thread \
--cuda-root=/usr/local/cuda-11.0
$ su -c "make install"

```


```python
import tensorrt
print(tensorrt.__version__) # 8.0.1.6
```

7. 安装Cmake : sudo apt install cmake
   > cmake (3.10.2-1ubuntu2.18.04.2)
   

## yolov5 模型部署tensorRT

1. 下拉yolov5仓库 git clone https://github.com/ultralytics/yolov5.git    
   
2. 下载模型： cd yolov5 & wget https://github.com/ultralytics/yolov5/releases/download/v5.0/yolov5s.pt
   
3. 转ONNX模型： python export.py --weights yolov5s.pt --img 640 --batch 64

   > pip install onnx >> Successfully installed onnx-1.10.1

   >  pip install onnxruntime  >> Successfully installed flatbuffers-2.0 onnxruntime-1.8.1
   > 
   
4. 转TensorRT Engine模型： trtexec --onnx=yolov5s.onnx --saveEngine=yolov5s_engine.trt  --explicitBatch
   > 使用工具 trtexec --onnx=resnet50_onnx_model.onnx --saveEngine=resnet_engine.trt  --explicitBatch
   
   > 使用API： https://docs.nvidia.com/deeplearning/tensorrt/sample-support-guide/index.html#introductory_parser_samples
   
5. 使用python加载模型，并测试
   > 代码参考： https://github.com/NVIDIA/TensorRT/tree/master/samples/python/yolov3_onnx/onnx_to_tensorrt.py

