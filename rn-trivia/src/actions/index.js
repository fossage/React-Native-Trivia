import Api from '../services/api-service';

export const FETCH_CATEGORIES     = 'FETCH_CATEGORIES';
export const FETCH_1980           = 'FETCH_1980';
export const FETCH_1990           = 'FETCH_1990';
export const FETCH_2000           = 'FETCH_2000';
export const FETCH_MODERN         = 'FETCH_MODERN';
export const LOADING              = 'LOADING';
export const UPDATE_CURRENT_SCORE = 'UPDATE_CURRENT_SCORE';

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
        '>': '1980-11-01 04:00:00',
        '<': '2000-01-01 04:00:00'
      }
    },
    limit: 20
  });

  return {
    type: FETCH_1980,
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

export {
  fetchCategories,
  fetch1980,
  loading,
  updateCurrentGameScore
};