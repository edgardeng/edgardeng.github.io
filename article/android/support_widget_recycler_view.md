# Android Support中的RecyclerView

> Google提供在Support Library提供了android.support.v7.widget.RecyclerView，RecyclerView可做为listview,gridview的一个替换方案，是一个有效的数据列表控件

[官方类参考](https://developer.android.google.cn/reference/android/support/v7/widget/RecyclerView)

[本文代码](https://github.com/edgardeng/android-support/)

## RecyclerView 基本用法

### 添加一个RecyclerView

1. 在资源文件中，添加布局

```xml
    <RelativeLayout
        app:layout_behavior="@string/appbar_scrolling_view_behavior"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <android.support.v7.widget.RecyclerView
            android:id="@+id/recyclerView"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />

    </RelativeLayout>

```

2.  新建适配器

```java

public class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.ViewHolder> {
    private List<String> list;

    public RecyclerViewAdapter(List<String> list) {
        this.list = list;
    }

    @Override
    public RecyclerViewAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_recyclerview, parent, false);
        RecyclerViewAdapter.ViewHolder viewHolder = new RecyclerViewAdapter.ViewHolder(view);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(RecyclerViewAdapter.ViewHolder holder, int position) {
        holder.title.setText(list.get(position));
        holder.label.setText(list.get(position));
    }

    @Override
    public int getItemCount() {
        return list.size();
    }


    class ViewHolder extends RecyclerView.ViewHolder {
        TextView title;
        TextView label;

        ViewHolder(View itemView) {
            super(itemView);
            title = itemView.findViewById(R.id.item_title);
            label = itemView.findViewById(R.id.item_label);
        }
    }
}
```

3. 获取recycerview,并配置

```java
    private RecyclerView mRecyclerView;
    private RecyclerViewAdapter mAdapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recyclerview);
        List<String> items = new ArrayList<>();
        for(int i =0;i<20;i++) {
            items.add("item-" + i);
        }

        // 通过findViewById拿到RecyclerView实例
        mRecyclerView = findViewById(R.id.recyclerView);
        // 设置RecyclerView管理器
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
        // 初始化适配器
        mAdapter = new RecyclerViewAdapter(items);
        // 设置添加或删除item时的动画，这里使用默认动画
        mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        // 设置适配器
        mRecyclerView.setAdapter(mAdapter);
    }
```

关于布局管理器，不同的管理器，实现不同的效果

LinearLayoutManager：以线性布局展示，可以设置横向和纵向
```
 mRecyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));
```
GridLayoutManager：以网格形式展示，类似GridView效果
```
 mRecyclerView.setLayoutManager(new GridLayoutManager(this, 3));
```
StaggeredGridLayoutManager：以瀑布流形式的效果
```
  mRecyclerView.setLayoutManager(new StaggeredGridLayoutManager(3,StaggeredGridLayoutManager.VERTICAL));
```

#### 条目分割线

> RecyclerView条目之间默认没有分割线，也不能像ListView一样设置divider以及dividerHight搞一条分割线，要使用ItemDecoration，这是一个画分割线的抽象类

1. 定义一个ItemDirection类

```java
 public class DividerItemDecoration extends RecyclerView.ItemDecoration {
        private int mOrientation = LinearLayoutManager.VERTICAL;
        private Drawable mDivider;

        private int[] attrs = new int[]{
                android.R.attr.listDivider
        };

        public DividerItemDecoration(Context context,  int orientation) {
            TypedArray typedArray = context.obtainStyledAttributes(attrs);
            mDivider = typedArray.getDrawable(0);
            typedArray.recycle();
            setOrientation(orientation);
        }

        private void setOrientation( int orientation) {
            if (orientation != LinearLayoutManager.VERTICAL && orientation != LinearLayoutManager.HORIZONTAL) {
                throw new IllegalArgumentException("传入的布局类型不合法");
            }
            this.mOrientation = orientation;
        }

        @Override
        public void onDraw(Canvas c, RecyclerView parent, RecyclerView.State state) {
            //调用这个绘制方法，RecyclerView会回调该绘制方法，需要我们自己去绘制条目的间隔线
            if (mOrientation == LinearLayoutManager.VERTICAL) {
                //垂直
                drawVertical(c, parent);
            } else {
                //水平
                drawHorizontal(c, parent);
            }
        }

        private void drawVertical(Canvas c, RecyclerView parent) {
            // 画水平线
            int left = parent.getPaddingLeft();
            int right = parent.getWidth() - parent.getPaddingRight();
            int childCount = parent.getChildCount();
            for (int i = 0; i < childCount; i++) {
                View child = parent.getChildAt(i);

                RecyclerView.LayoutParams params = (RecyclerView.LayoutParams) child.getLayoutParams();
                int top = child.getBottom() + params.bottomMargin + Math.round(child.getTranslationY());
                int bottom = top + mDivider.getIntrinsicHeight();
                mDivider.setBounds(left, top, right, bottom);
                mDivider.draw(c);
            }
        }

        private void drawHorizontal(Canvas c, RecyclerView parent) {
            int top = parent.getPaddingTop();
            int bottom = parent.getHeight() - parent.getPaddingBottom();
            int childCount = parent.getChildCount();
            for (int i = 0; i < childCount; i++) {
                View child = parent.getChildAt(i);

                RecyclerView.LayoutParams params = (RecyclerView.LayoutParams) child.getLayoutParams();
                int left = child.getRight() + params.rightMargin + Math.round(ViewCompat.getTranslationX(child));
                int right = left + mDivider.getIntrinsicHeight();
                mDivider.setBounds(left, top, right, bottom);
                mDivider.draw(c);
            }
        }

        @Override
        public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
            //获得条目的偏移量（所有的条目都会回调一次该方法）
            if (mOrientation == LinearLayoutManager.VERTICAL) {
                //垂直
                outRect.set(0, 0, 0, mDivider.getIntrinsicHeight());
            } else {
                //水平
                outRect.set(0, 0, mDivider.getIntrinsicWidth(), 0);
            }
        }

    }
```
2. 配置RecyclerView
```java
 mRecyclerView.addItemDecoration(new DividerItemDecoration(this, LinearLayoutManager.HORIZONAL));
```
3. 在style.xml中设置主题,改变divider的颜色
```xml
    <style name="AppTheme" >
       <!-- Customize your theme here. -->
       <item name="android:listDivider">@drawable/bg_recyclerview_divider</item>
    </style>
```

### RecyclerView的点击事件
     
> RecyclerView并没有像ListView的那样可以设置点击事件以及长按点击事件，需要在adapter中去设置回调的方式实现

     
1. 在Adapter中定义接口，并绑定clickListener

```java
public class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.ViewHolder> implements View.OnClickListener{
    private List<String> list;
    @Override
    public RecyclerViewAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_recyclerview, parent, false);

        RecyclerViewAdapter.ViewHolder viewHolder = new RecyclerViewAdapter.ViewHolder(view);
        view.setOnClickListener(this);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(RecyclerViewAdapter.ViewHolder holder, int position) {
        holder.itemView.setTag(position);
        holder.title.setText(list.get(position));
        holder.label.setText(list.get(position));
    }

    private OnItemClickListener mItemClickListener;

    @Override
    public void onClick(View v) {
        if (mItemClickListener!=null){
            mItemClickListener.onItemClick((Integer) v.getTag());
        }
    }
    public void setItemClickListener(OnItemClickListener itemClickListener) {
        mItemClickListener = itemClickListener;
    }
    
    public interface OnItemClickListener{
        void onItemClick(int position);
    }
    

}
```
2.在activity中配置
```java
 mAdapter.setItemClickListener(new RecyclerViewAdapter.OnItemClickListener() {
    @Override
    public void onItemClick(int position) {
        Toast.makeText(RecyclerViewActivity.this,"item-" + position,Toast.LENGTH_SHORT).show();
    }
 });
```

### 利用SwipeRefreshLayout实现下拉刷新

1.在布局文件中用SwipeRefreshLayout包裹RecyclerView
```xml
 <android.support.v4.widget.SwipeRefreshLayout
              android:id="@+id/gank_swipe_refresh_layout"
              android:layout_width="match_parent"
              android:layout_height="match_parent">
  
  <android.support.v7.widget.RecyclerView
               android:id="@+id/gank_recycler_view"
                  android:layout_width="match_parent"
                  android:layout_height="match_parent"
                  android:overScrollMode="never"/>
  </android.support.v4.widget.SwipeRefreshLayout>
```
2. 在activity监听swipe,
```java
    mRefreshView = findViewById(R.id.refreshView);
    mRefreshView.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
        @Override
        public void onRefresh() {
            refreshData();
            Log.w("RecyclerView", "SwipeRefreshLayout - onRefresh");
        }
    });
          
    private void refreshData() {
          items.clear();
          long time = System.currentTimeMillis();
          for(int i =0;i<20;i++) {
              items.add(time + "-new-" + i);
          }
          mAdapter.notifyDataSetChanged();
          // after refresh set status false
          mRefreshView.setRefreshing(false);
      }
```

#### 更多链接

[简书 RecyclerView全解析](https://www.jianshu.com/p/d19daa8d3965)
 