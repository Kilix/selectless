import React from 'react'

import controller from '../controller'
import {renderOrCloneComponent} from '../utils'

class TagList extends React.Component {
  renderTags = values =>
    values.map(tag =>
      renderOrCloneComponent(this.props.renderTag, {
        key: `tag_${tag[this.props.referenceKey]}`,
        tag,
      })
    )

  render() {
    const {
      toggleSelect,
      placeholder,
      selectedValue,
      referenceKey,
      render,
      renderTag,
      ...props
    } = this.props

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
        })
  }
}
const enhance = controller([
  'toggleSelect',
  'placeholder',
  'referenceKey',
  'selectedValue',
])
export default enhance(TagList)
