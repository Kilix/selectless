<h1 align="center">
  Selectless
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">Custom Select without predefined UI for React using Context</p>

## Install

```
  yarn add selectless
  npm install selectless
```

## Documentation

### Introduction
There are three different ways to use `selectless`:

- On a component level, `selectless` provides a basic component that you can customize with any css-in-js library or classname/style
- On a custom component level, each component provided by `selectless` accepts a custom `render` prop that allows you to override the default representation/binding of the component
- On a low level controller, `selectless` provides an HOC that lets you pass down the context props of `selectless` as props to your component. This allow a full control on how you want to use `selectless`.

I hope in a near future that me and/or the community can provide pre-styleds for the various css-in-js solutions existing out there.

## Inspiration
This package was inspired by the great `react-select` and the talk from Ryan Florence ["Compound Components"](https://www.youtube.com/watch?v=hEGg-3pIHlE)

## Other Solutions

#### [Downshift](https://github.com/paypal/downshift)
There was no real solution for this problem when I started this project, then [Kent C. Dodds](https://github.com/kentcdodds/) released react-autocompletly (now downshift) that uses the same basic principles and try to solve the same problem.
I started working on this a bit earlier but I got lazy and put the project aside.
Anyway, right now his project has far more support so you should consider testing it too. :)

#### [React-select](http://jedwatson.github.io/react-select/)
React-select is still really good.

### Basic Usage
```javascript
// src/components/customSelect.js

import React from 'react'
import {Select, Item, Label, List} from 'selectless'

const simpleOptions = [
  {value: 'paris', label: 'Paris'},
  {value: 'newyork', label: 'New-York'},
  {value: 'tokyo', label: 'Tokyo'},
]

const CustomSelect = (props) => (
  <Select name="context" onChange={onChange} options={simpleOptions} {...props}>
    <Label />
    <List renderItem={Item} />
  </Select>
)

export default CustomSelect

```

### Components

#### Select / Select.Async
Select is the Container Component, it's the one creating the context and handling all the logic. It's accepting a lot of props :

| property              | type            | required | default             | description                                                     | parameters                    |
|-----------------------|-----------------|----------|---------------------|-----------------------------------------------------------------|-------------------------------|
| `className`           | `string`        |    no    |          -          | className for styling (React prop)                              |                               |
| `clearOneValue`       | `function`      |    no    |          -          | Override the function use to clear one value in a multi select  | clearedOption, selectedValue  |
| `clearSearchOnSelect` | `boolean`       |    no    |        false        | Allow to clear the search value when a value is selected        |                               |
| `defaultValue`        | `Option`        |    no    |          -          | The value selected by default                                   |                               |
| `name`                | `string`        |    yes   |          -          | name of the component for the input in the form                 |                               |
| `multi`               | `boolean`       |    no    |        false        | Define if it's a multi select or not                           |                               |
| `onChange`            | `function`      |    no    |          -          | Called when the value if changed, usefull for state management  | selected Option(s)            |
| `placeholder`         | `string`        |    no    | "Select an options" | Placeholder for the select label                                |                               |
| `renderInputs`        | `function`      |    no    |          -          | Override the function used to render the inputs in the DOM      | selectedOption, name          |
| `stayOpenOnSelect`    | `boolean`       |    no    |        false        | Allow to let the list open after a value is selected            |                               |
| `style`               | `Object`        |    no    |          -          | style the component (React prop)                                |                               |
| `transform`           | `function`      |    no    |          -          | Function used to format/transform the options                    | Option                        |
| `options`             | `Array[Option]` |    yes   |          -          | Array of the options (Sync Select only)                         |                               |
| `loadOptions`         | `function`      |    yes   |          -          | function that returns an array of options (Select.Async only)    | query, callback               |

`Option` Type is an Object with 2 required props :

| property              | type            | description                                                                                  |
|-----------------------|-----------------|----------------------------------------------------------------------------------------------|
| `label`               | `string`        | label for the options and label components                                                   |
| `value`               | `any`           | value used for the input of the Select                                                       |

The Option type above is the default used by `selectless`, if you need to change the format and the props, don't forget to change the functions `clearOneValue` and `renderInputs`.

The loadOptions in the case of the `Select.Async`is also used for the Search. It receives the search value (query) and a callback to send the new set of options. You can return a promise instead of using the callback:

```javascript
  const createQuery =
    query => query === ''
      ? 'https://swapi.co/api/people'
      : `https://swapi.co/api/people/?search=${query}`

  const fakeApi = query =>
    fetch(createQuery(query))
      .then(response => response.json())
      .then(r => r.results)

  const fakeApiCb = (query, cb) =>
    fakeApi(query)
    .then(r => cb(null, r.results))

```

#### Predefined Components
Every Component below will receive the props you passed down. Plus it accepts a few `selectless` specific props :

| property  | type       | description                                     |
|-----------|------------|-------------------------------------------------|
| `render`  | `function` | Allow to overwrite the render of the component  |

The parameters received by the render function depends for each components.
To know the parameters and return value of each function/props passed by the context of `selectless` please refer to the `controller` in the HOC section.

#### Clear
The default component is a `<span>` with an `onClick` bind to `clearValue`.

| property  | type                                                         | default | description                |
|-----------|--------------------------------------------------------------|---------|----------------------------|
| `label`   | `string`                                                     | 'Clear' | Text for the clear's span  |
| `render`  | `({clearValue: function, label: string}) => ReactElement<*>` |  -      | -                          |


#### Item
The default component is a `<div>` with an `onClick` bind to `onSelectValue`.

| property     | type/description                                                                                        |
|--------------|---------------------------------------------------------------------------------------------------------|
| `currentRef` | function use for React reference                                                                        |
| `render`     | `({data: Option, isCurrent: boolean, isSelected: boolean, onSelectValue: function}) => ReactElement<*>` |

#### Label
The default component is a `<div>` with an `onClick` bind to `toggleSelect`.

| property  | type/description                                                                                     |
|-----------|------------------------------------------------------------------------------------------------------|
| `render`  | `({opened: boolean, placeholder: string, toggleSelect: function, value: Option}) => ReactElement<*>` |

#### List
The default component is a `<div>`.

| property     | type/description                                                                           |
|--------------|--------------------------------------------------------------------------------------------|
| `setRef`     | function used for React reference                                                           |
| `renderItem` | the React Component used to render the items list                                           |
| `render`     | `({opened: boolean, items: Array[<ReactElement<*>], setRef: function}) => ReactElement<*>` |

#### Search
The default component is an `<input type='text'>`.

| property        | type/description                                            | default |
|-----------------|-------------------------------------------------------------|---------|
| `caseSensitive` | `boolean` - determine if the search is caseSensitive or not   |  false  |

Search's render receive a lot of props :

| property           | type       | description                                         |
|--------------------|------------|-----------------------------------------------------|
| `caseSensitive`    | `boolean`  | -                                                   |
| `clearSearchValue` | `function` | -                                                   |
| `clearValue`       | `function` | -                                                   |
| `onChange`         | `function` | expect the event from the input target as parameter |
| `searchValue`      | `function` | -                                                   |
| `toggleSearch`     | `function` | -                                                   |
| `toggleSelect`     | `function` | -                                                   |
| `value`            | `boolean`  | -                                                   |

#### Tag
The default component is a `<span>` with an `onClick` bind to `clearTag`.

| property  | type/description                                      |
|-----------|-------------------------------------------------------|
| `render`  | `({tag: Option, clear: function}) => ReactElement<*>` |

#### TagList
The default component is a `<div>`.

| property     | type/description                                                                                    |
|--------------|-----------------------------------------------------------------------------------------------------|
| `renderTag`  | the React Component use to render the tags list                                                     |
| `render`     | `({toggleSelect: function, tags: Array[<ReactElement<*>], placeholder: string}) => ReactElement<*>` |


### HOC

#### controller
This HOC allows you to get the props and functions from `selectless`'s context.

```javascript

const enhance = controller(['clearValue', 'options', 'hasSearch'])

const MyCustomComponent = ({clearValue, options, hasSearch}) =>
  <span>Super Component that does not use the props.</span>
export default enhance(MyCustomComponent)

```

##### caseSensitiveSearch - boolean
  Returns if the search is case sensitive.
  Don't forget that if you use the Async with loadOptions, the case senstive will depend of you and the api your using.
  Default : false

##### clearSearchValue - function
  Clears the search value
  `clearSearchValue()`

##### clearOneValue - function
  Clear the selected value sent as a parameter. It uses the value of the option to determine which option needs to be unselected.
  `clearOneValue: (data: Option) => {}`
  `Option: { label: string, value: any }`

##### clearValue - function
  Clear the selected value. If it's a multiple select, it will clear all the value at once.

##### defaultValue - Option
  Allow to pass a default value to be selected. If you apply a transform, you need to do it yourself, the value needs to be formatted correctly.
  `Option: { label: string, value: any }`

##### hasSearch - boolean
  Returns if the search is active.
  If you use a full customize seach input, then you need to set this yourself with `toggleSearch`.
  Default : false

##### multi - boolean
  Returns if the select is a multi select.
  Default : false

##### name - string
  Name of the select in the input.

##### placeholder - string
  Placeholder for the label.
  Default : 'Select an option'

##### onChangeSearchValue - function
  Let you hook and receive the value of the search input everytime it changes.
  `onChangeSearchValue: (query: string) => {}`

##### onSelectValue - function
  Let you hook and receive the value of the selected value everytime it changes.
  `onSelectValue: (data: Option) => {}`
  `Option: { label: string, value: any }`

##### opened - boolean
  Returns if the select is currently open.
  Default: false

##### options - Array<Option>
  List of options used by this context after the transform is applied.
  `Array<Option>`
  `Option: { label: string, value: any }`

##### searchValue - string
  Current value of the search input.

##### selectedValue - Option | Array<Option>
  Returns the selected value of the select.
  If the multi option is true, it returns an Array.
  `Option: { label: string, value: any }`

##### sourceOptions - Array<any>
  List of options received by this context before the transform is applied.
  `Array<Option>`

##### toggleCaseSensitive - function
  Function to toggle the case sensitive option.
  Affects `caseSensitive`
  If no value is passed, it will toggle `caseSensitive`.
  `toggleCaseSensitive: (newCaseSensitive: boolean) => {}`

##### toggleSearch - function
  Function to toggle the search.
  Affects `hasSearch`
  If no value is passed, it will toggle the `hasSearch` value.
  `toggleSearch: (noSearch: boolean) => {}`

##### toggleSelect - function
  Function to toggle the select.
  Affects `opened`.
  if no value is passed, it will toggle the `opened` value.
  `toggleSelect: (isOpen: boolean) => {}`

##### transform - function
  Function applied to each options pass to the context.
  Can be use for formatting your options to respect the default format.
  `transform: (data: any) => Array<Option>`
  `Option: { label: string, value: any }`


#### withKeyboardEvent (Experimental)
HOC to put keyboard event in the List.
- Select the next/previous options in the list when the user hits the up/down arrow and scroll automatically in the list if the option is not visible.
- Select the option when you hit Enter or Tab.

```javascript

[...]

class ListC extends React.Component {
  render() {
    const {currentValue, clearSearchValue, onSelectValue, opened, options, setRef} = this.props
    return (
      <SlideIn opened={opened}>
        <Ul innerRef={ref => setRef(ref)}>
          {options.map((o, idx) =>
            <Li
              key={o.label}
              color={idx === currentValue ? 'orange' : '#333'}
              onClick={e => {
                clearSearchValue()
                onSelectValue(o)
                e.preventDefault()
                e.stopPropagation()
              }}>
              {o.label}
            </Li>,
          )}
        </Ul>
      </SlideIn>
    )
  }
}
const enhance = compose(
  controller(['clearSearchValue', 'onSelectValue', 'opened', 'options']),
  withKeyboardEvent
)
const List = (ListC)

const CustomSelect = (props) => (
  <Select name="context" options={simpleOptions} style={{width: 300}}>
    <SearchLabel />
    <List />
  </Select>
)

export default CustomSelect

```

## LICENSE

MIT
