<!-- 2022-12-21 10:50 -->
# Django的表单
> Django提供了一系列的工具和库来帮助您构建表单来接收网站访客的输入，然后处理以及响应这些输入

## Html表单

在HTML中，表单是在 `<form>...</form>` 中的一些元素，它允许访客做一些类似输入文本、选择选项、操作对象或空间等动作，然后发送这些信息到服务端

表单需要指定两样东西：

 1. 负责响应用户输入数据的URL地址
 2. 数据请求使用的HTTP方法。

## Django 中的表单

Django会处理涉及表单的三个不同部分：

 * 准备并重组数据，以便下一步的渲染
 * 为数据创建HTML 表单
 * 接收并处理客户端提交的表单及数据

### 核心组件 Form 类
> 与Django模型描述对象的逻辑结构、行为以及它呈现给我们内容的形式的方式大致相同， Form 类描述一张表单并决定它如何工作及呈现

类似于模型类的字段映射到数据库字段的方式，表单类的字段会映射到HTML表单的 <input> 元素。 ModelForm 通过 Form 映射模型类的字段到HTML表单的 <input> 元素


#### 实例化、处理和渲染表单

在Django中渲染一个对象的时候，我们通常：

 1. 在视图中获取它（例如从数据库中取出）
 2. 将它传递给模板上下文
 3. 使用模板变量将它扩展为HTML标记

### 一个构建表单的简单示例

#### 创建html表单

浏览器使用 POST 方法,将表单数据返回给URL `/your-name/`

```html
<form action="/your-name/" method="post">
    <label for="your_name">Your name: </label>
    <input id="your_name" type="text" name="your_name" value="{{ current_name }}">
    <input type="submit" value="OK">
</form>
```

#### 构建Django表单类
```python
# form.py
from django.forms import Form, CharField

class NameForm(Form):
your_name = CharField(label='Your name', max_length=100)
```

整个表单在第一次渲染时，会显示如下：
```html
<label for="your_name">Your name: </label>
<input id="your_name" type="text" name="your_name" maxlength="100" required>
```
> 注意它 没有 包含 <form> 标签和提交按钮。我们必须自己在模板中提供。

#### 添加处理视图
```python
from django.http import HttpResponseRedirect
from django.shortcuts import render
from .forms import NameForm

def get_name(request):
    if request.method == 'POST':
        form = NameForm(request.POST)  # create a form instance
        # check whether it's valid:
        if form.is_valid(): #  is_valid() method, which runs validation routines for all its fields
            return HttpResponseRedirect('/thanks/')
    else:
        form = NameForm() # if a GET (or any other method) we'll create a blank form
    return render(request, 'name.html', {'form': form})
```

#### 修改模板

```html
<form action="/your-name/" method="post">
    {% csrf_token %}
    {{ form }}
    <input type="submit" value="Submit">
</form>
```
> 所有的表单字段及其属性都将通过Django模板语言从 {{ form }} 中被解包成HTML标记。




## Django中的Form类详解

所有表单类都作为 django.forms.Form 或者 django.forms.ModelForm 的子类来创建

实际上 Form 和 ModelForm 从（私有） BaseForm 类继承了通用功能

### 表单的接口

* Form.is_bound 查看表单是否已经绑定数据
* Form.clean  清理和验证数据
* Form.is_valid  验证表单数据
* Form.errors 获取错误信息的字段
    * Form.errors.as_data() 返回一个 dict
    * Form.errors.as_json(escape_html=False) 返回以 JSON 格式序列化的错误
* Form.add_error(field, error)
* Form.has_error(field, code=None)

```python
data = {'subject': 'hello' }
f = ContactForm(data)
f.is_bound   # 查看表单是否已经绑定数据
```

### 字段详解
当你创建一个 Form 类时，最重要的部分是定义表单的字段Field.每个字段都有自定义的验证逻辑，以及其他一些钩子。

* Filed.clean(value)  清理和验证字段，返回异常或干净的值
* 


```python
from django import forms

class ContactForm(forms.Form):
    subject = forms.CharField(max_length=100)
    message = forms.CharField(widget=forms.Textarea)
    sender = forms.EmailField()
    cc_myself = forms.BooleanField(required=False)

```

每个表单字段都有一个相对应的 控件类 ，这个控件类又有对应的HTML表单控件

