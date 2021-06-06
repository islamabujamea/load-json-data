import { createStore } from 'redux';

const initailState = {
    data: [],
    selectedProduct: null
}
const rootReducer = (state = initailState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                data: action.payload
            }
        case 'UPDATE_PRODUCT':
            const pID = action.payload.id;
            console.log('id is', action.payload.id)
            const foundIndx = state.data.findIndex(it => it._id === pID);
            const clonedDat = [...state.data];
            clonedDat[foundIndx] = {
                ...clonedDat[foundIndx],
                product_name: action.payload.name
            }
            console.log("clonedDat", clonedDat);

            return {
                ...state,
                data: clonedDat,
                selectedProduct: clonedDat[foundIndx]
            }

        case 'UPDATE_SELECTED_PROD':
            const proId = action.payload;
            console.log('id is', proId, 'data', state.data)
            const foundIndx1 = state.data.findIndex(it => it._id === Number(action.payload));
            console.log('data[foundIndx1]', state.data[foundIndx1], 'foundIndx1', foundIndx1)

            return {
                ...state,
                selectedProduct: state.data[foundIndx1]
            }
        default:
            return state;
    }
}

export default createStore(rootReducer)