# Java多线程之线程池

> 在java中多线程的实践中，线程池可以限制系统中执行线程的数量，有一定的管理作用。

## 线程 Thread
```java
new Thread(new Runnable() {
    @Override
    public void run() {
    // TODO Auto-generated method stub
    }
}).start();
```
使用new Thread()的弊端如下：
1. 每次new Thread新建对象性能差。
2. 线程缺乏统一管理，可能无限制新建线程，相互之间竞争，及可能占用过多系统资源导致死机或oom。
3. 缺乏更多功能，如定时执行、定期执行、线程中断。

线程池的好处在于：
1. 重用存在的线程，减少对象创建、消亡的开销，性能佳。
2. 可有效控制最大并发线程数，提高系统资源的使用率，同时避免过多资源竞争，避免堵塞
3. 提供定时执行、定期执行、单线程、并发数控制等功能。

## 线程池 ThreadPool

Java通过Executors提供四种线程池，分别为：
* newCachedThreadPool 创建一个可缓存线程池，如果线程池长度超过处理需要，可灵活回收空闲线程，若无可回收，则新建线程。
* newFixedThreadPool 创建一个定长线程池，可控制线程最大并发数，超出的线程会在队列中等待。
* newScheduledThreadPool 创建一个定长线程池，支持定时及周期性任务执行。
* newSingleThreadExecutor 创建一个单线程化的线程池，它只会用唯一的工作线程来执行任务，保证所有任务按照指定顺序(FIFO, LIFO, 优先级)执行。

### newCachedThreadPool

```java
ExecutorService cachedThreadPool = Executors.newCachedThreadPool();

for (int i = 0; i < 10; i++) {
    final int index = i;
    try {
        Thread.sleep(index * 1000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    cachedThreadPool.execute(new Runnable() {
        @Override
        public void run() {
            System.out.println(index);
        }
    });
}
```
线程池为无限大，当执行第二个任务时第一个任务已经完成，会复用执行第一个任务的线程，而不用每次新建线程。

```java
public static ExecutorService newCachedThreadPool() {
        return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                      60L, TimeUnit.SECONDS,
                                      new SynchronousQueue<Runnable>());
}
```

CachedThreadPool的corePoolSize被设置为0，即corePool为空；
maximumPoolSize被设置为Integer.MAX_VALUE，即maximum是无界的。
这里keepAliveTime设置为60秒，意味着空闲的线程最多可以等待任务60秒，否则将被回收。
 
CachedThreadPool使用没有容量的SynchronousQueue作为主线程池的工作队列，它是一个没有容量的阻塞队列。
每个插入操作必须等待另一个线程的对应移除操作。这意味着，如果主线程提交任务的速度高于线程池中处理任务的速度时，CachedThreadPool会不断创建新线程。
极端情况下，CachedThreadPool会因为创建过多线程而耗尽CPU资源.

执行过程如下：

1.首先执行SynchronousQueue.offer(Runnable task)。如果在当前的线程池中有空闲的线程正在执行SynchronousQueue.poll()，那么主线程执行的offer操作与空闲线程执行的poll操作配对成功，主线程把任务交给空闲线程执行。，execute()方法执行成功，否则执行步骤2

2.当线程池为空(初始maximumPool为空)或没有空闲线程时，配对失败，将没有线程执行SynchronousQueue.poll操作。这种情况下，线程池会创建一个新的线程执行任务。

3.在创建完新的线程以后，将会执行poll操作。当步骤2的线程执行完成后，将等待60秒，如果此时主线程提交了一个新任务，那么这个空闲线程将执行新任务，否则被回收。因此长时间不提交任务的CachedThreadPool不会占用系统资源。



SynchronousQueue是一个不存储元素阻塞队列，每次要进行offer操作时必须等待poll操作，否则不能继续添加元素。

Java并发包中的阻塞队列一共7个，当然他们都是线程安全的:

* ArrayBlockingQueue：一个由数组结构组成的有界阻塞队列。 

* LinkedBlockingQueue：一个由链表结构组成的有界阻塞队列。 

* PriorityBlockingQueue：一个支持优先级排序的无界阻塞队列。 

* DealyQueue：一个使用优先级队列实现的无界阻塞队列。 
　
* SynchronousQueue：一个不存储元素的阻塞队列。 

* LinkedTransferQueue：一个由链表结构组成的无界阻塞队列。 

* LinkedBlockingDeque：一个由链表结构组成的双向阻塞队列。

### newFixedThreadPool

```java
ExecutorService fixedThreadPool = Executors.newFixedThreadPool(3);

for (int i = 0; i < 10; i++) {
    final int index = i;
    fixedThreadPool.execute(new Runnable() {
        @Override
        public void run() {
            try {
                System.out.println(index);
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    });
}
```

因为线程池大小为3，每个任务输出index后sleep 2秒，所以每两秒打印3个数字。

