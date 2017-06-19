import React from 'react'
import PropTypes from 'prop-types'
import {getContext} from 'recompose'

import omit from 'ramda/src/omit'
import startsWith from 'ramda/src/startsWith'
import compose from 'ramda/src/compose'
import contains from 'ramda/src/contains'
import toUpper from 'ramda/src/toUpper'
import ifElse from 'ramda/src/ifElse'
import filter from 'ramda/src/filter'
import when from 'ramda/src/when'
import prop from 'ramda/src/prop'
import map from 'ramda/src/map'
import tap from 'ramda/src/tap'
import findIndex from 'ramda/src/findIndex'
import equals from 'ramda/src/equals'
import add from 'ramda/src/add'
import subtract from 'ramda/src/subtract'
import _ from 'ramda/src/__'

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
  state = {currentValue: null, options: []}
  constructor(props) {
    super(props)
    this.state.options = props.options
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyEvent)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyEvent)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.opened &&
      nextProps.opened !== this.props.opened &&
      this.state.currentValue === null
    ) {
      if (nextProps.selectedValue.length === 0) this.setState({currentValue: 0})
      else
        this.setState({
          currentValue: findIndex(equals(nextProps.selectedValue[0]), this.state.options),
        })
    }
    if (!nextProps.opened && nextProps.opened !== this.props.opened)
      this.setState({currentValue: null})
    if (
      nextProps.options !== this.state.options ||
      nextProps.searchValue !== this.props.searchValue ||
      nextProps.hasSearch !== this.props.hasSearch ||
      nextProps.caseSensitiveSearch !== this.props.caseSensitiveSearch
    ) {
      this.setState({options: this.computeOptions(nextProps)})
    }
  }

  computeOptions = nextProps => {
    const {caseSensitiveSearch, hasSearch, options, searchValue} = nextProps
    return when(
      () => hasSearch,
      ifElse(
        () => caseSensitiveSearch,
        filter(compose(startsWith(searchValue), prop('label'))),
        filter(compose(startsWith(toUpper(searchValue)), toUpper, prop('label'))),
      ),
      options,
    )
  }

  handleKeyEvent = e => {
    const {onSelectValue} = this.props
    const {currentValue} = this.state
    switch (e.keyCode) {
      case 13: //ENTER
      case 9: //TAB
        if (currentValue !== null) {
          onSelectValue(this.state.options[currentValue])
          this.setState({currentValue: null})
          e.stopPropagation()
          e.preventDefault()
        }
        break
      case 40: // DOWN
        this.setState({
          currentValue: closestAvailable(currentValue, this.state.options.length, add(_, 1)),
        })
        e.stopPropagation()
        break
      case 38: // UP
        this.setState({
          currentValue: closestAvailable(currentValue, this.state.options.length, subtract(_, 1)),
        })
        e.stopPropagation()
        break
    }
  }

  render() {
    const {opened, render, renderItem, selectedValue, ...props} = this.props
    const {options, currentValue} = this.state
    const myprops = omit(
      [
        'renderItem',
        'caseSensitiveSearch',
        'hasSearch',
        'onSelectValue',
        'searchValue',
        'selectedValue',
        'options',
      ],
      props,
    )

    const items = map(
      o =>
        renderOrCloneComponent(renderItem, {
          key: o.value,
          data: o,
          isSelected: contains(o, selectedValue) || currentValue === findIndex(equals(o), options),
        }),
      options,
    )

    return typeof render === 'undefined'
      ? opened ? <div {...myprops}>{items}</div> : null
      : render({opened, items})
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
