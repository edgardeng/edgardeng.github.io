export default (_self, h) => {
  return [
    h('el-radio-group', {
      props: {
        value: _self.options.value || '1'
      },
      on: {
        'input' (value) {
          // if (!_self.options.name) {
          //   return false;
          // }
          console.log('radio input:',value )
          _self.options = Object.assign(_self.options, {
            value
          })
          _self.$emit('handleChangeVal', value)
        }
      }
    }, _self.options.items.map(v => {
      return h('el-radio', {
        props: {
          label: v.label_value
        }
      }, v.label_name)
    }))
  ]
}

export let radioConf = {
  // 对应数据库内类型
  type: 'radio',
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '',
  // 绑定的值
  value: '2',
  // 选项内数据
  items: [{ 'label_value': '1', 'label_name': '单选框1' }, { 'label_value': '2', 'label_name': '单选框2' }],
  // 表单name
  name: ''
}
