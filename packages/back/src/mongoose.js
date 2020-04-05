import mongoose from 'mongoose';

import './models/user';
import './models/tweet';
import './models/userTweets';
import './models/mostSharedLinks';

export const StartDev = () => {
  const URL = process.env.MONGO_URL || 'mongodb://localhost/test';
  mongoose.connect(URL);
  return mongoose;
};


export const StartTest = () => {
  mongoose.connect('mongodb://localhost/test');
  return mongoose;
};
