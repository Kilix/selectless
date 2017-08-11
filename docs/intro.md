# Introduction


There are three different ways to use `selectless`:

- On a component level, `selectless` provides a basic component that you can customize with any css-in-js library or classname/style
- On a custom component level, each component provided by `selectless` accepts a custom `render` prop that allows you to override the default representation/binding of the component
- On a low level controller, `selectless` provides an HOC that lets you pass down the context props of `selectless` as props to your component. This allow a full control on how you want to use `selectless`.

I hope in a near future that me and/or the community can provide pre-styleds for the various css-in-js solutions existing out there.

## Inspiration
This package was inspired by the great `react-select` and the talk from Ryan Florence ["Compound Components"](https://www.youtube.com/watch?v=hEGg-3pIHlE)

## Other Solutions

### [Downshift](https://github.com/paypal/downshift)
There was no real solution for this problem when I started this project, then [Kent C. Dodds](https://github.com/kentcdodds/) released react-autocompletly (now downshift) that uses the same basic principles and try to solve the same problem.
I started working on this a bit earlier but I got lazy and put the project aside.
Anyway, right now his project has far more support so you should consider testing it too. :)

### [React-select](http://jedwatson.github.io/react-select/)
React-select is still really good.

## Basic Usage
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

## Documentation

- [Select / Select.Async](select.md)
- [Predefined Components](sub-components.md)
- [HOC](HOC.md)