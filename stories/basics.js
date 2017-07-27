import React from 'react'
import PropTypes from 'prop-types'
import {storiesOf} from '@storybook/react'
import {Provider, createComponent} from 'react-fela'
import {compose} from 'recompose'
import 'whatwg-fetch'

import createRenderer from './felaProvider'
import {AsyncSelect, SyncSelect, createSelectComponent, withKeyboardEvent} from '../src'

import simpleOptions from './options'
const fakeApi = query => {
  return fetch(
    query === ''
      ? 'https://jsonplaceholder.typicode.com/users'
      : `https://jsonplaceholder.typicode.com/users?username=${query}`,
  ).then(response => response.json())
}

const renderer = createRenderer()
const enhance = createSelectComponent([
  'caseSensitiveSearch',
  'clearValue',
  'clearOneValue',
  'clearSearchValue',
  'defaultValue',
  'hasSearch',
  'name',
  'multi',
  'options',
  'placeholder',
  'onSelectValue',
  'onChangeSearchValue',
  'opened',
  'selectedValue',
  'searchValue',
  'sourceOptions',
  'toggleCaseSensitive',
  'toggleSearch',
  'toggleSelect',
  'transform',
])

const felaProvider = story =>
  <Provider renderer={renderer}>
    {story()}
  </Provider>

const I = createComponent(
  ({focused}) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 36,
    border: 'none',
    outline: 'none',
    padding: '0 8px',
    backgroundColor: '#FAFAFA',
    fontFamily: 'sans-serif',
    fontSize: 14,
    fontWeight: 'normal',
    zIndex: focused ? 10 : 0,
  }),
  'input',
  ['onChange', 'onClick', 'onFocus', 'onBlur', 'onKeyUp', 'type', 'value'],
)
const L = createComponent(
  ({color}) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 36,
    lineHeight: '36px',
    padding: '0 8px',
    pointerEvents: 'none',
    fontFamily: 'sans-serif',
    fontSize: 14,
    fontWeight: 'normal',
    color,
  }),
  'label',
  ['onClick'],
)
const Toggle = createComponent(
  ({opened}) => ({
    zIndex: 11,
    position: 'absolute',
    top: 0,
    right: 5,
    height: '100%',
    width: 15,
    padding: 0,
    color: '#B3B3B3',
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    padding: 4,
    transition: 'transform .1s ease',
    transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
  'button',
  ['onClick'],
)
const Clear = createComponent(
  () => ({
    zIndex: 11,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 20,
    height: '100%',
    width: 15,
    padding: 0,
    marginTop: -4,
    fontSize: '25px',
    color: '#B3B3B3',
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
  }),
  'button',
  ['onClick'],
)

const Ul = createComponent(() => ({
  fontFamily: 'sans-serif',
  fontSize: 14,
  fontWeight: 'normal',
  backgroundColor: '#FAFAFA',
  borderTop: '1px solid #333',
  borderBottomLeftRadius: 3,
  borderBottomRightRadius: 3,
  overflow: 'auto',
  maxHeight: 200,
}))
const Li = createComponent(
  ({color}) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 38,
    paddingLeft: 8,
    color: color,
    borderBottom: '1px solid #F1F1F1',
    cursor: 'pointer',
    transition: 'all .3s ease-out',
    ':hover': {paddingLeft: 14, color},
  }),
  'div',
  ['onClick'],
)

const SlideIn = createComponent(({opened}) => ({
  overflow: 'hidden',
  height: opened ? 300 : 0,
  transition: 'height .2s ease',
}))
const SearchLabel = enhance(
  ({
    clearSearchValue,
    clearValue,
    hasSearch,
    onChangeSearchValue,
    searchValue,
    toggleCaseSensitive,
    toggleSearch,
    toggleSelect,
    selectedValue,
    placeholder,
    opened,
  }) =>
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 36,
        overflow: 'hidden',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
      }}>
      <I
        type="text"
        focused={hasSearch}
        onFocus={() => {
          if (!opened) toggleSelect(true)
        }}
        onBlur={() => {
          toggleSelect(false)
          toggleSearch(false)
          clearSearchValue()
        }}
        onClick={() => !opened && toggleSelect(true)}
        onKeyUp={e => {
          if (e.keyCode === 8 && searchValue === '') {
            onChangeSearchValue('')
            clearValue(e)
          } else if (searchValue !== '') toggleSearch(true)
        }}
        onChange={e => onChangeSearchValue(e.target.value)}
        value={searchValue}
      />
      <L
        onClick={() => toggleSelect()}
        color={!selectedValue[0] && searchValue === '' ? '#B1B1B1' : '#333'}>
        {selectedValue[0] ? selectedValue[0].label : searchValue === '' ? placeholder : ''}
      </L>
      {selectedValue[0] &&
        <Clear
          onClick={e => {
            onChangeSearchValue('')
            clearValue(e)
          }}
          children={String.fromCharCode(10799)}
        />}
      <Toggle
        onClick={e => {
          toggleSelect()
          e.preventDefault()
          e.stopPropagation()
        }}
        opened={opened}
        children={String.fromCharCode(9660)}
      />
    </div>,
)
class ListC extends React.Component {
  render() {
    const {currentValue, clearSearchValue, onSelectValue, opened, options} = this.props
    return (
      <SlideIn opened={opened}>
        <Ul innerRef={ref => (this.list = ref)}>
          {options.map((o, idx) =>
            <Li
              key={o.label}
              color={idx === currentValue ? 'orange' : '#333'}
              // {...idx === 0 && {innerRef: ref => (this.item = ref)}} can o provide for a specific item to use
              onClick={() => {
                clearSearchValue()
                onSelectValue(o)
              }}>
              {o.label}
            </Li>,
          )}
        </Ul>
      </SlideIn>
    )
  }
}
const List = compose(enhance, withKeyboardEvent)(ListC)

storiesOf('Selectless - Basic', module)
  .addDecorator(felaProvider)
  .add('Basic', () =>
    <SyncSelect
      name="context"
      onChange={(/*data*/) => {}}
      options={simpleOptions}
      style={{width: 300}}>
      <SearchLabel />
      <List />
    </SyncSelect>,
  )
  .add('Async', () =>
    <AsyncSelect
      name="context"
      onChange={(/*data*/) => {}}
      loadOptions={fakeApi}
      transform={data => ({label: data.username, value: data.id.toString()})}
      style={{width: 300}}>
      <SearchLabel />
      <List />
    </AsyncSelect>,
  )
