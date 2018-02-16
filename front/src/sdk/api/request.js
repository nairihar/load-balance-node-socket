import Helpers from './helpers';
import { methods, defaults } from './configs';

const _private = new WeakMap();

export default async ({
  method = methods.POST,
  headers = defaults.headers,
  url,
  data = {},
  queryData = {}
}) => {
  const { requestOptions, parsedUrl } = Helpers.parseOptions({
      method, headers, url, data, queryData
  });

  const response = await fetch(parsedUrl, requestOptions);
  const responseData = await Helpers.parseResponse(response);
  return responseData;
};
