import React from 'react'
import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'

import {renderOrCloneComponent} from './utils'

export default (Search, opts = {autobind: true}) => {
  class BindSearch extends React.Component {
    render() {
      const {data, onSelectValue, renderChild, ...props} = this.props
      const childProps = opts.autobind ? {data} : {data, onSelectValue}
      const Elprops = opts.autobind ? {onClick: () => onSelectValue(data)} : {}
      const children = typeof renderChild === 'undefined' ? data.label : renderChild(childProps)
      return renderOrCloneComponent(Search, {...Elprops, ...props}, children)
    }
  }
  return compose(getContext({onSelectValue: PropTypes.func}))(BindSearch)
}
