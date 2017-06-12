import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withContext} from 'recompose'

import filter from 'ramda/src/filter'
import map from 'ramda/src/map'
import compose from 'ramda/src/compose'
import when from 'ramda/src/when'
import ifElse from 'ramda/src/ifElse'
import startsWith from 'ramda/src/startsWith'
import toUpper from 'ramda/src/toUpper'
import symmetricDifference from 'ramda/src/symmetricDifference'
import prop from 'ramda/src/prop'
import tap from 'ramda/src/tap'
import R from 'ramda'
import {renderOrCloneComponent} from './utils'

class ContextSelect extends React.Component {
  state = {
    opened: false,
    options: [],
    selectedValue: [],
  }
  componentWillMount() {
    this.setState({
      options: map(this.transform, this.props.options),
      selectedValue: typeof this.props.defaultValue !== 'undefined'
        ? [this.transform(this.props.defaultValue)]
        : [],
    })
  }

  getChildContext() {
    const {
      caseSensitiveSearch,
      clearSearchValue,
      defaultValue,
      name,
      multi,
      placeholder,
      transform,
    } = this.props
    return {
      caseSensitiveSearch,
      clearSearchValue,
      defaultValue,
      name,
      multi,
      placeholder,
      transform: this.transform,
      toggleSelect: this.toggleSelect,
      onSelectValue: this.onSelectValue,
      clearValue: this.clearValue,
      clearOneValue: this.clearOneValue,
      ...this.state,
    }
  }

  transform = data =>
    typeof this.props.transform !== 'undefined' ? this.props.transform(data) : data

  toggleSelect = (opened = null) =>
    this.setState({opened: opened !== null ? opened : !this.state.opened})

  onSelectValue = data => {
    this.props.clearSearchValue && this.props.clearSearchValue()
    this.setState({
      opened: false,
      selectedValue: this.props.multi
        ? symmetricDifference(this.state.selectedValue, [this.transform(data)])
        : [this.transform(data)],
    })
  }

  clearValue = e => {
    this.setState({selectedValue: []})
    e.stopPropagation()
  }

  clearOneValue = t => {
    this.setState({
      selectedValue: filter(v => v !== t, this.state.selectedValue),
    })
  }
  render() {
    return React.Children.only(this.props.children)
  }
}

ContextSelect.propTypes = {
  caseSensitiveSearch: PropTypes.bool,
  clearSearchValue: PropTypes.func,
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  multi: PropTypes.bool,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  transform: PropTypes.func,
}

ContextSelect.defaultProps = {
  caseSensitiveSearch: false,
  multi: false,
  placeholder: 'Select an options',
}
ContextSelect.childContextTypes = {
  caseSensitiveSearch: PropTypes.bool,
  clearSearchValue: PropTypes.func,
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  multi: PropTypes.bool,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  opened: PropTypes.bool,
  selectedValue: PropTypes.array,

  transform: PropTypes.func,
  toggleSelect: PropTypes.func,
  onSelectValue: PropTypes.func,
  clearValue: PropTypes.func,
  clearOneValue: PropTypes.func,
}

export default ContextSelect
