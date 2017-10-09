import React from 'react'
import PropTypes from 'prop-types'
import {storiesOf} from '@storybook/react'
import 'whatwg-fetch'

import {Clear, Select, Item, Label, Search, List, TagList, Tag} from '../src'
import {
  rendering,
  renderingList,
  renderingItem,
  renderingSearch,
  renderingTag,
  onChange,
} from './utils/dummy'

const createQuery = query =>
  query === ''
    ? 'https://swapi.co/api/people'
    : `https://swapi.co/api/people/?search=${query}`
const fakeApiCb = (query, cb) => fakeApi(query).then(r => cb(null, r))
const fakeApi = query =>
  fetch(createQuery(query))
    .then(response => response.json())
    .then(r => r.results)

const Container = props => <Select.Async {...props} />

storiesOf('Async', module)
  .add('With callback', () =>
    <Container
      name="context"
      onChange={onChange}
      loadOptions={fakeApiCb}
      transform={data => ({label: data.name, value: data.name})}>
      <Label />
      <List renderItem={Item} />
    </Container>
  )
  .add('With promise', () =>
    <Container
      name="context"
      onChange={onChange}
      loadOptions={fakeApi}
      style={{display: 'flex'}}
      transform={data => ({label: data.name, value: data.name})}>
      <div style={{width: 250}}>
        <div style={{flex: 1}}>
          <Search />
        </div>
        <div style={{flex: 1}}>
          <Label />
          <List renderItem={<Item render={renderingItem} />} />
        </div>
      </div>
    </Container>
  )
  .add('With custom debounce', () =>
    <Container
      debounce={1000}
      loadOptions={fakeApi}
      multi
      name="context"
      onChange={onChange}
      transform={data => ({label: data.name, value: data.name})}>
      <div style={{width: 250}}>
        <div style={{flex: 1}}>
          <Search />
        </div>
        <TagList renderTag={Tag} />
        <List renderItem={<Item render={renderingItem} />} />
      </div>
    </Container>
  )
