import React, {Component} from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'

import CoreSelect from './core'

class AsyncSelect extends Component {
  state = {
    caseSensitiveSearch: false,
    hasSearch: false,
    options: [],
    searchValue: '',
  }
  componentWillMount() {
    this.loadOptions('')
  }

  callback = (error, options) => {
    if (error !== null) return
    const opts = options.map(this.transform)
    this.setState({options: opts})
  }
  loadOptions = query => {
    const promise = this.props.loadOptions(query, this.callback)
    if (promise) {
      promise
        .then(options => this.callback(null, options))
        .catch(err => this.callback(err))
    }
  }

  getChildContext() {
    const {caseSensitiveSearch, hasSearch, options, searchValue} = this.state
    return {
      caseSensitiveSearch,
      hasSearch,
      toggleCaseSensitive: this.toggleCaseSensitive,
      toggleSearch: this.toggleSearch,
      clearSearchValue: this.clearSearchValue,
      onChangeSearchValue: this.onChangeSearchValue,
      transform: this.transform,
      options,
      searchValue,
    }
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

  clearSearchValue = () => this.setState({searchValue: ''})

  _onChangeSearchValue = debounce(query => {
    this.loadOptions(query)
  }, this.props.debounce)

  onChangeSearchValue = query => {
    if (typeof this.props.onChangeSearchValue !== 'undefined') {
      this.props.onChangeSearchValue(query)
    }
    this.setState({searchValue: query})
    this._onChangeSearchValue(query)
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

AsyncSelect.propTypes = {
  className: PropTypes.string,
  clearOneValue: PropTypes.func,
  closeOnBlur: PropTypes.bool,
  debounce: PropTypes.number,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  multi: PropTypes.bool,
  onChange: PropTypes.func,
  loadOptions: PropTypes.func.isRequired,
  placeholder: PropTypes.any,
  renderInputs: PropTypes.func,
  referenceKey: PropTypes.string.isRequired,
  stayOpenOnSelect: PropTypes.bool,
  style: PropTypes.object,
  transform: PropTypes.func,
}

AsyncSelect.defaultProps = {
  disabled: false,
  multi: false,
  placeholder: 'Select an option',
  stayOpenOnSelect: false,
  debounce: 300,
  closeOnBlur: true,
  referenceKey: 'value',
  defaultChildren: props => <CoreSelect {...props} />,
}

AsyncSelect.childContextTypes = {
  caseSensitiveSearch: PropTypes.bool.isRequired,
  clearSearchValue: PropTypes.func.isRequired,
  hasSearch: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  onChangeSearchValue: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,

  toggleCaseSensitive: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  transform: PropTypes.func.isRequired,
}

export default AsyncSelect
