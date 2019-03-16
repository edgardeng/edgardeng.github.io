<template>
  <div class="hello">
    <div class="drag-field">
      <div class="item"
           draggable="true"
           @dragstart="dragstart($event, item)"
           @dragend="dragend"
           v-for="(item, index) in items" :key="index" >
        {{ item.label }}
      </div>

    </div>

    <div> container one </div>
    <div class="drop-field" @drop="dropOne" @dragover="dragover">

      <div class="item" v-if="droppedItemOne !== ''">
        {{ droppedItemOne }}
      </div>
    </div>
    <div> container two </div>
    <div class="drop-field" @drop="dropTwo" @dragover="dragover">

      <div class="item" v-if="droppedItemTwo !== ''">
        {{ droppedItemTwo }}
      </div>
    </div>



  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: '',
    data () {
      return {
        droppedItemOne: '',
        droppedItemTwo: '',
        items: [
          {
            id: 1,
            label: '模块一'
          },
          {
            id: 2,
            label: '模块二'
          },
          {
            id: 3,
            label: '模块三'
          }
        ]
      }
    },
    methods: {
      dragstart (event, item) {
        console.log('dragstart', event)
        event.dataTransfer.setData('item', item.label)
        event.dataTransfer.setData('my-info', 'hello')
      },
      dropOne (event) {
        console.log('dropOne', event)
        this.droppedItemOne = event.dataTransfer.getData('item')
        console.log('drop info: ' + event.dataTransfer.getData('my-info'))
      },
      dropTwo (event) {
        console.log('dropTwo', event)
        this.droppedItemTwo = event.dataTransfer.getData('item')
        console.log('drop info: ' + event.dataTransfer.getData('my-info'))
      },
      dragover (event) {
        event.preventDefault()
      },
      dragend (event) {
        console.log('dragend', event);
        event.dataTransfer.clearData()
      }
    }
  }
</script>

<style scoped>
  .drag-field,
  .drop-field{
    height: 10rem;
    box-sizing: border-box;
    padding: 1rem;
    background-color: #eee;
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .item{
    width: 30%;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    font-size: .9rem;
    background-color: royalblue;
    color: #eee;
  }
  .item:hover{
    cursor: pointer;
  }
</style>
