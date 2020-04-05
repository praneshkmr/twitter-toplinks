import React from 'react';
import { shallow } from 'enzyme';
import Tweet from './index';

const tweet = {
  text: 'tweet text',
  user: {
    name: 'Pranesh Kumar',
    screen_name: '@praneshkmr',
    profile_image_url: '/img.jpeg',
  },
};

const wrap = (props) => shallow(<Tweet tweet={tweet} {...props} />);

describe('Tweet', () => {
  it('should render', () => {
    const wrapper = wrap();

    expect(wrapper.contains(tweet.text)).toBeTruthy();
    expect(wrapper.contains(tweet.user.name)).toBeTruthy();
    expect(wrapper.contains(`@${tweet.user.screen_name}`)).toBeTruthy();
    expect(wrapper.find(`img[src="${tweet.user.profile_image_url}"]`)).toHaveLength(1);
  });

  it('should handle OnClick', () => {
    const handleClick = jest.fn();
    const wrapper = wrap({ onClick: handleClick });

    wrapper.simulate('click');

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
