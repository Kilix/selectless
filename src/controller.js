import PropTypes from 'prop-types'
import {compose, getContext, mapProps} from 'recompose'
import {pick, ifElse} from 'ramda'

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
]
export default (p = defaultContext) => {
  const pp = p.reduce((acc, val) => ({...acc, [val]: PropTypes.any}), {})
  return compose(getContext(pp))
}
