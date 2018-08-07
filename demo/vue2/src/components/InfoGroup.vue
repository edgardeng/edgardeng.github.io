<template>
  <div class="item-group">
    <div class="item-group-title">
      <h3> {{title}}
        <button v-show="edit" @click="onEditClick"> 修改 </button>
      </h3>
    </div>
     <InfoItem :label="item.label" :value="item.value" v-for="(item,index) in data" :key="index"> </InfoItem>
  </div>
</template>

<script type="text/ecmascript-6">
  import InfoItem from './InfoItem'
  export default {
    name: 'InfoGroup',
    components: {
      InfoItem
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    // 父组件通过 prop 传递数据 给子组件
    props: {
      data: {
        type: Array,
        required: true,
        default: []
      },
      edit: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: undefined
      },
    },
    mounted () {
      console.log('info group mounted')

    },
    created () {
      console.log('info group created')
    },
    methods: {
      onEditClick () {
        this.title = 'info-group'
        console.log('info group onEditClick')
        this.$emit('edit-click',this.title);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">

  .item-group {
    border: solid 1px #e0e0e0;
    box-shadow: #00a7e4;
  }
  .item-group-title {
    padding: 10px;

  }
  .item-group-title h3{
    text-align: left;
    padding-bottom: 10px;
    border-bottom: solid 2px #85a29c;
  }
  .item-group-title button {
    color: dodgerblue;
    border: none;
    background: none;
    position: absolute;
    right: 20px;
    font-size: 18px;
  }
</style>
