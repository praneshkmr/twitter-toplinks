export const GetQueryParams = (paramsObj) => {
  let result = '';
  Object.keys(paramsObj).forEach((key) => {
    const value = paramsObj[key];
    if (value) {
      if (result === '') {
        result += `${key}=${value}`;
      } else {
        result += `&${key}=${value}`;
      }
    }
  });
  return result;
};
