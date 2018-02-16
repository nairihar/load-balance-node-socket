import Helpers from './helpers';
import Request from './request';
import { methods, routes } from './configs';
import { servers } from '../../configs';

const apiUrl = `http://${servers.api.host}:${servers.api.port}`;

export default class ApiSdk {
  static signIn(data) {
    const url = `${apiUrl}${routes.signIn}`;
    return Request({
        url,
        data
    });
  }

  static signUp(data) {
    const url = `${apiUrl}${routes.signUp}`;
    return Request({
        url,
        data
    });
  }
}
