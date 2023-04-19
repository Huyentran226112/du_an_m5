import {SET_CART,GET_CART} from './action'


const initialState  = {
    cart: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART:
            return { ...state, cart: action.payload };
            break;
        default:
            return state;
    }
};

export default rootReducer;