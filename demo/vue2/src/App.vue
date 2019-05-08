<template>
  <div id="app">
    <div> Vue2 Demo</div>
    <Home/>
    <!--<InfoGroup :data="itemArr" title="title" edit @edit-click="onGroupEdit"> </InfoGroup>-->
    <!--<NoFound > </NoFound>-->
  </div>
</template>

<script type="text/ecmascript-6">
import InfoItem from './components/InfoItem'
import InfoGroup from './components/InfoGroup'
import NoFound from './page/NoFound'
import Home from './page/Home'

export default {
  name: 'App',
  components: {
    Home
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      itemArr: [
          { label: 'label1', value: 'value1' },
          { label: 'label2', value: 'value2' }
      ],
      title: 'InfoGroup'
    }
  },
  mounted () {
      console.log('App vue mounted')
    },
    created () {
      console.log('App vue created')
    },
    methods: {
      onGroupEdit (title) {
        console.log('app onGroupEdit: ' + title)
      }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
