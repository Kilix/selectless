import React from 'react'
import {findDOMNode} from 'react-dom'
import PropTypes from 'prop-types'
import {getContext} from 'recompose'

import {
  omit,
  startsWith,
  compose,
  contains,
  toUpper,
  ifElse,
  filter,
  when,
  prop,
  map,
  findIndex,
  equals,
  add,
  subtract,
  __,
} from 'ramda'

import {renderOrCloneComponent} from './utils'
const closestAvailable = (currentValue, optionsLength, fn) => {
  if (fn(currentValue) > currentValue) {
    if (currentValue < optionsLength - 1) return fn(currentValue)
    else return 0
  } else {
    if (currentValue !== 0) return fn(currentValue)
    else return optionsLength - 1
  }
}

class List extends React.Component {
  state = {currentValue: null}
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyEvent)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyEvent)
  }

  componentDidUpdate(nextProps, nextState) {
    if (
      nextProps.opened &&
      nextState.currentValue !== this.state.currentValue &&
      this.item !== null
    ) {
      const {currentValue} = this.state
      const wrapper = findDOMNode(this.node)
      const item = findDOMNode(this.item)
      const wrapperHeight = wrapper.getBoundingClientRect().height
      const itemHeight = item.getBoundingClientRect().height
      const ratio = wrapperHeight / itemHeight
      const offset = itemHeight * currentValue
      if (
        offset < wrapper.scrollTop ||
        offset > wrapper.scrollTop + currentValue % Math.floor(ratio) * itemHeight
      )
        wrapper.scrollTop = currentValue * itemHeight
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.opened &&
        nextProps.opened !== this.props.opened &&
        this.state.currentValue === null) ||
      nextProps.searchValue !== this.props.searchValue
    ) {
      if (nextProps.selectedValue.length === 0) this.setState({currentValue: 0})
      else
        this.setState({
          currentValue: findIndex(equals(nextProps.selectedValue[0]), this.props.options),
        })
    }
    if (!nextProps.opened && nextProps.opened !== this.props.opened)
      this.setState({currentValue: null})
  }

  handleKeyEvent = e => {
    const {onSelectValue, opened, options} = this.props
    const {currentValue} = this.state
    if (opened) {
      switch (e.keyCode) {
        case 13: //ENTER
        case 9: //TAB
          if (currentValue !== null) {
            onSelectValue(options[currentValue])
            this.setState({currentValue: null})
            e.stopPropagation()
            e.preventDefault()
          }
          break
        case 40: // DOWN
          this.setState({
            currentValue: closestAvailable(currentValue, options.length, add(__, 1)),
          })
          e.stopPropagation()
          break
        case 38: // UP
          this.setState({
            currentValue: closestAvailable(currentValue, options.length, subtract(__, 1)),
          })
          e.stopPropagation()
          break
      }
    }
  }
  setRef = l => (this.node = l)

  render() {
    const {opened, options, render, renderItem, selectedValue, ...props} = this.props
    const {currentValue} = this.state
    const myprops = omit(
      [
        'renderItem',
        'caseSensitiveSearch',
        'hasSearch',
        'onSelectValue',
        'searchValue',
        'selectedValue',
      ],
      props,
    )

    const items = map(o => {
      const isCurrent = currentValue === findIndex(equals(o), options)
      return renderOrCloneComponent(renderItem, {
        key: o.value.toString(),
        data: o,
        isCurrent,
        isSelected: contains(o, selectedValue),
        currentRef: ref => (isCurrent ? (this.item = ref) : null),
      })
    }, options)

    return typeof render === 'undefined'
      ? opened
        ? <div ref={this.setRef} {...myprops} role="listbox">
            {items}
          </div>
        : null
      : render({opened, items, ref: this.setRef})
  }
}

const enhance = compose(
  getContext({
    caseSensitiveSearch: PropTypes.bool,
    hasSearch: PropTypes.bool,
    opened: PropTypes.bool.isRequired,
    options: PropTypes.array.isRequired,
    searchValue: PropTypes.string,
    selectedValue: PropTypes.array,
    onSelectValue: PropTypes.func,
  }),
)
export default enhance(List)
