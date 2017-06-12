/* eslint-disable */
import React from 'react'
import {storiesOf} from '@storybook/react'

import {SimpleSelect} from '../src'
import {Clear, Container, Item, Label, List} from './components'

const simpleOptions = [
  {value: 'paris', label: 'Paris'},
  {value: 'newyork', label: 'New-York'},
  {value: 'tokyo', label: 'Tokyo'},
]

storiesOf('Simple Select', module)
  .add('Basic', () =>
    <SimpleSelect {...{Container, Label, List, Item}} name="simple" options={simpleOptions} />,
  )
  .add('Placeholder', () =>
    <SimpleSelect
      {...{Container, Label, List, Item}}
      name="simple"
      placeholder="Choose a city"
      options={simpleOptions}
    />,
  )
  .add('Clearable', () =>
    <SimpleSelect
      {...{Container, Label, List, Item, Clear}}
      name="simple"
      clearable
      options={simpleOptions}
    />,
  )
  .add('With Element', () =>
    <SimpleSelect
      Container={<Container />}
      Label={<Label />}
      List={<List />}
      Item={<Item />}
      name="simple"
      options={simpleOptions}
    />,
  )
