import exportedData from "./productData.json";

export const ADD_DATA = "ADD_DATA";
export const addData = {
      type: ADD_DATA,
      payload: exportedData.data
};
export default addData;