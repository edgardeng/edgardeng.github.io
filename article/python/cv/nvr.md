## NVR的RTSP的几种格式

### 海康老版本IPC的RTSP地址格式：
1. 地址格式分段含义说明：  ` rtsp://[username]:[password]@[address]:[port]/[codec]/[channel]/[subtype]/av_stream `

 * rtsp://   => 协议格式头
 * username  => 用户名，例如：admin
 * password  => 密码，例如：123456
 * address   => IPC设备的网络地址，例如：192.168.1.65
 * port      => IPC设备的RTSP输出端口，默认为554，若为默认可不填写
 * codec     => 视频压缩格式，有h264、MPEG-4、mpeg4这几种，要想前端无插件播放需要选择h264
 * channel   => 通道号，起始为ch1，例如：通道1，则为ch1
 * subtype   => 码流类型，主码流为main，子码流为sub

2. 示例，拉取海康网络摄像机通道1的RTSP地址：

主码流RTSP地址：
* rtsp://admin:12345@192.168.1.64:554/h264/ch1/main/av_stream
* rtsp://admin:12345@192.168.1.64:554/mpeg4/ch1/main/av_stream
* rtsp://admin:12345@192.168.1.64:554/MPEG-4/ch1/main/av_stream

子码流RTSP地址：
* rtsp://admin:12345@192.168.1.64/h264/ch1/sub/av_stream
* rtsp://admin:12345@192.168.1.64/mpeg4/ch1/sub/av_stream
* rtsp://admin:12345@192.168.1.64:554/MPEG-4/ch1/sub/av_stream

### 海康新版本IPC的RTSP地址格式：

1. 地址格式分段含义说明： `rtsp://[username]:[password]@[address]:[port]/Streaming/Channels/[id]?transportmode=[type]`

* rtsp://   => 协议格式头
* username  => 用户名，例如：admin
* password  => 密码，例如：123456
* address   => IPC设备的网络地址，例如：192.168.1.65
* port      => IPC设备的RTSP输出端口，默认为554，若为默认可不填写
* id        => 通道号&码流类型
   * 101：通道1主码流
   * 102：通道1子码流
   * 103：通道1第三码流
   * 1701：通道17主码流
   * 001：通道0主码流
* type      => 可选参数，拉流模式，默认为unicast，若为默认可以不填写
* unicast：单播模式拉流
* multicast：组播模式拉流

注意：没有了视频压缩器的选项，只留下了通道选择，至于通道下具体的音视频压缩格式，需要登录IPC的后台管理进行配置，为了实现PC、手机、平板全平台无插件播放，音频需要选择AAC格式压缩，视频需要选择H.264格式压缩。

2、示例，拉取海康网络摄像机通道1的RTSP地址：

 * 通道1，主码流，单播拉流： `rtsp://admin:12345@192.168.1.65/Streaming/Channels/101`
 * 通道1，子码流，单播拉流： `rtsp://admin:12345@192.168.1.65/Streaming/Channels/102`
 * 通道1，第三码流，单播拉流： `rtsp://admin:12345@192.168.1.65/Streaming/Channels/103`

### 大华IPC的RTSP地址格式：
1、地址格式分段含义说明： `rtsp://[username]:[password]@[address]:[port]/cam/realmonitor?channel=[id]&subtype=[type]`

 * rtsp://   => 协议格式头
 * username  => 用户名，例如：admin
 * password  => 密码，例如：123456
 * address   => IPC设备的网络地址，例如：192.168.1.65
 * port      => IPC设备的RTSP输出端口，默认为554，若为默认可不填写
 * id        => 通道号，起始为1。例如通道2，则为channel=2。
 * type      => 码流类型，主码流为0（即subtype=0），辅码流为1（即subtype=1）。

2、示例，拉取大华网络摄像机通道1的RTSP地址

 * 通道1，主码流： `rtsp://admin:123456@192.168.1.65:554/cam/realmonitor?channel=1&subtype=0`
 * 通道1，子码流： `rtsp://admin:123456@192.168.1.65:554/cam/realmonitor?channel=1&subtype=1`
 
### 华为IPC的RTSP

1. 主码流：`rtsp://username:password@192.168.1.1:554/LiveMedia/ch1/Media1`
2. 子码流：`rtsp://username:password@192.168.1.1:554/LiveMedia/ch1/Media2`

### 华为NVR 的RTSP
1.主码流  `rtsp://username:password@192.168.1.1:443/rtsp/streaming?channel=1&subtype=0`