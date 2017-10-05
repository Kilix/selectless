import React from 'react'

import controller from '../controller'

class Clear extends React.Component {
  clear = e => {
    if (!this.props.disabled) {
      this.props.clearValue(e)
    }
  }
  render() {
    const {clearValue, disabled, label, render, ...props} = this.props

    return typeof render === 'undefined'
      ? <span {...props} onClick={this.clear}>
          {label || 'Clear'}
        </span>
      : render({clearValue: this.clear, label, disabled})
  }
}

const enhance = controller(['clearValue', 'disabled'])
export default enhance(Clear)
