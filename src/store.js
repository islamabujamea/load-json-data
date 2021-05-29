import { createStore} from 'redux';
const initailState={
    data:[],
}
const rootReducer=(state=initailState,action)=>{
    switch(action.type){
        case 'GET_PRODUCTS':
            return{
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}

export default createStore(rootReducer)