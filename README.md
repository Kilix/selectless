<h1 align="center">
  Selectless
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">Custom Select without predefined UI for React using Context</p>

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![MIT License][license-badge]][LICENSE]

## Install

```
  yarn add selectless
  npm install selectless
```

## Introduction

There are three different ways to use `selectless`:

- On a component level, `selectless` provides a basic component that you can customize with any css-in-js library or classname/style
- On a custom component level, each component provided by `selectless` accepts a custom `render` prop that allows you to override the default representation/binding of the component
- On a low level controller, `selectless` provides an HOC that lets you pass down the context props of `selectless` as props to your component. This allow a full control on how you want to use `selectless`.

I hope in a near future that me and/or the community can provide pre-styleds for the various css-in-js solutions existing out there.

## Inspiration
This package was inspired by the great `react-select` and the talk from Ryan Florence ["Compound Components"](https://www.youtube.com/watch?v=hEGg-3pIHlE)

## Why we created this package ?

So the purpose of this package is not to replace `react-select` in a first place but to provide an alternative compatible with css-in-js libraries that let you have full control over the UI of your select without dealing with the logic behind a select.

In a near futur we hope we(our the community) can provide custom made select UI with `selectless` as module packages for each css-in-js solutions and even SASS, LESS, etc. You can already find some examples in the storybook.

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

- [Select / Select.Async](docs/select.md)
- [Predefined Components](docs/sub-components.md)
- [HOC](docs/HOC.md)

## Examples

- [Sync](stories/sync.js)
- [ASync](stories/async.js)
- [Fela](stories/fela.js)
- [Glamorous](stories/glamorous.js)

## Other Solutions

### [Downshift](https://github.com/paypal/downshift)
There was no real solution for this problem when I started this project, then [Kent C. Dodds](https://github.com/kentcdodds/) released react-autocompletly (now downshift) that uses the same basic principles and try to solve the same problem.
I started working on this a bit earlier but I got lazy and put the project aside.
Anyway, right now his project has far more support so you should consider testing it too. :)

### [React-select](http://jedwatson.github.io/react-select/)
React-select is still really good.

## LICENSE

MIT


[build-badge]: https://img.shields.io/travis/Kilix/selectless.svg?style=flat-square
[build]: https://travis-ci.org/Kilix/selectless
[coverage-badge]: https://img.shields.io/codecov/c/github/Kilix/selectless.svg?style=flat-square
[coverage]: https://codecov.io/github/Kilix/selectless
[version-badge]: https://img.shields.io/npm/v/selectless.svg?style=flat-square
[package]: https://www.npmjs.com/package/selectless
[license-badge]: https://img.shields.io/npm/l/glamorous.svg?style=flat-square
[license]: https://github.com/paypal/glamorous/blob/master/LICENSE