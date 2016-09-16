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
      }
    });
  }

  static get(path, queryParams = null) {
    if(queryParams) {
      let queryKeys = Object.keys(queryParams);
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
        let val = (key === 'where' && this.strapi) ? JSON.stringify(queryParams[key]) : queryParams[key];
        qp += separator + key + '=' + val;
      });

      path += qp;
    }

    const fullPath = this.apiRoot + path;
    
    return fetch(fullPath)
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
    const fullPath = this.apiRoot + path;
    const headers = new Headers({"Content-Types": type});
    
    const init = {
      method: 'POST',
      body,
      headers
    };

    return fetch(fullPath, init)
    .then(response => response[this.responseType])
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