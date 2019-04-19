export default (_self, h) => {
  return [
    h('el-input', {
      props: {
        type: 'textarea',
        value: _self.options.value || ''
      },
      attrs: {
        maxlength: parseInt(_self.options.maxlength) || 20,
        placeholder: _self.options.placeholder || '段落输入框'
      },
      on: {
        'change': function (val) {
          _self.options.value = val
          _self.$emit('handleChangeVal', val)
        }
      }
    })
  ]
}

export let textareaConf = {
  // 对应数据库内类型
  type: 'textarea',
  rows: 3,
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '',
  name: '',
  placeholder: '',
  // 最大长度
  maxlength: 20,
  value: ''
}