定长线程池的大小最好根据系统资源进行设置。如dRuntime.getRuntime().availableProcessors()。可参考PreloadDataCache。

```java
public static ExecutorService newFixedThreadPool(int nThreads) { 
        return new ThreadPoolExecutor(nThreads, nThreads, 0L,
                                      TimeUnit.MILLISECONDS, 
                                      new LinkedBlockingQueue<Runnable>()); 
} 
```

执行过程如下：

1.如果当前工作中的线程数量少于corePool的数量，就创建新的线程来执行任务。

2.当线程池的工作中的线程数量达到了corePool，则将任务加入LinkedBlockingQueue。

3.线程执行完1中的任务后会从队列中去任务。

注意LinkedBlockingQueue是无界队列，所以可以一直添加新任务到线程池。

 
### newScheduledThreadPool

```java
ScheduledExecutorService scheduledThreadPool = Executors.newScheduledThreadPool(5);

scheduledThreadPool.schedule(new Runnable() {
    @Override
    public void run() {
        System.out.println("delay 3 seconds");
    }
    }, 3, TimeUnit.SECONDS); // 表示延迟3秒执行。

scheduledThreadPool.scheduleAtFixedRate(new Runnable() {
    @Override
    public void run() {
        System.out.println("delay 1 seconds, and excute every 3 seconds");
    }
}, 1, 3, TimeUnit.SECONDS); // 表示延迟1秒后每3秒执行一次。
```

### newSingleThreadExecutor

```java
ExecutorService singleThreadExecutor = Executors.newSingleThreadExecutor();
for(int i=0;i< 10;i++){
    final int index=i;
    singleThreadExecutor.execute(new Runnable(){
    @Override
    public void run(){
        try{
            System.out.println(index);
            Thread.sleep(2000);
            } catch (InterruptedException e){
                        e.printStackTrace();
            }
        }
    }); // 结果依次输出，相当于顺序执行各个任务。
}
```

```java
public static ExecutorService newSingleThreadExecutor() {
        return new FinalizableDelegatedExecutorService
            (new ThreadPoolExecutor(1, 1,
                                    0L, TimeUnit.MILLISECONDS,
                                    new LinkedBlockingQueue<Runnable>()));
}
```

执行过程如下：

1.如果当前工作中的线程数量少于corePool的数量，就创建一个新的线程来执行任务。

2.当线程池的工作中的线程数量达到了corePool，则将任务加入LinkedBlockingQueue。

3.线程执行完1中的任务后会从队列中去任务。

注意：由于在线程池中只有一个工作线程，所以任务可以按照添加顺序执行。


比较重要的几个类：

#### Executor

Executor是一个接口，跟线程池有关的基本都要跟他打交道。只有一个execute方法。

#### ExecutorService 线程池接口

Executor的子接口，增加了一些常用的对线程的控制方法，之后使用线程池主要也是使用这些方法。

#### AbstractExecutorService

抽象类。ThreadPoolExecutor就是实现了这个类。


#### ScheduledExecutorService

Timer/TimerTask类似，解决那些需要任务重复执行的问题。

#### ThreadPoolExecutor

ExecutorService的默认实现, 线程池的真正实现，通过构造方法的一系列参数，来构成不同配置的线程池。常用的构造方法有下面四个：

```java
ThreadPoolExecutor(int corePoolSize,
                        int maximumPoolSize,
                        long keepAliveTime,
                        TimeUnit unit,
                        BlockingQueue<Runnable> workQueue) 
                        
ThreadPoolExecutor(int corePoolSize,
                        int maximumPoolSize,
                        long keepAliveTime,
                        TimeUnit unit,
                        BlockingQueue<Runnable> workQueue,
                        ThreadFactory threadFactory)
                        
ThreadPoolExecutor(int corePoolSize,
                        int maximumPoolSize,
                        long keepAliveTime,
                        TimeUnit unit,
                        BlockingQueue<Runnable> workQueue,
                        RejectedExecutionHandler handler)
                        
ThreadPoolExecutor(int corePoolSize,
                        int maximumPoolSize,
                        long keepAliveTime,
                        TimeUnit unit,
                        BlockingQueue<Runnable> workQueue,
                        ThreadFactory threadFactory,
                        RejectedExecutionHandler handler)
```

* corePoolSize
    > 核心线程数，默认情况下核心线程会一直存活，即使处于闲置状态也不会受存keepAliveTime限制。除非将allowCoreThreadTimeOut设置为true。

一个任务通过 execute(Runnable)方法被添加到线程池，任务就是一个 Runnable类型的对象，任务的执行方法就是 Runnable类型对象的run()方法。 

当一个任务通过execute(Runnable)方法欲添加到线程池时： 

