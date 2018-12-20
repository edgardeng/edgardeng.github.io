# 机器学习 模型评估

> 分类型模型评判的指标中，常用的三种：混淆矩阵（也称误差矩阵，Confusion Matrix), ROC曲线, AUC面积

评估分类模型：

|指标	|描述|	Scikit-learn函数|
| :---- |:----  |:---- |
| Precision	| 精准度| 	from sklearn.metrics import precision_score| 
| Recall	| 召回率	| from sklearn.metrics import recall_score| 
| F1	| F1值	| from sklearn.metrics import f1_score|
| Confusion Matrix	| 混淆矩阵 |from sklearn.metrics import confusion_matrix| 
| ROC	| ROC曲线	| from sklearn.metrics import roc| 
| AUC	| ROC曲线下的面积	| from sklearn.metrics import auc| 

评估回归模型：

| 指标	| 描述	| Scikit-learn函数| 
| :---- |:----  |:---- |
| Mean Square Error (MSE, RMSE)	| 平均方差| 	from sklearn.metrics import mean_squared_error| 
| Absolute Error (MAE, RAE)	| 绝对误差	| from sklearn.metrics import mean_absolute_error, median_absolute_error| 
| R-Squared	R | 平方值	| from sklearn.metrics import r2_score| 



## 假设

H0 ：零假设，不能轻易被否定的命题作为原假设

H1 ：把无把握的、不能轻易肯定的命题作为备择假设

如果一个统计检验的结果拒绝零假设（结论不支持零假设），而实际上真实的情况属于零假设，那么称这个检验犯了第一类错误。

反之，如果检验结果支持零假设，而实际上真实的情况属于备择假设，那么称这个检验犯了第二类错误。

尽量使后果严重的错误成为第一类错误．

* 先定义显著水平α
* 定义原假设，即按照常理推断出的情况
* 计算P值，如果P>α 则拒绝原假设接受H1假设

## 独立性检验

### 秩和检验

验证两个样本是否服从同一分布

将两个样本合并后排序，得到每个样本单位的秩次。当几个数据的大小相同秩次却不相同时，最终的秩次取其算术平均。

H0 ：两个总体服从相同的分布

H1 ：两个总体服从不同的分布

求出样本数较少的那个总体的秩和T

查“秩和检验表”，得出临界值T1(a)T1(a)，T2(a)T2(a)，若T1(a)<T<T2(a)T1(a)<T<T2(a)则接受H0


##  混淆矩阵 confusion matrix

> 在机器学习领域中，混淆矩阵（confusion matrix）是一种评价分类模型好坏的形象化展示工具。矩阵的每一列表示的是模型预测的样本情况；矩阵的每一行表示的样本的真实情况。

一个分类模型来判别一个水果是苹果还是梨，混淆矩阵将会模型的预测结果总结成如下表所示的表格。

| 真实\预测| 苹果  | 梨    |
| :---- | :---- |:----  |
| 苹果   | 10    | 3     |
| 梨    | 2      | 15    |

对于一个二分类的模型，其模型的混淆矩阵是一个2×22×2的矩阵。

| correctness\Predict	| Positive	| Negative|
| :---- | :---- |:----|
|True	|TP	|TN|
|False|	FP	|FN|

混淆矩阵比模型的精度的评价指标更能够详细地反映出模型的”好坏”。
模型的精度指标，在正负样本数量不均衡的情况下，会出现容易误导的结果。


四个矩阵元素的含义分别是:

* True Positive 真正类(TP)，样本的真实类别是正类，并且模型预测的结果也是正类。

* False Negative 假负类(FN)，样本的真实类别是正类，但是模型将其预测成为负类。

* False Positive 假正类(FP)，样本的真实类别是负类，但是模型将其预测成为正类。

* True Negative 真负类(TN)，样本的真实类别是负类，并且模型将其预测成为负类。

