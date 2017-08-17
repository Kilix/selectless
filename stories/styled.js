import React from 'react'
import styled from 'styled-components'
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

const Gelect = styled(Select)`max-width: 400px;`
const Glear = styled(Clear)`background-color: yellow;`
const Gabel = styled(Label)`
  user-select: none;
  font-size: 1rem;
  color: #232323;
  padding: 5px;
  border: 1px solid #232323;
`
const Gist = styled(List)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  background-color: #F1F1F1;
`
const Gtem = styled(Item)`
  padding: 8px;
  background-color: #E1E1E1;
  cursor: pointer;
  &:hover {
		background-color: #FAFAFA;
	}
  `

const GagList = styled(TagList)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 5px;
  border: 1px solid #232323;
`
const Gag = styled(Tag)`
  padding: 8px;
  margin: 0 4px;
  background-color: #E1E1E1;
  cursor: pointer;
  &:hover {
		background-color: #92FAFA;
	}
`
const Placeholder = styled.div`
  padding: 8px;
  margin: 0 4px;
  cursor: pointer;
`

storiesOf('Styled-components', module)
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
