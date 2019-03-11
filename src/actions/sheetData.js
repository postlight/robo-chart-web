/**
 * Sheet data redux actions
 */

export const SET_SHEET_ID = 'SET_SHEET_ID';
export const SET_SHEET_DATA = 'SET_SHEET_DATA';
export const SET_ACTIVE_SHEET = 'SET_ACTIVE_SHEET';
export const SET_START_AND_END = 'SET_START_AND_END';
export const RESET_SHEET_DATA = 'RESET_SHEET_DATA';

/**
 * Set raw sheet data
 * @param {object} data
 */
export function setSheetData(data) {
  return { type: SET_SHEET_DATA, data };
}

/**
 * Set start and end cells
 * e.g.: A5, E15
 * @param {object} data
 */
export function setStartAndEnd(data) {
  return { type: SET_START_AND_END, data };
}

/**
 * Set sheet id, found in Google sheet urls
 * e.g.: 1RE_JYUCXBXY2LNV5Tp5GegLnMue-CpfTVMxjdudZ8Js
 * @param {string} sheetId
 */
export function setSheetId(sheetId) {
  return { type: SET_SHEET_ID, sheetId };
}

/**
 * Set active sheet
 * @param {string} activeSheet
 */
export function setActiveSheet(activeSheet) {
  return { type: SET_ACTIVE_SHEET, activeSheet };
}

/**
 * Reset sheet data
 * @param {string} activeSheet
 */
export function resetSheetData() {
  return { type: RESET_SHEET_DATA };
}
