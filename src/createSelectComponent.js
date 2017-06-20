import React from 'react'
import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'
import {pick} from 'ramda'

import {renderOrCloneComponent} from './utils'

export default p => BaseComponent => {
  const enhance = compose(
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
  )

  class extendedComponent extends React.Component {
    render() {
      const props = pick(p, this.props)
      return renderOrCloneComponent(BaseComponent, props)
    }
  }

  return enhance(extendedComponent)
}
