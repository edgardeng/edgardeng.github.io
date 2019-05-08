<!--2018-08-06 20:00-->
# Vue中的Component组件
> 组件（Component）是 Vue.js 最强大的功能之一, 可以扩展 HTML 元素，封装可重用的代码

## 自定义组件

声明并使用一个全局自定义组件

```javascript
  Vue.component('hello',{
    template:'<h3>全局自定义组件</h3>'
  });
  let vm = new Vue({
    el:'#app' 
  });
```

声明并使用一个 局部自定义组件

```javascript
  let vm = new Vue({
    el:'#box',
    components:{
      'hello':{
        template:'<h3>局部自定义组件</h3>'
      }
    } 
  });
```

## 组件的数据属性和事件
```javascript
Vue.component('hello',{
  template:'<h3 @click="change">{{msg}}</h3>',
  data: function(){
    return {
      msg:'message'
    };
  },
  methods:{
    change:function() {
      this.msg = 'change';
    }
  }
});

```

## 使用模版

在定义组件对象的template属性值当中的html标签比较多时，可以配合模板标签一起使用，把这些成堆的标签单独放在一起。
```html
<script>
  Vue.component('hello',{
    template:'#hello',
    data:function(){
      return {
        msg:'message',
      }
    },
    methods:{
      change: function() {
        this.msg = 'change';
      }
    }
  });
  let vm = new Vue({
    el:'#app'
  });
</script>
<div id="app">
    <hello></hello>
</div>
<template id="hello">
    <div>
        <h3 @click="change">{{msg}}</h3>
    </div>
</template>
``` 
 
将模版单独放在一个文件
```
// hello.vue
<template>
  <div class="hello">
   <h3 @click="change">{{msg}}</h3>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data () {
    return {
      msg: 'Message'
    }
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>

```

在app.vue中使用 (文件形式适用于 webpack项目中)

```
<template>
  <div id="app">
    <div> Vue Demo</div>
    <Hello/> 
  </div>
</template>

<script type="text/ecmascript-6">
import Hello from './components/Hello'
export default {
  name: 'App',
  components: {
    Hello
  },
  data () {
    return {
      msg: 'Welcome'
    }
  },
  mounted () {
      console.log('App vue mounted')
  },
  created () {
      console.log('App vue created')
  } 
}
</script>
```

## 动态组件

在页面上放置一个固定名称的组件标签作为动态组件，通过父组件的属性来改变vue实例对象

```javascript

<script>
    let vm = new Vue({
           el:'#app',
           data:{
              name:'comp-a'
           },
           components:{
              'comp-a':{
                 template:'<h3>我是组件A</h3>'
              },
              'comp-b':{
                 template:'<h3>我是组件B</h3>'
              }
           }
        });
</script>

<div id="app">
    <button @click="name='comp-a'">变为组件A</button>
    <button @click="name='comp-b'">变为组件B</button>
    <component :is="name"> </component>
</div>
```

## `<slot>`槽口标签的使用

> slot作用为占位符。当自定义组件当中有一些特定的布局，不想被该组件当中的template的代码完全覆盖时，可以采用slot标签，该标签可以用来向组件内部插入一些内容。

```javascript
Vue.component('hello',{
            template:'#temp'
        });
        var vm = new Vue({
           el:'#app'
        });
        
<div id="app">
    <hello>
        <div slot="slot1">
            <div> slot 111 </div>
        </div>
        <div slot="slot2">
        <div> slot 222 </div>
        </div>
    </hello>
</div>

<template id="temp">
    <div>
        <slot name="slot1"> </slot>
        <h3> 自定义组件 </h3>
        <slot name="slot2"> </slot>
    </div>
</template>
```

> 在vue2.0当中，重名的插槽被移除，即同一模板当中重名的slot已经被弃用，当一个插槽已经被渲染过了，那么就不能在同一模板的其他地方被再次渲染，如果要在不同位置渲染同一内容，可以用prop来传递。

## 组件的通讯
 
父组件给子组件传递数据，子组件给父组件传递事件

> 自定义属性名使用-来进行连接，则我们在props当中一律改为对应的驼峰命名

```javascript

Vue.component('Father',{
                template:'#father',
                data:function(){
                    return {
                        msg: 'father msg',
                    };
                },
                methods:{
                  fromChild:function(msg) {
                    console.log('from child ' + msg)
                  }
                },
                components:{
                    'Child':{
                        template:'#child',
                        props:['message'],
                        methods:{
                            change:function() {
                                this.message = 'child message'
                                this.$emit('tofahter',this.message);
                            }
                        }
                    }
                }
            });
            var vm = new Vue({
               el:'#app'
            });

        
    <div id="app">
        <father></father>
    </div>
    
    <template id="father">
        <div>
            <h3>{{msg}}</h3>
            <child :message="msg" @tofahter="fromChild" > </child>
        </div>
    </template>
    
    <template id="child">
        <div>
            <button @click="change()">change</button>
            <h3>{{m1.a}}</h3>
        </div>
    </template>
    
```


## 单一事件来管理组件间的通信

使用单一事件管理组件间通信可以替代之前介绍的两种父子组件之间的通信方式

```javascript
<script>
  var Event = new Vue();
  Vue.component('father',{
     template:'#father',
        data:function(){
          return {
            msg1:'父组件的数据'
          };
        },
        mounted:function(){
          Event.$on('tofahter',function(data){
                        this.msg1 = data;
          }.bind(this));
        },
        components:{
          'child':{
          template:'#child',
          data:function(){
            return {
              msg2:'子组件的数据'
            };
          },
          methods:{
            send:function(){
              Event.$emit('tofahter',this.msg2);
            }
          }
        }
      }
  });
  var vm = new Vue({
    el:'#app'
  });
            
</script>
    
<body>
    <div id="app">
        <father></father>
    </div>
    
    <template id="father">
        <div>
            <h3>{{msg1}}</h3>
            <child></child>
        </div>
    </template>
    
    <template id="child">
        <div>
            <button @click="send()"> send-to-father </button>
            <h3>{{msg2}}</h3>
        </div>
    </template>
</body>

```

使用单一事件实现任意两个组件（如兄弟组件）之间的数据通信。


```javascript

let Event = new Vue();
Vue.component('my-aaa',{
  template:'#father',
  data:function() {
    return {
      msg1:'兄弟组件aaa的数据'
    };
  },
  mounted:function(){
    Event.$on('sendtobrother',function(data){
      this.msg1 = data;
    }.bind(this));
  }
});
Vue.component('child',{
  template:'#ddd',
  data:function(){
    return {
      msg2:'兄弟组件bbb的数据' 
    }
  },
  methods: {
    send:function(){
      Event.$emit('sendtobrother',this.msg2);
      }
  }
});

```



