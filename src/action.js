
export const GET_PRODUCTS = "GET_PRODUCTS";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const addData =(payload)=> ({
    type: GET_PRODUCTS,
    payload
});

export const editData = (payload) => {
    return {
        type: UPDATE_PRODUCT,
        payload
    };
}
