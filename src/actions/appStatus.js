/**
 * App Status redux actions
 */

export const SET_FETCHING_DATA = 'SET_FETCHING_DATA';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const SET_ERROR = 'SET_ERROR';

/**
 * Flag an authentication error
 * @param {boolean} authError
 */
export function setAuthError(authError) {
  return { type: SET_AUTH_ERROR, authError };
}

/**
 * Flag a query error
 * @param {boolean} error
 */
export function setError(error) {
  return { type: SET_ERROR, error };
}

/**
 * Flag that data is being fetched, or is done fetching
 * @param {boolean} fetchingData
 */
export function setFetchingData(fetchingData) {
  return { type: SET_FETCHING_DATA, fetchingData };
}
