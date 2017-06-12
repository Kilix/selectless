/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'

import {renderOrCloneComponent} from './utils'

export default Label => {
  class BindLabel extends React.Component {
    render() {
      const {toggleSelect, selectedValue, ...props} = this.props
      return renderOrCloneComponent(Label, {
        onClick: toggleSelect,
        selectedValue: selectedValue[0],
        ...props,
      })
    }
  }
  return compose(
    getContext({
      toggleSelect: PropTypes.func,
      placeholder: PropTypes.string,
      selectedValue: PropTypes.array,
    }),
  )(BindLabel)
}
