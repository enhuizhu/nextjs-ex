import { apiResponse } from '../../utils/api.utils';

describe('util test', () => {
  it('api response object', () => {
    expect(apiResponse(true, {a: 1})).toEqual('{\"success\":true,\"data\":{\"a\":1}}');
  })
});