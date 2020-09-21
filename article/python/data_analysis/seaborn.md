<!-- 2020-09-21 22:30 -->
## Seaborn
> Seaborn是基于matplotlib的图形可视化python包。它提供了一种高度交互式界面，便于用户能够做出各种有吸引力的统计图表。

### 安装

```
python3 -m pip install --upgrade pip
pip3 install seaborn -U
```

### Seaborn API 
 
Seaborn 要求原始数据的输入类型为 pandas 的 Dataframe 或 Numpy 数组，画图函数有以下几种形式:

* sns.图名(x='X轴 列名', y='Y轴 列名', data=原始数据df对象)

* sns.图名(x='X轴 列名', y='Y轴 列名', hue='分组绘图参数', data=原始数据df对象)

* sns.图名(x=np.array, y=np.array[, ...])

#### 整体布局

Seaborn的 5 种主题风格:
 * darkgrid     # 默认，横纵坐标都有标线，组成一个一个格子，背景稍微深色
 * whitegrid    # 横坐标有标线，纵坐标没有标线，背景白色
 * dark         # 背景稍微深色，没有标线线
 * white        # 背景白色，没有标线线
 * ticks        # xy轴都有非常短的小刻度

另外可以使用 `despine` 来改变属性，自定义风格

```python
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

def sinplot(flip=1): #自定义一个函数
	x = np.linspace(0,14,100) #0-14取100个点

	for i in range(1,7):
		plt.plot(x,np.sin(x + i *0.5) * (7 - i) * flip)
	#plt.show()
#sinplot()

with sns.axes_style("darkgrid"): #with里面的用一种背景风格
	plt.subplot(211)
	sinplot()
plt.subplot(212)
sns.despine(offset=30,left=True) #去掉上边和右边的轴线，offset=30表示距离轴线（x轴）的距离,left=True表示左边的轴保留
sinplot(-1)
plt.show()
```

#### 调色板

* color_palette 传入任何matplotlib 支持的颜色
* color_palette 不传参数，默认颜色
* set_palette 设置所有图的颜色

查看默认颜色主题：

```python
current_palette = sns.color_palette()
sns.palplot(current_palette)
plt.show()

```

Seaborn in fact has six variations of matplotlib’s palette, called deep, muted, pastel, bright, dark, and colorblind. These span a range of average luminance and saturation values:


使用圆形画板：
 * 使用hls颜色空间    `sns.palplot(sns.color_palette('hls',8))`
 * 使用hls_palette   `sns.palplot(sns.hls_palette(8,l=.7,s=.9))`
 * 使用对比          `sns.palplot(sns.color_palette('Paried',8))`
 * 使用xkcd随机颜色   `colors = ['windows blue'] sns.palplot(sns.xkcd_palette(colors)`
 * 连续色板          `sns.palplot(sns.color_palette('Blues'))` 或 `sns.palplot(sns.color_palette('BuGn_r'))` 使用_r后缀，颜色有深到浅
 * 线性变化          `sns.palplot(sns.color_palette('cubehelix',8))` 或   `sns.palplot(sns.cubehelix_palette(8,start=.5,rot=.5))`
 * 连续调色          `sns.palplot(sns.light_palette('grren'))` 浅到深的绿色 或 `sns.palplot(sns.dark_palette('purple'))` 深到浅的紫 也可以使用reverse参数进行反转
 

#### 图形绘制

主要的图形绘制函数：

* relational plots
    
    * relplot
    * scatterplot
    * lineplot
   
* distributions plots

    * displot
    * hisplot
    * kdeplot
    * ecdfplot
    * rugplot
    
 * categorical plots
 
    * catplot
    * striplot
    * swarmplot
    * boxplot
    * violinplot
    * pointplot
    * barplot
    * countplot
    
 * Regression plots

    * regplot
    * lmplot
    * residplot
    
* Matrix plots
    * heatmap
    * clustermap
   
* Multi-plot grids
 
    * Facet grids
        
        * FacetGrid(data, *[, row, col, hue, …])
        * FacetGrid.map(self, func, *args, **kwargs)
        * FacetGrid.map_dataframe(self, func, *args, …)
    
    * Pair grids
    
        * pairplot(data, *[, hue, hue_order, palette, …])
        * PairGrid(data, *[, hue, hue_order, palette, …])
        * PairGrid.map(self, func, **kwargs)
        * PairGrid.map_diag(self, func, **kwargs)
        * PairGrid.map_offdiag(self, func, **kwargs)
        * PairGrid.map_lower(self, func, **kwargs)
        * PairGrid.map_upper(self, func, **kwargs)
 
    * Joint grids
    
        * jointplot(*[, x, y, data, kind, color, …])
        * JointGrid(*[, x, y, data, height, ratio, …])
        * JointGrid.plot(self, joint_func, …)
        * JointGrid.plot_joint(self, func, **kwargs)
        * JointGrid.plot_marginals(self, func, **kwargs)
   
#### 简单的条形图
  
