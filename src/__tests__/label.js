import React from 'react'
import renderer from 'react-test-renderer'

import Select from '../'
import Label from '../components/label'

const options = [{label: 'Paris', value: 'paris'}, {label: 'Tokyo', value: 'tokyo'}]

it('Label', () => {
  const tree = renderer
    .create(
      <Select name="label" options={options}>
        <Label />
      </Select>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
