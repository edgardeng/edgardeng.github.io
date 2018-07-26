# Android 自定义视图之画图

> 在Android开发中，自带的控件无法满足要求时，需要开发自定义视图。此处介绍通过Canvas和Paint完成简单的绘画视图，

一个简单的画矩形的例子

```java
public class DrawView extends View {
    public DrawView(Context context) {
        super(context);
    }
    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        Paint p = new Paint();
        Rect t = new Rect(1,1,100,100);
        canvas.drawRect(t.left, t.top, t.right, t.bottom, p);
    }
}
```

### Canvas
画布, 用于绘制相关的图形

Canvas可以绘制的对象有：

弧线(arcs) canvas.
填充颜色(argb和color)
图 Bitmap
圆(circle和oval)
点(point)
线(line)
矩形(Rect)
图片(Picture)
圆角矩形 (RoundRect)
文本(text)
顶点(Vertices)
路径(path)

Canvas的基本操作有：

canvas.save()：把当前的绘制的图像保存起来，让后续的操作相当于是在一个新的图层上的操作。 
canvas.restore(); 把当前画布返回（调整）到上一个save()状态之前 
canvas.translate(dx, dy); //把当前画布的原点移到(dx,dy),后面的操作都以(dx,dy)作为参照点，默认原点为(0,0)

canvas.scale（x,y）;扩大。x为水平方向的放大倍数，y为竖直方向的放大倍数 
canvas.rotate(angel):旋转.angle指旋转的角度，顺时针旋转。 
canvas.transform():切变。所谓切变，其实就是把图像的顶部或底部推到一边。 
canvas.saveLayer(bounds, paint, saveFlags);

示例如下
```
    protected void onDraw(Canvas canvas) {

        super.onDraw(canvas);
        Paint mPaint = new Paint();
        // 绘制画布背景 
        canvas.drawColor(Color.GRAY);
        //设置画笔颜色 
        mPaint.setColor(Color.BLUE);
        //设置画笔为空心     如果将这里改为Style.STROKE  这个图中的实线圆柱体就变成了空心的圆柱体 
        mPaint.setStyle(Paint.Style.STROKE);
        //绘制直线 
        canvas.drawLine(50, 50, 450, 50, mPaint);
        //绘制矩形 
        canvas.drawRect(100, 100, 200, 300, mPaint);
        //绘制矩形 
        mPaint.setStyle(Paint.Style.FILL);
        canvas.drawRect(300, 100, 400, 400, mPaint);
        mPaint.setColor(Color.YELLOW);
        RectF r = new RectF(150, 500, 270, 600);
        // 画矩形 
        canvas.drawRect(r, mPaint);
        // 画圆 
        canvas.drawCircle(50, 500, 50, mPaint);
        RectF oval = new RectF(350, 500, 450, 700);
        // 画椭圆 
        canvas.drawOval(oval, mPaint);
        RectF rect = new RectF(100, 700, 170, 800);
        // 画圆角矩形 
        canvas.drawRoundRect(rect, 30, 20, mPaint);

        //绘制圆弧 绘制弧形 
        mPaint.setStyle(Paint.Style.FILL);
        mPaint.setColor(Color.RED);
        RectF re1 = new RectF(1000, 50, 1400, 200);
        canvas.drawArc(re1, 10, 270, false, mPaint);
        RectF re2 = new RectF(1000, 300, 1400, 500);
        canvas.drawArc(re2, 10, 270, true, mPaint);

        //设置Path路径 
        mPaint.setStyle(Paint.Style.STROKE);
        mPaint.setColor(Color.GREEN);
        mPaint.setStrokeWidth(3);
        Path path = new Path();
        path.moveTo(500, 100);
        path.lineTo(920, 80);
        path.lineTo(720, 200);
        path.lineTo(600, 400);
        path.close();
        mPaint.setTextSize(46);
        canvas.drawPath(path, mPaint);
        canvas.drawTextOnPath("***TEST**", path, -20, -20, mPaint);

        //三角形 
        path.moveTo(10, 330);
        path.lineTo(70, 330);
        path.lineTo(40, 270);
        path.close();
        canvas.drawPath(path, mPaint); //　画三角形

        canvas.save();
    }
    
```     

### Paint

绘制笔，绘制图形时的属性。基本用法如下

```
    Paint paint = new Paint();
    // 设置字体颜色
    paint.setColor(Color.RED);
    // 防锯齿
    paint.setAntiAlias(true);

    //设置颜色过滤器，可以在绘制颜色时实现不用颜色的变换效果
    paint.setColorFilter(ColorFilter);

    //如果该项设置为true，则图像在动画进行中会滤掉对Bitmap图像的优化操作，加快显示
    //速度，本设置项依赖于dither和xfermode的设置
    paint.setFilterBitmap(true);

    //当画笔样式为STROKE或FILL_OR_STROKE时，设置笔刷的粗细度
    paint.setStrokeWidth(10f);
    //设置绘制路径的效果，如点画线等
    paint.setPathEffect(PathEffect);

    //设置图像效果，使用Shader可以绘制出各种渐变效果
    // Shader.TileMode三种模式
    // REPEAT:沿着渐变方向循环重复 
    // CLAMP:如果在预先定义的范围外画的话，就重复边界的颜色 
    // MIRROR:与REPEAT一样都是循环重复，但这个会对称重复 
    Shader shader = new LinearGradient(0, 0, 100, 100,
            new int[]{Color.RED, Color.GREEN, Color.BLUE, Color.YELLOW},
            null, Shader.TileMode.REPEAT); 
    paint.setShader(shader);

    //设置MaskFilter，可以用不同的MaskFilter实现滤镜的效果，如滤化，立体等
    paint.setMaskFilter(MaskFilter);

    //在图形下面设置阴影层，产生阴影效果，radius为阴影的角度，dx和dy为阴影在x轴和y轴上的距离，color为阴影的颜色
    paint.setShadowLayer(float radius, float dx, float dy, int color);

    //设置画笔的样式，为FILL，FILL_OR_STROKE，或STROKE
    paint.setStyle(Paint.Style);

    //当画笔样式为STROKE或FILL_OR_STROKE时，设置笔刷的图形样式，圆形样式ROUND,或方形样式SQUARE  BUTT
    paint.setStrokeCap(Paint.Cap);

    //设置绘制时画笔与图形的结合方式，METER\ROUND\BEVEL  平滑效果
    paint.setSrokeJoin(Paint.Join);

    // 字体下划线
    paint.setUnderlineText(true);
    // 暂时不知，有清楚的可以告诉我，谢谢
    paint.setLinearText(true);
    // 字体加粗
    paint.setFakeBoldText(true);
    // 防抖动
    paint.setDither(true);
    // 透明度
    paint.setAlpha(0xF0);
```