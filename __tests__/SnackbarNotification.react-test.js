import React from 'react';
import renderer from 'react-test-renderer';

import CloseButton from '../src/common/CloseButton/CloseButton';

it('renders correctly', () => {
  const tree = renderer.create(
    <CloseButton />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
