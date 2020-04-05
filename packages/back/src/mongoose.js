import mongoose from 'mongoose';

import './models/user';
import './models/tweet';
import './models/userTweets';
import './models/mostSharedLinks';

export const StartDev = () => {
  const URL = process.env.MONGO_URL || 'mongodb://localhost/twitter-toplinks';
  mongoose.connect(URL, { useNewUrlParser: true }, (err) => {
    if (err) {
      console.log('Error connecting to mongodb', err);
    } else {
      console.log('Successfully connected to MongoDB');
    }
  });
};


export const StartTest = () => {
  mongoose.connect('mongodb://localhost/test');
  return mongoose;
};
