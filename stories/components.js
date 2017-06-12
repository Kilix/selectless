/* eslint-disable */
import React from 'react'

const listStyle = {
  margin: 0,
  padding: 0,
  listStyle: 'none',
}

export const Clear = ({clearValue}) => <button onClick={clearValue}>Clear</button>

export const Container = props => <div {...props} />

export const List = ({opened, ...props}) => {
  return opened ? <ul style={listStyle} {...props} /> : null
}
export const Item = ({data, changeSelectValue}) =>
  <li onClick={() => changeSelectValue(data)}>{data.label}</li>

export const Search = ({value, changeSearchValue, toggleSelect}) =>
  <input
    type="text"
    name="search"
    value={value}
    onChange={e => changeSearchValue(e.target.value)}
    onFocus={() => toggleSelect(true)}
  />

export const Tag = ({clearValue, data}) =>
  <label style={{userSelect: 'none'}} onClick={clearValue}>
    {data.label}
  </label>

export const TagContainer = ({toggleSelect, ...props}) =>
  <div onClick={() => toggleSelect()} {...props} />

export const Label = ({clearValue, toggleSelect, placeholder, selectedValue}) =>
  <label onClick={toggleSelect} style={{userSelect: 'none'}}>
    {selectedValue ? selectedValue.label : placeholder}
  </label>
