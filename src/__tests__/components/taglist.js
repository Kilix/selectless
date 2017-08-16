/* global it, expect */

import React from 'react'
import {mount, shallow} from 'enzyme'
import toJson from 'enzyme-to-json'

import {TagList, Tag} from '../../components/'

const options = [
  {label: 'Paris', value: 'paris'},
  {label: 'Tokyo', value: 'tokyo'},
]

it('TagList', () => {
  const fn = jest.fn()
  const ctx = {
    toggleSelect: fn,
    placeholder: 'Placeholder',
    selectedValue: [{label: 'Paris', value: 'paris'}],
  }
  const tree = mount(<TagList renderTag={props => <div />} />, {context: ctx})
  expect(toJson(tree)).toMatchSnapshot()
})

it('TagList - Custom', () => {
  const fn = jest.fn()
  const ctx = {
    toggleSelect: fn,
    placeholder: 'Placeholder',
    selectedValue: [{label: 'Paris', value: 'paris'}],
  }
  const tree = mount(
    <TagList
      render={props =>
        <div>
          {props.tags}
        </div>}
      renderTag={props => <div />}
    />,
    {context: ctx}
  )
  expect(toJson(tree)).toMatchSnapshot()
})

it('TagList - onClick', () => {
  const fn = jest.fn()
  const ctx = {
    toggleSelect: fn,
    placeholder: 'Placeholder',
    selectedValue: [],
  }
  const tree = mount(<TagList renderTag={props => <div />} />, {context: ctx})
  tree.simulate('click')
  expect(fn.mock.calls.length).toBe(1)
})
