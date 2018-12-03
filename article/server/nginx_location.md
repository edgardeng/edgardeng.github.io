# Nginx中Location的配置

> Nginx做为服务器时，会遇到动态路径的匹配和静态文件路径的配置，此处记录location的使用。

## 匹配模式及顺序
　　
  * location = /uri 　　　=开头表示精确匹配，只有完全匹配上才能生效。

　* location ^~ /uri 　　^~ 开头对URL路径进行前缀匹配，并且在正则之前。

　* location ~ pattern 　~开头表示区分大小写的正则匹配。

　* location ~* pattern 　~*开头表示不区分大小写的正则匹配。

　* location /uri 　　　　不带任何修饰符，也表示前缀匹配，但是在正则匹配之后。

　* location / 　　　　　通用匹配，任何未匹配到其它location的请求都会匹配到，相当于switch中的default

> 普通 location ”是以“ = ”或“ ^~ ”为前缀或者没有任何前缀的 /uri/ ；
  “正则 location ”是以“ ~ ”或“ ~* ”为前缀的 /uri/ 。

示例
```config

location  = / {
  # 只匹配"/".
  [ configuration A ]
}

location  / {

  # 匹配任何请求，因为所有请求都是以"/"开始
  # 但是更长字符匹配或者正则表达式匹配会优先匹配
  [ configuration B ]
}

location ^~ /images/ {
  # 匹配任何以 /images/ 开始的请求，并停止匹配 其它location
  [ configuration C ]
}

location ~* \.(gif|jpg|jpeg)$ {

  # 匹配以 gif, jpg, or jpeg结尾的请求.
  # 但是所有 /images/ 目录的请求将由 [Configuration C]处理.  
  [ configuration D ]
}

error_page 404 = @fetch;

location @fetch(
  proxy_pass http://fetch;
)

```

## 访问控制指令

* allow 允许某个ip或者一个ip段访问.
> 语法:     allow address | CIDR | unix: | all;
  默认值:     —
  配置段:     http, server, location, limit_except

* deny 禁止某个ip或者一个ip段访问. 返回 403 forbidden

> 语法:     deny address | CIDR | unix: | all;
  默认值:     —
  配置段:     http, server, location, limit_except
 
一段示例：
 
 ```text
  location / {
    deny  192.168.1.1;
    allow 192.168.1.0/24;
    allow 10.1.1.0/16;
    allow 2001:0db8::/32;
    deny  all;
  }
  # 从上到下的顺序，类似iptables。匹配到了便跳出。
```
  
  
