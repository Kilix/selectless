import PropTypes from 'prop-types'
import {compose, getContext, mapProps} from 'recompose'
import {pick, when} from 'ramda'

export default p =>
  compose(
    getContext({
      caseSensitiveSearch: PropTypes.bool,
      clearValue: PropTypes.func.isRequired,
      clearOneValue: PropTypes.func.isRequired,
      clearSearchValue: PropTypes.func.isRequired,
      defaultValue: PropTypes.any,
      hasSearch: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      multi: PropTypes.bool.isRequired,
      options: PropTypes.array.isRequired,
      placeholder: PropTypes.string.isRequired,
      onSelectValue: PropTypes.func.isRequired,
      onChangeSearchValue: PropTypes.func.isRequired,
      opened: PropTypes.bool.isRequired,
      selectedValue: PropTypes.array.isRequired,
      searchValue: PropTypes.string.isRequired,
      sourceOptions: PropTypes.array,

      toggleCaseSensitive: PropTypes.func.isRequired,
      toggleSearch: PropTypes.func.isRequired,
      toggleSelect: PropTypes.func.isRequired,
      transform: PropTypes.func.isRequired,
    }),
    when(
      () => typeof p !== 'undefined',
      mapProps(props => pick(['className', 'style', ...p], props)),
    ),
  )
