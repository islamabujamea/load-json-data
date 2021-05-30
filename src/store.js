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
            // const newsletterID = action.payload;
            // var newsletterToEdit = {};
            // state.newsletters.map(newsletter => {
            //     if(newsletter._id == newsletterID) {
            //         newsletterToEdit = newsletter;
            //     }
            // })
            break;
        default:
            return state;
    }
}

export default createStore(rootReducer)