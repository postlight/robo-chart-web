export const SET_FETCHING_DATA = 'SET_FETCHING_DATA';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const SET_ERROR = 'SET_ERROR';

export function setAuthError(authError) {
  return { type: SET_AUTH_ERROR, authError };
}

export function setError(error) {
  return { type: SET_ERROR, error };
}

export function setFetchingData(fetchingData) {
  return { type: SET_FETCHING_DATA, fetchingData };
}
