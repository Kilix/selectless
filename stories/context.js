/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import {storiesOf} from '@storybook/react'

import {ContextSelect, bindItem, bindLabel, bindList} from '../src'
import {Container} from './components'

const simpleOptions = [
  {value: 'paris', label: 'Paris'},
  {value: 'newyork', label: 'New-York'},
  {value: 'tokyo', label: 'Tokyo'},
]

const CLabel = bindLabel(({placeholder, selectedValue, ...props}) =>
  <label {...props} style={{userSelect: 'none'}}>
    {selectedValue ? selectedValue.label : placeholder}
  </label>,
)

const CList = bindList(props => <div {...props} />)
const CItem = bindItem(({data, ...props}) => <div {...props}>{data.label}</div>)

storiesOf('Context', module).add('Basic', () =>
  <ContextSelect placeholder="Select a city" name="context" options={simpleOptions}>
    <Container>
      <CLabel />
      <CList renderItem={CItem} />
    </Container>
  </ContextSelect>,
)
