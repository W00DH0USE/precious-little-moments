import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddPost from './AddPost';


describe(`Add Post component`, () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<AddPost />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});