import React from 'react'

export const rendering = ({placeholder, value}) =>
  <strong>{value ? value.label : placeholder}</strong>
export const renderingList = ({opened, items}) =>
  <div><h2>My Custom List</h2>{opened ? items : 'Empty list'}</div>
export const renderingItem = ({data, isSelected, onSelectValue}) =>
  <i
    onClick={() => onSelectValue(data)}
    style={{display: 'block', color: isSelected ? 'red' : 'black'}}>
    {data.label}
  </i>
export const renderingSearch = ({
  caseSensitive,
  clearSearchValue,
  clearValue,
  searchValue,
  toggleSearch,
  toggleSelect,
  onFocus,
  ...props
}) =>
  <div onClick={onFocus}>
    <input style={{backgroundColor: 'red'}} type="text" {...props} />
  </div>
export const renderingTag = ({tag, clear}) =>
  <div>
    <span>{tag.label}</span>
    <button onClick={clear}>Clear</button>
  </div>
export const onChange = () => {}
