/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import {storiesOf} from '@storybook/react'

import {ContextSelect, bindItem, bindLabel, bindList, bindSearch} from '../src'

const simpleOptions = [
  {value: 'paris', label: 'Paris'},
  {value: 'newyork', label: 'New-York'},
  {value: 'tokyo', label: 'Tokyo'},
]

const Container = props => <div {...props} />
const CLabel = bindLabel(<label />)
const CList = bindList(<div />)
const CItem = bindItem(<div />)
const CSearch = bindSearch(<div />)

const rendering = ({placeholder, value}) => <strong>{value ? value.label : placeholder}</strong>
const renderingList = ({List, opened, items}) =>
  opened ? React.cloneElement(List, {}, items) : null
const renderingItem = ({data}) => <i>{data.label}</i>

// Can use
// <CLabel renderChild={({placeholder, value}) => (value ? value.label : placeholder)} />
// <CList renderItem={<CItem renderChild={data => data.value} />} />

storiesOf('Context', module)
  .add('Basic', () =>
    <ContextSelect placeholder="Select a city" name="context" options={simpleOptions}>
      <Container>
        <CLabel />
        <CList renderItem={CItem} />
      </Container>
    </ContextSelect>,
  )
  .add('Custom Label', () =>
    <ContextSelect placeholder="Select a city" name="context" options={simpleOptions}>
      <Container>
        <CLabel renderChild={rendering} />
        <CList renderItem={CItem} />
      </Container>
    </ContextSelect>,
  )
  .add('Custom List', () =>
    <ContextSelect placeholder="Select a city" name="context" options={simpleOptions}>
      <Container>
        <CLabel />
        <CList renderList={renderingList} renderItem={CItem} />
      </Container>
    </ContextSelect>,
  )
  .add('Custom Item', () =>
    <ContextSelect placeholder="Select a city" name="context" options={simpleOptions}>
      <Container>
        <CLabel />
        <CList renderItem={<CItem renderChild={renderingItem} />} />
      </Container>
    </ContextSelect>,
  )
  .add('With Search', () =>
    <ContextSelect placeholder="Select a city" name="context" options={simpleOptions}>
      <Container>
        <CLabel />
        <CSearch />
        <CList renderItem={<CItem renderChild={renderingItem} />} />
      </Container>
    </ContextSelect>,
  )
