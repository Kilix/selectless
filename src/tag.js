/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'

import {renderOrCloneComponent} from './utils'

class Tag extends React.Component {
  clearTag = e => {
    const {clearOneValue, tag} = this.props
    clearOneValue(tag)
    e.stopPropagation()
  }
  render() {
    const {render, tag} = this.props
    return typeof render === 'undefined'
      ? <span onClick={this.clearTag}>{tag.label}</span>
      : render({tag, clear: this.clearTag})
  }
}

const enhance = compose(
  getContext({
    clearOneValue: PropTypes.func,
  }),
)

export default enhance(Tag)
