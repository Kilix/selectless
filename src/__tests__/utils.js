/* global it, expect */

import React from 'react'
import {mount, shallow} from 'enzyme'
import toJson from 'enzyme-to-json'

import {
  renderOrCloneComponent,
  closestAvailable,
  withKeyboardEvent,
} from '../utils'

const evt = code => ({
  stopPropagation: () => {},
  preventDefault: () => {},
  keyCode: code,
})

it('should return the closest + 1', () =>
  expect(closestAvailable(2, 5, p => p + 1)).toBe(3))
it('should return the closest - 2', () =>
  expect(closestAvailable(2, 5, p => p - 2)).toBe(0))
it('should return the 4', () =>
  expect(closestAvailable(0, 5, p => p - 1)).toBe(4))
it('should return the 0', () =>
  expect(closestAvailable(4, 5, p => p + 1)).toBe(0))

it('should return a valid Element', () => {
  const Item = renderOrCloneComponent(<div />, {}, [])
  expect(React.isValidElement(Item)).toBe(true)
})
it('should return a valid Element', () => {
  const Test = props => <span />
  const Item = renderOrCloneComponent(Test, {}, [])
  expect(React.isValidElement(Item)).toBe(true)
})
it('should return a valid Element with props', () => {
  const Test = props => <span />
  const Item = renderOrCloneComponent(Test, {color: 'red'}, [])
  expect(React.isValidElement(Item)).toBe(true)
  expect(Item.props.color).toBe('red')
})
it('should return a element', () => {
  const onSelectValue = jest.fn()
  const toggleSelect = jest.fn()
  const clearSearchValue = jest.fn()
  const ctx = {
    onSelectValue,
    toggleSelect,
    clearSearchValue,
    opened: true,
    options: [{label: 'Paris', value: 'paris'}],
  }
  const Test = props => <span {...props} />
  const KTest = withKeyboardEvent(Test)
  const tree = shallow(<KTest />, {context: ctx})
  expect(toJson(tree)).toMatchSnapshot()
})
it('test event keyboard', () => {
  const map = {}
  document.addEventListener = jest.fn((event, cb) => {
    map[event] = cb
  })
  const onSelectValue = jest.fn()
  const toggleSelect = jest.fn()
  const clearSearchValue = jest.fn()
  const ctx = {
    onSelectValue,
    toggleSelect,
    clearSearchValue,
    opened: true,
    options: [
      {label: 'Paris', value: 'paris'},
      {label: 'Tokyo', value: 'tokyo'},
      {label: 'Here', value: 'here'},
    ],
  }
  const Test = ({
    setRef,
    currentValue,
    clearSearchValue,
    onSelectValue,
    toggleSelect,
    opened,
    options,
    ...props
  }) => <input {...props} ref={el => setRef(el)} />
  const KTest = withKeyboardEvent(Test)
  mount(<KTest />, {context: ctx})

  map.keydown(evt(40))
  map.keydown(evt(13))
  expect(onSelectValue.mock.calls[0][0]).toEqual({
    label: 'Tokyo',
    value: 'tokyo',
  })
  map.keydown(evt(40))
  map.keydown(evt(38))
  map.keydown(evt(13))
  expect(onSelectValue.mock.calls[1][0]).toEqual({
    label: 'Paris',
    value: 'paris',
  })
  map.keydown(evt(40))
  map.keydown(evt(40))
  map.keydown(evt(13))
  expect(onSelectValue.mock.calls[2][0]).toEqual({
    label: 'Here',
    value: 'here',
  })
  expect(onSelectValue.mock.calls.length).toBe(3)
  expect(toggleSelect.mock.calls.length).toBe(3)
  expect(clearSearchValue.mock.calls.length).toBe(3)
})
