<h1 align="center">
  Selectless
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">Custom Select without UI from React using Context</p>

## Documentation

### Introduction

`selectless` has 3 layers where you can use it:

- On a component level, `selectless` provide basic component that you can customize with css-in-js library or classname/style
- On a custom component level, every component provide by `selectless` accept a custom `render` prop that allow you to override the default representation/binding of the component
- On a low level controller, `selectless` provide a HOC that let you pass down the context props of `selectless` as props to your component. This allow a full control on how you want to use `selectless`.

I hope in a near future that me and/or the community can provide pre-styled component in a lot of different css-in-js solutions.

## Inspiration

This package was inspired by the great `react-select` and the talk from Ryan Florence ["Compound Components"](https://www.youtube.com/watch?v=hEGg-3pIHlE)

## Other Solutions

#### [Downshift](https://github.com/paypal/downshift)
There was no real solution for this problem a few weeks ago, then Kent C. Dodds released react-autocompletly (now downshift) that use the same basic principle and try to resolve the same problem.
I started working on this a bit earlier but i got lazy and put the project aside.
Anyway, right now his project as far more support so you should consider testing it too. :)

#### [React-select](http://jedwatson.github.io/react-select/)
React-select is still really good

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

clearOneValue: PropTypes.func,
renderInputs: PropTypes.func,

Select is the Container Component, he's the one creating the context and handdleing all the logic. He's accepting a lot of props :

| property              | type            | required | default             | description                                                     | parameters                    |
|-----------------------|-----------------|----------|---------------------|-----------------------------------------------------------------|-------------------------------|
| `className`           | `string`        |    no    |          -          | className for styling (React prop)                              |                               |
| `clearOneValue`       | `function`      |    no    |          -          | Override the function use to clear one value in a multi select  | clearedOption, selectedValue  |
| `clearSearchOnSelect` | `boolean`       |    no    |        false        | Allow to clear the search value when a value is selected        |                               |
| `defaultValue`        | `Option`        |    no    |          -          | The value selected by default                                   |                               |
| `name`                | `string`        |    yes   |          -          | name of the component for the input in the form                 |                               |
| `multi`               | `boolean`       |    no    |        false        | Defined if it's a multi select or not                           |                               |
| `onChange`            | `function`      |    no    |          -          | Called when the value if changed, usefull for state management  | selected Option(s)            |
| `placeholder`         | `string`        |    no    | "Select an options" | Placeholder for the select label                                |                               |
| `renderInputs`        | `function`      |    no    |          -          | Override the function used to render the inputs in the DOM      | selectedOption, name          |
| `stayOpenOnSelect`    | `boolean`       |    no    |        false        | Allow to let the list open after a value is selected            |                               |
| `style`               | `Object`        |    no    |          -          | style the component (React prop)                                |                               |
| `transform`           | `function`      |    no    |          -          | Function use to format/transform the options                    | Option                        |
| `options`             | `Array[Option]` |    yes   |          -          | Array of the options (Sync Select only)                         |                               |
| `loadOptions`         | `function`      |    yes   |          -          | function that return an array of options (Select.Async only)    | query, callback               |

`Option` Type is an Object with 2 required props :

| property              | type            | description                                                                                  |
|-----------------------|-----------------|----------------------------------------------------------------------------------------------|
| `label`               | `string`        | label for the options and label components                                                   |
| `value`               | `any`           | value used for the input of the Select                                                       |

The Option type above is the default used by `selectless`, if you need to change the format and the props, don't forget to change the functions `clearOneValue` and `renderInputs`.

the loadOptions in the case of the `Select.Async`is also used for the Search. It receives the search value (query) and a callback to send the new set of options. You can return a promise instead of using the callback :

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

#### Predefine Components

Every Component bellow will receive the props you passed down. Plus it accept a few `selectless` specific props :

| property  | type       | description                                     |
|-----------|------------|-------------------------------------------------|
| `render`  | `function` | Allow to overwrite the render of the component  |

The parameters received by the render function depends of each components.
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
| `setRef`     | function use for React reference                                                           |
| `renderItem` | the React Component use to render the items list                                           |
| `render`     | `({opened: boolean, items: Array[<ReactElement<*>], setRef: function}) => ReactElement<*>` |

#### Search

The default component is a `<input type='text'>`.

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


## LICENSE

MIT