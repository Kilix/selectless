import React, {Component} from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'

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

class AsyncSelect extends Component {
  state = {
    hasSearch: false,
    opened: false,
    options: [],
    searchValue: '',
    selectedValue: [],
  }
  componentWillMount() {
    this.loadOptions('')
    this.setState({
      selectedValue: typeof this.props.defaultValue !== 'undefined'
        ? [this.transform(this.props.defaultValue)]
        : [],
    })
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.selectedValue !== this.state.selectedValue)
      this.props.onChange(nextState.selectedValue)
  }
  callback = (error, options) => {
    if (error !== null) return
    const opts = map(this.transform, options)
    this.setState({options: opts})
  }
  loadOptions = query => {
    const promise = this.props.loadOptions(query, this.callback)
    if (promise) {
      promise.then(options => this.callback(null, options)).catch(err => this.callback(err))
    }
  }

  getChildContext() {
    const {defaultValue, name, multi, placeholder, transform} = this.props
    const {hasSearch, opened, options, searchValue, selectedValue} = this.state
    return {
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
    }
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
        ? symmetricDifference(this.state.selectedValue, [data])
        : [data],
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
  onChangeSearchValue = debounce(query => {
    this.loadOptions(query)
    this.setState({searchValue: query})
  }, this.props.debounce)

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

AsyncSelect.propTypes = {
  classname: PropTypes.string,
  debounce: PropTypes.number,
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  multi: PropTypes.bool,
  onChange: PropTypes.func,
  loadOptions: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  stayOpenOnSelect: PropTypes.bool,
  style: PropTypes.object,
  transform: PropTypes.func,
}

AsyncSelect.defaultProps = {
  debounce: 300,
  multi: false,
  placeholder: 'Select an options',
  stayOpenOnSelect: false,
}
AsyncSelect.childContextTypes = {
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

  toggleCaseSensitive: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  transform: PropTypes.func.isRequired,
}

export default AsyncSelect
