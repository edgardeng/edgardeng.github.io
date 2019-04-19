<template>
    <el-form>
      <div v-for="item in componentList">
        <RenderView :component="item.component" :options="item.options"> </RenderView>
      </div>

    </el-form>
</template>

<script type="text/ecmascript-6">

import HelloWorld from '../components/HelloWorld'
import DragItem from './DragItem'
import PlumbView from './PlumbView'
import RenderView from './RenderView'
import optionList from './render-element/OptionList'


export default {
  name: 'App',
  components: {
    HelloWorld, DragItem, PlumbView, RenderView
  },
  data () {
    return {
      optionList,
      componentList: [],
      name: 'input value',
      label: 'label',
      options: {
        type: 'input', // 对应数据库内类型
        config: true, // 是否可配置
        label: '输入框', // 控件左侧label内容
        name: '',
        placeholder: '',
        maxlength: 20, // 最大长度
        value: ''
      }
    }
  },
  mounted () {
    this.componentList = []
    for (let item of optionList) {
      let iN = {
        component: item.component,
        options: JSON.parse(JSON.stringify(item.options))
      }
      this.componentList.push(iN)
    }
    console.log('mounted,', this.componentList)
  }
}
</script>
