/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'

import {renderOrCloneComponent} from './utils'

export default List => {
  class BindList extends React.Component {
    render() {
      const {options, renderItem, ...props} = this.props
      return renderOrCloneComponent(
        List,
        props,
        options && options.map(o => renderOrCloneComponent(renderItem, {key: o.value, data: o})),
      )
    }
  }
  return compose(getContext({options: PropTypes.array.isRequired}))(BindList)
}
