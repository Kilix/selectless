# TagList

The default component is a `<div>`.

| property     | type/description                                                                                    |
|--------------|-----------------------------------------------------------------------------------------------------|
| `renderTag`  | the React Component use to render the tags list                                                     |
| `render`     | `({toggleSelect: function, tags: Array[<ReactElement<*>], placeholder: string}) => ReactElement<*>` |

# Tag

The default component is a `<span>` with an `onClick` bind to `clearTag`.

| property  | type/description                                      |
|-----------|-------------------------------------------------------|
| `render`  | `({tag: Option, clear: function}) => ReactElement<*>` |