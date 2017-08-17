import React from 'react'

import controller from '../controller'

export class Search extends React.Component {
  state = {value: ''}
  componentWillMount() {
    this.props.toggleSearch(true)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchValue !== this.state.value) {
      this.setState({value: nextProps.searchValue})
    }
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
    const {
      caseSensitive,
      clearSearchValue,
      clearValue,
      onChangeSearchValue,
      toggleCaseSensitive,
      toggleSearch,
      toggleSelect,
      render,
      searchValue,
      ...props
    } = this.props
    const {value} = this.state
    const ElProps = {
      value,
      onChange: this.onChange,
      onFocus: () => toggleSelect(true),
    }
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
      : <input type="text" {...props} {...ElProps} />
  }
}

const enhance = controller([
  'clearSearchValue',
  'clearValue',
  'onChangeSearchValue',
  'searchValue',
  'toggleCaseSensitive',
  'toggleSearch',
  'toggleSelect',
])

export default enhance(Search)
