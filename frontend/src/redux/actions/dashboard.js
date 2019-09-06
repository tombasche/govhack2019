import { BACKEND_API_URL } from '../../config';

export const FETCH_DATA = "FETCH_DATA";
export const UPDATE_DATA = "UPDATE_DATA";

export function fetchData() {
  return {
    type: FETCH_DATA,
    meta: {
      endpoint: `${BACKEND_API_URL}/endpoint`,
      success: updateData,
    },
  }
}

export function updateData(response) {
  return {
    type: UPDATE_DATA,
    payload: response
  }
}
