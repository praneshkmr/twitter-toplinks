import { string, shape } from 'prop-types';

export const userPropType = shape({
  _id: string,
  name: string,
});
