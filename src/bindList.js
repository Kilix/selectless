/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'

import {renderOrCloneComponent} from './utils'

export default List => {
  class BindList extends React.Component {
    render() {
      const {opened, options, renderItem, renderList, ...props} = this.props
      const items = options.map(o => renderOrCloneComponent(renderItem, {key: o.value, data: o}))
      return typeof renderList === 'undefined'
        ? opened ? renderOrCloneComponent(List, props, items) : null
        : renderList({List, opened, items})
    }
  }
  return compose(
    getContext({opened: PropTypes.bool.isRequired, options: PropTypes.array.isRequired}),
  )(BindList)
}
