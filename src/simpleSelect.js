import React, {Component} from 'react'
import PropTypes from 'prop-types'

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

class SimpleSelect extends Component {
  state = {
    opened: false,
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

  _renderInputs = name =>
    map(i =>
      <input key={`input_${i.value}`} name={`${name}[${i.value}]`} type="hidden" value={i.value} />,
    )

  _renderOptions = options => {
    const {caseSensitiveSearch, Item, searchable, searchValue} = this.props
    const search = ifElse(
      () => caseSensitiveSearch,
      filter(compose(startsWith(searchValue), prop('label'))),
      filter(compose(startsWith(() => toUpper(searchValue)), toUpper, prop('label'))),
    )
    return compose(
      map(o =>
        renderOrCloneComponent(Item, {
          key: `item_${o.value}`,
          data: o,
          changeSelectValue: this.onSelectValue,
        }),
      ),
      when(() => searchable, search),
    )(options)
  }

  _renderTags = Tag =>
    map(t =>
      renderOrCloneComponent(Tag, {
        key: `tag_${t.value}`,
        data: t,
        clearValue: e => {
          this.clearOneValue(t)
          e.stopPropagation()
        },
      }),
    )

  render() {
    const {
      Clear,
      clearable,
      Container,
      Label,
      List,
      name,
      multi,
      onChangeSearchValue,
      placeholder,
      Search,
      searchable,
      searchValue,
      Tag,
      TagContainer,
    } = this.props
    const {opened, options, selectedValue} = this.state

    const items = this._renderOptions(options)
    const inputs = this._renderInputs(name)(selectedValue)

    return renderOrCloneComponent(Container, {}, [
      ...inputs,
      multi
        ? renderOrCloneComponent(
            TagContainer,
            {
              key: 'tagcontainer',
              placeholder,
              toggleSelect: this.toggleSelect,
            },
            selectedValue.length === 0 ? placeholder : this._renderTags(Tag)(selectedValue),
          )
        : renderOrCloneComponent(Label, {
            key: 'label',
            placeholder,
            selectedValue: selectedValue[0],
            toggleSelect: this.toggleSelect,
          }),
      clearable && renderOrCloneComponent(Clear, {key: 'clear', clearValue: this.clearValue}),
      searchable &&
        renderOrCloneComponent(Search, {
          key: 'search',
          changeSearchValue: onChangeSearchValue,
          clearValue: this.clearValue,
          toggleSelect: this.toggleSelect,
          value: searchValue,
        }),
      renderOrCloneComponent(List, {key: 'list', opened}, items),
    ])
  }
}

SimpleSelect.propTypes = {
  caseSensitiveSearch: PropTypes.bool,
  Clear: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.element]),
  clearable: PropTypes.bool,
  clearSearchValue: PropTypes.func,
  Container: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.element]).isRequired,
  defaultValue: PropTypes.any,
  Item: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.element]).isRequired,
  Label: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.element]),
  List: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.element]).isRequired,
  name: PropTypes.string.isRequired,
  multi: PropTypes.bool,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  Search: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.element]),
  searchable: PropTypes.bool,
  TagContainer: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.element]),
  Tag: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.element]),
  transform: PropTypes.func,
}

SimpleSelect.defaultProps = {
  caseSensitiveSearch: false,
  clearable: false,
  multi: false,
  placeholder: 'Select an options',
  searchable: false,
}

export default SimpleSelect
