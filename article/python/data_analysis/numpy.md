<!-- 2020-09-20 08:00 -->
## NumPy 
> NumPy (*Numerical Python*) python数据分析中数值计算的基础。NumPy提供任意同构项的数组对象，对数组的快速数学运算，提供线性代数，傅里叶变换，随机数生成等

### 1、数组的创建

* ndarry ： 存储单一数据类型的多维数组（属性：ndim,sahpe,size,dtype）
* ufunc ： 对数组进行处理的函数
* dtype ： 数据类型

```python
import numpy as np
# 将Python序列，通过函数转为数组
np.array([1,2,3,4]))
# 创建数组的函数
a = np.arange(1, 11)  # 1 - 10
b = np.arange(0, 10, 2)  # 0-10的偶数
c = np.arange(0, 10, 2, dtype=float)  # 设置dtype
```

#### 特定的一维数组，指定原始个数，等比数列stop

```python
np.zeros(5)  # 全0的数组默认float
np.zeros(5, dtype=int) 
np.zeros((2, 3))

np.ones(5)
np.ones(5, dtype=int)
np.ones((2, 3))

np.empty(5)
np.empty(5, dtype=int)
np.empty((2, 3))

np.linspace(1, 10, 10)  # 等差数列 在 1，10之间生成10个数,包括10
np.linspace(10, 1, 5)
np.linspace(1, 10, 10, endpoint=False)

np.logspace(0, 9, 10) # 等比数列
np.logspace(0, 9, 10, base=2)

# numpy.eye(N[, M, k, dtype]) # 主对角线为一，其他为零的二维数组
# numpy.diag(v[, k]) # 除主对角线上元素外，其他为零的二维数组
```

#### 随机数组

使用numpy生成数——numpy.random

```python
a = np.random.random(size=5)  #  生成[0.1-1.0)之间的随机数
b = np.random.random(size=(3, 4))  # 二维数组
c = np.random.random(size=(2, 3, 4))  # 三维数组
a = np.random.randint(5, size=10)  # 0-5 之间的1维整数数组

np.random.randint(5, size=10, dtype=np.int64)  # 0-5 之间的1维数组
np.random.randint(5, 11, size=(4, 3))
np.random.randint(5, 11, size=(2, 3, 4))  # 三维数组

np.random.randn(5)  # 4个1维数组, 使用random 创建数组 - 符合正态分布(期望为0，方差为1)
np.random.randn(2, 3)
np.random.normal(size=5)  # 默认期望为0，方差为1
np.random.normal(loc=1, scale=2, size=5)
```

### 2、数组的访问

```python
import numpy as np
arr = np.array([[1,2,3,4],[2,3,4,5],[3,4,5,6]])

arr[:-1,0::2]   #这里2为步长,:-1包括开始不包括结束
# out: array([[1, 3],[2, 4]])

arr[[(0,1,0),(0,2,3)]] #这里取的为arr[0,0],arr[1,2],arr[0,3]
# out: array([1, 4, 4])

arr[1:,(0,1,3)] #整数函数索引，索引2，3行中第0，1，3列的元素
# out: array([[2, 3, 5],[3, 4, 6]])

arr[[True, False,True]]  #布尔索引，索引0，2行中的元素
# out: array([[1, 2, 3, 4],[3, 4, 5, 6]])
```

### 3、数组形态变换

使用reshape函数改变数组维度，要求指定位数和数组的元素数目吻合——reshape
```python
numpy.ndarray.reshape(shape, order='C')
numpy.reshape（arr，newshape，order ='C' ）
eg：numpy.reshape(arr,(2,6))
    arr.reshape(2,6)  #两者等价，返回形状的数组，均不改变arr本身的形状

# 使用ravel和flatten展平数组——arrays.ndarray

arr.ravel()  #横向展平,结果为[1,2,3,4,2,3,4,5,3,...]
arr.flatten() #横向展平,结果为[1,2,3,4,2,3,4,5,3,...]
arr.flatten('F') #纵向展平，结果为[1,2,3,2,3,4,3,4,5,...]

# 对数组进行组合和分割——numpy.hstack…

numpy.hstack(tup) #使用函数进行横向组合
numpy.vstack(tup)  #使用函数进行横向组合
numpy.concatenate(tup,axis = 1） #使用函数进行横向组合
numpy.concatenate(tup,axis = 0） #使用函数进行横向组合

numpy.hsplit(ary, indices_or_sections) #使用函数进行横向切割
numpy.vsplit(ary, indices_or_sections) #使用函数进行纵向切割
numpy.split(ary, indices_or_sections, axis=0) #axis=0纵向切割 axis=1横向切割

# Numpy对于多维数组，默认不行进行矩阵运算，矩阵运算时针对整改矩阵中每个元素进行的
# 创建矩阵函数——numpy.mat，numpy.matrix

arr1 = [[1,2],[2,3]]
arr1*3
#输出结果out: [[1, 2], [2, 3], [1, 2], [2, 3], [1, 2], [2, 3]]

arr2 = np.matrix(arr1)
arr2 = arr2*3
#输出结果out: matrix([[3, 6],[6, 9]])

np.bmat("arr1 arr2; arr2 arr1") 
#根据小矩阵创建大矩阵,输出结果
#out: matrix([[1, 2, 3, 6],[2, 3, 6, 9],[3, 6, 1, 2],[6, 9, 2, 3]])

```

### 4、常用函数

* sort直接对数值进行排序
* argsort和lexsort根据一个或多个键对数据进行排序

```python
numpy.ndarray.sort(axis=-1, kind='quicksort', order=None) 
#沿无返回值，着横轴排序

numpy.argsort(a, axis=-1, kind='quicksort', order=None)[source] 
#返回将对数组进行排序的索引，axis默认值是-1（最后一个轴）

numpy.lexsort(keys, axis=-1) 
#使用一系列键执行间接排序,多键排序时是按照最后一个传入参数计算的。
#keys的形式(arr1,arr2,arr3)
```

* numpy.unique函数找出数组中的唯一值并返回已排序结果，
* numpy.tile函数对数组进行重复操作，
* numpy.repeat函数对数组中每个元素进行重复操作

```python
numpy.unique(ar, return_index=False, return_inverse=False,\
return_counts=False, axis=None) 
numpy.tile(A, reps)
numpy.repeat(A, repeats, axis=None)
#axis=0沿着纵轴进行元素重复，axis=1沿着横轴进行元素重复

在Numpy中常见的统计函数有sum、mean、std、var（方差=std*std）、min、max等。当axis参数为0时，表示沿着纵轴进行计算。当axis为1时，表示沿着横轴进行计算。但是在默认时，计算一个总值。上述计算均为聚合计算，若要产生中间结果的组成数组可以使用cumsum、cumprod函数。

arr = np.arange(2,10)
np.cumsum(arr)  #计算所有元素的累计和
#输出结果out: [2 5 9 14 20 27 35 44]
np.cumprod(arr)  #计算所有元素的累计积
#输出结果out: [2 6 24 120 720 5040 40320 362880]

``` 
