export default (_self, h) => {
  return [
    h('el-checkbox-group', {
      props: {
        value: _self.options.value
      },
      on: {
        'input' (value) {
          console.log('checkbox input:',value )
          _self.options = Object.assign(_self.options, {
            value
          })
          _self.$emit('handleChangeVal', value)
        },
        'change' (value) {
          console.log('checkbox change', value)
          _self.$emit('handleChangeVal', value)
        }
      }
    }, _self.options.items.map(v => {
      return h('el-checkbox', {
        props: {
          label: v
        }
      }, v)
    }))
  ]
}

export let checkboxConf = {
  // 对应数据库内类型
  type: 'checkbox',
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '',
  // 绑定的值
  value: [],
  // 选项内数据
  items: ['多选一', '多选二', '多选三'],
  // 表单name
  name: ''
}
