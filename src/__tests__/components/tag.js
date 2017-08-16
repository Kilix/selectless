/* global it, expect, jest */

import React from 'react'
import {mount, shallow} from 'enzyme'
import toJson from 'enzyme-to-json'

import {Tag} from '../../components/'

it('Tag', () => {
  const fn = jest.fn()
  const ctx = {clearOneValue: fn}
  const tree = mount(<Tag tag={{value: 'paris', label: 'Paris'}} />, {
    context: ctx,
  })
  expect(toJson(tree)).toMatchSnapshot()
})
it('Tag Custom', () => {
  const fn = jest.fn()
  const ctx = {clearOneValue: fn}
  const tree = mount(
    <Tag tag={{value: 'paris', label: 'Paris'}} render={() => <div />} />,
    {
      context: ctx,
    }
  )
  expect(toJson(tree)).toMatchSnapshot()
})

it('Tag - click', () => {
  const fn = jest.fn()
  const ctx = {clearOneValue: fn}
  const tree = mount(<Tag tag={{value: 'paris', label: 'Paris'}} />, {
    context: ctx,
  })
  tree.simulate('click')
  expect(fn.mock.calls.length).toBe(1)
  expect(fn.mock.calls[0][0]).toEqual({value: 'paris', label: 'Paris'})
})
