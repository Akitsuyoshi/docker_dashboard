import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

require('./setup');

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div'));
  });
});
