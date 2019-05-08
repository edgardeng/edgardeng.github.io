<template>
  <div>
    <h3> Home</h3>
    <view-chart> </view-chart>
  </div>
</template>

<script type="text/ecmascript-6">

// import HelloWorld from '../components/HelloWorld'
// import DragItem from './DragItem'
// import PlumbView from './PlumbView'
// import RenderView from './RenderView'
// import optionList from './render-element/OptionList'
import ViewChart from './ViewChart'

export default {
  name: 'App',
  components: {
    // HelloWorld, DragItem, PlumbView,
    // RenderView
    ViewChart
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log('mounted')
  }
}
</script>
