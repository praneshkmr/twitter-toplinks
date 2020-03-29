import oauth from 'oauth';

// Get your credentials here: https://dev.twitter.com/apps
const twitterConsumerKey = 'Ui2gs8QQnj7fMpdOVlx2V7TMS';
const twitterConsumerSecret = 'otw6YCht6l8Xke0PmiNkHOkAgZ3pHYh7kVczmbqxk7vSK6XTWu';

const consumer = new oauth.OAuth(
  'https://twitter.com/oauth/request_token', 'https://twitter.com/oauth/access_token',
  twitterConsumerKey, twitterConsumerSecret, '1.0A', 'http://127.0.0.1:5000/auth/twitter/callback', 'HMAC-SHA1',
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

export const GetHomeTimeline = (oauthAccessToken, oauthAccessTokenSecret) => new Promise((resolve, reject) => {
  consumer.get('https://api.twitter.com/1.1/statuses/home_timeline.json', oauthAccessToken, oauthAccessTokenSecret,
    (error, data) => {
      if (error) {
        reject(error);
      } else {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      }
    });
});
