import React from 'react'
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

const Container = props => <Select {...props} />

storiesOf('Sync', module)
  .add('Basic', () =>
    <Container name="context" onChange={onChange} options={simpleOptions}>
      <Label />
      <List renderItem={Item} />
    </Container>
  )
  .add('Basic without close on blur', () =>
    <div>
      <button
        onClick={() => {
          alert('test event bubble')
        }}>
        Grekg
      </button>
      <Container
        name="context"
        onChange={onChange}
        options={simpleOptions}
        closeOnBlur={false}>
        <Label />
        <List renderItem={Item} />
      </Container>
    </div>
  )
  .add('Stay open', () =>
    <Container
      name="context"
      onChange={onChange}
      options={simpleOptions}
      stayOpenOnSelect>
      <Label />
      <List renderItem={Item} />
    </Container>
  )
  .add('Default value', () =>
    <Container
      name="context"
      onChange={onChange}
      options={simpleOptions}
      defaultValue={{label: 'Paris', value: 'paris'}}>
      <Label />
      <List renderItem={Item} />
    </Container>
  )
  .add('Custom placeholder', () =>
    <Container
      name="context"
      onChange={onChange}
      options={simpleOptions}
      placeholder="Select a city">
      <Label />
      <List renderItem={Item} />
    </Container>
  )
  .add('Custom Label', () =>
    <Container name="context" onChange={onChange} options={simpleOptions}>
      <Label render={rendering} />
      <List renderItem={Item} />
    </Container>
  )
  .add('Custom List', () =>
    <Container name="context" onChange={onChange} options={simpleOptions}>
      <Label />
      <List render={renderingList} renderItem={Item} />
    </Container>
  )
  .add('Custom Item', () =>
    <Container name="context" onChange={onChange} options={simpleOptions}>
      <Label />
      <List renderItem={<Item render={renderingItem} />} />
    </Container>
  )
  .add('With Clear', () =>
    <Container name="context" onChange={onChange} options={simpleOptions}>
      <div>
        <Clear />
        <br />
        <Clear
          label="Custom clear"
          render={({label, clearValue}) =>
            <i onClick={clearValue}>
              {label}
            </i>}
        />
      </div>
      <Label />
      <List renderItem={Item} />
    </Container>
  )
  .add('With Search', () =>
    <Container
      name="context"
      onChange={onChange}
      options={simpleOptions}
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
    </Container>
  )
  .add('Multi', () =>
    <Container multi name="context" onChange={onChange} options={simpleOptions}>
      <TagList renderTag={Tag} />
      <List renderItem={Item} />
    </Container>
  )
  .add('Multi Custom Tag', () =>
    <Container multi name="context" onChange={onChange} options={simpleOptions}>
      <TagList renderTag={<Tag render={renderingTag} />} />
      <List renderItem={Item} />
    </Container>
  )
