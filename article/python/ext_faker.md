# Faker

> faker(伪装者) 用于创建假数据, 可以轻易地伪造姓名、地址、手机号等等信息。

## 安装

```
    pip install faker
```

## 使用

### 初始化
通过工厂函数来创建
```python
from faker import Faker, Factory
fake = Factory.create()
name = fake.name() # 随机生成一个姓名
```

通过构造函数来创建
```python
from faker import Faker, Factory
fake = Faker()
name = fake.name() # 随机生成一个姓名
```
### 各种数据项

#### 中国人名

```python
fake = Faker("zh_CN")
name = fake.name()
```
### 地址

```python
fake.city() # 城市名称 
fake.street_name() # 街道名称 
fake.country_code() # 国家编号 

fake.address() # 地址 
fake.province() # 省份 
fake.longitude() # 经度 
fake.latitude() # 纬度 Decimal('-14.386640')
fake.street_address() # 街道地址
fake.city_suffix() # 市
fake.postcode() # 邮政编码 '530435'
fake.country() # 国家 '维尔京群岛'
fake.street_suffix() # 街道后缀 '街'
fake.district() # 区 
fake.geo_coordinate(center=None, radius=0.001) # 地理坐标 Decimal('52.985293')
fake.city_name() # 城市名称
fake.building_number() # 建筑编号
```
#### 车牌号
```python
fake.license_plate() # 车牌号
```

#### 条形码
```python
fake.bank_country() 
fake.iban() 
fake.bban() 
```
#### 颜色
```python
fake.color_name() # 颜色名称 'SlateGray'
fake.safe_hex_color() # safe 颜色 16 进制编号 
fake.safe_color_name() # safe颜色名称 
fake.rgb_color() # 颜色的 rgb 值 '0,0,0'
fake.hex_color() # 颜色 16 进制编号 '#00000'
fake.rgb_css_color() # 'rgb(0,0,0)'
```
#### 公司
```python
fake.catch_phrase() # 'Persistent bandwidth-monitored system engine'
fake.company_prefix() # 公司名前缀
fake.company() # 公司名
fake.company_suffix() # 公司名后缀
fake.bs() 'transition revolutionary action-items'
```
#### 信用卡
```python
fake.credit_card_full(card_type=None) # 完整卡信息
fake.credit_card_provider(card_type=None) # 卡的提供者
fake.credit_card_expire(start="now", end="+10y", date_format="%m/%y") # 卡的有效期
fake.credit_card_number(card_type=None) # 卡号
fake.credit_card_security_code(card_type=None) # 卡的安全密码
```
#### 货币
```
fake.cryptocurrency()
fake.cryptocurrency_code()
fake.currency_code()
fake.currency_name()
fake.currency()
fake.cryptocurrency_name()
```
#### 时间日期
```
fake.date_time(tzinfo=None) # 随机日期时间
fake.iso8601(tzinfo=None) # 以iso8601标准输出的日期
fake.date_time_this_month(before_now=True, after_now=False, tzinfo=None) # 本月的某个日期
fake.date_time_this_year(before_now=True, after_now=False, tzinfo=None) # 本年的某个日期
fake.date_time_this_decade(before_now=True, after_now=False, tzinfo=None)  # 本年代内的一个日期
fake.date_time_this_century(before_now=True, after_now=False, tzinfo=None)  # 本世纪一个日期
fake.date_time_between(start_date="-30y", end_date="now", tzinfo=None)  # 两个时间间的一个随机时间
fake.timezone() # 时区
fake.time(pattern="%H:%M:%S") # 时间（可自定义格式）
fake.am_pm() # 随机上午下午
fake.month() # 随机月份
fake.month_name() # 随机月份名字
fake.year() # 随机年
fake.day_of_week() # 随机星期几
fake.day_of_month() # 随机月中某一天
fake.time_delta() # 随机时间延迟
fake.date_object()  # 随机日期对象
fake.time_object() # 随机时间对象
fake.unix_time() # 随机unix时间（时间戳）
fake.date(pattern="%Y-%m-%d") # 随机日期（可自定义格式)
fake.date_time_ad(tzinfo=None)  # 公元后随机日期
```
#### 工作
```
fake.job()
```
#### 文件
```
fake.unix_partition(prefix=None) # unix 分区
fake.file_name(category=None, extension=None) # 文件名
fake.unix_device(prefix=None) # unix 设备
fake.file_path(depth=1, category=None, extension=None)
fake.file_extension(category=None) # 文件扩展信息
fake.mime_type(category=None)
```
#### 互联网
```
fake.ipv4(network=False)  # ipv4地址
fake.ipv6(network=False)  # ipv6地址
fake.uri_path(deep=None) # uri路径
fake.uri_extension() # uri扩展名
fake.uri() # uri
fake.url() # url
fake.image_url(width=None, height=None)  # 图片url
fake.domain_word() # 域名主体
fake.domain_name() # 域名
fake.tld() # 域名后缀
fake.user_name() # 用户名
fake.user_agent() # UA
fake.mac_address() # MAC地址
fake.safe_email() # 安全邮箱
fake.free_email() # 免费邮箱
fake.company_email()  # 公司邮箱
fake.email() # 邮箱
```
#### 电话号码
```
fake.phonenumber_prefix() # 运营商号段，手机号前三位
fake.msisdn() #'5445934248280'
fake.phone_number() # 手机号 '18666613199'
```
#### 身份证号码
```
fake.ssn(min_age=18, max_age=90)
```
#### 人物
```
fake.suffix_female()
fake.last_name() # 姓  
fake.suffix_male()
fake.first_name_male() # 男性名
fake.name() # 姓名
fake.first_name() # 名
fake.last_name_male() # 男性姓
fake.name_male() # 女性姓名
fake.romanized_name()
fake.suffix()
fake.first_name_female()
fake.last_name_female()
fake.prefix_male()
fake.name_female()
fake.prefix_female()
fake.first_romanized_name()
fake.prefix()
fake.last_romanized_name()
```
####人物属性
```
fake.profile(fields=None, sex=None)
fake.simple_profile(sex=None)
```

#### 文章
```
fake.paragraphs(nb=3, ext_word_list=None) # 段落
fake.word(ext_word_list=None)
fake.text(max_nb_chars=200, ext_word_list=None)
fake.sentences(nb=3, ext_word_list=None)
fake.paragraph(nb_sentences=3, variable_nb_sentences=True, ext_word_list=None)
fake.words(nb=3, ext_word_list=None)
fake.sentence(nb_words=6, variable_nb_words=True, ext_word_list=None)
```

## 参考：

* [faker docs](https://faker.readthedocs.io/en)

