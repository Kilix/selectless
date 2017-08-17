import React, {Component} from 'react'
import PropTypes from 'prop-types'

import CoreSelect from './core'

class SyncSelect extends Component {
  state = {
    caseSensitiveSearch: false,
    hasSearch: false,
    sourceOptions: [],
    options: [],
    searchValue: '',
  }
  componentWillMount() {
    const opts = this.props.options.map(this.transform)
    this.setState({
      sourceOptions: opts,
      options: this.computeOptions('', opts),
    })
  }
  getChildContext() {
    const {
      caseSensitiveSearch,
      hasSearch,
      options,
      searchValue,
      sourceOptions,
    } = this.state
    return {
      caseSensitiveSearch,
      hasSearch,
      toggleCaseSensitive: this.toggleCaseSensitive,
      toggleSearch: this.toggleSearch,
      clearSearchValue: this.clearSearchValue,
      onChangeSearchValue: this.onChangeSearchValue,
      searchValue,
      sourceOptions,
      options,
      transform: this.transform,
    }
  }

  computeOptions = (searchValue, opts = null) => {
    const {hasSearch, caseSensitiveSearch, sourceOptions} = this.state
    const options = opts === null ? sourceOptions : opts
    if (hasSearch) {
      return caseSensitiveSearch
        ? options.filter(o => o.label.startsWith(searchValue))
        : options.filter(o =>
            o.label.toUpperCase().startsWith(searchValue.toUpperCase())
          )
    }
    return options
  }

  transform = data =>
    typeof this.props.transform !== 'undefined'
      ? this.props.transform(data)
      : data

  toggleSearch = (active = null) =>
    this.setState({
      hasSearch: active !== null ? active : !this.state.hasSearch,
    })

  toggleCaseSensitive = (active = null) =>
    this.setState({
      caseSensitiveSearch:
        active !== null ? active : !this.state.caseSensitiveSearch,
    })

  clearSearchValue = () =>
    this.setState({searchValue: '', options: this.computeOptions('')})
  onChangeSearchValue = query => {
    if (typeof this.props.onChangeSearchValue !== 'undefined') {
      this.props.onChangeSearchValue(query)
    }
    this.setState({
      searchValue: query,
      options: this.computeOptions(query),
    })
  }

  render() {
    const {defaultChildren, ...props} = this.props
    return defaultChildren({
      ...props,
      clearSearchValue: this.clearSearchValue,
      options: this.state.options,
    })
  }
}

SyncSelect.propTypes = {
  className: PropTypes.string,
  clearOneValue: PropTypes.func,
  clearSearchOnSelect: PropTypes.bool,
  defaultChildren: PropTypes.func.isRequired,
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  multi: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.any,
  renderInputs: PropTypes.func,
  stayOpenOnSelect: PropTypes.bool,
  style: PropTypes.object,
  transform: PropTypes.func,
}

SyncSelect.defaultProps = {
  multi: false,
  placeholder: 'Select an option',
  stayOpenOnSelect: false,
  clearSearchOnSelect: false,
  defaultChildren: props => <CoreSelect {...props} />,
}

SyncSelect.childContextTypes = {
  caseSensitiveSearch: PropTypes.bool.isRequired,
  clearSearchValue: PropTypes.func.isRequired,
  hasSearch: PropTypes.bool.isRequired,
  onChangeSearchValue: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  sourceOptions: PropTypes.array.isRequired,

  toggleCaseSensitive: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  transform: PropTypes.func.isRequired,
}

export default SyncSelect
