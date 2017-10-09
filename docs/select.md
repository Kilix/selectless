# Select

## Basic Select

Select is the Container Component, it's the one creating the context and handling all the logic.
It's accepting a lot of props :

| property              | type            | required | default             | description                                                                       | parameters                    |
|-----------------------|-----------------|----------|---------------------|-----------------------------------------------------------------                  |-------------------------------|
| `className`           | `string`        |    no    |          -          | className for styling (React prop)                                                |                               |
| `clearOneValue`       | `function`      |    no    |          -          | Override the function use to clear one value in a multi select                    | clearedOption, selectedValue  |
| `clearSearchOnSelect` | `boolean`       |    no    |        false        | Allow to clear the search value when a value is selected                          |                               |
| `closeOnBlur`         | `boolean`       |    no    |        true         | Determine if we close the select when the user click outside of the select or not |                               |
| `defaultValue`        | `Option`        |    no    |          -          | The value selected by default                                                     |                               |
| `disabled`            | `boolean`       |    no    |        false        | Allow to disable the select                                                       |                               |
| `name`                | `string`        |    yes   |          -          | name of the component for the input in the form                                   |                               |
| `multi`               | `boolean`       |    no    |        false        | Define if it's a multi select or not                                              |                               |
| `onChange`            | `function`      |    no    |          -          | Called when the value if changed, usefull for state management                    | selected Option(s)            |
| `placeholder`         | `string`        |    no    | "Select an options" | Placeholder for the select label                                                  |                               |
| `renderInputs`        | `function`      |    no    |          -          | Override the function used to render the inputs in the DOM                        | selectedOption, name          |
| `referenceKey`        | `string`        |    no    |       "value"       | Allow to use a custom key for value                                               |                               |
| `stayOpenOnSelect`    | `boolean`       |    no    |        false        | Allow to let the list open after a value is selected                              |                               |
| `style`               | `Object`        |    no    |          -          | style the component (React prop)                                                  |                               |
| `transform`           | `function`      |    no    |          -          | Function used to format/transform the options                                     | Option                        |
| `options`             | `Array[Option]` |    yes   |          -          | Array of the options (Sync Select only)                                           |                               |

## Select.Async

`Select.Async` have the same props as `Select` except `options` which is replaced by `loadOptions`.

| property              | type            | required | default             | description                                                     | parameters                    |
|-----------------------|-----------------|----------|---------------------|-----------------------------------------------------------------|-------------------------------|
| `loadOptions`         | `function`      |    yes   |          -          | function that returns an array of options (Select.Async only)   | query, callback               |


The loadOptions in the case of the `Select.Async`is also used for the Search.
It receives the search value (query) and a callback to send the new set of options.
You can return a promise instead of using the callback:

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

## Option Type

`Option` Type is an Object with 2 required props :

| property              | type            | description                                                                                  |
|-----------------------|-----------------|----------------------------------------------------------------------------------------------|
| `label`               | `string`        | label for the options and label components                                                   |
| `value`               | `any`           | value used for the input of the Select                                                       |

The Option type above is the default used by `selectless`.
By default the reference is "value". You can change that with the prop : `referenceKey`.

If you need to change the format and the props, don't forget to change the functions `clearOneValue` and `renderInputs`.