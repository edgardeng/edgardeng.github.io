export default (_self, h) => {
  return [
    h('el-input', {
      // 组件 props
      props: {
        value: _self.options.value || ''
      },
      attrs: {
        maxlength: parseInt(_self.options.maxlength) || 20,
        placeholder: _self.options.placeholder || '这是一个输入框'
      },
      on: {
        'change': function (value) {
          console.log('input change:', value)
          _self.options.value = value // event.currentTarget.value
          _self.$emit('handleChangeVal', value)
        }
      }
    })
  ]
}

export let inputConf = {
  type: 'input', // 对应数据库内类型
  config: true, // 是否可配置
  label: '输入框', // 控件左侧label内容
  name: '',
  placeholder: '',
  maxlength: 20, // 最大长度
  value: ''
}
