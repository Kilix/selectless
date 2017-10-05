# Search
The default component is an `<input type='text'>`.

| property        | type/description                                              | default |
|-----------------|---------------------------------------------------------------|---------|
| `caseSensitive` | `boolean` - determine if the search is caseSensitive or not   |  false  |
| `disabled`      | `boolean` - return if the select is disabled                  |    -    |

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