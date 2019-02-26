export const SET_SHEET_ID = 'SET_SHEET_ID';
export const SET_SHEET_DATA = 'SET_SHEET_DATA';
export const SET_ACTIVE_SHEET = 'SET_ACTIVE_SHEET';

export function setSheetData(data) {
  return { type: SET_SHEET_DATA, data };
}

export function setSheetId(sheetId) {
  return { type: SET_SHEET_ID, sheetId };
}

export function setActiveSheet(activeSheet) {
  return { type: SET_ACTIVE_SHEET, activeSheet };
}
