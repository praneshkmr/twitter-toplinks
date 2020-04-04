export const TweetHasURLFilter = (dbPromise, req) => new Promise((resolve) => {
  const hasUrl = req.query[HAS_URL];
  if (hasUrl === 'true') {
    dbPromise.find({ 'entities.urls': { $exists: true, $not: { $size: 0 } } });
  } else {
    dbPromise.find({ 'entities.urls': { $eq: [] } });
  }
  resolve();
});
