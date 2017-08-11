# HOC

## controller

This HOC allows you to get the props and functions from `selectless`'s context.

```javascript

const enhance = controller(['clearValue', 'options', 'hasSearch'])

const MyCustomComponent = ({clearValue, options, hasSearch}) =>
  <span>Super Component that does not use the props.</span>
export default enhance(MyCustomComponent)

```

### caseSensitiveSearch - boolean
  Returns if the search is case sensitive.
  Don't forget that if you use the Async with loadOptions, the case senstive will depend of you and the api your using.
  Default : false

### clearSearchValue - function
  Clears the search value
  `clearSearchValue()`

### clearOneValue - function
  Clear the selected value sent as a parameter. It uses the value of the option to determine which option needs to be unselected.
  `clearOneValue: (data: Option) => {}`
  `Option: { label: string, value: any }`

### clearValue - function
  Clear the selected value. If it's a multiple select, it will clear all the value at once.

### defaultValue - Option
  Allow to pass a default value to be selected. If you apply a transform, you need to do it yourself, the value needs to be formatted correctly.
  `Option: { label: string, value: any }`

### hasSearch - boolean
  Returns if the search is active.
  If you use a full customize seach input, then you need to set this yourself with `toggleSearch`.
  Default : false

### multi - boolean
  Returns if the select is a multi select.
  Default : false

### name - string
  Name of the select in the input.

### placeholder - string
  Placeholder for the label.
  Default : 'Select an option'

### onChangeSearchValue - function
  Let you hook and receive the value of the search input everytime it changes.
  `onChangeSearchValue: (query: string) => {}`

### onSelectValue - function
  Let you hook and receive the value of the selected value everytime it changes.
  `onSelectValue: (data: Option) => {}`
  `Option: { label: string, value: any }`

### opened - boolean
  Returns if the select is currently open.
  Default: false

### options - Array<Option>
  List of options used by this context after the transform is applied.
  `Array<Option>`
  `Option: { label: string, value: any }`

### searchValue - string
  Current value of the search input.

### selectedValue - Option | Array<Option>
  Returns the selected value of the select.
  If the multi option is true, it returns an Array.
  `Option: { label: string, value: any }`

### sourceOptions - Array<any>
  List of options received by this context before the transform is applied.
  `Array<Option>`

### toggleCaseSensitive - function
  Function to toggle the case sensitive option.
  Affects `caseSensitive`
  If no value is passed, it will toggle `caseSensitive`.
  `toggleCaseSensitive: (newCaseSensitive: boolean) => {}`

### toggleSearch - function
  Function to toggle the search.
  Affects `hasSearch`
  If no value is passed, it will toggle the `hasSearch` value.
  `toggleSearch: (noSearch: boolean) => {}`

### toggleSelect - function
  Function to toggle the select.
  Affects `opened`.
  if no value is passed, it will toggle the `opened` value.
  `toggleSelect: (isOpen: boolean) => {}`

### transform - function
  Function applied to each options pass to the context.
  Can be use for formatting your options to respect the default format.
  `transform: (data: any) => Array<Option>`
  `Option: { label: string, value: any }`


## withKeyboardEvent (Experimental)

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
