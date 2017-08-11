/* eslint-disable */
import React from 'react';

import controller from '../controller';
import { renderOrCloneComponent } from '../utils';

class Label extends React.Component {
  render() {
    const {
      opened,
      placeholder,
      render,
      selectedValue,
      toggleSelect,
      ...props
    } = this.props;
    const value = selectedValue && selectedValue[0];
    return typeof render === 'undefined'
      ? <div onClick={() => toggleSelect()} {...props}>
          {value ? value.label : placeholder}
        </div>
      : render({ opened, placeholder, toggleSelect, value });
  }
}
const enhance = controller([
  'opened',
  'placeholder',
  'selectedValue',
  'toggleSelect',
]);
export default enhance(Label);
