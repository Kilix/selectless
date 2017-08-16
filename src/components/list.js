import React from 'react'

import omit from 'ramda/src/omit'
import map from 'ramda/src/map'
import findIndex from 'ramda/src/findIndex'
import addIndex from 'ramda/src/addIndex'
import equals from 'ramda/src/equals'
import contains from 'ramda/src/contains'
import compose from 'ramda/src/compose'

import controller from '../controller'
import {renderOrCloneComponent, withKeyboardEvent} from '../utils'

const indexedMap = addIndex(map)

class List extends React.Component {
  render() {
    const {
      currentValue,
      opened,
      options,
      render,
      renderItem,
      selectedValue,
      setRef,
      ...props
    } = this.props
    const myprops = omit(
      [
        'renderItem',
        'caseSensitiveSearch',
        'clearSearchValue',
        'hasSearch',
        'onSelectValue',
        'toggleSelect',
        'toggleSearch',
        'searchValue',
        'selectedValue',
        'setRef',
        'options',
        'passThrough',
      ],
      props
    )

    const items = indexedMap((o, idx) => {
      const isCurrent = currentValue === findIndex(equals(o), options)
      return renderOrCloneComponent(renderItem, {
        key: idx,
        data: o,
        isCurrent,
        isSelected: contains(o, selectedValue),
        passThrough: ['data', 'isCurrent', 'isSelected'],
      })
    }, options)

    return typeof render === 'undefined'
      ? opened
        ? <div {...myprops} role="listbox" ref={ref => setRef(ref)}>
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
    'selectedValue',
    'onSelectValue',
  ]),
  withKeyboardEvent
)
export default enhance(List)
