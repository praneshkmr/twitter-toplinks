import mongoose from 'mongoose';

import './models/user';
import './models/tweet';
import './models/userTweets';
import './models/mostSharedLinks';

export const StartDev = () => {
  mongoose.connect('mongodb://localhost/test');
  return mongoose;
};


export const StartTest = () => {
  mongoose.connect('mongodb://localhost/test2');
  return mongoose;
};
