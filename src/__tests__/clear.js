/* global it, expect, jest */

import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { Select } from '../';
import Clear from '../components/clear';

const options = [
  { label: 'Paris', value: 'paris' },
  { label: 'Tokyo', value: 'tokyo' },
];
it('Clear', () => {
  const tree = renderer
    .create(
      <Select name="clear" options={options}>
        <Clear />
      </Select>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
it('Custom Clear', () => {
  const tree = renderer
    .create(
      <Select name="clear" options={options}>
        <Clear render={() => <div />} />
      </Select>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
it('has default label', () => {
  const clear = shallow(
    <Select name="clear" options={options}>
      <Clear />
    </Select>
  );
  expect(clear.find(Clear).html()).toMatchSnapshot('<span>Clear</span>');
});
it('Simulate click', () => {
  const onButtonClick = jest.fn();
  const clear = mount(
    <Select name="clear" options={options}>
      <Clear
        render={props =>
          <button onClick={onButtonClick}>
            {props.label}
          </button>}
      />
    </Select>
  );
  clear.find('button').simulate('click');
  expect(onButtonClick.mock.calls.length).toBe(1);
});
