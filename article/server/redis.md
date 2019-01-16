# Redis

> Redis是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。

Redis支持存储的value类型相对更多，包括string(字符串)、list(链表)、set(集合)、zset(sorted set --有序集合)和hash（哈希类型）。

这些数据类型都支持push/pop、add/remove及取交集并集和差集及更丰富的操作，而且这些操作都是原子性的。

在此基础上，redis支持各种不同方式的排序。与memcached一样，为了保证效率，数据都是缓存在内存中。

区别的是redis会周期性的把更新的数据写入磁盘或者把修改操作写入追加的记录文件，并且在此基础上实现了master-slave(主从)同步。


## 安装

### Linux下安装Redis

1. 下载文件  wget http://download.redis.io/releases/redis-4.0.11.tar.gz 

2. 压缩文件  tar -zxvf redis-4.0.11.tar.gz

3. cd redis-4.0.11

4. make 

5. sudo make install  (默认安装在 /usr/local/redis,或指定PREFIX=)

6. mv redis.conf /usr/local/redis/etc (没有则创建etc)

7. vi /usr/local/redis/etc/redis.conf  (daemonize no为yes 后台启动)

8. /usr/local/redis/bin/redis-server /usr/local/redis/etc/redis.conf (开启redis )

9. 设置开机启动 vi /etc/rc.local (添加命令8)

#### 停止删除Redis

```text
pkill redis 停止
rm -rf /usr/local/redis 删除
```

### docker 安装 Redis
    
1. docker pull redis:4.0
    
2. docker run --name redis4 -p 6379:6379 -v $PWD/data:/data  -d redis:4.0 redis-server --appendonly yes
    
命令说明：
  
    -p 6379:6379 : 将容器的6379端口映射到主机的6379端口
    
    -v $PWD/data:/data : 将主机中当前目录下的data挂载到容器的/data
    
    redis-server --appendonly yes : 在容器执行redis-server启动命令，并打开redis持久化配置



### Redis配置

## Redis的使用

### Redis命令

Redis 客户端的基本语法: `$ redis-cli`

* 远程登录 `$ redis-cli -h host -p port -a password`

Redis 键命令的基本语法如下： `COMMAND KEY_NAME` 

* 设置健值 `SET key_name redis`
* 获取指定key的值  `GET key_name`
* 删除健值 `DEL key_name`
* 被序列化的值 `DUMP key_name`
* 检查健值存在 `EXISTS key_name`
* 设置过期时间,单位以秒计  `EXPIRE key_name 60`
* UNIX时间戳,设置过期时间 `EXPIREAT key_name 1293840000`
* 设置过期时间,单位以毫秒计 `PEXPIRE key_name 1500`
* 移除key的过期时间，持久保持。 `PERSIST key_name`
* key的剩余的过期时间(毫秒)   `PTTL key_name`
* key的剩余的过期时间(秒)   `TTL key_name`

* 获取所有的key `KEYS *`
* 查找所有符合给定模式的key  `KEYS key_*`
* 服务器的统计信息 `INFO`

### Redis在Python中的使用

1. install `pip install redis`

2. base usage

```python
from redis import Redis
redis = Redis(host='localhost', port=6379, db=0)
redis.set('openCount', 0)
redis.incr('openCount')
redis.get('openCount')

# pipline的使用
pipe = redis.pipeline()
pipe.set('foo', 'bar')
pipe.expireat('foo',111111)
pipe.execute()
```

3. [more api](http://redisdoc.com/)

* keys      所有的key
* dbsize    数据库几条数据
* delete('key')
* save      
* flushdb() 清空数据库
* hset('key','hash_key','hash_value') 添加hash值
* hincrby('key','hash_key', 1) 自增hash值
* hgetall('key') 获取hash值
* hkeys('key') 获取hash值的key

