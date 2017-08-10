import React from 'react'
import PropTypes from 'prop-types'
import omit from 'ramda/src/omit'

import controller from '../controller'

class Clear extends React.Component {
  render () {
    const { clearValue, label, render } = this.props
    const props = omit(['clearValue', 'label', 'render'], this.props)

    return typeof render === 'undefined'
      ? <span {...props} onClick={clearValue}>
          {label || 'Clear'}
        </span>
      : render({ clearValue, label })
  }
}

const enhance = controller(['clearValue'])
export default enhance(Clear)
