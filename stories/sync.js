import React from 'react'
import PropTypes from 'prop-types'
import {storiesOf} from '@storybook/react'

import {
  controller,
  Clear,
  Select,
  Item,
  Label,
  Search,
  List,
  TagList,
  Tag,
} from '../src'
import {renderOrCloneComponent} from '../src/utils'
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

const simpleOptionsWithId = [
  {id: 'paris', label: 'Paris'},
  {id: 'newyork', label: 'New-York'},
  {id: 'tokyo', label: 'Tokyo'},
]

const Container = props => <Select {...props} />
const StatefulDisabled = BaseComponent => {
  class Stateful extends React.Component {
    state = {disabled: false}
    _setDisabled = e => this.setState({disabled: e.target.checked})
    render() {
      return (
        <div>
          <label htmlFor="disabled">Disabled: </label>
          <input
            id="disabled"
            name="disabled"
            type="checkbox"
            value={this.state.disabled}
            onChange={this._setDisabled}
          />
          <BaseComponent disabled={this.state.disabled} />
        </div>
      )
    }
  }
  return <Stateful />
}
const StatefulChangeOptions = BaseComponent => {
  class Stateful extends React.Component {
    state = {fill: true}
    _setFill = e => this.setState({fill: e.target.checked})
    render() {
      return (
        <div>
          <label htmlFor="fill">Fill: </label>
          <input
            id="fill"
            name="fill"
            type="checkbox"
            value={this.state.fill}
            onChange={this._setFill}
          />
          <BaseComponent options={this.state.fill ? simpleOptions : []} />
        </div>
      )
    }
  }
  return <Stateful />
}

storiesOf('Sync', module)
  .add('Basic', () =>
    <Container name="context" onChange={onChange} options={simpleOptions}>
      <Label />
      <List renderItem={Item} />
    </Container>
  )
  .add('Basic withCustom Key', () =>
    <Container
      name="context"
      onChange={onChange}
      options={simpleOptionsWithId}
      referenceKey="id">
      <Label />
      <List renderItem={Item} />
    </Container>
  )
  .add('Basic changing options', () =>
    StatefulChangeOptions(props =>
      <Container
        name="context"
        onChange={onChange}
        style={{display: 'flex'}}
        {...props}>
        <div style={{flex: 1}}>
          <Label />
          <List renderItem={<Item render={renderingItem} />} />
        </div>
      </Container>
    )
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
  .add('Basic disabled', () =>
    <Container
      disabled
      name="context"
      onChange={onChange}
      options={simpleOptions}>
      <Label />
      <List renderItem={Item} />
    </Container>
  )
  .add('Search disabled', () =>
    StatefulDisabled(props =>
      <Container
        name="context"
        onChange={onChange}
        options={simpleOptions}
        style={{display: 'flex'}}
        {...props}>
        <div style={{flex: 1}}>
          <Clear
            label="Clear"
            render={({clearValue, label, disabled}) =>
              <button disabled={disabled} onClick={clearValue}>
                {label}
              </button>}
          />
          <br />
          <Search />
          <Label
            render={props =>
              <div style={{color: props.disabled ? '#A7A7A7' : 'black'}}>
                {props.value ? props.value.label : props.placeholder}
              </div>}
          />
          <List renderItem={<Item render={renderingItem} />} />
        </div>
      </Container>
    )
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
      defaultValue={simpleOptions[1]}>
      <Label />
      <List
        renderItem={
          <Item
            render={props =>
              <div
                style={{
                  backgroundColor: props.isSelected ? 'red' : 'transparent',
                }}
                onClick={() => props.onSelectValue(props.data)}
                children={props.data.value}
              />}
          />
        }
      />
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
