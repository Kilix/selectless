import React, {Component} from 'react'
import PropTypes from 'prop-types'

import filter from 'ramda/src/filter'
import map from 'ramda/src/map'
import pick from 'ramda/src/pick'

class SyncSelect extends Component {
  state = {
    opened: false,
    selectedValue: [],
  }
  componentWillMount() {
    this.setState({
      selectedValue:
        typeof this.props.defaultValue !== 'undefined' ? [this.props.defaultValue] : [],
    })
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.selectedValue !== this.state.selectedValue)
      this.props.onChange(nextState.selectedValue)
  }

  getChildContext() {
    const {defaultValue, name, multi, placeholder, transform} = this.props
    const {opened, selectedValue} = this.state
    return {
      defaultValue,
      name,
      multi,
      placeholder,
      toggleSelect: this.toggleSelect,
      onSelectValue: this.onSelectValue,
      clearValue: this.clearValue,
      clearOneValue: this.clearOneValue,
      opened,
      selectedValue,
    }
  }

  toggleSelect = (opened = null) =>
    this.setState({opened: opened !== null ? opened : !this.state.opened})

  onSelectValue = data => {
    this.props.clearSearchOnSelect && this.props.clearSearchValue()
    this.setState({
      opened: this.props.stayOpenOnSelect,
      selectedValue: this.props.multi
        ? symmetricDifference(this.state.selectedValue, [data])
        : [data],
    })
  }

  clearValue = e => {
    this.setState({selectedValue: []})
    e.stopPropagation()
  }

  clearOneValue = t => {
    this.setState({
      selectedValue: filter(v => v.value !== t.value, this.state.selectedValue),
    })
  }

  renderInputs = (selectedValue, name) => {
    return map(
      v => <input key={v.label} name={`${name}[${v.label}]`} type="hidden" value={v.value} />,
      selectedValue,
    )
  }
  render() {
    const containerProps = pick(['className', 'style'], this.props)

    return (
      <div {...containerProps}>
        {this.renderInputs(this.state.selectedValue, this.props.name)}
        {this.props.children}
      </div>
    )
  }
}

SyncSelect.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  multi: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  stayOpenOnSelect: PropTypes.bool,
  style: PropTypes.object,
}

SyncSelect.childContextTypes = {
  clearValue: PropTypes.func.isRequired,
  clearOneValue: PropTypes.func.isRequired,
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  multi: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  onSelectValue: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  selectedValue: PropTypes.array.isRequired,
  toggleSelect: PropTypes.func.isRequired,
}

export default SyncSelect
