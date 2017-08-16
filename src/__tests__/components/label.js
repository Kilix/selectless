/* global it, expect */

import React from 'react'
import {mount} from 'enzyme'
import toJson from 'enzyme-to-json'

import {Label} from '../../components'

it('Label', () => {
  const fn = jest.fn()
  const ctx = {
    opened: false,
    placeholder: 'Lavel',
    selectedValue: [],
    toggleSelect: fn,
  }
  const tree = mount(<Label />, {context: ctx})
  expect(toJson(tree)).toMatchSnapshot()
})
it('have value', () => {
  const fn = jest.fn()
  const ctx = {
    opened: false,
    placeholder: 'Lavel',
    selectedValue: [{label: 'Paris', value: 'paris'}],
    toggleSelect: fn,
  }
  const tree = mount(<Label />, {context: ctx})
  expect(tree.html()).toMatchSnapshot('<div>Paris</div>')
})
it('hcustom render', () => {
  const fn = jest.fn()
  const ctx = {
    opened: false,
    placeholder: 'Lavel',
    selectedValue: [{label: 'Paris', value: 'paris'}],
    toggleSelect: fn,
  }
  const tree = mount(<Label render={() => <div />} />, {context: ctx})
  expect(tree.html()).toMatchSnapshot()
})
it('have placeholder', () => {
  const fn = jest.fn()
  const ctx = {
    opened: false,
    placeholder: 'Lavel',
    selectedValue: [],
    toggleSelect: fn,
  }
  const tree = mount(<Label />, {context: ctx})
  expect(tree.html()).toMatchSnapshot('<div>Lavel</div>')
})

it('simulate opening', () => {
  const fn = jest.fn()
  const ctx = {
    opened: false,
    placeholder: 'Lavel',
    selectedValue: [],
    toggleSelect: fn,
  }
  const tree = mount(<Label />, {context: ctx})
  tree.simulate('click')
  expect(fn.mock.calls.length).toBe(1)
})
