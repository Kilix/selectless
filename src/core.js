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
      typeof this.props.onChange !== 'undefined' &&
      !nextProps.disabled
    ) {
      this.props.onChange(
        nextProps.multi ? nextState.selectedValue : nextState.selectedValue[0]
      )
    }
    if (nextProps.disabled && !this.props.disabled) {
      this.setState(() => ({opened: false}))
    }
  }
  componentDidMount() {
    document.addEventListener('click', this.handleTouchOutside)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleTouchOutside)
  }

  getChildContext() {
    const {
      defaultValue,
      name,
      multi,
      placeholder,
      disabled,
      referenceKey,
    } = this.props
    const {opened, selectedValue} = this.state
    return {
      defaultValue,
      disabled,
      name,
      multi,
      placeholder,
      toggleSelect: this.toggleSelect,
      onSelectValue: this.onSelectValue,
      clearValue: this.clearValue,
      clearOneValue: this.clearOneValue,
      opened,
      referenceKey,
      selectedValue,
    }
  }

  toggleSelect = (opened = null) =>
    !this.props.disabled
      ? this.setState({opened: opened !== null ? opened : !this.state.opened})
      : null

  onSelectValue = data => {
    const {
      clearSearchOnSelect,
      clearSearchValue,
      multi,
      onSelectValue,
      referenceKey,
      stayOpenOnSelect,
    } = this.props
    const {selectedValue} = this.state
    if (typeof onSelectValue !== 'undefined') {
      onSelectValue(data)
    }
    clearSearchOnSelect && clearSearchValue()
    this.setState({
      opened: stayOpenOnSelect,
      selectedValue: multi
        ? selectedValue.indexOf(data) !== -1
          ? selectedValue.filter(x => x[referenceKey] !== data[referenceKey])
          : [...selectedValue, data]
        : [data],
    })
  }

  clearValue = e => {
    if (!this.props.disabled) {
      this.setState({selectedValue: []})
      e.stopPropagation()
    }
  }

  clearOneValue = t => {
    const {referenceKey, disabled, clearOneValue} = this.props
    const {selectedValue} = this.state
    if (!disabled) {
      this.setState({
        selectedValue:
          typeof clearOneValue !== 'undefined'
            ? clearOneValue(t, selectedValue)
            : selectedValue.filter(v => v[referenceKey] !== t[referenceKey]),
      })
    }
  }

  renderInputs = (selectedValue, name) => {
    return typeof this.props.renderInputs !== 'undefined'
      ? this.props.renderInputs(selectedValue, name)
      : selectedValue.map(v =>
          <input
            key={v.label}
            name={`${name}[${v[this.props.referenceKey]}]`}
            type="hidden"
            value={v[this.props.referenceKey]}
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
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  multi: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.any,
  renderInputs: PropTypes.func,
  referenceKey: PropTypes.string.isRequired,
  stayOpenOnSelect: PropTypes.bool,
  style: PropTypes.object,
}

SyncSelect.childContextTypes = {
  clearValue: PropTypes.func.isRequired,
  clearOneValue: PropTypes.func.isRequired,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  multi: PropTypes.bool.isRequired,
  placeholder: PropTypes.any.isRequired,
  onSelectValue: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  referenceKey: PropTypes.string.isRequired,
  selectedValue: PropTypes.array.isRequired,
  toggleSelect: PropTypes.func.isRequired,
}

export default SyncSelect
