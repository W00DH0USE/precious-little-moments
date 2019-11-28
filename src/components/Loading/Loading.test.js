import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loading from './Loading';


describe(`Loading component`, () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Loading />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});