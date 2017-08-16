import React from 'react'
import omit from 'ramda/src/omit'

import controller from '../controller'

class Tag extends React.Component {
  clearTag = e => {
    const {clearOneValue, tag} = this.props
    clearOneValue(tag)
    e.stopPropagation()
  }
  render() {
    const {render, tag} = this.props
    const prop = omit(['clearOneValue', 'render', 'tag'], this.props)

    return typeof render === 'undefined'
      ? <span onClick={this.clearTag} {...prop}>
          {tag.label}
        </span>
      : render({tag, clear: this.clearTag})
  }
}

const enhance = controller(['clearOneValue'])
export default enhance(Tag)
