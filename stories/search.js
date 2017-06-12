/* eslint-disable */
import React from 'react'
import {storiesOf} from '@storybook/react'

import {SimpleSelect, withSearch, createInput} from '../src'
import {Clear, Container, Item, Label, List, Search} from './components'

const simpleOptions = [
  {value: 'paris', label: 'Paris'},
  {value: 'newyork', label: 'New-York'},
  {value: 'tokyo', label: 'Tokyo'},
]

const SearchSelect = withSearch(Search)(SimpleSelect)

storiesOf('Search Select', module)
  .add('Case sensitive', () =>
    <SearchSelect
      {...{Container, Label, List, Item}}
      options={simpleOptions}
      name="simple"
      caseSensitiveSearch
    />,
  )
  .add('Not case sensitive', () =>
    <SearchSelect {...{Container, Label, List, Item}} options={simpleOptions} name="simple" />,
  )