### 混淆矩阵延伸出的各个评价指标
从混淆矩阵中，可以衍生出各种评价的指标。
[wiki上的一个解释](https://en.wikipedia.org/wiki/Confusion_matrix)

* Accuracy
模型的精度，即模型预测正确的个数 / 样本的总个数 
Accuracy= TP+TN / (TP+FN+FP+TN)

* Positive predictive value (PPV, Precision)
查准率，阳性预测值，在模型预测为正类的样本中，真正为正类的样本所占的比例。 
Precision=TP/TP+FP
一般情况下，查准率越高，说明模型的效果越好。

* False discovery rate (FDR)
错误发现率，表示在模型预测为正类的样本中，真正的负类的样本所占的比例。 
FDR=FPTP+FPFDR=FPTP+FP 
一般情况下，错误发现率越小，说明模型的效果越好。

* False omission rate (FOR)
错误遗漏率，表示在模型预测为负类的样本中，真正的正类所占的比例。即评价模型”遗漏”掉的正类的多少。 
FOR=FNFN+TNFOR=FNFN+TN 
一般情况下，错误遗漏率越小，模型的效果越好。

*  Negative predictive value (NPV)
阴性预测值，在模型预测为负类的样本中，真正为负类的样本所占的比例。 
NPV=TNFN+TNNPV=TNFN+TN 
一般情况下，NPV越高，说明的模型的效果越好。

* True positive rate (TPR, Recall)
召回率，真正类率，表示的是，模型预测为正类的样本的数量，占总的正类样本数量的比值。 
Recall=TPTP+FNRecall=TPTP+FN 
一般情况下，Recall越高，说明有更多的正类样本被模型预测正确，模型的效果越好。

* False positive rate (FPR), Fall-out
假正率，表示的是，模型预测为正类的样本中，占模型负类样本数量的比值。 
Fall−out=FPFP+TNFall−out=FPFP+TN 
一般情况下，假正类率越低，说明模型的效果越好。

* False negative rate (FNR), Miss rate
假负类率，缺失率，模型预测为负类的样本中，是正类的数量，占真实正类样本的比值。 
FNR=FNFN+TNFNR=FNFN+TN

缺失值越小，说明模型的效果越好。

*  True negative rate (TNR)
一般情况下，真负类率越高，说明的模型的效果越好 
TNR=TN/FN+TN

 
三级指标 F1 Score。


F1 Score = 2PR/(P + R)
其中，P代表Precision，R代表Recall。
F1-Score指标综合了Precision与Recall的产出的结果。F1-Score的取值范围从0到1的，1代表模型的输出最好，0代表模型的输出结果最差。

 
```python
 from sklearn.metrics import confusion_matrix
 cm = confusion_matrix(y_true, y_pred)

 import itertools
 import matplotlib.pyplot as plt
 import numpy as np
 from sklearn.metrics import confusion_matrix
 def plot_confusion_matrix(cm, classes,
                           normalize=False,
                           title='Confusion matrix',
                           cmap=plt.cm.Blues):
     plt.imshow(cm, interpolation='nearest', cmap=cmap)
     plt.title(title)
     plt.colorbar()
     tick_marks = np.arange(len(classes))
     plt.xticks(tick_marks, classes, rotation=45)
     plt.yticks(tick_marks, classes)
 
     if normalize:
         cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]
         print("Normalized confusion matrix")
     else:
         print('Confusion matrix, without normalization')
 
     print(cm)
 
     thresh = cm.max() / 2.
     for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
         plt.text(j, i, cm[i, j],
                  horizontalalignment="center",
                  color="white" if cm[i, j] > thresh else "black")
 
     plt.tight_layout()
     plt.ylabel('True label')
     plt.xlabel('Predicted label')
     
```

### ROC(Receiver Operating Characteristic)
* True Positive Rate 
TPR = TP/(TP+FN) = Presicion

* False Positive Rate

FPR = FP / (TN+FP)

将点集(predict,y)(predict,y)根据predict probability从小到大排列
设置截断点cut point从0一直到1， 求出TPR, FPR。
```python
import matplotlib.pyplot as plt
from sklearn.metrics import roc_curve

fpr,tpr,thresholds = roc_curve(y_true, y_score)
plt.plot(fpr,tpr, label='roc')
plt.legend()

```

### AUC(Area Under ROC Curve)

> 即ROC曲线的面积。

AUC与排序误差lranklrank的关系： AUC = 1 - l.rank

```python
from sklearn.metrics import roc_auc_score
AUC = roc_auc_score(y_true, y_scores)
```
