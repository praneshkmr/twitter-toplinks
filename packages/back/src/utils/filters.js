import each from 'async/each';

import { PAGE, SIZE } from '../constants/filters/pagination';

export const AddFilters = (dbPromise, req, validFilters = [], filterMap = {}) => new Promise((resolve, reject) => {
  const queryParams = Object.keys(req.query);
  each(queryParams, (queryParam, callback) => {
    const filtersList = [...validFilters, SIZE, PAGE];
    if (filtersList.indexOf(queryParam) === -1) {
      callback(new Error(`Invalid Query Param: ${queryParam}`));
    } else {
      const filterFn = filterMap[queryParam];
      if (filterFn) {
        filterFn(dbPromise, req).then(callback).catch((err) => callback(err));
      } else {
        callback();
      }
    }
  }, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

export const AddPagination = (dbPromise, req) => new Promise((resolve) => {
  const { query } = req;
  const size = query.size || 10;
  const page = Math.max(0, query.page);
  dbPromise.limit(size).skip(size * page);
  resolve();
});
