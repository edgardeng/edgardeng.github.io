# Vue.js学习系列 - 单元测试
> 在vue项目中使用Karma+Mocha来编写单元测试

## 介绍

### Karma
Karma是一个基于Node.js的JavaScript测试执行过程管理工具（Test Runner）。
该工具在Vue中的主要作用是将项目运行在各种主流Web浏览器进行测试。 
它是一个测试工具，能让你的代码在浏览器环境下测试。需要它的原因在于，你的代码可能是设计在浏览器端执行的，在node环境下测试可能有些bug暴露不出来；另外，浏览器有兼容问题，karma提供了手段让你的代码自动在多个浏览器（chrome，firefox，ie等）环境下运行。如果你的代码只会运行在node端，那么你不需要用karma。

### Mocha
Mocha是一个测试框架，在vue-cli中配合chai断言库实现单元测试。 
Mocha的常用命令和用法不算太多，看阮一峰老师的测试框架 Mocha 实例教程就可以大致了解了。 

### Chai
Chai.js断言库API中文文档，多查多用就能很快掌握。

## 准备

### 安装

1. 安装Karma `npm install karma -g`
2. 设置为全局变量    `ln -s /usr/local/Cellar/node/6.9.1/bin/karma /usr/local/bin`
3. 安装Karma-chrome-launch插件 `npm install karma-chrome-launcher --save-dev `
4. 安装mocha `npm install mocha -g`
5. 设置为全局变量  `ln -s /usr/local/Cellar/node/6.9.1/bin/mocha /usr/local/bin`
6. 安装karma-mocha插件 `npm install karma-mocha --save-dev `
7. 其他插件

```json
{
  "karma-coverage": "1.1.1",
    "karma-mocha": "^1.3.0",
    "karma-phantomjs-launcher": "^1.0.2",
    "karma-phantomjs-shim": "^1.4.0",
    "karma-sinon-chai": "^1.3.1",
    "karma-sourcemap-loader": "^0.3.7",
    "karma-spec-reporter": "0.0.31",
    "karma-webpack": "^2.0.2"
}    
    
```
### 配置

webpack配置文件`build/webpack.test.conf`:

```javascript
'use strict'
// This is the webpack config used for unit tests.

const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const webpackConfig = merge(baseWebpackConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: utils.styleLoaders()
  },
  devtool: '#inline-source-map',
  resolveLoader: {
    alias: {
      // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      'scss-loader': 'sass-loader'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/test.env')
    })
  ]
})

delete webpackConfig.entry // no need for app entry during tests
module.exports = webpackConfig
```

karma配置文件`src/test/unit/karma.conf.js`
 
```javascript

var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function (config) {
  config.set({
    // 浏览器
    browsers: ['PhantomJS'],
    // 测试框架
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    // 测试报告
    reporters: ['spec', 'coverage'],
    // 测试入口文件
    files: ['./index.js'],
    // 预处理器 karma-webpack
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    // Webpack配置
    webpack: webpackConfig,
    // Webpack中间件
    webpackMiddleware: {
      noInfo: true
    },
    // 测试覆盖率报告
    // https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
```

### 测试代码

测试单元文件`test/unit/index.js`
```javascript
import Vue from 'vue' // 导入Vue用于生成Vue实例
import Hello from '@/components/Hello' // 导入组件
// 测试脚本里面应该包括一个或多个describe块，称为测试套件（test suite）
describe('Hello.vue', () => {
  // 每个describe块应该包括一个或多个it块，称为测试用例（test case）
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello) // 获得Hello组件实例
    const vm = new Constructor().$mount() // 将组件挂在到DOM上
    //断言：DOM中class为hello的元素中的h1元素的文本内容为Welcome to Your Vue.js App
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')  
  })
})

```

需要知道的知识点： 
* 测试脚本都要放在 test/unit/specs/ 目录下。 
* 脚本命名方式为 [组件名].spec.js。 
* 所谓断言，就是对组件做一些操作，并预言产生的结果。如果测试结果与断言相同则测试通过。 
* 单元测试默认测试 src 目录下除了 main.js 之外的所有文件，可在 test/unit/index.js 文件中修改。 
* Chai断言库中，to be been is that which and has have with at of same 这些语言链是没有意义的，只是便于理解而已。 
* 测试脚本由多个 descibe 组成，每个 describe 由多个 it 组成。 
* 了解异步测试

