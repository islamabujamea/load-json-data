import { createStore } from 'redux';

const initailState = {
    data: [],
}
const rootReducer = (state = initailState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                data: action.payload
            }
        case 'UPDATE_PRODUCT':
            console.log("reducer update",action);
            const productId = action.id;
            var newState = action.newState;
            state.data.map(val => {
                if(val._id === productId) {
                    val = newState;
                }
            })
            break;
        default:
            return state;
    }
}

export default createStore(rootReducer)