import React from 'react'
import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'
import {omit} from 'ramda'

import {renderOrCloneComponent} from './utils'

class Clear extends React.Component {
  render() {
    const {clearValue, label, render} = this.props
    const props = omit(['clearValue', 'label', 'render'], this.props)

    return typeof render !== 'undefined'
      ? render({clearValue, label})
      : <span {...props} onClick={clearValue}>{label ? label : 'Clear'}</span>
  }
}

const enhance = compose(
  getContext({
    clearValue: PropTypes.func,
  }),
)

export default enhance(Clear)
