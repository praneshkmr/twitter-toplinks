import { Schema, model } from 'mongoose';
import each from 'async/each';

const tweetSchema = new Schema({
  created_at: { type: 'Date' },
  id: { type: 'Number' },
  id_str: { type: 'String' },
  text: { type: 'String' },
  truncated: { type: 'Boolean' },
  entities: {
    hashtags: { type: 'Array' },
    symbols: { type: 'Array' },
    user_mentions: { type: ['Mixed'] },
    urls: [{
      url: { type: 'String' },
      expanded_url: { type: 'String' },
      display_url: { type: 'String' },
      indices: { type: ['Number'] },
    }],
  },
  source: { type: 'String' },
  in_reply_to_status_id: { type: 'Number' },
  in_reply_to_status_id_str: { type: 'String' },
  in_reply_to_user_id: { type: 'Number' },
  in_reply_to_user_id_str: { type: 'String' },
  in_reply_to_screen_name: { type: 'String' },
  user: {
    id: { type: 'Number' },
    id_str: { type: 'String' },
    name: { type: 'String' },
    screen_name: { type: 'String' },
    location: { type: 'String' },
    description: { type: 'String' },
    url: { type: 'String' },
    entities: {
      url: {
        urls: [{
          url: { type: 'String' },
          expanded_url: { type: 'String' },
          display_url: { type: 'String' },
          indices: { type: ['Number'] },
        }],
      },
      description: {
        urls: { type: 'Array' },
      },
    },
    protected: { type: 'Boolean' },
    followers_count: { type: 'Number' },
    friends_count: { type: 'Number' },
    listed_count: { type: 'Number' },
    created_at: { type: 'Date' },
    favourites_count: { type: 'Number' },
    utc_offset: { type: 'Mixed' },
    time_zone: { type: 'Mixed' },
    geo_enabled: { type: 'Boolean' },
    verified: { type: 'Boolean' },
    statuses_count: { type: 'Number' },
    lang: { type: 'Mixed' },
    contributors_enabled: { type: 'Boolean' },
    is_translator: { type: 'Boolean' },
    is_translation_enabled: { type: 'Boolean' },
    profile_background_color: { type: 'String' },
    profile_background_image_url: { type: 'String' },
    profile_background_image_url_https: { type: 'String' },
    profile_background_tile: { type: 'Boolean' },
    profile_image_url: { type: 'String' },
    profile_image_url_https: { type: 'String' },
    profile_banner_url: { type: 'String' },
    profile_link_color: { type: 'String' },
    profile_sidebar_border_color: { type: 'String' },
    profile_sidebar_fill_color: { type: 'String' },
    profile_text_color: { type: 'String' },
    profile_use_background_image: { type: 'Boolean' },
    has_extended_profile: { type: 'Boolean' },
    default_profile: { type: 'Boolean' },
    default_profile_image: { type: 'Boolean' },
    following: { type: 'Boolean' },
    follow_request_sent: { type: 'Boolean' },
    notifications: { type: 'Boolean' },
    translator_type: { type: 'String' },
  },
  geo: { type: 'Mixed' },
  coordinates: { type: 'Mixed' },
  place: { type: 'Mixed' },
  contributors: { type: 'Mixed' },
  is_quote_status: { type: 'Boolean' },
  retweet_count: { type: 'Number' },
  favorite_count: { type: 'Number' },
  favorited: { type: 'Boolean' },
  retweeted: { type: 'Boolean' },
  possibly_sensitive: { type: 'Boolean' },
  possibly_sensitive_appealable: { type: 'Boolean' },
  lang: { type: 'String' },
});

const Tweets = model('Tweets', tweetSchema);

export default Tweets;

export const UpsertTweets = (tweets) => new Promise((resolve, reject) => {
  const result = [];
  each(tweets, (tweet, callback) => {
    Tweets.findOneAndUpdate({ id_str: tweet.id_str }, tweet, { new: true, upsert: true }).exec((err, updateTweet) => {
      if (err) {
        callback(err);
      } else {
        result.push(updateTweet);
        callback();
      }
    });
  }, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

export const GetTweetsContainingLink = () => Tweets.find({ 'entities.urls': { $exists: true, $not: { $size: 0 } } }).exec();

export const CalculateMostSharedLinksUser = () => {
  // These fn execute inside mongodb, so needs to be in Js
  const map = function () { emit(this.user.name, this.entities.urls.length); };
  const reduce = function (userName, urls) { return Array.sum(urls); };
  const out = 'mostSharedLinks';
  const finalize = function (key, reducedValue) { return { name: key, count: reducedValue }; };
  return Tweets.mapReduce({
    map, reduce, out, finalize,
  });
};
