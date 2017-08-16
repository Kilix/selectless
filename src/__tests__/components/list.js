/* global it, expect */

import React from 'react'
import {mount} from 'enzyme'
import toJson from 'enzyme-to-json'

import {List} from '../../components/'

it('close List', () => {
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
  const tree = mount(<List renderItem={() => <div />} />, {context: ctx})
  expect(toJson(tree)).toMatchSnapshot()
})

it('open List', () => {
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
  const tree = mount(<List renderItem={() => <div />} />, {context: ctx})
  expect(toJson(tree)).toMatchSnapshot()
})

it('custom List', () => {
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
      renderItem={() => <div />}
    />,
    {
      context: ctx,
    }
  )
  expect(toJson(tree)).toMatchSnapshot()
})
