# List

The default component is a `<div>`.

| property     | type/description                                                                           |
|--------------|--------------------------------------------------------------------------------------------|
| `setRef`     | function used for React reference                                                          |
| `renderItem` | the React Component used to render the items list                                          |
| `render`     | `({opened: boolean, items: Array[<ReactElement<*>], setRef: function}) => ReactElement<*>` |


# Item

The default component is a `<div>` with an `onClick` bind to `onSelectValue`.

| property     | type/description                                                                                        |
|--------------|---------------------------------------------------------------------------------------------------------|
| `currentRef` | function use for React reference                                                                        |
| `render`     | `({data: Option, isCurrent: boolean, isSelected: boolean, onSelectValue: function}) => ReactElement<*>` |