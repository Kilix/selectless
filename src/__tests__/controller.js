/* global test, expect */

import React from 'react'
import {shallow} from 'enzyme'

import controller from '../controller'

const defaultContext = {
  caseSensitiveSearch: true,
  clearSearchValue: true,
  hasSearch: true,
  onChangeSearchValue: true,
  searchValue: true,
  options: true,
  sourceOptions: true,
  toggleCaseSensitive: true,
  toggleSearch: true,
  transform: true,
  clearValue: true,
  clearOneValue: true,
  defaultValue: true,
  name: true,
  multi: true,
  placeholder: true,
  onSelectValue: true,
  opened: true,
  selectedValue: true,
  toggleSelect: true,
}

test('should return all context', () => {
  const enhance = controller()
  const Test = props => <div {...props} />
  const STest = enhance(Test)
  const tree = shallow(<STest />, {context: defaultContext})
  expect(tree.props()).toEqual(defaultContext)
})

test('should pass only selected props', () => {
  const enhance = controller(['name', 'opened'])
  const Test = props => <div {...props} />
  const STest = enhance(Test)
  const tree = shallow(<STest />, {context: defaultContext})
  expect(tree.props()).toEqual({name: true, opened: true})
})
