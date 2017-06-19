/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'
import {map} from 'ramda'

import {renderOrCloneComponent} from './utils'

class TagList extends React.Component {
  renderTags = map(tag =>
    renderOrCloneComponent(this.props.renderTag, {key: `tag_${tag.value}`, tag}),
  )

  render() {
    const {toggleSelect, placeholder, selectedValue, render, renderTag, ...props} = this.props

    const ElProps = {...props, onClick: () => toggleSelect()}
    const tags = this.renderTags(selectedValue)
    return typeof render === 'undefined'
      ? <div {...ElProps}>
          {selectedValue.length === 0 ? placeholder : tags}
        </div>
      : render({
          toggleSelect,
          placeholder,
          tags,
          props,
        })
  }
}
const enhance = compose(
  getContext({
    toggleSelect: PropTypes.func,
    placeholder: PropTypes.string,
    selectedValue: PropTypes.array,
  }),
)

export default enhance(TagList)
