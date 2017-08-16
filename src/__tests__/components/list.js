/* global it, expect */

import React from 'react'
import {mount} from 'enzyme'
import toJson from 'enzyme-to-json'

import {List, Item} from '../../components/'

const options = [
  {label: 'Paris', value: 'paris'},
  {label: 'Tokyo', value: 'tokyo'},
]
it('close List', () => {
  const fn = jest.fn()
  const ctx = {
    caseSensitiveSearch: false,
    hasSearch: false,
    opened: false,
    options: [{label: 'PAris', value: 'paris'}],
    searchValue: '',
    toggleSelect: () => {},
    toggleSearch: () => {},
    selectedValue: [],
    onSelectValue: () => {},
  }
  const tree = mount(<List renderItem={Item} />, {context: ctx})
  expect(toJson(tree)).toMatchSnapshot()
})

it('open List', () => {
  const fn = jest.fn()
  const ctx = {
    caseSensitiveSearch: false,
    hasSearch: false,
    opened: true,
    options: [{label: 'PAris', value: 'paris'}],
    searchValue: '',
    toggleSelect: () => {},
    toggleSearch: () => {},
    selectedValue: [],
    onSelectValue: () => {},
  }
  const tree = mount(<List renderItem={Item} />, {context: ctx})
  expect(toJson(tree)).toMatchSnapshot()
})

it('custom List', () => {
  const fn = jest.fn()
  const ctx = {
    caseSensitiveSearch: false,
    hasSearch: false,
    opened: true,
    options: [{label: 'PAris', value: 'paris'}],
    searchValue: '',
    toggleSelect: () => {},
    toggleSearch: () => {},
    selectedValue: [],
    onSelectValue: () => {},
  }
  const tree = mount(
    <List
      render={props =>
        <div>
          {props.children}
        </div>}
      renderItem={Item}
    />,
    {
      context: ctx,
    }
  )
  expect(toJson(tree)).toMatchSnapshot()
})
