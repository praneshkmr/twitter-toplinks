import {
  number, string, shape, arrayOf,
} from 'prop-types';

export const tweetPropType = shape({
  id: number,
  id_str: string,
  text: string,
  user: shape({
    name: string,
    profile_image_url: string,
    screen_name: string,
  }),
});

export const tweetsPropType = shape({
  data: arrayOf(tweetPropType),
  meta: shape({
    count: number,
  }),
});
