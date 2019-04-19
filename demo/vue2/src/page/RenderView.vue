<script>
  import formItem from './render-element/renderList'

  export default {
    name: "render-view",
    render (createElement) {
      return createElement('el-form-item', {
        props: {
          label: this.label
        }
      }, formItem[this.component](this, createElement))
    },
    props: {
      name: {
        type: String,
        default: "input"
      },
      label: {
        type: String,
        default: "input"
      },
      component: {
        type: String,
        default: 'input'
      },
      options: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped>

</style>