#### 核心字段参数

|字段参数 |说明   |默认 | 示例|
|:---- |:---- |:---- |:---- |
| required | 是否必填 | True | `CharField(required=False)` | 
| label | 标签 |  | `CharField(label='Your name')` | 
| label_suffix | 标签后缀 |-  | `IntegerField(label='2 + 2', label_suffix=' =')` | 
| initial  | 初始数据 | None  | `URLField(initial='http://')` | 
| help_text  | 描述性文本 | None  | `EmailField(help_text='A valid email address, please.')` | 
| error_messages   | 错误信息 | None  | `CharField(error_messages={'required': 'Please enter your name'}` | 
| validators   | 验证函数列表 | None  | `CharField(error_messages={'required': 'Please enter your name'}` | 
| disabled   | 禁用 | False  |  - | 



#### 内置Filed类

| 字段   | 规范化   | 对应组件 | 错误信息键|
| :---- |:----    | :----   | :---- |
|  BooleanField | True 或 False 值 | CheckboxInput |   | 
|  CharField | 字符串 | TextInput | max_length、min_length  | 
|  ChoiceField | 字符串 | Select | invalid_choice  | 
|  DateField | datetime.date 对象 | DateInput | invalid  | 
|  DateTimeField | datetime.datetime 对象 | DateTimeInput | invalid  | 
|  DecimalField | Python 的 decimal | DateTimeInput | max_value,min_value  | 
|  DurationField | Python 的 timedelta| TextInput | invalid、overflow  | 
|  EmailField | 字符串| TextInput | invalid、overflow  | 
|  FileField | 一个 UploadedFile 对象| ClearableFileInput | invalid,missing、empty、max_length  | 
|  FilePathField | 字符串| Select | invalid_choice  | 
|  FloatField | Float|  TextInput | invalid, max_value, min_value  | 
|  GenericIPAddressField | 字符串|  TextInput | invalid   | 
|  IntegerField | int|  NumberInput 或 TextInput | invalid, max_value, min_value,  | 
|  JSONField | JSON 值 （通常为 dict、list 或 None），取决于 JSONField.decoder|  Textarea| invalid | 
|  MultipleChoiceField | 一个字符串列表 |  SelectMultiple | invalid | 
|  NullBooleanField |  True、False 或 None 值 | NullBooleanSelect  | invalid | 
|  RegexField | 字符串 | TextInput  | invalid | 
|  SlugField | 字符串 |TextInput   | invalid | 
|  TimeField | datetime.time 对象 | TimeInput  | invalid | 
|  TypedChoiceField |  | Select| invalid | 
|  TypedMultipleChoiceField |  |  SelectMultiple | invalid | 
|  URLField | 字符串 | URLInput  | invalid | 
|  UUIDField | UUID对象 | TextInput  | invalid | 


### 图片上传示例
```python
from PIL import Image
from django import forms
from django.core.files.uploadedfile import SimpleUploadedFile
class ImageForm(forms.Form):
  img = forms.ImageField()

file_data = {'img': SimpleUploadedFile('test.png', <file data>)}
form = ImageForm({}, file_data)
# Pillow closes the underlying file descriptor.
form.is_valid()
image_field = form.cleaned_data['img']
image_field.image.width
image_field.image.height
image_field.image.format
image_field.image.getdata()
# Raises AttributeError: 'NoneType' object has no attribute 'seek'.
image = Image.open(image_field)
image.getdata()
```

### [表单集](https://docs.djangoproject.com/en/4.1/topics/forms/formsets/)

### [从模型创建表单](https://docs.djangoproject.com/en/4.1/topics/forms/modelforms/)

```python
from django.db import models
from django.forms import ModelForm

TITLE_CHOICES = [
    ('MR', 'Mr.'),
    ('MRS', 'Mrs.'),
    ('MS', 'Ms.'),
]

class Author(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=3, choices=TITLE_CHOICES)
    birth_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    name = models.CharField(max_length=100)
    authors = models.ManyToManyField(Author)

class AuthorForm(ModelForm):
    class Meta:
        model = Author
        fields = ['name', 'title', 'birth_date']

class BookForm(ModelForm):
    class Meta:
        model = Book
        fields = ['name', 'authors']

```