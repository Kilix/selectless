import React from 'react'

import controller from '../controller'

class Clear extends React.Component {
  render() {
    const {clearValue, label, render, ...props} = this.props

    return typeof render === 'undefined'
      ? <span {...props} onClick={clearValue}>
          {label || 'Clear'}
        </span>
      : render({clearValue, label})
  }
}

const enhance = controller(['clearValue'])
export default enhance(Clear)
