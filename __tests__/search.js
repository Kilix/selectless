import React from 'react'
import renderer from 'react-test-renderer'

import Select from '../src/'
import Search from '../src/components/search'

const options = [{label: 'Paris', value: 'paris'}, {label: 'Tokyo', value: 'tokyo'}]
it('Search', () => {
  const tree = renderer
    .create(
      <Select name="search" options={options}>
        <Search />
      </Select>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
