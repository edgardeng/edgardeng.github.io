import { inputConf } from './Input'
import { radioConf } from './Radio'
import { checkboxConf } from './CheckBox'
import { textareaConf } from './TextArea'

export const formList = {
  textarea: textareaConf,
  input: inputConf,
  radio: radioConf,
  checkbox: checkboxConf
}

let optionList = []
for (let i in formList) {
  optionList.push({
    component: i,
    options: formList[i],
    value: i
  })
}
export default optionList
