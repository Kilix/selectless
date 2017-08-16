/* global it, expect */

import React from 'react'
import {mount, shallow} from 'enzyme'
import toJson from 'enzyme-to-json'

import {Search} from '../../components/'
import {Search as RawSearch} from '../../components/search'

const options = [
  {label: 'Paris', value: 'paris'},
  {label: 'Tokyo', value: 'tokyo'},
]
it('Search', () => {
  const ctx = {
    clearSearchValue: () => {},
    clearValue: () => {},
    onChangeSearchValue: () => {},
    searchValue: '',
    toggleCaseSensitive: () => {},
    toggleSearch: () => {},
    toggleSelect: () => {},
  }
  const tree = mount(<Search />, {context: ctx})
  expect(toJson(tree)).toMatchSnapshot()
})

it('Search', () => {
  const ctx = {
    clearSearchValue: () => {},
    clearValue: () => {},
    onChangeSearchValue: () => {},
    searchValue: '',
    toggleCaseSensitive: () => {},
    toggleSearch: () => {},
    toggleSelect: () => {},
  }
  const tree = mount(<Search render={props => <div />} />, {context: ctx})
  expect(toJson(tree)).toMatchSnapshot()
})

it('Search - Focus', () => {
  const toggleSelect = jest.fn()

  const ctx = {
    clearSearchValue: () => {},
    clearValue: () => {},
    onChangeSearchValue: () => {},
    searchValue: '',
    toggleCaseSensitive: () => {},
    toggleSearch: () => {},
    toggleSelect,
  }
  const tree = mount(<Search />, {context: ctx})
  tree.simulate('focus')
  expect(toggleSelect.mock.calls.length).toBe(1)
})
it('Search - onChange', () => {
  const toggleSelect = jest.fn()
  const onChangeSearchValue = jest.fn()
  const toggleCaseSensitive = jest.fn()
  const toggleSearch = jest.fn()
  const clearValue = jest.fn()
  const clearSearchValue = jest.fn()

  const ctx = {
    clearSearchValue,
    clearValue,
    onChangeSearchValue,
    searchValue: 'a',
    toggleCaseSensitive,
    toggleSearch,
    toggleSelect,
  }
  const tree = mount(<Search />, {context: ctx})
  tree.simulate('change', {target: {value: 'spam'}})

  expect(toggleSelect.mock.calls.length).toBe(1)
  expect(toggleCaseSensitive.mock.calls.length).toBe(1)
  expect(onChangeSearchValue.mock.calls.length).toBe(1)
})

it('Search - change Value', () => {
  const ctx = {
    clearSearchValue: () => {},
    clearValue: () => {},
    onChangeSearchValue: () => {},
    searchValue: '',
    toggleCaseSensitive: () => {},
    toggleSearch: () => {},
    toggleSelect: () => {},
  }
  const tree = shallow(<RawSearch {...ctx} />)
  expect(tree.html()).toBe('<input type="text" value=""/>')
  tree.setProps({searchValue: 'spam'})
  expect(tree.html()).toBe('<input type="text" value="spam"/>')
})
