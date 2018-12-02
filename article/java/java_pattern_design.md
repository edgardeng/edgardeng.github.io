## Java开发中的23种设计模式详解

> java的设计模式大体上分为三大类：创建型模式（5种）, 结构型模式（7种）, 行为型模式（11种）
  
创建型模式（5种）：
工厂方法模式，抽象工厂模式，单例模式，建造者模式，原型模式。

结构型模式（7种）：
适配器模式，装饰器模式，代理模式，外观模式，桥接模式，组合模式，享元模式。

行为型模式（11种）：
策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。

设计模式遵循的原则有6个：

1、开闭原则（Open Close Principle）

　　对扩展开放，对修改关闭。

2、里氏代换原则（Liskov Substitution Principle）

　　只有当衍生类可以替换掉基类，软件单位的功能不受到影响时，基类才能真正被复用，而衍生类也能够在基类的基础上增加新的行为。

3、依赖倒转原则（Dependence Inversion Principle）

　　这个是开闭原则的基础，对接口编程，依赖于抽象而不依赖于具体。

4、接口隔离原则（Interface Segregation Principle）

　　使用多个隔离的借口来降低耦合度。

5、迪米特法则（最少知道原则）（Demeter Principle）

　　一个实体应当尽量少的与其他实体之间发生相互作用，使得系统功能模块相对独立。

6、合成复用原则（Composite Reuse Principle）

　　原则是尽量使用合成/聚合的方式，而不是使用继承。继承实际上破坏了类的封装性，超类的方法可能会被子类修改。

### 1. 工厂模式（Factory Method）

常用的工厂模式是静态工厂，利用static方法，作为一种类似于常见的工具类Utils等辅助效果，一般情况下工厂类不需要实例化。

```
interface food{}

class A implements food{}
class B implements food{}
class C implements food{}

public class StaticFactory {

    private StaticFactory(){ }
    
    public static food getA(){  return new A(); }
    public static food getB(){  return new B(); }
    public static food getC(){  return new C(); }
}

class Client{
    //客户端代码只需要将相应的参数传入即可得到对象
    //用户不需要了解工厂类内部的逻辑。
    public void get(String name){
        food x = null ;
        if ( name.equals("A")) {
            x = StaticFactory.getA();
        }else if ( name.equals("B")){
            x = StaticFactory.getB();
        }else {
            x = StaticFactory.getC();
        }
    }
}
```

### 2. 抽象工厂模式（Abstract Factory）

  一个基础接口定义了功能，每个实现接口的子类就是产品，然后定义一个工厂接口，实现了工厂接口的就是工厂，这时候，接口编程的优点就出现了，我们可以新增产品类（只需要实现产品接口），只需要同时新增一个工厂类，客户端就可以轻松调用新产品的代码。

  抽象工厂的灵活性就体现在这里，无需改动原有的代码，毕竟对于客户端来说，静态工厂模式在不改动StaticFactory类的代码时无法新增产品，如果采用了抽象工厂模式，就可以轻松的新增拓展类。

```
interface food{}

class A implements food{}
class B implements food{}

interface produce{ food get();}

class FactoryForA implements produce{
    @Override
    public food get() {
        return new A();
    }
}
class FactoryForB implements produce{
    @Override
    public food get() {
        return new B();
    }
}
public class AbstractFactory {
    public void ClientCode(String name){
        food x= new FactoryForA().get();
        x = new FactoryForB().get();
    }
}
```

### 3. 单例模式（Singleton）

  在内部创建一个实例，构造器全部设置为private，所有方法均在该实例上改动，在创建上要注意类的实例化只能执行一次，可以采用许多种方法来实现，如Synchronized关键字，或者利用内部类等机制来实现。

```
public class Singleton {
    private Singleton(){}

    private static class SingletonBuild{
        private static Singleton value = new Singleton();
    }

    public Singleton getInstance() {
      return  SingletonBuild.value;
    }
  
}
```

### 4.建造者模式（Builder）

　　假设有一个问题，需要创建一个学生对象，属性有name,number,class,sex,age,school等属性，如果每一个属性都可以为空，也就是说我们可以只用一个name,也可以用一个school,name,或者其他任意的赋值来创建一个学生对象，这时该怎么构造？

　　难道我们写6个1个输入的构造函数，15个2个输入的构造函数...吗？这个时候就需要用到Builder模式了。

