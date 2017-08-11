import React from 'react'
import PropTypes from 'prop-types'
import {storiesOf} from '@storybook/react'
import {Provider, createComponentWithProxy} from 'react-fela'

import createRenderer from './utils/felaProvider'
import simpleOptions from './utils/options'
import {
  Clear,
  Select,
  Item,
  Label,
  Search,
  List,
  TagList,
  Tag,
  controller,
} from '../src'

const renderer = createRenderer()

const felaProvider = story =>
  <Provider renderer={renderer}>
    {story()}
  </Provider>

const SelectContainer = createComponentWithProxy(() => ({
  backgroundColor: '#fff',
  borderColor: '#d9d9d9 #ccc #b3b3b3',
  borderRadius: '4px',
  border: '1px solid #ccc',
  color: '#333',
  cursor: 'default',
  display: 'table',
  borderSpacing: '0',
  borderCollapse: 'separate',
  height: '36px',
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  fontFamily: 'sans-serif',
  fontWeight: 'normal',
  width: '100%',
}))

const Fabel = createComponentWithProxy(
  () => ({
    zIndex: 9,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 36,
    padding: 8,
    fontSize: '16px',
    color: '#333',
  }),
  Label,
)

const Flear = createComponentWithProxy(
  () => ({
    zIndex: 12,
    position: 'absolute',
    top: 0,
    right: 15,
    height: 36,
    lineHeight: '36px',
    opacity: 0.3,
    cursor: 'pointer',
    transition: 'opacity .3s ease-out',
    ':hover': {
      opacity: 1,
    },
  }),
  Clear,
)

const Fearch = ({
  caseSensitive,
  clearSearchValue,
  clearValue,
  onChange,
  toggleSearch,
  toggleSelect,
  value,
}) =>
  <FFF
    type="text"
    role="combobox"
    onChange={e => {
      if (e.target.value !== '') clearValue(e)
      onChange(e)
    }}
    onKeyUp={e => {
      if (e.keyCode === 8 && value === '') {
        toggleSelect(true)
        clearValue(e)
      }
      if (e.keyCode === 40) {
        toggleSelect(true)
      }
    }}
    onClick={() => toggleSelect()}
    value={value}
  />

const FFF = createComponentWithProxy(
  () => ({
    zIndex: 8,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 36,
    fontSize: '16px',
    outline: 'none',
    border: 'none',
    padding: 8,
    color: '#333',
  }),
  'input',
)

const Fist = createComponentWithProxy(
  () => ({
    zIndex: 15,
    position: 'relative',
    top: -2,
    width: '100%',
    maxHeight: 150,
    overflow: 'auto',
    backgroundColor: '#fff',
    color: '#333',
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
    borderRadius: '0 0 4px 4px',
    border: '1px solid #ccc',
    borderColor: '#d9d9d9 #ccc #b3b3b3',
  }),
  List,
)

const Ftem = createComponentWithProxy(
  ({isSelected, isCurrent}) => ({
    padding: 8,
    cursor: 'pointer',
    backgroundColor: isSelected || isCurrent ? '#232323' : '#FFF',
    color: '#B3B3B3',
    transition: 'all .3s ease-out',
    ':hover': {
      color: '#333',
      backgroundColor: '#D9D9D9',
    },
  }),
  Item,
)

storiesOf('Selectless - Fela', module)
  .addDecorator(felaProvider)
  .add('Basic callback', () =>
    <div style={{width: 300, margin: '0 auto'}}>
      <Select
        name="context"
        onChange={() => {}}
        options={simpleOptions}
        placeholder=""
        clearSearchOnSelect>
        <SelectContainer>
          <Fabel />
          <Flear />
          <Search render={Fearch} />
        </SelectContainer>
        <Fist renderItem={Ftem} />
      </Select>
    </div>,
  )
