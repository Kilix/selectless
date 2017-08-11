/* global it, expect */

import React from 'react';
import renderer from 'react-test-renderer';

import { Select } from '../';
import List from '../components/list';
import Item from '../components/item';

const options = [
  { label: 'Paris', value: 'paris' },
  { label: 'Tokyo', value: 'tokyo' },
];
it('List', () => {
  const tree = renderer
    .create(
      <Select name="list" options={options} defaultValue={options[0]}>
        <List renderItem={Item} />
      </Select>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
it('List: Custom Item', () => {
  const Ctem = () => <div />;
  const tree = renderer
    .create(
      <Select name="list" options={options} defaultValue={options[0]}>
        <List renderItem={<Item render={Ctem} />} />
      </Select>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
