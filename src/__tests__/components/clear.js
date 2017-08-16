/* global it, expect, jest */

import React from 'react'
import {mount} from 'enzyme'
import toJson from 'enzyme-to-json'

import {Clear} from '../../components/'

it('Clear', () => {
  const fn = jest.fn()
  const ctx = {clearValue: fn}
  const tree = mount(<Clear />, {context: ctx})
  expect(toJson(tree)).toMatchSnapshot()
})
it('Custom Clear', () => {
  const fn = jest.fn()
  const ctx = {clearValue: fn}
  const tree = mount(<Clear render={() => <div />} />, {context: ctx})
  expect(toJson(tree)).toMatchSnapshot()
})
it('has default label', () => {
  const fn = jest.fn()
  const ctx = {clearValue: fn}
  const clear = mount(<Clear />, {context: ctx})
  expect(clear.html()).toMatchSnapshot('<span>Clear</span>')
})
it('Simulate click', () => {
  const fn = jest.fn()
  const ctx = {clearValue: fn}
  const tree = mount(<Clear />, {context: ctx})
  tree.simulate('click')
  expect(fn.mock.calls.length).toBe(1)
})
