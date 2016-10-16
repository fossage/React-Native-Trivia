import Api from '../services/api-service';

export const FETCH_CATEGORIES     = 'FETCH_CATEGORIES';
export const FETCH_1980           = 'FETCH_1980';
export const FETCH_1990           = 'FETCH_1990';
export const FETCH_2000           = 'FETCH_2000';
export const FETCH_MODERN         = 'FETCH_MODERN';
export const LOGIN                = 'LOGIN';
export const SIGN_UP              = 'SIGN_UP';
export const LOADING              = 'LOADING';
export const UPDATE_CURRENT_SCORE = 'UPDATE_CURRENT_SCORE';
export const SET_USER             = 'SET_USER';

export {
  fetchCategories,
  fetch1980,
  fetch1990,
  fetch2000,
  fetchModern,
  login,
  signUp,
  setUser,
  loading,
  updateCurrentGameScore
};

function setUser(userData) {
  return {
    type: SET_USER,
    payload: userData
  };
}

function login(identifier, password) {
  const request = Api.post('auth/local', {
    identifier, 
    password
  });

  return {
    type: LOGIN,
    payload: request
  }
}

function signUp({username, email, password}) {
  const request = Api.post('auth/local/register', {
    username,
    email,
    password
  });

  return {
    type: SIGN_UP,
    payload: request
  }
}

function fetchCategories() {
  const request = Api.get('category', {limit: 20});

  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

function fetch1980() {
  const request = Api.get('category', {
    where: {
      airdate: { 
        '>': '1979-12-31 04:00:00',
        '<': '1990-01-01 04:00:00'
      }
    },
    limit: 20
  });

  return {
    type: FETCH_1980,
    payload: request
  };
}

function fetch1990() {
  const request = Api.get('category', {
    where: {
      airdate: { 
        '>': '1989-12-31 04:00:00',
        '<': '2000-01-01 04:00:00'
      }
    },
    limit: 20
  });

  return {
    type: FETCH_1990,
    payload: request
  };
}

function fetch2000() {
  const request = Api.get('category', {
    where: {
      airdate: { 
        '>': '1999-12-31 04:00:00',
        '<': '2008-01-01 04:00:00'
      }
    },
    limit: 20
  });

  return {
    type: FETCH_2000,
    payload: request
  };
}

function fetchModern() {
  const request = Api.get('category', {
    where: {
      airdate: { 
        '>': '2008-01-01 04:00:00',
        '<': '2016-01-01 04:00:00'
      }
    },
    limit: 20
  });

  return {
    type: FETCH_MODERN,
    payload: request
  };
}

function loading(val) {
  return {
    type: LOADING,
    payload: val
  }
}

function updateCurrentGameScore(val) {
  return {
    type: UPDATE_CURRENT_SCORE,
    payload: val
  };
}