import React from 'react'

import controller from '../controller'

class Label extends React.Component {
  render() {
    const {
      disabled,
      opened,
      placeholder,
      render,
      selectedValue,
      toggleSelect,
      ...props
    } = this.props
    const value = selectedValue && selectedValue[0]
    return typeof render === 'undefined'
      ? <div onClick={() => toggleSelect()} {...props}>
          {value ? value.label : placeholder}
        </div>
      : render({disabled, opened, placeholder, toggleSelect, value})
  }
}
const enhance = controller([
  'opened',
  'placeholder',
  'selectedValue',
  'toggleSelect',
  'disabled',
])
export default enhance(Label)