```javascript
it('异步请求应该返回一个对象', done => {
    request
    .get('https://api.github.com')
    .end(function(err, res){
      expect(res).to.be.an('object');
      done();
    });
});
```


了解一下 describe 的钩子（生命周期）
```javascript
describe('hooks', function() {

  before(function() {
    // 在本区块的所有测试用例之前执行
  });

  after(function() {
    // 在本区块的所有测试用例之后执行
  });

  beforeEach(function() {
    // 在本区块的每个测试用例之前执行
  });

  afterEach(function() {
    // 在本区块的每个测试用例之后执行
  });

  // test cases
});
```

### 示例实践

从Vue官方的demo可以看出，对于Vue的单元测试我们需要将组件实例化为一个Vue实例，有时还需要挂载到DOM上。

```javascript
const Constructor = Vue.extend(Hello) // 获得Hello组件实例
const vm = new Constructor().$mount() // 将组件挂载到DOM上
```

以上写法只是简单的获取组件，有时候我们需要传递props属性、自定义方法等，还有可能我们需要用到第三方UI框架。

#### Util.js
> 推荐Element的单元测试工具脚本[Util.js](https://github.com/ElemeFE/element/blob/dev/test/unit/util.js)，它封装了Vue单元测试中常用的方法。

```javascript
/**
 * 回收 vm，一般在每个测试脚本测试完成后执行回收vm。
 * @param  {Object} vm
 */
exports.destroyVM = function (vm) {}

/**
 * 创建一个 Vue 的实例对象
 * @param  {Object|String}  Compo     - 组件配置，可直接传 template
 * @param  {Boolean=false}  mounted   - 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createVue = function (Compo, mounted = false) {}

/**
 * 创建一个测试组件实例
 * @param  {Object}  Compo          - 组件对象
 * @param  {Object}  propsData      - props 数据
 * @param  {Boolean=false} mounted  - 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createTest = function (Compo, propsData = {}, mounted = false) {}

/**
 * 触发一个事件
 * 注： 一般在触发事件后使用 vm.$nextTick 方法确定事件触发完成。
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm      - 元素
 * @param  {String} name      - 事件名称
 * @param  {*} opts           - 配置项
 */
exports.triggerEvent = function (elm, name, ...opts) {}

/**
 * 触发 “mouseup” 和 “mousedown” 事件，既触发点击事件。
 * @param {Element} elm     - 元素
 * @param {*} opts          - 配置选项
 */
exports.triggerClick = function (elm, ...opts) {}
```

#### 示例一
> 测试Hello 组件的各种元素的数据，学习 util.js 的 destroyVM 和 createTest 方法的用法以及如何获取目标元素进行测试。
获取DOM元素的方式可查看[DOM 对象教程](http://www.runoob.com/jsref/dom-obj-document.html)。 

组件文件`Hello.vue`
```javascript
<template>
  <div class="hello">
    <h1 class="hello-title">{{ msg }}</h1>
    <h2 class="hello-content">{{ content }}</h2>
  </div>
</template>

<script>
export default {
  name: 'hello',
  props: {
    content: String
  },
  data () {
    return {
      msg: 'Welcome!'
    }
  }
}
</script>

```

组件测试文件`Hello..spec.js`

```javascript
import { destroyVM, createTest } from '../util'
import Hello from '@/components/Hello'

describe('Hello.vue', () => {
  let vm

  afterEach(() => {
    destroyVM(vm)
  })

  it('测试获取元素内容', () => {
    vm = createTest(Hello, { content: 'Hello World' }, true)
    expect(vm.$el.querySelector('.hello h1').textContent).to.equal('Welcome!')
    expect(vm.$el.querySelector('.hello h2').textContent).to.have.be.equal('Hello World')
  })

  it('测试获取Vue对象中数据', () => {
    vm = createTest(Hello, { content: 'Hello World' }, true)
    expect(vm.msg).to.equal('Welcome!')
    // Chai的语言链是无意义的，可以随便写。如下：
    expect(vm.content).which.have.to.be.that.equal('Hello World') 
  })

  it('测试获取DOM中是否存在某个class', () => {
    vm = createTest(Hello, { content: 'Hello World' }, true)
    expect(vm.$el.classList.contains('hello')).to.be.true
    const title = vm.$el.querySelector('.hello h1')
    expect(title.classList.contains('hello-title')).to.be.true
    const content = vm.$el.querySelector('.hello-content')
    expect(content.classList.contains('hello-content')).to.be.true
  })
})
```

#### 示例二
> 使用 createTest 创建测试组件测试点击事件，用 createVue 创建Vue示例对象测试组件 Click 的使用。 

组件文件`Click.vue`
```javascript
<template>
  <div>
    <span class="init-num">初始值为{{ InitNum }}</span><br>
    <span class="click-num">点击了{{ ClickNum }}次</span><br>
    <span class="result-num">最终结果为{{ ResultNum }}</span><br>
    <button @click="add">累加{{ AddNum }}</button>
  </div>
</template>

<script>
export default {
  name: 'Click',
  props: {
    AddNum: {
      type: Number,
      default: 1
    },
    InitNum: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      ClickNum: 0,
      ResultNum: 0
    }
  },
  mounted () {
    this.ResultNum = this.InitNum
  },
  methods: {
    add () {
      this.ResultNum += this.AddNum
      this.ClickNum++
      this.$emit('result', {
        ClickNum: this.ClickNum,
        ResultNum: this.ResultNum
      })
    }
  }
}
</script>
```

组件测试文件`Click..spec.js`

```javascript
import { destroyVM, createTest, createVue } from '../util'
import Click from '@/components/Click'

describe('click.vue', () => {
  let vm

  afterEach(() => {
    destroyVM(vm)
  })

  it('测试按钮点击事件', () => {
    vm = createTest(Click, {
      AddNum: 10,
      InitNum: 11
    }, true)
    let buttonElm = vm.$el.querySelector('button')
    buttonElm.click()
    buttonElm.click()
    buttonElm.click()
    // setTimeout 的原因
    // 在数据改变之后，界面的变化会有一定延时。不用timeout有时候会发现界面没有变化
    setTimeout(done => {
      expect(vm.ResultNum).to.equal(41)
      expect(vm.$el.querySelector('.init-num').textContent).to.equal('初始值为11')
      expect(vm.$el.querySelector('.click-num').textContent).to.equal('点击了3次')
      expect(vm.$el.querySelector('.result-num').textContent).to.equal('最终结果为41')
      done()
    }, 100)
  })

  it('测试创建Vue对象', () => {
    let result
    vm = createVue({
      template: `
        <click @click="handleClick"></click>
      `,
      props: {
        AddNum: 10,
        InitNum: 11
      },
      methods: {
        handleClick (obj) {
          result = obj
        }
      },
      components: {
        Click
      }
    }, true)
    vm.$el.click()
    vm.$nextTick(done => {
      expect(result).to.be.exist
      expect(result.ClickNum).to.equal(1)
      expect(result.ResultNum).to.be.equal(21)
      done()
    })
})
```

建议配合 Util.js 看一下 Element 的单元测试脚本的写法，里面有很多测试脚本可以供我们学习。

* Util.js 方法包含了大多数Vue组件化的测试需求。
* vm.$el vm.$nextTick 和 vm.$ref 都是在测试过程中比较常用的一些Vue语法糖。
* 需要注意： vm.$nextTick 方法是异步的，所以需要在里面使用done方法。
* 异步断言，方法参数需要是 _ 或者 done
* 大多数时候查询元素通过 querySelector 方法查询class获得 
    * vm.$el.querySelector(‘.el-breadcrumb’).innerText
* 大多数情况下查询是否存在某个Class通过 classList.contains 方法获得，查找的结果为 true 或 false 
    * vm.$el .classList.contains(‘el-button–primary’)
* 异步测试必须以 done() 方法结尾。setTimeout 和 vm.$nextTick 是常用的异步测试。
* 实现按钮点击：通过获取按钮元素 btn，执行 btn.click() 方法实现。
* 由于 Vue 进行 异步更新DOM 的情况，一些依赖DOM更新结果的断言必须在 Vue.nextTick 回调中进行。

```javascript
triggerEvent(vm.$refs.cascader.$el, 'mouseenter');
vm.$nextTick(_ => {
     vm.$refs.cascader.$el.querySelector('.el-cascader__clearIcon').click();
     vm.$nextTick(_ => {
        expect(vm.selectedOptions.length).to.be.equal(0);
        done();
     });
});
```

## Reference 参考
* [Vue.js单元测试](https://cn.vuejs.org/v2/guide/unit-testing.html)
* [Element](https://http://element.eleme.io)
* [Karma官网](http://karma-runner.github.io)
* [Chai.js断言库API中文文档](https://www.jianshu.com/p/f200a75a15d2)
* [Vue单元测试Karma+Mocha学习笔记](https://blog.csdn.net/violetjack0808/article/details/73740395)
