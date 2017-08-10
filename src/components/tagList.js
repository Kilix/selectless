/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import map from 'ramda/src/map'

import controller from '../controller'
import { renderOrCloneComponent } from '../utils'

class TagList extends React.Component {
  renderTags = map(tag =>
    renderOrCloneComponent(this.props.renderTag, {
      key: `tag_${tag.value}`,
      tag
    })
  )

  render() {
    const {
      toggleSelect,
      placeholder,
      selectedValue,
      render,
      renderTag,
      ...props
    } = this.props

    const ElProps = { ...props, onClick: () => toggleSelect() }
    const tags = this.renderTags(selectedValue)
    return typeof render === 'undefined'
      ? <div {...ElProps}>
          {selectedValue.length === 0 ? placeholder : tags}
        </div>
      : render({
          toggleSelect,
          placeholder,
          tags
        })
  }
}
const enhance = controller(['toggleSelect', 'placeholder', 'selectedValue'])
export default enhance(TagList)
