import React from 'react'

import controller from '../controller'

class Item extends React.Component {
  render() {
    const {
      currentRef,
      data,
      isCurrent,
      isSelected,
      onSelectValue,
      render,
      passThrough,
      ...props
    } = this.props
    return typeof render === 'undefined'
      ? <div onClick={() => onSelectValue(data)} ref={currentRef} {...props}>
          {data.label}
        </div>
      : render({data, isCurrent, isSelected, onSelectValue})
  }
}
const enhance = controller(['onSelectValue'])
export default enhance(Item)
