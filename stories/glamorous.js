import React from 'react'
import glamorous from 'glamorous'
import PropTypes from 'prop-types'
import {storiesOf} from '@storybook/react'

import {Clear, Select, Item, Label, Search, List, TagList, Tag} from '../src'
import {
  rendering,
  renderingList,
  renderingItem,
  renderingSearch,
  renderingTag,
  onChange,
} from './utils/dummy'

const simpleOptions = [
  {value: 'paris', label: 'Paris'},
  {value: 'newyork', label: 'New-York'},
  {value: 'tokyo', label: 'Tokyo'},
]

const Gelect = glamorous(Select)({maxWidth: 400})
const Glear = glamorous(Clear)({backgroundColor: 'yellow'})
const Gabel = glamorous(Label)({
  userSelect: 'none',
  fontSize: '1rem',
  color: '#232323',
  padding: 5,
  border: '1px solid #232323',
})
const Gist = glamorous(List)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'stretch',
  backgroundColor: '#F1F1F1',
})
const Gtem = glamorous(Item)({
  padding: 8,
  backgroundColor: '#E1E1E1',
  cursor: 'pointer',
  ':hover': {backgroundColor: '#FAFAFA'},
})

const GagList = glamorous(TagList)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: 5,
  border: '1px solid #232323',
})
const Gag = glamorous(Tag)({
  padding: 8,
  margin: '0 4px',
  backgroundColor: '#E1E1E1',
  cursor: 'pointer',
  ':hover': {backgroundColor: '#92FAFA'},
})
const Placeholder = glamorous.div({
  padding: 8,
  margin: '0 4px',
  cursor: 'pointer',
})

storiesOf('Glamorous', module)
  .add('Basic', () =>
    <Gelect name="context" onChange={onChange} options={simpleOptions}>
      <Gabel />
      <Gist renderItem={Gtem} />
    </Gelect>
  )
  .add('Multi', () =>
    <Gelect
      multi
      name="multi"
      onChange={onChange}
      options={simpleOptions}
      placeholder={<Placeholder>Selectless Powerness</Placeholder>}>
      <GagList renderTag={Gag} />
      <Gist renderItem={Gtem} />
    </Gelect>
  )