```python
x = np.arange(8)
y = np.array([1,5,3,6,2,4,5,6])

df = pd.DataFrame({"x-axis": x,"y-axis": y})

sns.barplot("x-axis","y-axis",palette="RdBu_r",data=df)
plt.xticks(rotation=90)
plt.show()

```
####  单变量的分析绘图（直方图）

```python
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
from scipy import stats
import pandas as pd

x = np.random.normal(size=100) #随机生成100个数据
sns.distplot(x,bins=20,kde=False，fit=stats.gamma) # kde是需不需要计算核密度，bins是多少个小柱形，fit=stats.gamma看图形变化的趋势，如图黑色的曲线
plt.show()
```

#### 回归分析绘图

```python
tips = sns.load_dataset('tips')
g = sns.FacetGrid(tips, col='time', row='smoker', margin_titles=True)
g.map(sns.regplot, 'size', 'total_bill', color='.1', fit_reg=True, x_jitter=.1)  # fit_reg是否显示回归线
```

#### 多视图的绘图 Combining multiple views on the data

#### FaceGrid

```python

  np.random.seed(sum(map(ord, 'axis_grids')))
  tips = sns.load_dataset('tips')
  tips.head()
  g = sns.FacetGrid(tips, col='time')  #
  g.map(plt.hist, 'tip')  # 指定图

  # 散点图
  g = sns.FacetGrid(tips, col='sex', hue='smoker')  #
  g.map(plt.scatter, 'total_bill', 'tip', alpha=.7)
  g.add_legend()

  # 回归图
  g = sns.FacetGrid(tips, col='time', row='smoker', margin_titles=True)
  g.map(sns.regplot, 'size', 'total_bill', color='.1', fit_reg=True, x_jitter=.1)  # fit_reg是否显示回归线

  # 布局参数
  g = sns.FacetGrid(tips, col='day', size=4, aspect=.5)  # 长宽比，大小
  g.map(sns.barplot, 'sex', 'total_bill')

  # 类别展示顺序
  ordered_days = tips.day.value_counts().index
  print(ordered_days)
  ordered_days = pd.Categorical(['Thur', 'Fri', 'Sat', 'Sun'])
  g = sns.FacetGrid(tips, row='day', row_order=ordered_days, size=7, aspect=4)  # 长宽比，大小
  g.map(sns.boxplot, 'total_bill')

  # 散点图的大小
  pal = {'Lunch': 'seagreen', 'Dinner': 'gray'}
  g = sns.FacetGrid(tips, hue='time', palette=pal, size=5)  # hue_kws={'marker':['o','v']} 指定形状
  g.map(sns.scatterplot, 'total_bill', 'tip', s=50, alpha=.7, linewidth=.5, edgecolor='white')  # s 点的大小
  g.add_legend()

  # label的使用
  with sns.axes_style('white'):
    g = sns.FacetGrid(tips, row='sex', col='smoker', margin_titles=True, size=2.5)
  g.map(plt.scatter, 'total_bill', 'tip', color='#334488', edgecolor='white', lw=0.5)
  g.set_axis_labels('Total Bill', 'Tip')  # 设置label 坐标轴的标签
  g.set(xticks=[10, 30, 50], yticks=[2, 6, 10])
  g.fig.subplots_adjust(wspace=.02, hspace=.02)
  g.fig.subplots_adjust(left=0.1, right=0.6, bottom=0.1, top=0.9, wspace=.02, hspace=.02)

```

#### PairGrid

```python
  iris = sns.load_dataset('iris')

  # g = sns.PairGrid(iris)
  # g.map(plt.scatter) # 两两变量去画散点图

  g = sns.PairGrid(iris)
  g.map_diag(plt.hist)  # 对角线的子图画直方图
  g.map_offdiag(plt.scatter)  # 非对角线的子图画散点图

  g = sns.PairGrid(iris, hue='species')  # 添加一个变量 species
  g.map_diag(plt.hist)  # 对角线的子图画直方图
  g.map_offdiag(plt.scatter)  # 非对角线的子图画散点图
  g.add_legend()

  g = sns.PairGrid(iris, vars=['sepal_length', 'sepal_width'], hue='species')  # 通过vars指定需要画图的变量  palette='GnBu_d' 设置调色板
  g.map(plt.scatter)  # s=20 设置圆点大小, edgecolor设置边界颜色

  plt.show()

```

#### JointGrid

```
mean, cov = [0, 1], [(1, 0.5), (0.5, 1)]  # 均值，协方差
data = np.random.multivariate_normal(mean, cov, 500)
df = pd.DataFrame(data, columns=['x', 'y'])
# 2 个变量之间的分布关系，最后的是散点图
# sns.jointplot(x='x',y='y',data=df)
sns.jointplot(x='x', y='y', data=df, kind='hex', color='k')
plt.show()

g = sns.JointGrid(data=penguins, x="bill_length_mm", y="bill_depth_mm")
g.plot(sns.scatterplot, sns.histplot)

```

## 参考

* [Seaborn Tutorial](http://seaborn.pydata.org/tutorial.html)
