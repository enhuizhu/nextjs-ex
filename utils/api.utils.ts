import { isObject } from 'lodash';

export const apiResponse = (success, data) => {
  return JSON.stringify({
    success,
    data,
  });
}
