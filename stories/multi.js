/* eslint-disable */
import React from 'react'
import {storiesOf} from '@storybook/react'

import {SimpleSelect} from '../src'
import {Clear, Container, Item, List, Tag, TagContainer} from './components'

const simpleOptions = [
  {value: 'paris', label: 'Paris'},
  {value: 'newyork', label: 'New-York'},
  {value: 'tokyo', label: 'Tokyo'},
]

storiesOf('Multi Select', module)
  .add('Basic', () =>
    <SimpleSelect
      {...{Container, TagContainer, Tag, List, Item}}
      multi
      name="multi"
      options={simpleOptions}
    />,
  )
  .add('Placeholder', () =>
    <SimpleSelect
      {...{Container, TagContainer, Tag, List, Item}}
      multi
      name="multi"
      options={simpleOptions}
      placeholder="Select a city"
    />,
  )
  .add('Clearable', () =>
    <SimpleSelect
      {...{Container, TagContainer, Tag, List, Item, Clear}}
      multi
      clearable
      name="multi"
      options={simpleOptions}
    />,
  )
