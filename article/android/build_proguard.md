# Android 开发中的 Proguard

> Proguard在Android应用的构建过程中，主要是混淆功能，根据Proguard帮助文档的描述，Proguard可以对Java class 文件进行shrink，optimize，obfuscate和preveirfy。

[原文链接](https://juejin.im/post/5b6af5655188251a9e171de2)

[Prouguard帮助文档](https://stuff.mit.edu/afs/sipb/project/android/sdk/android-sdk-linux/tools/proguard/docs/index.html#manual/introduction.html)

## Proguard介绍

四个功能：

* 压缩（Shrink）: 检测和删除没有使用的类，字段，方法和特性。
* 优化（Optimize） : 分析和优化Java字节码。
* 混淆（Obfuscate）: 使用简短的无意义的名称，对类，字段和方法进行重命名。
* 预检（Preveirfy）: 用来对Java class进行预验证（预验证主要是针对JME开发来说的，Android中没有预验证过程，默认是关闭）。

根据proguard-android-optimize.txt对optimize的描述，在Android中使用是有潜在风险的，并不能保证在所有版本的Dalvik虚拟机上正常运行，需做好全面的测试。

在Android项目相应module下的build.gradle文件中会看到，minifyEnabled 为true是开启Proguard的功能，false是关闭。

```
  buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
  }
```


## Proguard工作流程


```
Input jars	- shrink →
Shrunk code	- optimize →
Optim. code	- obfuscate →	
Obfusc. code	- preverify → Output jars
	
Library jars	---------------------- (unchanged) --------------------→	Library jars
```

Proguard工作流程是对输入的jars经过shrink->optimize->obfuscate->preveirfy依次处理，library jars是input jars运行所依赖的包，比如Java运行时的rt.jar，Android运行时android.jar，这些jars在上述处理过程中不会有任何改变，仅是作为输入jars的依赖。

另外这四个步骤其实都是可选的，可以在需要自定义Proguard规则的proguard-rules.pro文件中给-keep选项添加修饰符，如-keep allowshrinking class_specification（类的模板），表示对类的模板匹配的部分只进行压缩的操作，(有一点大家要注意，-keep allowshrinking修饰的部分如果被Proguard判定为未被使用，在压缩阶段是会被删除的)，同理，allowoptimization和allowobfuscation，只进行对应的优化和混淆操作，它们作用的部分在压缩阶段不会被删除。

Proguard是怎么知道哪些类，方法，成员变量等是无用的呢，这就要说到Entry Point（入口点），我们在配置文件(包括默认的proguard-android.txt)中写入的一系列-keep选项，都会作为Entry Point，Proguard把这些Entry Points作为搜索的入口，进行递归检索，以此来确定哪些部分未使用到。类似于hotspot虚拟机对可回收对象的判定，从GC Roots出发，进行可达性的判断，不可达的为可回收对象。Entry Points非常重要，Proguard的压缩，优化，混淆功能是以Entry Point作为依据的(预检不需要以此为依据)。

在压缩过程中，Proguard从Entry Points出发，递归检索，删除那些没有使用到的类和类的成员，在接下来的优化过程中，那些非Entry Points的类和方法会被设置成private，static或final，没有使用到的参数会被移除，有些方法可能会被标记为内联的，在混淆过程中，会对非EntryPoint的类和类的成员进行重命名，也就是用其它无意义的名称代替。我们在配置文件中用-keep保留的部分属于Entry Point，所以不会被重命名。

### Proguard配置文件的依据

为什么需要保留一些类和类的成员(方法和变量)不被重命名呢 ? 原因是Proguard对class文件经过一系列处理后，能保证功能上和原来是一样的，但有些情况它却不能良好的处理，比如我们代码中有些功能依赖于它们原来的名字，如反射功能，native调用(函数签名)等，如果换成其它名字，会出现找不到，不对应的情况，可能引起程序崩溃，或者我们的对外提供了一些功能，必须保持原来的名字，才能保证其它依赖这些功能的模块能正确的运行等。另外，我们要用-keep告诉Proguard程序的入口（带有-keep的选项都会作为Entry Point），以此来确定哪些是未被使用的类和类的成员，方法等，并删除它们

Proguard不仅提供了-keep选项，还有一些其它配置选项，比如-dontoptimize 对输入的Java class 文件不进行优化处理，-verbose 生成混淆后的映射文件等。

### 编写Proguard配置文件

第1条是可以作为Android App的配置模板的(默认的proguard-android.txt文件里的配置没有列举出来)，基本所有的app都会用到。

#### 通用配置

```

#代码混淆压缩比，在0~7之间，默认为5，一般不做修改	
-optimizationpasses 5

#把混淆类中的方法名也混淆了
-useuniqueclassmembernames

#优化时允许访问并修改有修饰符的类和类的成员 
-allowaccessmodification

# 避免混淆内部类、泛型、匿名类
-keepattributes InnerClasses,Signature,EnclosingMethod

#抛出异常时保留代码行号    
-keepattributes SourceFile,LineNumberTable

#重命名抛出异常时的文件名称为"SourceFile"
-renamesourcefileattribute SourceFile

#保持所有实现 Serializable 接口的类成员
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

#保留我们使用的四大组件，自定义的Application等等这些类不被混淆    
#因为这些子类都有可能被外部调用    
-keep public class * extends android.app.Activity    
-keep public class * extends android.app.Appliction    
-keep public class * extends android.app.Service        
-keep public class * extends android.content.BroadcastReceiver    
-keep public class * extends android.content.ContentProvider    
-keep public class * extends android.app.backup.BackupAgentHelper    
-keep public class * extends android.preference.Preference 

#保留support下的所有类及其内部类
-keep class android.support.** {*;}
# 保留继承的support类
-keep public class * extends android.support.v4.**
-keep public class * extends android.support.v7.**
-keep public class * extends android.support.annotation.**

#保留我们自定义控件（继承自View）不被混淆
-keep public class * extends android.view.View{
    *** get*();
    void set*(***);
    public <init>(android.content.Context);
    public <init>(android.content.Context, android.util.AttributeSet);
    public <init>(android.content.Context, android.util.AttributeSet, int);
}

#Fragment不需要在AndroidManifest.xml中注册，需要额外保护下
-keep public class * extends android.app.Fragment

# 保持测试相关的代码
-dontnote junit.framework.**
-dontnote junit.runner.**
-dontwarn android.test.**
-dontwarn android.support.test.**
-dontwarn org.junit.**  

```

#### 针对性配置

1. 实体类需要保留

我们需要保留实体类的get和set方法(反射会用到)，boolean类型的get方法是isXXX，不要忘记保留。

```
 -keep public class com.dev.example.entity.** {
    public void set*(***);
    public *** get*();
    public *** is*();
  }
  
```

如果所有的实体类在一个包下的话，上面的配置只用写一遍就可以了。可是实际中我们更多的是以业务来划分包名的，于是我们还可以这样配置(实体类的类名一定要含有"Model")

```
-keep public class **.*Model*.** {
    public void set*(***);
    public *** get*();
    public *** is*();
}
```

2. 对内部类的处理

如果项目中使用了内部类，要对其进行保留。

1.保留写在某个类里面的所有内部类。下面表示写在类A里面的内部类都会被保留($符号是用来分割内部类与其母体的标志），什么意思呢，比如类A里面有一个内部类B,而B里面也有个内部类C，这时，B和C都会被保留，以此类推，对多重嵌套的情况，都会被保留(当然我们写代码也不会写出这么深层级的内部类出来)，这里的内部类包含静态内部类，非静态内部类，不包含匿名内部类，如果是匿名内部类，只会保留其方法和成员变量（其继承的类或实现的接口的名字会被混淆），另外如果对应的类被保留，在该类里面定义的接口也会被保留，{*;}匹配该类里面的所有部分。

```
-keep class com.dev.example.A$* { *; }

```
2.保留写在某个内部类里面所有的内部类，这话听着有点绕口，举个例子，类A里面有个内部类B，下面表示写在类B里面的内部类都会被保留。此时，类B像上面第一点所举得类A一样，有点递归意思在里面。还有就是此时类B的名字不会被混淆，但里面的方法和成员变量会被混淆，如果其它地方没有对类B的方法和成员变量进行保留的话。

```
-keep class com.dev.example.A$B$* { *; }

```
3. 对webView进行处理

```
 -keepclassmembers class fqcn.of.javascript.interface.for.webview {
   public *;
}
-keepclassmembers class * extends android.webkit.webViewClient {
    public void *(android.webkit.WebView, java.lang.String, android.graphics.Bitmap);
    public boolean *(android.webkit.WebView, java.lang.String);
}
-keepclassmembers class * extends android.webkit.webViewClient {
    public void *(android.webkit.webView, jav.lang.String);
}

```

4. 保留js调用的原生方法
如果我们的app中涉及到和h5交互，需要保留js调用的原生方法。

```
# Keep JavascriptInterface
-keepclassmembers class ** {
    @android.webkit.JavascriptInterface public *;
}

```
5. 对含有反射类的处理
有时候项目中有些类不是实体类，但仍然用到反射功能,如Class.forName("xxx")，这是我们需要保留的。比如这些类在com.dev.example包下，可以通过下面的配置进行保留。
```
-keep class com.dev.example.* { *; }

```
另外上面只是保留了该包下的类，如果该包下还有子包，则子包的类仍然会被混淆，
如果想保留该包下子包的类，我们可以如下配置（**能匹配本包和所含子包，其中子包也可以含有子包）
```
-keep class com.dev.example.**{ *; }

```

6. 常见的自定义的配置


```
# 1.保留某个特定的类
#保留Test类
-keep public class com.dev.example.Test { *; }

# 2.保留某个类的子类
#保留继承了AbstractClass的子类
-keep class * extends com.dev.example.AbstractClass{*;}

#3.保留接口的实现类
#保留实现了Callable接口的类
-keep class * implements Callable{*;}

# 4.保留类的特定部分
# 保留TaskRepository类的所有构造方法，变量和普通方法。
-keep class com.dev.example.TaskRepository{
 <init>;     //匹配所有构造器
 <fields>;   //匹配所有域
 <methods>;  //匹配所有方法
}

```
还可以保留的更具体一点，如下所示

```
-keepclassmembers com.dev.example.TaskRepository{
 // 保留该类的修饰符是public且有一个参数(类型是String)的构造方法
 public <init>(java.lang.String);
 // 保留该类的所有修饰符是public且返回类型void的方法
 public void *(**); 
 // 保留该类的具体某一个方法                 
 public String getUserName();       
}

```
7. 对于第三方依赖库的处理

下面给出几个例子,用到具体第三发依赖库的时候，对应的文档会给出相应配置的。

```

#okhttp
-dontwarn com.squareup.okhttp.**
-dontwarn com.squareup.okhttp3.**
-keep class com.squareup.okhttp3.** { *;}
-dontwarn okio.**

#retroift
-dontwarn retrofit2.**
-keep class retrofit2.** { *; }
-keepattributes Signature
-keepattributes Exceptions

# fresco SDK
-keep,allowobfuscation @interface com.facebook.common.internal.DoNotStrip
# Do not strip any method/class that is annotated with @DoNotStrip
-keep @com.facebook.common.internal.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.common.internal.DoNotStrip *;
}

#rx
-dontwarn rx.**
-keep class rx.** { *;}

#keep GSON stuff
-keep class sun.misc.Unsafe { *; }
-keep class com.google.gson.** { *; }

#ButterKnife
-keep class butterknife.** { *; }
-dontwarn butterknife.internal.**
-keep class **$$ViewBinder { *; }

-keepclasseswithmembernames class * {
    @butterknife.* <fields>;
}

-keepclasseswithmembernames class * {
    @butterknife.* <methods>;
}

#enventbus
-keep class org.greenrobot.eventbus.** { *;}
-dontwarn org.greenrobot.eventbus.**

-keepclassmembers class ** {另外说一下
   public void onEvent*(**);
}

# Bugly
-dontwarn com.tencent.bugly.**
-keep public class com.tencent.bugly.**{*;}

# aliyun push
-keepclasseswithmembernames class ** {
    native <methods>;
}

# QQ share SDK
-dontwarn com.tencent.**
-keepnames class com.tencent.** {*;}

# sina share SDK
-dontwarn com.sina.**
-keepnames class com.sina.** {*;}

# umeng SDK
-keep public class * extends com.umeng.**
-dontwarn com.umeng.**
-keep class com.umeng.** { *; }

```

关于多module项目的配置，一种方法是关闭子module的Proguard功能，在我们主app的proguard-rules.pro文件中配置所有module的配置选项。这样会使主app的proguard配置文件变得比较杂乱，如果业务发展过程中，某个子module的功能不需要了，还要在主app的配置文件中找到对应子module的配置，并删除它们，不建议使用。
另一种方式是各个module配置好自己的配置文件，要注意的是，子module中制定配置文件的方式如下所示:


```
buildTypes {
        release {
            consumerProguardFiles  'proguard-rules.pro'
        }
    }
    
```
子module是通过consumerProguardFiles来指定配置文件的，而不是proguardFiles。
在导出包时，如果发现有很多could not reference class之类的warning信息，确认app在运行时和这些warning没有任何关系，可以配置-dontwarn选项，就不会提示这些warning信息了。
到这里Proguard配置部分基本已经说完了。Proguard是对class字节码文件进行操作的，有时我们还想对资源文件进行混淆，比较成熟的是微信的资源混淆文件方案，由于本次讨论的重点不是这个，不再多说。附上该项目的链接：
https://github.com/shwenzhang/AndResGuard

### 检查混淆和追踪异常

开启Proguard功能，则每次构建时 ProGuard 都会输出下列文件：

* dump.txt
说明 APK 中所有类文件的内部结构。
* mapping.txt
提供原始与混淆过的类、方法和字段名称之间的转换。
* seeds.txt
列出未进行混淆的类和成员。
* usage.txt
列出从 APK 移除的代码。

这些文件保存在 /build/outputs/mapping/release/ 中。可以查看seeds.txt里面是否是我们需要保留的，以及usage.txt里查看是否有误删除的代码。mapping.txt文件很重要，由于我们的部分代码是经过重命名的，如果该部分出现bug，对应的异常堆栈信息里的类或成员也是经过重命名的，难以定位问题。我们可以用 retrace 脚本（在 Windows 上为 retrace.bat；在 Mac/Linux 上为 retrace.sh）。它位于 /tools/proguard/ 目录中。该脚本利用 mapping.txt文件和你的异常堆栈文件生成没有经过混淆的异常堆栈文件,这样就可以看清是哪里出问题了。

使用 retrace 工具的语法如下：

```
retrace.bat|retrace.sh [-verbose] mapping.txt [<stacktrace_file>]
```
例如：

```
retrace.bat -verbose mapping.txt obfuscated_trace.txt
```
