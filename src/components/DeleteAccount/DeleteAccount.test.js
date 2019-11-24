import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import DeleteAccount from './DeleteAccount';


describe(`Delete Account Component`, () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<DeleteAccount />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});