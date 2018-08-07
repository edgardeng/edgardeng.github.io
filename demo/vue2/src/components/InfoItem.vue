<template>
  <div class="item-info">
    <div class="item-info-label">
      <span> {{label}}</span>
    </div>

    <div class="item-info-value">
      <span>{{value}} </span>
    </div>

    <slot>   </slot>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    // 父组件通过 prop 传递数据 给子组件
    props: {
      // 基础类型检测 （`null` 意思是任何类型都可以）
      label: {
        type: String,
        required: true,
        default: undefined
      },
      // 多种类型
      value: {
        type: String,
        required: true,
        default: undefined
      },
      btn: {
        type: String,
        required: false,
        default: undefined
      },
      // 基础类型检测 （`null` 意思是任何类型都可以）
      propA: Number,
      // 多种类型
      propB: [String, Number],
      // 必传且是字符串
      propC: {
        type: String,
        required: false
      },
      // 数字，有默认值
      propD: {
        type: Number,
        default: 100
      },
      // 数组／对象的默认值应当由一个工厂函数返回
      propE: {
        type: Object,
        default: function () {
          return { message: 'hello' }
        }
      },
      // 自定义验证函数
      propF: {
        validator: function (value) {
          return value > 10
        }
      }
      // String,Number,Boolean,Function,Object, Array
    },
    mounted () {
      console.log('info item mounted')

    },
    created () {
      console.log('info item created')
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
  .item-info {
    font-size: 16px;
    display: flex;
    padding: 5px;

  }
  .item-info-label {
    color: black;
    font-weight: 100;
  }
  .item-info-value {
    margin-left: 10px;
    color: #606060;
  }



</style>
