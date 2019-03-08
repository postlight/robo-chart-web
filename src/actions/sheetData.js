export const SET_SHEET_ID = 'SET_SHEET_ID';
export const SET_SHEET_DATA = 'SET_SHEET_DATA';
export const SET_ACTIVE_SHEET = 'SET_ACTIVE_SHEET';
export const SET_START_AND_END = 'SET_START_AND_END';
export const RESET_SHEET_DATA = 'RESET_SHEET_DATA';

export function setSheetData(data) {
  return { type: SET_SHEET_DATA, data };
}

export function setStartAndEnd(data) {
  return { type: SET_START_AND_END, data };
}

export function setSheetId(sheetId) {
  return { type: SET_SHEET_ID, sheetId };
}

export function setActiveSheet(activeSheet) {
  return { type: SET_ACTIVE_SHEET, activeSheet };
}

export function resetSheetData() {
  return { type: RESET_SHEET_DATA };
}
