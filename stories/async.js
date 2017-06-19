import React from 'react'
import PropTypes from 'prop-types'
import {storiesOf} from '@storybook/react'
import 'whatwg-fetch'

import {Clear, AsyncSelect, Item, Label, Search, List, TagList, Tag} from '../src'

const simpleOptions = (query, cb) => {
  setTimeout(function() {
    const opts = [
      {value: 'paris', label: 'Paris'},
      {value: 'newyork', label: 'New-York'},
      {value: 'tokyo', label: 'Tokyo'},
    ]
    cb(null, opts.filter(o => o.label.indexOf(query) !== -1))
  }, 1000)
}

const fakeApi = query => {
  return fetch(
    query === ''
      ? 'https://jsonplaceholder.typicode.com/users'
      : `https://jsonplaceholder.typicode.com/users?username=${query}`,
  ).then(response => response.json())
}

const Container = props => <AsyncSelect {...props} />

const rendering = ({placeholder, value}) => <strong>{value ? value.label : placeholder}</strong>
const renderingList = ({opened, items}) =>
  <div><h2>My Custom List</h2>{opened ? items : 'Empty list'}</div>
const renderingItem = ({data, isCurrent, isSelected, onSelectValue}) =>
  <span
    onClick={() => onSelectValue(data)}
    style={{
      display: 'block',
      padding: 5,
      backgroundColor: isCurrent ? 'rgba(0, 0, 0, .2)' : 'transparent',
      color: isSelected ? 'red' : 'black',
    }}>
    {data.label}
  </span>
const renderingSearch = ({onFocus, ...props}) =>
  <div onClick={onFocus}>
    <input style={{backgroundColor: 'red'}} type="text" {...props} />
  </div>
const renderingTag = ({tag, clear}) =>
  <div>
    <span>{tag.label}</span>
    <button onClick={clear}>Clear</button>
  </div>

const onChange = () => {}

storiesOf('Selectless - ASync', module)
  .add('Basic callback', () =>
    <Container name="context" onChange={onChange} loadOptions={simpleOptions}>
      <Label />
      <List renderItem={Item} />
    </Container>,
  )
  .add('With Search', () =>
    <Container
      name="context"
      onChange={onChange}
      loadOptions={simpleOptions}
      style={{display: 'flex'}}>
      <div style={{flex: 1}}>
        <div>
          <label>not caseSensitive - default render</label>
          <div>
            <Search />
          </div>
        </div>
        <div>
          <label>caseSensitive - custom render</label>
          <Search caseSensitive render={renderingSearch} />
        </div>
      </div>
      <div style={{flex: 1}}>
        <Label />
        <List renderItem={<Item render={renderingItem} />} />
      </div>
    </Container>,
  )
  .add('Simple - fake api', () =>
    <Container
      name="context"
      onChange={onChange}
      loadOptions={fakeApi}
      style={{display: 'flex'}}
      transform={option => ({label: option.username, value: option.id})}>
      <div style={{flex: 1}}>
        <Search />
      </div>
      <div style={{flex: 1}}>
        <Label />
        <List renderItem={<Item render={renderingItem} />} />
      </div>
    </Container>,
  )
  .add('Multi', () =>
    <Container
      multi
      name="context"
      onChange={onChange}
      loadOptions={fakeApi}
      transform={option => ({label: option.username, value: option.id})}>
      <TagList renderTag={Tag} />
      <List renderItem={Item} />
    </Container>,
  )
  .add('Multi - Search', () =>
    <Container
      loadOptions={fakeApi}
      multi
      name="context"
      onChange={onChange}
      stayOpenOnSelect
      transform={option => ({label: option.username, value: option.id})}>
      <div style={{flex: 1}}>
        <Search />
      </div>
      <TagList renderTag={Tag} />
      <List renderItem={<Item render={renderingItem} />} />
    </Container>,
  )
  .add('Multi - Search - Debounce', () =>
    <Container
      debounce={1000}
      loadOptions={fakeApi}
      multi
      name="context"
      onChange={onChange}
      transform={option => ({label: option.username, value: option.id})}>
      <div style={{flex: 1}}>
        <Search />
      </div>
      <TagList renderTag={Tag} />
      <List renderItem={<Item render={renderingItem} />} />
    </Container>,
  )
