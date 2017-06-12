/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'

import {renderOrCloneComponent} from './utils'

export default Item => {
  class BindItem extends React.Component {
    render() {
      const {data, onSelectValue} = this.props
      return renderOrCloneComponent(Item, {
        data,
        onClick: () => onSelectValue(data),
      })
    }
  }
  return compose(getContext({onSelectValue: PropTypes.func}))(BindItem)
}
