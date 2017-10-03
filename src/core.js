import React, {Component} from 'react'
import PropTypes from 'prop-types'

class SyncSelect extends Component {
  state = {
    opened: false,
    selectedValue: [],
  }
  componentWillMount() {
    this.setState({
      selectedValue:
        typeof this.props.defaultValue !== 'undefined'
          ? [this.props.defaultValue]
          : [],
    })
  }
  componentWillUpdate(nextProps, nextState) {
    if (
      nextState.selectedValue !== this.state.selectedValue &&
      typeof this.props.onChange !== 'undefined'
    ) {
      this.props.onChange(
        nextProps.multi ? nextState.selectedValue : nextState.selectedValue[0]
      )
    }
  }
  componentDidMount() {
    document.addEventListener('click', this.handleTouchOutside)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleTouchOutside)
  }

  getChildContext() {
    const {defaultValue, name, multi, placeholder} = this.props
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
    if (typeof this.props.onSelectValue !== 'undefined') {
      this.props.onSelectValue(data)
    }
    this.props.clearSearchOnSelect && this.props.clearSearchValue()
    this.setState({
      opened: this.props.stayOpenOnSelect,
      selectedValue: this.props.multi
        ? this.state.selectedValue.indexOf(data) !== -1
          ? this.state.selectedValue.filter(x => x !== data)
          : [...this.state.selectedValue, data]
        : [data],
    })
  }

  clearValue = e => {
    this.setState({selectedValue: []})
    e.stopPropagation()
  }

  clearOneValue = t => {
    this.setState({
      selectedValue:
        typeof this.props.clearOneValue !== 'undefined'
          ? this.props.clearOneValue(t, this.state.selectedValue)
          : this.state.selectedValue.filter(v => v.value !== t.value),
    })
  }

  renderInputs = (selectedValue, name) => {
    return typeof this.props.renderInputs !== 'undefined'
      ? this.props.renderInputs(selectedValue, name)
      : selectedValue.map(v =>
          <input
            key={v.label}
            name={`${name}[${v.label}]`}
            type="hidden"
            value={v.value}
          />
        )
  }

  handleTouchOutside = e => {
    if (
      this._wrapper &&
      !this._wrapper.contains(e.target) &&
      this.props.closeOnBlur
    ) {
      this.toggleSelect(false)
    }
  }

  render() {
    const {className, style} = this.props
    return (
      <div
        {...{className, style}}
        ref={ref => {
          this._wrapper = ref
        }}>
        {this.renderInputs(this.state.selectedValue, this.props.name)}
        {this.props.children}
      </div>
    )
  }
}

SyncSelect.propTypes = {
  className: PropTypes.string,
  clearOneValue: PropTypes.func,
  closeOnBlur: PropTypes.bool,
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  multi: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.any,
  renderInputs: PropTypes.func,
  stayOpenOnSelect: PropTypes.bool,
  style: PropTypes.object,
}

SyncSelect.childContextTypes = {
  clearValue: PropTypes.func.isRequired,
  clearOneValue: PropTypes.func.isRequired,
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  multi: PropTypes.bool.isRequired,
  placeholder: PropTypes.any.isRequired,
  onSelectValue: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  selectedValue: PropTypes.array.isRequired,
  toggleSelect: PropTypes.func.isRequired,
}

export default SyncSelect
