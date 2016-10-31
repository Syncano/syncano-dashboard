import React from 'react';
import renderer from 'react-test-renderer';

import InstacesListItem from '../src/apps/Instances/InstancesListItem'

it('renders correctly', () => {
  const tree = renderer.create(
    <InstacesListItem />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
