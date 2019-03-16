<template>
    <PlumbView > </PlumbView>
</template>

<script type="text/ecmascript-6">

import HelloWorld from '../components/HelloWorld'
import DragItem from './DragItem'
import PlumbView from './PlumbView'

export default {
  name: 'App',
  components: {
    HelloWorld, DragItem, PlumbView
  },
  data () {
    return {
    }
  }
}
</script>
