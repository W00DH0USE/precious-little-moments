import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import UpdatePost from './UpdatePost';


describe(`Update Post Component`, () => {
  const post = [
    {
      post_title: 'Test Post Title 1',
      post_content: 'Test Post content 1',
      owner: 1
    },
    {
      post_title: 'Test Post Title 2',
      post_content: 'Test Post content 2',
      owner: 1
    },
    {
      post_title: 'Test Post Title 3',
      post_content: 'Test Post content 3',
      owner: 1
    },
  ]
  it('renders without crashing', () => {
    const wrapper = shallow(<UpdatePost posts={post} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});