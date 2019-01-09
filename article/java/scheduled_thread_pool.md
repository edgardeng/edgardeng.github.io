# 调度线程 ScheduledThreadPoolExecutor

> ScheduledThreadPoolExecutor是ThreadPoolExecutor的子类；在给定的延迟后运行命令，或者定期执行命令。

需要多个辅助线程时，或者要求 ThreadPoolExecutor 具有额外的灵活性或功能时，此类要优于 Timer。

一旦启用已延迟的任务就执行它，但是有关何时启用，启用后何时执行则没有任何实时保证。按照提交的先进先出 (FIFO) 顺序来启用那些被安排在同一执行时间的任务。


Timer和TimerTask的缺陷：

1：Timer只创建了一个线程。当你的任务执行的时间超过设置的延时时间将会产生一些问题。

2：Timer创建的线程没有处理异常，因此一旦抛出非受检异常，该线程会立即终止。

```java
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class Test
{
    static ScheduledThreadPoolExecutor stp = null;
    static int index;
    
    private static String getTimes() {  
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss E");  
        Date date = new Date();  
        date.setTime(System.currentTimeMillis());  
        return format.format(date);  
    } 
    
    
    private static class MyTask implements Runnable {  
        
        @Override  
        public void run() {  
            index++;  
            System.out.println("2= " + getTimes()+" "  +index);  
//            if(index >=10){  
//                stp.shutdown();  
//                if(stp.isShutdown()){  
//                    System.out.println("停止了？？？？");
//                } 
//            }
        }
    }
    public static void main(String[] args)
    {
        stp = new ScheduledThreadPoolExecutor(5);
        MyTask mytask = new MyTask();
        //mytask为线程，2是首次执行的延迟时间，最后一个参数为时间单位
//        stp.schedule(mytask, 2, TimeUnit.SECONDS);
        // 首次执行延迟2秒，之后的执行周期是1秒
//        stp.scheduleAtFixedRate(mytask, 2, 1,TimeUnit.SECONDS );
        //首次执行延迟2秒，之后从上一次任务结束到下一次任务开始时1秒
        stp.scheduleWithFixedDelay(mytask, 2, 1, TimeUnit.SECONDS);
        
    }

}

```
