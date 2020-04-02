import mongoose from 'mongoose';

import './models/user';
import './models/tweet';
import './models/userTweets';
import './models/mostSharedLinks';

mongoose.connect('mongodb://localhost/test');
