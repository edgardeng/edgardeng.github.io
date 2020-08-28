# 数据库事务

数据库事务的典型业务场景
什么是事务
> 事务 是数据库管理系统（DBMS）执行过程中的一个逻辑单位，由一个有限的数据库操作序列构成

哪些存储引擎支持事务
事务的四大特性
  * 原子性 Atomicity
  * 一致性 Consistency
  * 隔离性 Isolation
  * 持久性 Durability

事务的四种隔离级别
SQL92 ANSI/ISO

* Read UnCommitted 未提交读
* Read Committed 已提交读
* Repeatable Read 可重复读
* Serializable 可串行化 解决事务并发的所有问题


Mysql InnoDB对事务隔离级别的支持成程度
｜隔离级别｜脏读｜不可重复读｜幻读｜
｜:----｜:----｜:----｜:----｜
|未提交读RU |可能|可能|可能｜
|已提交读RC |不可能|可能|可能｜
|可重复读RR |不可能|不可能|对InnoDB不可能｜
|串行化S |不可能|不可能|不可能｜

事务隔离级别的解决方案
1. 当前读
  在读取数据前，对其加锁，阻止其他事务数据进行修改
  Lock Based Concurrency Control (LBCC)
2. 快照读
  生成一个数据请求时间点的一致性数据快照SnapShot，并利用快照来提供一定级别
  （语句事务级）的一致性读取 Multi Version Concurrency Control (MVCC)  

Innodb为每行记录都实现了三个隐藏字段
DB_ROW_ID 6字节 行标志
DB_TRX_ID  6字节 插入或更新行的最后一个事务的事务ID，自动递增（创建版本号）
DB_ROLL_PTR 7字节：回滚指针（删除版本号）

InnoDB锁的分类：
* 行锁
* 表锁
* 乐观锁/悲观锁
* 死锁
* 间隙锁
* 插入意向锁
* 记录锁
* 邻键锁
* 共享锁
* 排他锁
* 自增锁
* 意向锁

### 行锁： 共享锁（Shared Lock）

共享锁（S锁）：又称读锁，共享锁是多个事务对同一个数据可以共享一把锁，都能访问到数据，但只能读不能改
  加锁方式： select * from table_name where id =1 LOCK IN SHARE MODE
  释放锁： commit / rollback
  
### 行锁： 排他锁（Exclusive Lock）

排他锁（X锁）：又称写锁。排他锁不能与其他锁并存，如果一个事务获取一个数据行的排他锁，其他事务就不能获取该行的锁（共享锁，排他锁）
只有该获取了排他锁的事务是可以对数据进行读取和修改

  加锁方式：
     自动： delete / update / insert 默认加上x锁
     手动： select * from student where id = 1 FOR UPDATE

锁的作用？

锁到底锁住了什么？
   是一行数据？
   是一个字段？

在InnoDB中

主键索引： 存储索引和数据 
辅助索引： 存储索引和主键值

间区的定于

记录 Record
间隙 Gap
临键 Next-Key

Record Lock ： 记录锁
 唯一性索引等值查询，精准匹配
 select * from table_name where id=4 for update -> 锁住id=4
Gap Lock ： 间隙锁
  条件不存在， Gap锁之间不冲突
  select * from table_name where id >4 and id<7 for update -> 锁住id (4,7)
 

数据库什么时候出现事务
事务并发带来什么问题？
> 事务并发的三大问题其实都是数据库读一致性的问题，必须有数据库提供一定的事务隔离机制来解决


如何解决读一致性的问题？
保证一个事务前后两次，读取结果一只，实现事务隔离， 该怎么做？
