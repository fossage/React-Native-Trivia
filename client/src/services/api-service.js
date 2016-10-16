import Store from './store-service';

export default class Api {
  static config({
    serverRoot,
    apiRoute = '', 
    responseType = 'json', 
    basicAuthUser = null, 
    basicAuthPassword = null,
    strapi = true
  }) {    
    Object.defineProperties(this, {
      serverRoot: {
        value: serverRoot
      },

      apiRoot: {
        value: `${serverRoot}/${apiRoute}`
      },

      responseType: {
        value: responseType
      },

      basicAuthUser: {
        value: basicAuthUser
      },

      basicAuthPassword: {
        value: basicAuthPassword
      },

      strapi: {
        value: strapi
      },

      configured: {
        value: true
      },

      jwt: {
        value: '',
        configurable: true
      }
    });
  }

  static setJWT(val) {
    Object.defineProperty(this, 'jwt', { 
      value: val, 
      configurable: true
    });
  }

  static get(path, queryParams = null) {
    (this.jwt) || (this.jwt = _getToken());

    if(queryParams) path += _parseQueryParams(queryParams, this.strapi);

    const fullPath = this.apiRoot + path;
    const init = {
      headers: {
        'Bearer': this.jwt
      }
    };
    
    return fetch(fullPath, init)
    .then(_handleErrors.bind(this))
    .then(resp => resp[this.responseType]());
  }

  static post(path, body, type='application/json') {
    (this.jwt) || (this.jwt = _getToken());

    const fullPath = this.apiRoot + path;
    const request = new Request(fullPath, {
      method: 'POST', 
      body: JSON.stringify(body),
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Bearer': this.jwt
      },
    });

    return fetch(request)
    .then(_handleErrors.bind(this))
    .then(response => response[this.responseType]());
  }
}

/*============================================
              PRIVATE FUNCTIONS
============================================*/
function _getToken() {
  return Store
  .load({key: 'user'})
  .then(data => data.jwt)
  .catch(e => '');
}

function _handleErrors(response) {
  if(!response.ok) {
    const err = response.statusText 
      ? { message: response.statusText } 
      : response[this.responseType]();

    return Promise.reject(err)

  }
  return response;
}

function _handleErrorMessage(data) {
  if(!response.ok) throw Error(data.message);
  return data;
}

function _parseQueryParams(rawParams, useStrapi) {
  let queryKeys = Object.keys(rawParams);
  let queryNames = queryKeys.map(key => {
    let keyArr = key.split(/(?=[A-Z])/);
    
    keyArr.forEach((keySection, idx) => {
      keyArr[idx] = keySection.toLowerCase();
    });
    
    return keyArr.join('_');
  });

  let qp = '?';

  queryKeys
  .forEach((key, idx) => {
    let separator = idx > 0 ? '&' : '';
    let val = (key === 'where' && useStrapi) ? JSON.stringify(rawParams[key]) : rawParams[key];
    qp += separator + key + '=' + val;
  });

  return qp;
}