如果此时线程池中的数量小于corePoolSize，即使线程池中的线程都处于空闲状态，也要创建新的线程来处理被添加的任务。 
如果此时线程池中的数量等于 corePoolSize，但是缓冲队列 workQueue未满，那么任务被放入缓冲队列。 
如果此时线程池中的数量大于corePoolSize，缓冲队列workQueue满，并且线程池中的数量小于maximumPoolSize，建新的线程来处理被添加的任务。 
如果此时线程池中的数量大于corePoolSize，缓冲队列workQueue满，并且线程池中的数量等于maximumPoolSize，那么通过 handler所指定的策略来处理此任务。 


* maximumPoolSize
    > 线程池所能容纳的最大线程数。超过这个数的线程将被阻塞。当任务队列为没有设置大小的LinkedBlockingDeque时，这个值无效。

* keepAliveTime
    > 非核心线程的闲置超时时间，超过这个时间就会被回收。

* unit
    > 指定keepAliveTime的单位，如TimeUnit.SECONDS。当将allowCoreThreadTimeOut设置为true时对corePoolSize生效。

* workQueue
    > 线程池中的任务队列
    
常用的有三种队列，SynchronousQueue,LinkedBlockingDeque,ArrayBlockingQueue。

* threadFactory
    > 线程工厂，提供创建新线程的功能。
    
ThreadFactory是一个接口，只有一个方法
```java
public interface ThreadFactory {
  Thread newThread(Runnable r);
}
```


通过线程工厂可以对线程的一些属性进行定制。
```java
static class DefaultThreadFactory implements ThreadFactory {
  private static final AtomicInteger poolNumber = new AtomicInteger(1);
  private final ThreadGroup group;
  private final AtomicInteger threadNumber = new AtomicInteger(1);
  private final String namePrefix;

  DefaultThreadFactory() {
      SecurityManager var1 = System.getSecurityManager();
      this.group = var1 != null?var1.getThreadGroup():Thread.currentThread().getThreadGroup();
      this.namePrefix = "pool-" + poolNumber.getAndIncrement() + "-thread-";
  }

  public Thread newThread(Runnable var1) {
      Thread var2 = new Thread(this.group, var1, this.namePrefix + this.threadNumber.getAndIncrement(), 0L);
      if(var2.isDaemon()) {
          var2.setDaemon(false);
      }

      if(var2.getPriority() != 5) {
          var2.setPriority(5);
      }

      return var2;
  }
}
```


* RejectedExecutionHandler
    > 当线程池中的资源已经全部使用，添加新线程被拒绝时，会调用RejectedExecutionHandler的rejectedExecution方法。

```java
public interface RejectedExecutionHandler {
  void rejectedExecution(Runnable var1, ThreadPoolExecutor var2);
}
```
根据应用场景实现RejectedExecutionHandler接口，自定义饱和策略，如记录日志或持久化存储不能处理的任务。
handler有四个选择： 
* ThreadPoolExecutor.AbortPolicy()  抛出java.util.concurrent.RejectedExecutionException异常 
* ThreadPoolExecutor.CallerRunsPolicy()  重试添加当前的任务，他会自动重复调用execute()方法 
* ThreadPoolExecutor.DiscardOldestPolicy() 抛弃旧的任务 
* ThreadPoolExecutor.DiscardPolicy() 抛弃当前的任务 



### 线程池规则

线程池的线程执行规则跟任务队列有很大的关系。

下面都假设任务队列没有大小限制：

1. 如果线程数量<=核心线程数量，那么直接启动一个核心线程来执行任务，不会放入队列中。
2. 如果线程数量>核心线程数，但<=最大线程数，并且任务队列是LinkedBlockingDeque的时候，超过核心线程数量的任务会放在任务队列中排队。
3. 如果线程数量>核心线程数，但<=最大线程数，并且任务队列是SynchronousQueue的时候，线程池会创建新线程执行任务，这些任务也不会被放在任务队列中。这些线程属于非核心线程，在任务完成后，闲置时间达到了超时时间就会被清除。
4. 如果线程数量>核心线程数，并且>最大线程数，当任务队列是LinkedBlockingDeque，会将超过核心线程的任务放在任务队列中排队。也就是当任务队列是LinkedBlockingDeque并且没有大小限制时，线程池的最大线程数设置是无效的，他的线程数最多不会超过核心线程数。
5. 如果线程数量>核心线程数，并且>最大线程数，当任务队列是SynchronousQueue的时候，会因为线程池拒绝添加任务而抛出异常。

任务队列大小有限时:
当LinkedBlockingDeque塞满时，新增的任务会直接创建新线程来执行，当创建的线程数量超过最大线程数量时会抛异常。
SynchronousQueue没有数量限制。因为他根本不保持这些任务，而是直接交给线程池去执行。当任务数量超过最大线程数时会直接抛异常。


#### ScheduledThreadPoolExecutor

继承ThreadPoolExecutor的ScheduledExecutorService接口实现，周期性任务调度的类实现。
