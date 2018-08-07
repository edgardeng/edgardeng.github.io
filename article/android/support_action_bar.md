# Android Support中的ActionBar 操作栏

> ActionBar是一个专用区域，可以标识您的应用并指示用户在应用中的位置，访问重要操作，支持导航和视图切换

  [官方教程链接](https://developer.android.google.cn/training/appbar/)
  
  [本文代码链接](https://github.com/edgardeng/android-support/)
  
## 在Activity中添加ActionBar

### 添加Toolbar

1. 确保 Activity 可以扩展自 AppCompatActivity：

2. Activity 的布局添加一个 Toolbar

```xml
<android.support.v7.widget.Toolbar
                 android:id="@+id/my_toolbar"
                 android:layout_width="match_parent"
                 android:layout_height="?attr/actionBarSize"
                 android:background="?attr/colorPrimary"
                 android:elevation="4dp"
                 android:theme="@style/ThemeOverlay.AppCompat.ActionBar"
                 app:popupTheme="@style/ThemeOverlay.AppCompat.Light"/>

```
3. 在 Activity 的 onCreate() 方法中，调用 Activity 的 setSupportActionBar() 方法，然后传递 Activity 的工具栏。该方法会将工具栏设置为 Activity 的应用栏。
              
```java
@Override
protected void onCreate(Bundle savedInstanceState) {
                  super.onCreate(savedInstanceState);
                  setContentView(R.layout.activity_my);
                  Toolbar myToolbar = (Toolbar) findViewById(R.id.my_toolbar);
                  setSupportActionBar(myToolbar);
} 
```

### 添加动作

> The app bar allows you to add buttons for user actions.an action should always be shown in the overflow menu, instead of being displayed on the app bar.

1. 添加动作按钮,在 res/menu/目录中编辑xml文件
```xml
<menu
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context="com.edgardeng.appcompat.MainActivity">

        <!-- "Mark Favorite", should appear as action button if possible -->
        <item
            android:id="@+id/action_favorite"
            android:icon="@android:drawable/star_off"
            android:title="favorite"
            app:showAsAction="ifRoom"/>

        <!-- Settings, should always be in the overflow -->
        <item android:id="@+id/action_settings"
            android:title="@string/action_settings"
            app:showAsAction="never"/>

</menu>

```
app:showAsAction属性决定按钮是否显示在ActionBar上。


2.动作按钮的相应

```java
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true; // 加载action btn 的布局
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        switch (id) {
            case R.id.action_settings:
                Log.w("Main","setting");
                break;
            case R.id.action_favorite:
                Log.w("Main","action_favorite");
                break;
        }
        return super.onOptionsItemSelected(item);
    }
```
 
### 添加返回按钮

1. 在清单文件中注册一个Activity
```xml
    <activity
            android:name="com.example.myfirstapp.MyChildActivity"
            android:label="@string/title_activity_child"
            android:parentActivityName="com.example.myfirstapp.MainActivity" >
    
            <!-- Parent activity meta-data to support 4.0 and lower -->
            <meta-data
                android:name="android.support.PARENT_ACTIVITY"
                android:value="com.example.myfirstapp.MainActivity" />
        </activity>
```

2. 在MyChildActivity这个Activity中,开启返回按钮
```
    ActionBar ab = getSupportActionBar(); //// Get a support ActionBar
    
    ab.setDisplayHomeAsUpEnabled(true); // Enable the Up button
```
    
### 添加Action Views 操作视图
> An action view is an action that provides rich functionality within the app ba     
1. 在toolbar的 菜单文件中添加item
```xml
<item android:id="@+id/action_search"
     android:title="@string/action_search"
     android:icon="@drawable/ic_search"
     app:showAsAction="ifRoom|collapseActionView"
     app:actionViewClass="android.support.v7.widget.SearchView" />

```

actionViewClass -> 实现该动作的控件类名

showAsAction -> (ifRoom|collapseActionView" , "never|collapseActionView) 展示方式，点击后展开

actionLayout -> 组件的layoutId

2. 在onCreateOptionsMenu方法内，获取控件并添加配置参数
```
    MenuItem searchItem = menu.findItem(R.id.action_search);
    SearchView searchView = (SearchView) searchItem.getActionView();
```

3. 对 action view 的展开状态进行监听。

```
    OnActionExpandListener expandListener = new OnActionExpandListener() {
        @Override
        public boolean onMenuItemActionCollapse(MenuItem item) {
            // Do something when action item collapses
            return true;  // Return true to collapse action view
        }

        @Override
        public boolean onMenuItemActionExpand(MenuItem item) {
            // Do something when expanded
            return true;  // Return true to expand action view
        }
    };

    MenuItem actionMenuItem = menu.findItem(R.id.myActionItem);

    MenuItemCompat.setOnActionExpandListener(actionMenuItem, expandListener);
```
__
### 添加 Action Provider 操作程序

1. 在toolbar的 菜单文件中添加item
```xml
<item android:id="@+id/action_share"
    android:title="@string/share"
    app:showAsAction="ifRoom"
    app:actionProviderClass="android.support.v7.widget.ShareActionProvider"/>
```


### 其他问题

#### Overflow按钮不显示

有时需要按一下Menu键，隐藏的内容就会从底部出来

利用反射机制，在ViewConfiguration这个类中有一个叫做sHasPermanentMenuKey的静态变量
```
private void setOverflowShowingAlways() {  
    try {  
        ViewConfiguration config = ViewConfiguration.get(this);  
        Field menuKeyField = ViewConfiguration.class.getDeclaredField("sHasPermanentMenuKey");  
        menuKeyField.setAccessible(true);  
        menuKeyField.setBoolean(config, false);  
    } catch (Exception e) {  
        e.printStackTrace();  
    }  
}  
```
#### Overflow中的选项显示图标

overflow中的Action按钮应不应该显示图标，是由MenuBuilder这个类的setOptionalIconsVisible方法来决定的
```java
@Override  
public boolean onMenuOpened(int featureId, Menu menu) {  
    if (featureId == Window.FEATURE_ACTION_BAR && menu != null) {  
        if (menu.getClass().getSimpleName().equals("MenuBuilder")) {  
            try {  
                Method m = menu.getClass().getDeclaredMethod("setOptionalIconsVisible", Boolean.TYPE);  
                m.setAccessible(true);  
                m.invoke(menu, true);  
            } catch (Exception e) {  
            }  
        }  
    }  
    return super.onMenuOpened(featureId, menu);  
} 
```

#### split action bar 将action button 放在底部

在清单文件中设置即可。
```xml
<activity uiOptions="splitActionBarWhenNarrow" ... >  
        <meta-data   
            android:name="android.support.UI_OPTIONS"  
            android:value="splitActionBarWhenNarrow" />  
    </activity>  
```


#### AppCompatActivity的其他相关方法：
      
getSupportActionBar() 获取ActionBar对象


#### ActionBar的其他方法

ActionBar.hide()  隐藏应用栏
      