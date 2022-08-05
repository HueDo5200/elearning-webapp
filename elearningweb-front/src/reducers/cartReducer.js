import { ADD_TO_CART, SAVE_CART, REMOVE_FROM_CART } from "../actions/types";

 const initialState = {
    cart: [],
    message: "Add to cart successfully!",
    numberAdd: 0,
}
// export const getBasketTotal = (cart) => cart?.reduce((amount, item) => item.price + amount, 0);
const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            const ind = state.cart.findIndex((item) => item.id === action.item.id);
            let increment = 0;
            console.log("index " + ind);
            if(ind >= 0) {
                increment = state.numberAdd;
                return {
                    ...state, 
                    numberAdd: increment,
                    cart: [...state.cart]
                } 
            } else {
                increment = state.numberAdd + 1;
            return {
                ...state, 
                numberAdd: increment,
                cart: [...state.cart, action.item]
            };
        }
        case 'INCREMENT_ITEM':
          
            const exIndex = state.cart.findIndex((item) => item.id === action.payload.id);
            let number = 0;
           
            let copyCart = [...state.cart];
            if(exIndex >= 0) {
                number = state.numberAdd;
              
            } else {
                copyCart = [...state.cart, action.payload]
                number = state.numberAdd + 1;
               
            }
           
            return {
                ...state,
                cart: copyCart,
                numberAdd: number,
               
            }

        case 'EMPTY_CART':
            return {
                ...state,
                cart: [],
                numberAdd: 0,
            }
        case REMOVE_FROM_CART:
           
            const index = state.cart.findIndex((item) => item.id === action.id);
            
            let newCart = [...state.cart];
            if(index >= 0) {
                newCart.splice(index, 1);
                console.log(newCart);
            } else {
                console.warn('Cant remove from cart');
            }
            const exNumber = state.numberAdd;
            return {
               cart: newCart,
               numberAdd: exNumber - 1,
               
            }
        
        case SAVE_CART:
            return {
                ...state,
                message: action.payload
            }
        case 'SET_CART':
           
            return {
                ...state,
                cart: action.payload,
            }
        case 'SET_NUMBER': 
        return {
            ...state,
            numberAdd: 0,
        }
        default: 
        return state;
    }
   
}
export default cartReducer;