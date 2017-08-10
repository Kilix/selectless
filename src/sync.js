import React, {Component} from 'react'
import PropTypes from 'prop-types'

import filter from 'ramda/src/filter'
import map from 'ramda/src/map'
import compose from 'ramda/src/compose'
import ifElse from 'ramda/src/ifElse'
import startsWith from 'ramda/src/startsWith'
import toUpper from 'ramda/src/toUpper'
import prop from 'ramda/src/prop'
import when from 'ramda/src/when'

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
    const opts = map(this.transform, this.props.options)
    this.setState({
      sourceOptions: opts,
      options: this.computeOptions('', opts),
    })
  }
  getChildContext() {
    const {caseSensitiveSearch, hasSearch, options, searchValue, sourceOptions} = this.state
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

  clearSearchValue = () => this.setState({searchValue: '', options: this.computeOptions('')})
  onChangeSearchValue = query =>
    this.setState({
      searchValue: query,
      options: this.computeOptions(query),
    })

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
  clearSearchOnSelect: PropTypes.bool,
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  multi: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  stayOpenOnSelect: PropTypes.bool,
  style: PropTypes.object,
  transform: PropTypes.func,
  defaultChildren: PropTypes.func.isRequired,
}

SyncSelect.defaultProps = {
  multi: false,
  placeholder: 'Select an options',
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
