/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'

import {renderOrCloneComponent} from './utils'

class Label extends React.Component {
  render() {
    const {opened, placeholder, render, selectedValue, toggleSelect, ...props} = this.props
    const value = selectedValue && selectedValue[0]
    return typeof render === 'undefined'
      ? <div onClick={() => toggleSelect()} {...props}>
          {value ? value.label : placeholder}
        </div>
      : render({opened, placeholder, toggleSelect, value})
  }
}
const enhance = compose(
  getContext({
    opened: PropTypes.bool,
    placeholder: PropTypes.string,
    selectedValue: PropTypes.array,
    toggleSelect: PropTypes.func,
  }),
)

export default enhance(Label)
