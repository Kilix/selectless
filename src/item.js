/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'

import {renderOrCloneComponent} from './utils'

class Item extends React.Component {
  render() {
    const {data, isCurrent, isSelected, onSelectValue, render, ...props} = this.props
    return typeof render === 'undefined'
      ? <div onClick={() => onSelectValue(data)} {...props}>
          {data.label}
        </div>
      : render({data, isCurrent, isSelected, onSelectValue})
  }
}
const enhance = compose(getContext({onSelectValue: PropTypes.func}))
export default enhance(Item)