```
public class Builder {

    static class Student{
        String name = null ;
        int number = -1 ;
        String sex = null ;
        int age = -1 ;
        String school = null ;

　　　　　// 构建器，利用构建器作为参数来构建Student对象

        static class StudentBuilder{
            String name = null ;
            int number = -1 ;
            String sex = null ;
            int age = -1 ;
            String school = null ;
            public StudentBuilder setName(String name) {
                this.name = name;
                return  this ;
            }

            public StudentBuilder setNumber(int number) {
                this.number = number;
                return  this ;
            }

            public StudentBuilder setSex(String sex) {
                this.sex = sex;
                return  this ;
            }

            public StudentBuilder setAge(int age) {
                this.age = age;
                return  this ;
            }

            public StudentBuilder setSchool(String school) {
                this.school = school;
                return  this ;
            }
            public Student build() {
                return new Student(this);
            }
        }

        public Student(StudentBuilder builder){
            this.age = builder.age;
            this.name = builder.name;
            this.number = builder.number;
            this.school = builder.school ;
            this.sex = builder.sex ;
        }
    }

    public static void main( String[] args ){
        Student a = new Student.StudentBuilder().setAge(13).setName("LiHua").build();
        Student b = new Student.StudentBuilder().setSchool("sc").setSex("Male").setName("ZhangSan").build();
    }
}
```

### 5.原型模式（Prototype）

原型模式就是讲一个对象作为原型，使用clone()方法来创建新的实例。

```
public class Prototype implements Cloneable{

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    protected Object clone()   {
        try {
            return super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }finally {
            return null;
        }
    }

    public static void main ( String[] args){
        Prototype pro = new Prototype();
        Prototype pro1 = (Prototype)pro.clone();
    }
}

```

此处使用的是浅拷贝，关于深浅拷贝，大家可以另行查找相关资料。

### 6.适配器模式（Adapter）

  适配器模式的作用就是在原来的类上提供新功能。主要可分为3种：

* 类适配：

> 创建新类，继承源类，并实现新接口

class adapter extends oldClass  implements newFunc{ }

* 对象适配：

> 创建新类持源类的实例，并实现新接口，例如 

class adapter implements newFunc { private oldClass oldInstance ;}

* 接口适配：

> 创建新的抽象类实现旧接口方法。例如 

abstract class adapter implements oldClassFunc { void newFunc();}

### 7.装饰模式（Decorator）

 给一类对象增加新的功能，装饰方法与具体的内部逻辑无关。

```
interface Source{ void method(); }

public class Decorator implements Source{

    private Source source ;
    public void decotate1(){
        System.out.println("decorate");
    }
    @Override
    public void method() {
        decotate1();
        source.method();
    }
}
```
### 8.代理模式（Proxy）

客户端通过代理类访问，代理类实现具体的实现细节，客户只需要使用代理类即可实现操作。

这种模式可以对旧功能进行代理，用一个代理类调用原有的方法，且对产生的结果进行控制。

```
interface Source{ void method();}

class OldClass implements Source{
    @Override
    public void method() {
      // do some thing
    }
}

class Proxy implements Source{
    private Source source = new OldClass();

    void doSomething() { }
    @Override
    public void method() {
        new Class1().Func1();
        source.method();
        new Class2().Func2();
        // do some thing
    }
}
```

### 9.外观模式（Facade）

为子系统中的一组接口提供一个一致的界面，定义一个高层接口，这个接口使得这一子系统更加容易使用。

在启动停止所有子系统的时候，为它们设计一个外观类，这样就可以实现统一的接口，这样即使有新增的子系统subSystem4,也可以在不修改客户端代码的情况下轻松完成。

```
public class Facade {
    private subSystem1 subSystem1 = new subSystem1();
    private subSystem2 subSystem2 = new subSystem2();
    private subSystem3 subSystem3 = new subSystem3();
    
    public void startSystem(){
        subSystem1.start();
        subSystem2.start();
        subSystem3.start();
    }
    
    public void stopSystem(){
        subSystem1.stop();
        subSystem2.stop();
        subSystem3.stop();
    }
}
```

### 10.桥接模式（Bridge）

Circle类将DrawApi与Shape类进行了桥接，代码：

```
interface Draw {
    public void drawCircle(int radius, int x, int y);
}
class RedCircle implements Draw {
    @Override
    public void drawCircle(int radius, int x, int y) {
        System.out.println("Drawing Circle[ color: red, radius: "
                + radius +", x: " +x+", "+ y +"]");
    }
}
class GreenCircle implements Draw {
    @Override
    public void drawCircle(int radius, int x, int y) {
        System.out.println("Drawing Circle[ color: green, radius: "
                + radius +", x: " +x+", "+ y +"]");
    }
}

abstract class Shape {
    protected Draw draw;
    protected Shape(Draw d){
        this.draw = d;
    }
    public abstract void draw();
}

class Circle extends Shape {
    private int x, y, radius;

    public Circle(int x, int y, int radius, Draw d) {
        super(d);
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    public void draw() {
        draw.drawCircle(radius,x,y);
    }
}

//客户端使用代码
Shape redCircle = new Circle(100,100, 10, new RedCircle());
Shape greenCircle = new Circle(100,100, 10, new GreenCircle());
redCircle.draw();
greenCircle.draw();
```

