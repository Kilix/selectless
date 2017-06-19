/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'

import {renderOrCloneComponent} from './utils'

class Label extends React.Component {
  render() {
    const {toggleSelect, placeholder, selectedValue, render, ...props} = this.props
    const value = selectedValue && selectedValue[0]

    return typeof render === 'undefined'
      ? <div onClick={() => toggleSelect()} {...props}>
          {value ? value.label : placeholder}
        </div>
      : render({placeholder, value})
  }
}
const enhance = compose(
  getContext({
    toggleSelect: PropTypes.func,
    placeholder: PropTypes.string,
    selectedValue: PropTypes.array,
  }),
)

export default enhance(Label)
