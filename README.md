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

  - [Introduction](docs/intro.md)
  - [Select / Select.Async](docs/select.md)
  - [Predefined Components](docs/sub-components.md)
  - [HOC](docs/HOC.md)

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

## LICENSE

MIT
