import React from 'react'
import renderer from 'react-test-renderer'

import Select from '../src/'
import TagList from '../src/components/tagList'
import Tag from '../src/components/tag'

const options = [{label: 'Paris', value: 'paris'}, {label: 'Tokyo', value: 'tokyo'}]

it('TagList', () => {
  const tree = renderer
    .create(
      <Select multi name="taglist" options={options} defaultValue={options[0]}>
        <TagList renderTag={Tag} />
      </Select>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
it('TagList custom Tag', () => {
  const tree = renderer
    .create(
      <Select multi name="taglist" options={options} defaultValue={options[0]}>
        <TagList renderTag={<Tag render={() => <div />} />} />
      </Select>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
