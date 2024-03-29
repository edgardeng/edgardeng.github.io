# Redis的使用技巧
> 常见的Redis建议：数据分离、分业务、压缩数据、失效时间
 
## 1 不要使用KEYS命令

> KEYS命令不能用在生产的环境中，这个时候如果数量过大效率是十分低的

* KEYS命令的性能随着数据库数据的增多而越来越慢
* KEYS命令会引起阻塞，连续的 KEYS命令足以让 Redis 阻塞

### SCAN 命令

Redis从2.8版本开始支持scan命令，SCAN命令的基本用法如下：

 * 复杂度虽然也是 O(n)，通过游标分步进行不会阻塞线程;

 * 有限制参数 COUNT ；

 * 同 keys命令 一样提供模式匹配功能;

 * 服务器不需要为游标保存状态，游标的唯一状态就是 scan 返回给客户端的游标整数;

 * ` SCAN cursor [MATCH pattern] [COUNT count] `  第一个是cursor，第二个是要匹配的正则，第三个是单次遍历的槽位

批量删除scan命令: `redis-cli --scan --pattern "key前缀*" | xargs -L 1000 redis-cli del`

> 因为KEYS命令的时间复杂度为O(n)，而SCAN命令会将遍历操作分解成m次，然后每次去执行，从而时间复杂度为O(1)

* scan：对所有数据类型的key生效；
* sscan：针对Set数据类型的key；
* hscan：针对Hash的key；
* zscan：针对有序Set的key。


## 那些尽量避免的命令

 monitor, keys *, flushall, drop table, update table set a=1; 这种也是防不胜防的



## Redis开发的建议
1、 数据分离

不要什么都往Redis中放，尽量放些QPS比较高的数据，内存的开销很昂贵的，可以考虑硬盘存放。

2、分业务

不同的实例单独放这样存取的时候方便些，故障的时候也不会影响其他的实例。

3、压缩

redis中有很大的单个key的值建议压缩成二进制存放。

4、失效时间

redis中设置key的失效时间，如果不设置会一直占用着内存，而且key的失效时间应该根据业务场景来设置。

5、容量

占用内存不要太大10-20G，其次键的数量控制在1千万以内。

6、监控

运维合理的监控好数据，做好Redis安全漏洞的防护和灾备。

