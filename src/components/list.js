import React from 'react'
import {compose} from 'recompose'

import controller from '../controller'
import {renderOrCloneComponent, withKeyboardEvent} from '../utils'

class List extends React.Component {
  render() {
    const {
      currentValue,
      opened,
      render,
      renderItem,
      caseSensitiveSearch,
      clearSearchValue,
      hasSearch,
      onSelectValue,
      toggleSelect,
      toggleSearch,
      searchValue,
      selectedValue,
      referenceKey,
      setRef,
      options,
      passThrough,
      ...props
    } = this.props

    const items = options.map((o, idx) => {
      const isCurrent = currentValue === options.indexOf(o)
      return renderOrCloneComponent(renderItem, {
        key: idx,
        data: o,
        isCurrent,
        isSelected: selectedValue.reduce(
          (acc, v) => acc || v[referenceKey] === o[referenceKey],
          false
        ),
        passThrough: ['data', 'isCurrent', 'isSelected'],
      })
    })

    return typeof render === 'undefined'
      ? opened
        ? <div {...props} role="listbox" ref={ref => setRef(ref)}>
            {items}
          </div>
        : null
      : render({opened, items, setRef})
  }
}

const enhance = compose(
  controller([
    'caseSensitiveSearch',
    'hasSearch',
    'opened',
    'options',
    'searchValue',
    'toggleSelect',
    'toggleSearch',
    'referenceKey',
    'selectedValue',
    'onSelectValue',
  ]),
  withKeyboardEvent
)
export default enhance(List)
