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
  onChange = e => {
    const v = e.target.value
    const {caseSensitive = false, onChangeSearchValue, toggleCaseSensitive} = this.props
    this.setState({value: v})
    toggleCaseSensitive(caseSensitive)
    onChangeSearchValue(v)
  }
  render() {
    const props = omit(
      [
        'caseSensitive',
        'clearSearchValue',
        'onChangeSearchValue',
        'toggleCaseSensitive',
        'toggleSearch',
        'toggleSelect',
        'render',
      ],
      this.props,
    )
    const {render, toggleSelect} = this.props
    const {value} = this.state
    const ElProps = {value, onChange: this.onChange, onFocus: () => toggleSelect(true)}

    return typeof render !== 'undefined'
      ? render({...ElProps, ...props})
      : <input type="text" {...props} {...ElProps} />
  }
}

const enhance = compose(
  getContext({
    clearSearchValue: PropTypes.func,
    onChangeSearchValue: PropTypes.func,
    toggleCaseSensitive: PropTypes.func,
    toggleSearch: PropTypes.func,
    toggleSelect: PropTypes.func,
  }),
)

export default enhance(Search)
