import React from 'react';
import renderer from 'react-test-renderer';

import SnapshotTestLink from '../src/common/SnapshotTestLink';

it('renders correctly', () => {
  const tree = renderer.create(
    <SnapshotTestLink/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
