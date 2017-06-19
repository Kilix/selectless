import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {
  filter,
  map,
  compose,
  ifElse,
  startsWith,
  toUpper,
  symmetricDifference,
  prop,
  pick,
  when,
} from 'ramda'
import {renderOrCloneComponent} from './utils'

class SyncSelect extends Component {
  state = {
    caseSensitiveSearch: false,
    hasSearch: false,
    opened: false,
    sourceOptions: [],
    options: [],
    searchValue: '',
    selectedValue: [],
  }
  componentWillMount() {
    const opts = map(this.transform, this.props.options)
    this.setState({
      sourceOptions: opts,
      options: this.computeOptions('', opts),
      selectedValue: typeof this.props.defaultValue !== 'undefined'
        ? [this.transform(this.props.defaultValue)]
        : [],
    })
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.selectedValue !== this.state.selectedValue)
      this.props.onChange(nextState.selectedValue)
  }

  getChildContext() {
    const {defaultValue, name, multi, placeholder, transform} = this.props
    const {
      caseSensitiveSearch,
      hasSearch,
      opened,
      options,
      searchValue,
      selectedValue,
      sourceOptions,
    } = this.state
    return {
      caseSensitiveSearch,
      defaultValue,
      hasSearch,
      name,
      multi,
      placeholder,
      transform: this.transform,
      toggleCaseSensitive: this.toggleCaseSensitive,
      toggleSearch: this.toggleSearch,
      toggleSelect: this.toggleSelect,
      onSelectValue: this.onSelectValue,
      clearValue: this.clearValue,
      clearOneValue: this.clearOneValue,
      clearSearchValue: this.clearSearchValue,
      onChangeSearchValue: this.onChangeSearchValue,
      opened,
      options,
      searchValue,
      selectedValue,
      sourceOptions,
    }
  }

  computeOptions = (searchValue, opts = null) => {
    const {hasSearch, caseSensitiveSearch, sourceOptions} = this.state
    return when(
      () => hasSearch,
      ifElse(
        () => caseSensitiveSearch,
        filter(compose(startsWith(searchValue), prop('label'))),
        filter(compose(startsWith(toUpper(searchValue)), toUpper, prop('label'))),
      ),
      opts === null ? sourceOptions : opts,
    )
  }

  transform = data =>
    typeof this.props.transform !== 'undefined' ? this.props.transform(data) : data

  toggleSearch = (active = null) =>
    this.setState({hasSearch: active !== null ? active : !this.state.hasSearch})

  toggleCaseSensitive = (active = null) =>
    this.setState({caseSensitiveSearch: active !== null ? active : !this.state.caseSensitiveSearch})

  toggleSelect = (opened = null) =>
    this.setState({opened: opened !== null ? opened : !this.state.opened})

  onSelectValue = data => {
    this.props.clearSearchValue && this.props.clearSearchValue()
    this.setState({
      opened: this.props.stayOpenOnSelect,
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
      selectedValue: filter(v => v.value !== t.value, this.state.selectedValue),
    })
  }

  clearSearchValue = () => this.setState({searchValue: ''})
  onChangeSearchValue = query =>
    this.setState({
      searchValue: query,
      options: this.computeOptions(query),
    })

  renderInputs = (selectedValue, name) => {
    return map(
      v => <input key={v.label} name={`${name}[${v.label}]`} type="hidden" value={v.value} />,
      selectedValue,
    )
  }
  render() {
    const containerProps = pick(['classname', 'style'], this.props)
    return (
      <div {...containerProps}>
        {this.renderInputs(this.state.selectedValue, this.props.name)}
        {this.props.children}
      </div>
    )
  }
}

SyncSelect.propTypes = {
  classname: PropTypes.string,
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  multi: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  stayOpenOnSelect: PropTypes.bool,
  style: PropTypes.object,
  transform: PropTypes.func,
}

SyncSelect.defaultProps = {
  multi: false,
  placeholder: 'Select an options',
  stayOpenOnSelect: false,
}
SyncSelect.childContextTypes = {
  caseSensitiveSearch: PropTypes.bool.isRequired,
  clearValue: PropTypes.func.isRequired,
  clearOneValue: PropTypes.func.isRequired,
  clearSearchValue: PropTypes.func.isRequired,
  defaultValue: PropTypes.any,
  hasSearch: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  multi: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  onSelectValue: PropTypes.func.isRequired,
  onChangeSearchValue: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  selectedValue: PropTypes.array.isRequired,
  searchValue: PropTypes.string.isRequired,
  sourceOptions: PropTypes.array.isRequired,

  toggleCaseSensitive: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  transform: PropTypes.func.isRequired,
}

export default SyncSelect
