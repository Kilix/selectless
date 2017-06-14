import React from 'react'
import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'
import omit from 'ramda/src/omit'

import {renderOrCloneComponent} from './utils'

class Clear extends React.Component {
  render() {
    const {clearValue, label, render} = this.props
    const props = omit(['clearValue', 'label', 'render'], this.props)
    const ElProps = {onClick: clearValue}

    return typeof render !== 'undefined'
      ? render(label, {...ElProps, ...props})
      : <button {...props} {...ElProps}>{label ? label : 'Clear'}</button>
  }
}

const enhance = compose(
  getContext({
    clearValue: PropTypes.func,
  }),
)

export default enhance(Clear)
