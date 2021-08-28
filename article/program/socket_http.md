#  WebSocket 与 HTTP、Socket 技术的异同

## 关于协议

###  OSI 模型

开放式系统互联通信参考模型（英语：Open System Interconnection Reference Model，ISO/IEC 7498-1），简称为OSI模型（OSI model），一种概念模型，由国际标准化组织（ISO）提出，一个试图使各种计算机在世界范围内互连为网络的标准框架

TCP/IP 协议可以看做是对 OSI 模型的一种简化

### TCP/IP

HTTP、WebSocket 等协议都是处于 OSI 模型的最高层： 应用层 。
而 IP 协议工作在网络层（第3层），TCP 协议工作在传输层（第4层）。

OSI七层模型详解 (http://blog.csdn.net/yaopeng_2005/article/details/7064869)

HTTP、WebSocket 等应用层协议，都是基于 TCP 协议来传输数据的。可以把这些高级协议理解成对 TCP 的封装。

既然大家都使用 TCP 协议，那么大家的连接和断开，都要遵循 [TCP 协议中的三次握手和四次握手](http://blog.csdn.net/whuslei/article/details/6667471)，只是在连接之后发送的内容不同，或者是断开的时间不同。

[wireshark抓包图解 TCP三次握手/四次挥手详解](http://www.seanyxie.com/wireshark%E6%8A%93%E5%8C%85%E5%9B%BE%E8%A7%A3-tcp%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E8%AF%A6%E8%A7%A3/)

对于 WebSocket 来说，它必须依赖 [HTTP 协议进行一次握手](http://tools.ietf.org/html/rfc6455#section-4) ，握手成功后，数据就直接从 TCP 通道传输，与 HTTP 无关了。


## 参考

 * [为什么引入WebSocket协议](https://blog.csdn.net/yl02520/article/details/7298309)