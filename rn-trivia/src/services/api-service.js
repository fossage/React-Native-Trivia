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
    .then(resp => resp[this.responseType]())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
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
    .then(response => response[this.responseType]())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
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