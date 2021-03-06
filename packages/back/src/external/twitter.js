import oauth from 'oauth';
import { GetQueryParams } from '../utils/queryParams';
import Config from '../config';

// Get your credentials here: https://dev.twitter.com/apps
const twitterConsumerKey = Config.TWITTER_CONSUMER_KEY;
const twitterConsumerSecret = Config.TWITTER_CONSUMER_SECRET;
const twitterAuthCallback = Config.TWITTER_CALLBACK_URL;

const consumer = new oauth.OAuth(
  'https://twitter.com/oauth/request_token', 'https://twitter.com/oauth/access_token',
  twitterConsumerKey, twitterConsumerSecret, '1.0A', twitterAuthCallback, 'HMAC-SHA1',
);

export const GetOAuthRequestToken = () => new Promise((resolve, reject) => {
  consumer.getOAuthRequestToken((error, oauthToken, oauthTokenSecret) => {
    if (error) {
      reject(error);
    } else {
      resolve({ oauthToken, oauthTokenSecret });
    }
  });
});

export const GetOAuthAccessToken = (oauthRequestToken, oauthRequestTokenSecret, oauthVerifier) => new Promise((resolve, reject) => {
  consumer.getOAuthAccessToken(oauthRequestToken, oauthRequestTokenSecret, oauthVerifier,
    (error, oauthAccessToken, oauthAccessTokenSecret) => {
      if (error) {
        reject(error);
      } else {
        resolve({ oauthAccessToken, oauthAccessTokenSecret });
      }
    });
});

export const VerifyCredentials = (oauthAccessToken, oauthAccessTokenSecret) => new Promise((resolve, reject) => {
  consumer.get('https://api.twitter.com/1.1/account/verify_credentials.json', oauthAccessToken, oauthAccessTokenSecret,
    (error, data) => {
      if (error) {
        reject(error);
      } else {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      }
    });
});

export const GetHomeTimeline = (oauthAccessToken, oauthAccessTokenSecret, options) => new Promise((resolve, reject) => {
  let paramsText = '';
  if (options) {
    const { sinceId, count } = options;
    const params = { since_id: sinceId, count };
    paramsText = GetQueryParams(params);
  }
  consumer.get(`https://api.twitter.com/1.1/statuses/home_timeline.json?${paramsText}`, oauthAccessToken, oauthAccessTokenSecret,
    (error, data) => {
      if (error) {
        reject(error);
      } else {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      }
    });
});

export const SearchTweets = (oauthAccessToken, oauthAccessTokenSecret, options) => new Promise((resolve, reject) => {
  let paramsText = '';
  if (options.tag) {
    paramsText = `q=%23${options.tag}`; // %23 is #
  } else if (options.latitude && options.longitude && options.radius) {
    paramsText = `geocode=${options.latitude},${options.longitude},${options.radius}`;
  } else {
    reject(new Error('Query params not supported'));
  }
  consumer.get(`https://api.twitter.com/1.1/search/tweets.json?${paramsText}`, oauthAccessToken, oauthAccessTokenSecret,
    (error, data) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      }
    });
});
