import React from 'react'

export default Search => BaseComponent =>
  class WithSearch extends React.Component {
    state = {value: ''}

    clearValue = () => this.setState({value: ''})
    onChangeSearchValue = query => this.setState({value: query})

    render() {
      const {value} = this.state
      return (
        <BaseComponent
          searchable
          {...{
            Search,
            searchValue: value,
            clearSearchValue: this.clearValue,
            onChangeSearchValue: this.onChangeSearchValue,
          }}
          {...this.props}
        />
      )
    }
  }
