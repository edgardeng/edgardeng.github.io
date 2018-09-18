# Android 约束布局 ConstraintLayout

> ConstraintLayout，约束布局。当布局嵌套过多时会出现一些性能问题，可用ConstraintLayout来减少布局的层级结构。ConstraintLayout相比RelativeLayout，其性能更好，也更容易使用。

## 依赖
在build.gradle中添加以下依赖：
```
 implementation 'com.android.support.constraint:constraint-layout:1.1.2'
```
   然后就可以使用ConstraintLayout了。

## 特性

### 相对位置

在ConstraintLayout中确定view的位置,必须至少添加一个水平和垂直的约束。
每一个约束表示到另一个view，父布局，或者不可见的参考线的连接或者对齐。
如果水平或者垂直方向上没有约束，那么其位置就是0。

```

<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:text="左对齐"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>

    <Button
        android:text="右对齐"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>

    <Button
        android:text="水平居中"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"/>

    <Button
        android:text="垂直居中"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>

    <Button
        android:text="底部对齐"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"/>

    <Button
        android:text="水平居中+垂直居中"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>

</android.support.constraint.ConstraintLayout>
```

相对位置的属性, 其值即可以是parent，也可以是某个view的id。

### 居中显示

如果一个view满足以下

        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
即view的左边对齐父布局的左边，view的右边对齐父布局的右边，除非这个view的大小刚好充满整个父布局；否则的话，就是水平居中显示。

水平方向的相位置

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/btn_center"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:background="#00f"
        android:text="水平参照物"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:background="#f00"
        android:text="Left_toLeftOf"
        app:layout_constraintBottom_toTopOf="@id/btn_center"
        app:layout_constraintLeft_toLeftOf="@id/btn_center"/>

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:background="#0f0"
        android:text="Right_toLeftOf"
        app:layout_constraintBottom_toTopOf="@id/btn_center"
        app:layout_constraintRight_toLeftOf="@id/btn_center"/>

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:background="#0f0"
        android:text="Right_toRightOf"
        app:layout_constraintRight_toRightOf="@id/btn_center"
        app:layout_constraintTop_toBottomOf="@id/btn_center"/>

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:background="#f00"
        android:text="Left_toRightOf"
        app:layout_constraintLeft_toRightOf="@id/btn_center"
        app:layout_constraintTop_toBottomOf="@id/btn_center"/>
</android.support.constraint.ConstraintLayout>

```

例子二：竖直方向的相对位置

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/btn_center"
        android:layout_width="wrap_content"
        android:layout_height="100dp"
        android:background="#00f"
        android:text="竖直参照物"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:background="#f00"
        android:text="Top_toTopOf"
        app:layout_constraintTop_toTopOf="@id/btn_center"
        app:layout_constraintRight_toLeftOf="@id/btn_center"/>

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:background="#0f0"
        android:text="Bottom_toTopOf"
        app:layout_constraintBottom_toTopOf="@id/btn_center"
        app:layout_constraintRight_toLeftOf="@id/btn_center"/>

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:background="#0f0"
        android:text="Top_toBottomOf"
        app:layout_constraintLeft_toRightOf="@id/btn_center"
        app:layout_constraintTop_toBottomOf="@id/btn_center"/>

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:background="#f00"
        android:text="Bottom_toBottomOf"
        app:layout_constraintLeft_toRightOf="@id/btn_center"
        app:layout_constraintBottom_toBottomOf="@id/btn_center"/>
</android.support.constraint.ConstraintLayout>
```

### 尺寸约束

view中使用warp_content或者固定值等等是没有问题的。
但ConstraintLayout中不支持MATCH_PARENT这个值，如果需要实现跟MATCH_PARENT同样的效果，可以使用0dp来代替。

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/btn_center"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="wrap_content"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>

    <Button
        android:id="@+id/btn_1"
        android:layout_width="200dp"
        android:layout_height="wrap_content"
        android:text="具体数值：200dp"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@id/btn_center"/>

    <Button
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="0dp(MATCH_CONSTRAINT)"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@id/btn_1"/>
</android.support.constraint.ConstraintLayout>
```

### 宽高比
将宽定义成高的一个比例或者高定义成宽的比率。
首先，需要将宽或者高设置为0dp（即MATCH_CONSTRAINT），适应约束条件。
然后通过layout_constraintDimensionRatio属性设置一个比率即可。
这个比率可以是一个浮点数，表示宽度和高度之间的比率；
也可以是“宽度：高度”形式的比率。
```

