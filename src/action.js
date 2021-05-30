import exportedData from "./productData.json";


export const GET_PRODUCTS = "GET_PRODUCTS";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const addData = {
    type: GET_PRODUCTS,
    payload: exportedData.data
};

export const editData = (id,newState) => {
    return {
        type: UPDATE_PRODUCT,
        id,
        newState
    };
}
