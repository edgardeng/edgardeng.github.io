# 用户运营 数据分析
> 常用的数据指标分为三种（用户数据，行为数据，业务数据）

## 一、用户数据

* 存量: DAU/MAU 就是等于日/月活跃用户
    > 活跃： 关键事件的发生
    
* 新增用户
    > 新增的方法有很多比如（点击渠道链接，下载，安装启动，激活）

* 留存用户

* 留存率（健康程度）

* 渠道来源

## 二、行为数据

* 次数/频率: 
  pv: 页面浏览量 次数 不去重
  uv: 指的是独立访问数 人数 去重，
  访问深度: (1) 用户对某写关键行为的访问次数。(2) 网址的内容/概念分层几个层级 以用户本次访问最深的一级计算。
  
* 转化率： 

* 时长：

* 弹出率（质量）： 用户进入页面立马走掉的一个比例

## 三、业务数据

* 总量：GMV 访问时长

* 人均：APPU/ARPPU 人均访问时长

* 人数（完成业务的人数是多少，消费的可能关注多少人下单率）：付费人、播放人数

* 健康程度：付费率，付费频次，观看率

* 被消费对象：SKU视角 被消费内容视角


一、网页访问数据指标
1.IP （Internet Protocol）独立IP

通常采用独立IP数， 理论上指00:00-24:00内相同IP地址重复访问只被计算一次。而不同的商业统计工具，缩短去掉重复统计的时间，也是数据统计放大的一个常用套路。

（PS：在目前，尤其对企业用户群体中，一个公网独立IP可能对应很多独立终端，所以很多互联网公司已经放弃使用独立IP作为统计口径了。）

2.UV (UniqueVisitor)独立访客

访问的独立客户终端（电脑、手机、pad等）为一个独立访客， 技术上已MAC地址作为唯一身份识别ID。理论上（仅限于理论）24小时重复访问终端只计算一次。（PS：UV也不同于Visits访问行为，Visits通常以半小时为去重统计周期。）

3.PV（Page View）网页浏览量

网页被访问浏览的次数，也可简称为访问量或浏览量。有些统计工具把用户每次刷新都计算一次个PV（这也是很多网站PV虚高的原因之一），由于PV数据通常是相对（UV/IP/RU/WAU）最高的数据指标之一，所以网站访问量是目前互联网公司对外公布的统计数据中，几乎是最常用的口径。

4.LP（Landing Page）着陆页

指在广告引流或推广中，引导用户登入网站的第一页面。在早期网络营销中通常用网站首页作为着陆页，而后期通常采用特定的广告页、专题页或稍微复杂的Minisite作为着陆页，与当下手机端流行的H5宣传页有点类似。

5.BR（Bounce Rate）跳失率

指访问陆页（Landing Page）后，未点击进入任何其他页面或发生其他交互行为，即直接离开的访客占访问该着陆页所有访客的比率。该指标可以衡量一个网页或者一个网站的质量度高低。

二、用户活跃类数据统计指标
1.RU（registered users）注册用户

已完成注册的用户数，严格数据应是经过有效验证激活的注册用户数，而放大数据则可以填写提交注册信息提交完成即可。

2.AU（Active users）活跃用户

某一个时间段内登录或使用了某个产品的用户。

3.DAU(Daily Active User)日活跃用户

单日登录或使用了某个产品的用户数（去除重复登录的用户）。通常游戏类付费网站会采用DAU的概念。

用户运营常用数据分析指标汇总
4.MAU（monthly activeusers）月活跃用户

把DAU的统计周期拉长到一个月，即是MAU的数据。

5.DNU(Daily New Users) 每日新增用户

即当日新注册并登录的用户数。

6.ACU （Averageconcurrent users）平均同时在线用户数

平均同时在线用户数，通常采用 24小时内每小时同时在线的用户数总和除以 24小时。

7.PCU（Peakconcurrent users ）最高同时在线用户

