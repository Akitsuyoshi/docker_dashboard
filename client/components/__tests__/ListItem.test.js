import React from 'react';
import { shallow } from 'enzyme';
import ListItem from '../ListItem';

require('./setup');

describe('<ListItem />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ListItem />);
    expect(wrapper.find('div'));
  });
});