<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:layout_width="wrap_content"
        android:layout_height="0dp"
        android:text="--------------宽高比2：1-------------"
        app:layout_constraintDimensionRatio="2:1"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"/>
</android.support.constraint.ConstraintLayout>

```

如果宽和高都设置为0dp（MATCH_CONSTRAINT），那么layout_constraintDimensionRatio的值需要先加一个"W,"或者"H,"来表示约束宽度或高度。
```
<Button
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintDimensionRatio="H,16:9"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>
```

### 百分比宽高

使用百分比来设置view的宽高。要使用百分比，宽或高同样要设置为0dp（MATCH_CONSTRAINT）。
然后设置以下属性即可：
```
app:layout_constraintWidth_default="percent" //设置宽为百分比
app:layout_constraintWidth_percent="0.3" //0到1之间的值
或
app:layout_constraintHeight_default="percent" //设置高为百分比
app:layout_constraintHeight_percent="0.3" //0到1之间的值
```

例子：
```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="宽50%"
        app:layout_constraintHeight_default="percent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintWidth_percent="0.5"/>

</android.support.constraint.ConstraintLayout>
```

### 位置偏向

如果想让view的位置偏向某一侧，可以使用属性： layout_constraintHorizontal_bias  //水平偏向, layout_constraintVertical_bias  //竖直偏向

```
    <Button
        android:text="左边偏向30%"
        app:layout_constraintHorizontal_bias="0.3"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"/>
```


### 权重

通过设置两个属性：app:layout_constraintHorizontal_weight //水平权重 , app:layout_constraintVertical_weight //竖直权重

```
<android.support.constraint.ConstraintLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/btn_1"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="权重为1"
        app:layout_constraintHorizontal_weight="1"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toLeftOf="@id/btn_2"/>

    <Button
        android:id="@+id/btn_2"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="权重为2"
        app:layout_constraintHorizontal_weight="2"
        app:layout_constraintLeft_toRightOf="@id/btn_1"
        app:layout_constraintRight_toLeftOf="@id/btn_3"/>

    <Button
        android:id="@+id/btn_3"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        app:layout_constraintHorizontal_weight="2"
        android:text="权重为2"
        app:layout_constraintLeft_toRightOf="@id/btn_2"
        app:layout_constraintRight_toRightOf="parent"/>
</android.support.constraint.ConstraintLayout>
```

### 链

将相连的view两两约束好,就形成了链。在ConstraintLayout中可以实现各种不同的链，权重链是其中一种。
整个链由链中的第一个view（链头）上设置的属性控制。

链的样式属性：

app:layout_constraintHorizontal_chainStyle="spread|spread_inside|packed"

* Spread Chain 默认样式就是spread，宽或高非0即可。Spread Chain = spread + 宽或高非0

* Spread Inside Chain 宽度同样为非0。Spread Inside Chain = spread_inside + 宽或高非0

* Weighter Chain ， Weighter Chain = spread + 宽或高为0 + 权重值

* Packed Chain 聚拢起来的效果，宽度同样为非0，Packed Chain = packed + 宽或高非0

* Packed Chain with bias 在Packed Chain再加一个偏向属性

### Guideline辅助线

Guideline可以用来辅助布局，能创建出一条条的水平线或者垂直线。
```
    android:orientation="horizontal|vertical"   // 水平或垂直引导线
    app:layout_constraintGuide_begin="30dp"   // 距离布局30dp
    app:layout_constraintGuide_end="30dp"     // 距离布局底部30dp
    app:layout_constraintGuide_percent="0.5" // 距离布局50%
```
例子：

```
<android.support.constraint.ConstraintLayout\
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <android.support.constraint.Guideline
        android:id="@+id/guideline_h"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        app:layout_constraintGuide_percent="0.5"/>

    <android.support.constraint.Guideline
        android:id="@+id/guideline_v"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        app:layout_constraintGuide_percent="0.5"/>

    <Button
        app:layout_constraintLeft_toLeftOf="@id/guideline_v"
        app:layout_constraintTop_toTopOf="@id/guideline_h"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="辅助线定位"/>
</android.support.constraint.ConstraintLayout>
```

