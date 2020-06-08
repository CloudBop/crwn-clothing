import React from 'react';
import { shallow } from 'enzyme';
import Homepage from './Homepage';

it('should render Homepage component', () => {
  expect(shallow(<Homepage />)).toMatchSnapshot();
});
