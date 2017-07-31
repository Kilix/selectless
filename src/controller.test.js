import React from 'react'
import renderer from 'react-test-renderer'

import {SyncSelect} from './'
import controller from './controller'

test('should return all context', () => {
  const enhance = controller()
  const Test = props => (
    expect(Object.keys(props)).toEqual([
      'caseSensitiveSearch',
      'clearValue',
      'clearOneValue',
      'clearSearchValue',
      'defaultValue',
      'hasSearch',
      'name',
      'multi',
      'options',
      'placeholder',
      'onSelectValue',
      'onChangeSearchValue',
      'opened',
      'selectedValue',
      'searchValue',
      'sourceOptions',
      'toggleCaseSensitive',
      'toggleSearch',
      'toggleSelect',
      'transform',
    ]),
    <div />
  )
  const STest = enhance(Test)
  const component = renderer.create(
    <SyncSelect name="test" options={[{value: 0, label: 'Test'}]}><STest /></SyncSelect>,
  )
})

test('should pass only selected props', () => {
  const enhance = controller(['name', 'opened'])
  const Test = props => (expect(Object.keys(props)).toEqual(['name', 'opened']), <div />)
  const STest = enhance(Test)
  const component = renderer.create(
    <SyncSelect name="test" options={[{value: 0, label: 'Test'}]}><STest /></SyncSelect>,
  )
})
