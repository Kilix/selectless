import React from 'react'
import PropTypes from 'prop-types'
import {storiesOf} from '@storybook/react'

import {Clear, ContextSelect, Item, bindLabel, Search, List, TagList, Tag} from '../src'

const simpleOptions = [
  {value: 'paris', label: 'Paris'},
  {value: 'newyork', label: 'New-York'},
  {value: 'tokyo', label: 'Tokyo'},
]

const Container = props => <div {...props} />
const CLabel = bindLabel(<label />)

const rendering = ({placeholder, value}) => <strong>{value ? value.label : placeholder}</strong>
const renderingList = ({opened, items}) =>
  <div><h2>My Custom List</h2>{opened ? items : 'Empty list'}</div>
const renderingItem = ({data, isSelected, onSelectValue}) =>
  <i onClick={() => onSelectValue(data)} style={{color: isSelected ? 'red' : 'black'}}>
    {data.label}
  </i>
const renderingSearch = ({onFocus, ...props}) =>
  <div onClick={onFocus}>
    <input style={{backgroundColor: 'red'}} type="text" {...props} />
  </div>
const renderingTag = ({tag, clear}) =>
  <div>
    <span>{tag.label}</span>
    <button onClick={clear}>Clear</button>
  </div>

storiesOf('Selectless - Sync', module)
  .add('Basic', () =>
    <ContextSelect name="context" options={simpleOptions}>
      <Container>
        <CLabel />
        <List renderItem={Item} />
      </Container>
    </ContextSelect>,
  )
  .add('Custom placeholder', () =>
    <ContextSelect name="context" options={simpleOptions} placeholder="Select a city">
      <Container>
        <CLabel />
        <List renderItem={Item} />
      </Container>
    </ContextSelect>,
  )
  .add('Custom Label', () =>
    <ContextSelect name="context" options={simpleOptions}>
      <Container>
        <CLabel render={rendering} />
        <List renderItem={Item} />
      </Container>
    </ContextSelect>,
  )
  .add('Custom List', () =>
    <ContextSelect name="context" options={simpleOptions}>
      <Container>
        <CLabel />
        <List render={renderingList} renderItem={Item} />
      </Container>
    </ContextSelect>,
  )
  .add('Custom Item', () =>
    <ContextSelect name="context" options={simpleOptions}>
      <Container>
        <CLabel />
        <List renderItem={<Item render={renderingItem} />} />
      </Container>
    </ContextSelect>,
  )
  .add('With Clear', () =>
    <ContextSelect name="context" options={simpleOptions}>
      <Container>
        <div>
          <Clear />
          <br />
          <Clear label="Custom clear" render={(label, props) => <i {...props}>{label}</i>} />
        </div>
        <CLabel />
        <List renderItem={Item} />
      </Container>
    </ContextSelect>,
  )
  .add('With Search', () =>
    <ContextSelect name="context" options={simpleOptions}>
      <Container style={{display: 'flex'}}>
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
          <CLabel />
          <List renderItem={<Item render={renderingItem} />} />
        </div>
      </Container>
    </ContextSelect>,
  )
  .add('Multi', () =>
    <ContextSelect multi name="context" options={simpleOptions}>
      <Container>
        <TagList renderTag={Tag} />
        <List renderItem={Item} />
      </Container>
    </ContextSelect>,
  )
  .add('Multi Custom Tag', () =>
    <ContextSelect multi name="context" options={simpleOptions}>
      <Container>
        <TagList renderTag={<Tag render={renderingTag} />} />
        <List renderItem={Item} />
      </Container>
    </ContextSelect>,
  )
