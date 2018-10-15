<template>
    <div >

</div>
</template>

<script type="text/ecmascript-6">
import HelloWorld from './components/HelloWorld'
import InfoItem from './components/InfoItem'
import InfoGroup from './components/InfoGroup'

export default {
  name: 'App',
  components: {
    HelloWorld, InfoItem, InfoGroup
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