### 11.组合模式（Composite）

 组合模式是为了表示那些层次结构，同时部分和整体也可能是一样的结构，常见的如文件夹或者树。举例：

```
abstract class component { }

class File extends component { String filename; }

class Folder extends component {
    component[] files ;  // 既可以放文件File类，也可以放文件夹Folder类。Folder类下又有子文件或子文件夹。
    String foldername ;
    public Folder(component[] source){ files = source ;}
    
    public void scan(){
        for ( component f:files){
            if ( f instanceof File){
                System.out.println("File "+((File) f).filename);
            }else if(f instanceof Folder){
                Folder e = (Folder)f ;
                System.out.println("Folder "+e.foldername);
                e.scan();
            }
        }
    }
    
}
```

### 12.享元模式（Flyweight）

使用共享对象的方法，用来尽可能减少内存使用量以及分享资讯。通常使用工厂类辅助，例子中使用一个HashMap类进行辅助判断，数据池中是否已经有了目标实例，如果有，则直接返回，不需要多次创建重复实例。

```
abstract class flywei{ }

public class Flyweight extends flywei{
    Object obj ;
    public Flyweight(Object obj){
        this.obj = obj;
    }
}

class  FlyweightFactory{
    private HashMap<Object,Flyweight> data;

    public FlyweightFactory(){ data = new HashMap<>();}

    public Flyweight getFlyweight(Object object){
        if ( data.containsKey(object)){
            return data.get(object);
        }else {
            Flyweight flyweight = new Flyweight(object);
            data.put(object,flyweight);
            return flyweight;
        }
    }
}

```

相关连接：

[23中设计模式](https://blog.csdn.net/doymm2008/article/details/13288067)

[菜鸟教程设计模式](http://www.runoob.com/design-pattern/design-pattern-intro.html)


创建型

抽象工厂模式 http://www.cnblogs.com/java-my-life/archive/2012/03/28/2418836.html

工厂方法 http://www.cnblogs.com/java-my-life/archive/2012/03/25/2416227.html

建造者模式  http://www.cnblogs.com/java-my-life/archive/2012/04/07/2433939.html

原型模式 http://www.cnblogs.com/java-my-life/archive/2012/04/11/2439387.html

单态模式 http://www.cnblogs.com/java-my-life/archive/2012/03/31/2425631.html

结构型

适配器模式 http://www.cnblogs.com/java-my-life/archive/2012/04/13/2442795.html

桥接模式 http://blog.csdn.net/jason0539/article/details/22568865

组合模式 http://blog.csdn.net/jason0539/article/details/22642281

外观模式 http://blog.csdn.net/jason0539/article/details/22775311

装饰者模式 http://www.cnblogs.com/java-my-life/archive/2012/04/20/2455726.html

享元模式 http://www.cnblogs.com/java-my-life/archive/2012/04/26/2468499.html

代理模式 http://www.cnblogs.com/java-my-life/archive/2012/04/23/2466712.html

行为型

责任链模式 http://blog.csdn.net/zhouyong0/article/details/7909456

命令模式 http://www.cnblogs.com/java-my-life/archive/2012/06/01/2526972.html

解释器模式 http://www.cnblogs.com/java-my-life/archive/2012/06/19/2552617.html

迭代模式 http://www.cnblogs.com/java-my-life/archive/2012/05/22/2511506.html

中介者模式 http://blog.csdn.net/chenhuade85/article/details/8141831

备忘录模式 http://www.cnblogs.com/java-my-life/archive/2012/06/06/2534942.html

观察者模式 http://www.cnblogs.com/java-my-life/archive/2012/05/16/2502279.html

状态模式 http://www.cnblogs.com/java-my-life/archive/2012/06/08/2538146.html

策略模式 http://www.cnblogs.com/java-my-life/archive/2012/05/10/2491891.html

模板方法模式 http://www.cnblogs.com/java-my-life/archive/2012/05/14/2495235.html

访问者模式 http://www.cnblogs.com/java-my-life/archive/2012/06/14/2545381.html