24小时内同时在线的最高用户数。如果希望数据表现较高，通常可采用一个小时内同时在线用户数最大的值；如果更严格，也可以统计某一秒钟同时在线用户数的瞬间峰值。

8.TS（Time Spending）用户平均在线时长

所有在线用户总时长，除以该时段内的在线用户数。

9.URR（Users RetentionRate）用户留存率

新增用户中，在某一周期之后仍然活跃的用户占总新增用户的比例。按不同间隔日为统计周期单位来计算的，是比较严格的；根据不同的产品使用频次特性，按以周间隔为统计单位来计算相对更合理，因为很少的产品是需要用户每日都登录使用的。

10.UCR（Users Churn Rate）用户流失率

与“用户留存率”相对的一组概念，指新增用户中，在某一周期之后无登录使用等活跃行为的用户。

用户流失率=（1-用户留存率）*100%计算

三、用户付费行为数据统计指标
1.PU（Paying User）付费用户

有付费行为的用户。该指标弱化了统计周期的背景，所以在数据统计中不常采用。

2.CR（ConversionRate）付费转化率

新增用户中，有付费行为的新用户除以总新增用户数。此公式与电商网购中的支付转化率指标类似。

3.ARPU（Average Revenue Per User）平均每用户收入

衡量一个时间段内某个付费产品或业务收入水平的指标，通常电信运营商或网络游戏公司等采用较多，而零售电商则较少采用。

ARPU=某一时段的总收入/该时段的总AU数

用户运营常用数据分析指标汇总
4.ARPPU（Average Revenue Per Paying User）平均每付费用户收入

ARPPU=某一时段的总收入/该时段的总PU数。

5.APA（Active PaymentAccount）活跃付费用户

指统计周期内仍保持活跃的付费用户（活跃PU）数，此处的用户通常以用户注册ID为准。需要排除曾经有付费行为但在统计周期内无任何活跃行为的静默付费用户（静默PU）。

6.PUR（Paying User Rate）用户付费率

计算公式为：APA/AU，通常以特定统计周期内的活跃用户为统计前提。指统计周期内的活跃付费用户（APA）数除以该周期内的总活跃用户（AU）数。

7.LTV（Life Time Value）生命周期价值

从用户从最第一次登录到最后一次登录的整个生命周期过程中，所贡献的全部经济收益价值总和。而由于用户的生命周期通常难以统计，所以在实践中，更多采用“LTV_N”来统计新用户在首次登录后的N天内，所贡献的价值总和。此指标更为灵活实用。

上面这些，只是一些比较常用的运营数据统计术语而已，还不能说是大全，在游戏和APP运营中，还有很多更为细致的数据指标。

随着产品形态及生命周期阶段的不同，偏重的数据分析指标都会有些差异，数据统计分析指标也会源源不断的创新涌现。只要是对所运营的产品业务数据分析有实效，你也可以自己创设新的数据统计分析指标，这并非是某些权威人士才有的特权。



常用的数据指标分为三种（用户数据，行为数据，业务数据）
一、用户数据
用户数据有（存量（规模，DAU/MAU）、增量：新增用户、健康程度：留存率、从哪里来：渠道来源）

1、存量（规模，DAU/MAU）就是等于日/月活跃用户
日/月活（DAU/MAU）

日活：一个自然日 跨时区（全球服务）关心最近24小时

月活：当月至少活跃一次的用户总数 月活不等于当月各日DAU只和 务必去重，才有观察的意义。

活跃的定义

如何来定义活跃？

 第一种是：数据统计系统的定义 预制报表的系统（友盟，百度统计） 划都是基于事件上报进行统计。

什么是事件上报？指的是用户在一个网址上产生一个动作也就是进行率主动操作，就等于系统就会认为是一次活跃。

（第三方）避免遇到的坑：有时候发现产品的日活上涨率，后来发现是技术把最近统计了一个用户不用操作，在后台就能发生的行为。比如收到通知就主动上报。

