import React from 'react'

import controller from '../controller'

class Tag extends React.Component {
  clearTag = e => {
    const {clearOneValue, disabled, tag} = this.props
    if (!disabled) {
      clearOneValue(tag)
      e.stopPropagation()
    }
  }
  render() {
    const {clearOneValue, disabled, render, tag, ...props} = this.props

    return typeof render === 'undefined'
      ? <span onClick={this.clearTag} {...props}>
          {tag.label}
        </span>
      : render({disabled, tag, clear: this.clearTag})
  }
}

const enhance = controller(['clearOneValue', 'disabled'])
export default enhance(Tag)
