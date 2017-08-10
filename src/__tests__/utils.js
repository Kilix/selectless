/* global it, expect */

import React from 'react'

import { renderOrCloneComponent, closestAvailable } from '../utils'

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
  const Item = renderOrCloneComponent(Test, { color: 'red' }, [])
  expect(React.isValidElement(Item)).toBe(true)
  expect(Item.props.color).toBe('red')
})
