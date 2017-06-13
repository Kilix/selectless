/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'

import {renderOrCloneComponent} from './utils'

export default (Label, opts = {autobind: true}) => {
  class BindLabel extends React.Component {
    render() {
      const {toggleSelect, placeholder, selectedValue, renderChild, ...props} = this.props
      const value = selectedValue && selectedValue[0]

      const childProps = opts.autobind ? {placeholder, value} : {placeholder, value, toggleSelect}
      const ElProps = opts.autobind ? {onClick: () => toggleSelect()} : {}

      const children = typeof renderChild !== 'undefined'
        ? renderChild(childProps)
        : value ? value.label : placeholder

      return renderOrCloneComponent(
        Label,
        {
          ...ElProps,
          ...props,
        },
        children,
      )
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
