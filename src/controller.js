import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'

const defaultContext = [
  'caseSensitiveSearch',
  'clearSearchValue',
  'hasSearch',
  'onChangeSearchValue',
  'searchValue',
  'options',
  'sourceOptions',
  'toggleCaseSensitive',
  'toggleSearch',
  'transform',
  'clearValue',
  'clearOneValue',
  'defaultValue',
  'name',
  'multi',
  'placeholder',
  'onSelectValue',
  'opened',
  'selectedValue',
  'toggleSelect',
  'disabled',
]
export default (p = defaultContext) => {
  const pp = p.reduce((acc, val) => ({...acc, [val]: PropTypes.any}), {})
  return compose(getContext(pp))
}
