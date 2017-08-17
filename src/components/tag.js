import React from 'react'

import controller from '../controller'

class Tag extends React.Component {
  clearTag = e => {
    const {clearOneValue, tag} = this.props
    clearOneValue(tag)
    e.stopPropagation()
  }
  render() {
    const {clearOneValue, render, tag, ...props} = this.props

    return typeof render === 'undefined'
      ? <span onClick={this.clearTag} {...props}>
          {tag.label}
        </span>
      : render({tag, clear: this.clearTag})
  }
}

const enhance = controller(['clearOneValue'])
export default enhance(Tag)