第二种是：业务上的定义，就是自己公司定义如何纪录日活。可以找一个关键事件，我们认为只要用户使用了这个关键事件，就算用户的活跃。比如每个app的首页，只要打开了这个app的首页就算是活跃。 用户执行了关键事件=这个用户是活跃的。

其实用户进入首页页面，作为关键事件。也是有很多坑在里面，比如：系统推送了一条信息，然后用户点击进入了信息详情页。这个时候过程就没有访问首页所以也没有上报，所以这样的用户就没有统计到日活里面。

我们可以这样的改善：我们可以创建一个日活事件（里面有：访问首页，访问xx详情页，访问xx页面） 这样做的化，就会有个日常维护的成本，不断的维护事件列表。 这样的方法存在的问题：日常维护的成本 沟通成本。

建议：每次的更改叫全公司的人员看见，我们公司的日活怎么定义的。

用户的定义

当我们去统计用户的时候，我们应该去按设备去统计还是按人去统计。

按人：给每一个人注册id专属的这样的话就很简单用户数量=访问服务的id数量 这样的情况只适合强注册/登陆环境，没有注册登陆的人就会被漏掉

按设备：我们在网页中埋下随机长字符串作为设备的唯一标识符。这样的话；用户数等于访问过服务的设备数但是无法对应设备背后的用户。

解决办法还是要看自己产品的使用情况 比如：是否有帐号体系 没有就认设备 是否有强依赖登录呢 有人+设备 不登录用户对业务是否有价值 没有 人+设备 有设备

2、增量：新增用户
如何去定义新增

选择适合的节点，定义新增的方法有很多比如（点击渠道链接，下载，安装启动，激活）

1、点击渠道链接：优势：统计简单 劣势：离激活环节最远转化率差 使用场景量级不大/免费渠道不需要做精细结算。

2、下载 优势：真正反映用户的实际意愿 劣势：数据远可信度存疑，无法避免刷量 使用场景：渠道依赖应用商店没有更好的渠道。

3、安装/启动 优势：离激活最近便于统计。 劣势：渠道不一定配合，无法避免刷量。 适用场景：自己比较强势，可以给渠道制定统计规则。

4、激活： 优势：最真实的数据 劣势：渠道费用激增，统计复杂。 适用场景：对用户质量要求很高且产品ARPU高。

用适当的方法，判别“新”

基于设备：我们去看看这个设备是不是出现过，已经出现量就不算。

基于账号关联：登陆是老账号就不算是新。

3、健康程度：留存率（待更新）
4、从哪里来：渠道来源（待更新）
二、行为数据
行为数据有（次数/频率：PV、UV、访问深度、路径走通程度：转化率、做了多久：时长、质量：弹出率）

1、次数/频率：PV、UV、访问深度
pv指得是页面浏览量 次数 不去重，  uv指的是独立访问数 人数 去重，访问深度有2种算法：算法一：用户对某写关键行为的访问次数。算法二：网址的内容/概念分层几个层级 以用户本次访问最深的一级计算。

2、路径走通程度：转化率
每条路径是否走通，比如：填写基本信息，是完成来还是没有完成。

案例 我们是一个内容网站，用户会去浏览网站，浏览完成之后会去发表评论 我们有2个行为：浏览详情页 发表评论 他们都有pv/uv 这时候我们相观察浏览的详情页的转化率和人均页面查看数和人均评论次（如下图）




3、做了多久：时长
播放视频的行为 看4分钟和30分钟还是不一样的。如何统计访问时长：通过停机特殊事件，支持业务需求。

4、质量：弹出率
用户进入页面立马走掉的一个比例。

三、业务数据
总量：GMV 访问时长

人均：APPU/ARPPU 人均访问时长

人数（完成业务的人数是多少，消费的可能关注多少人下单率）：付费人、播放人数

健康程度：付费率，付费频次，观看率

被消费对象：SKU视角 被消费内容视角

作者：猫咪很慢180113
链接：https://www.jianshu.com/p/15dbb2f07b78
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

