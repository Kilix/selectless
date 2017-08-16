/* global it, expect, jest */

import React from 'react'
import {mount, shallow} from 'enzyme'
import toJson from 'enzyme-to-json'

import {Item} from '../../components/'

it('Item', () => {
  const fn = jest.fn()
  const ctx = {onSelectValue: fn}
  const tree = mount(<Item data={{value: 'paris', label: 'Paris'}} />, {
    context: ctx,
  })
  expect(toJson(tree)).toMatchSnapshot()
})
it('Item Custom', () => {
  const fn = jest.fn()
  const ctx = {onSelectValue: fn}
  const tree = mount(
    <Item data={{value: 'paris', label: 'Paris'}} render={() => <div />} />,
    {
      context: ctx,
    }
  )
  expect(toJson(tree)).toMatchSnapshot()
})

it('Item - click', () => {
  const fn = jest.fn()
  const ctx = {onSelectValue: fn}
  const tree = mount(<Item data={{value: 'paris', label: 'Paris'}} />, {
    context: ctx,
  })
  tree.simulate('click')
  expect(fn.mock.calls.length).toBe(1)
})
