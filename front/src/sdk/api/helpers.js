import { methods } from './configs';

export default class Helpers {
    static queryParams(params = {}) {
	    const query = Object.keys(params)
	        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
	        .join('&');
        return query;
    }

    static parseOptions({
        method, headers, url, data, queryData
    }) {
        let parsedUrl = url,
            query,
            body;
        if (method === methods.GET) {
            query = Helpers.queryParams(queryData);
            parsedUrl += `?${query}`;
        } else {
            body = JSON.stringify(data);
        }
        const options = {
            parsedUrl,
            requestOptions: {
                method,
                body,
                headers
            }
        };
        return options;
    }

    static async parseResponse(response) {
        let errMsg;
        try {
            if (response.status >= 200 && response.status < 300) {
                return await response.json();
            }
            const data = await response.json();
            errMsg = data.message;
        } catch (err) {
            errMsg = err.message;
        }
        throw new Error(errMsg);
    }
}
