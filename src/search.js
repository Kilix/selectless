import React from 'react'
import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'
import {omit} from 'ramda'

import {renderOrCloneComponent} from './utils'

class Search extends React.Component {
  state = {value: ''}
  componentWillMount() {
    this.props.toggleSearch(true)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchValue !== this.state.value) this.setState({value: nextProps.searchValue})
  }
  onChange = e => {
    const v = e.target.value
    const {
      caseSensitive = false,
      onChangeSearchValue,
      toggleCaseSensitive,
      toggleSelect,
    } = this.props
    this.setState({value: v})
    toggleSelect(true)
    toggleCaseSensitive(caseSensitive)
    onChangeSearchValue(v)
  }
  render() {
    const props = omit(
      [
        'caseSensitive',
        'clearSearchValue',
        'clearValue',
        'onChangeSearchValue',
        'toggleCaseSensitive',
        'toggleSearch',
        'toggleSelect',
        'render',
      ],
      this.props,
    )
    const {
      caseSensitive,
      clearSearchValue,
      clearValue,
      render,
      searchValue,
      toggleSearch,
      toggleSelect,
    } = this.props
    const {value} = this.state
    const ElProps = {value, onChange: this.onChange, onFocus: () => toggleSelect(true), clearValue}

    return typeof render !== 'undefined'
      ? render({
          caseSensitive,
          clearSearchValue,
          clearValue,
          onChange: this.onChange,
          searchValue,
          toggleSearch,
          toggleSelect,
          value,
        })
      : <input type="text" role="combobox" {...props} {...ElProps} />
  }
}

const enhance = compose(
  getContext({
    clearSearchValue: PropTypes.func,
    clearValue: PropTypes.func,
    onChangeSearchValue: PropTypes.func,
    searchValue: PropTypes.string,
    toggleCaseSensitive: PropTypes.func,
    toggleSearch: PropTypes.func,
    toggleSelect: PropTypes.func,
  }),
)

export default enhance(Search)
