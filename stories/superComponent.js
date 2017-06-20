import React from 'react'
import PropTypes from 'prop-types'
import {compose, getContext} from 'recompose'
import {createSelectComponent} from '../src'

class BaseSuper extends React.Component {
  render() {
    const {opened, placeholder, toggleSelect} = this.props
    return <span onClick={() => toggleSelect()}>{placeholder} {opened ? 'Ouvert' : 'Fermé'}</span>
  }
}

const enhance = compose(
  createSelectComponent(['opened', 'placeholder', 'selectedValue', 'toggleSelect']),
)

export default enhance(BaseSuper)
