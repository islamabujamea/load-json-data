import exportedData from "./productData.json";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const addData = {
      type: GET_PRODUCTS,
      payload: exportedData.data
};
export default addData;