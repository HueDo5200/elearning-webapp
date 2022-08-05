import {CourseData} from '../src/data/CourseData';
export const initialState = {
    cart: [],
    user: null,
    courses: CourseData
  };
  
  // Selector
  export const getBasketTotal = (cart) => 
    cart?.reduce((amount, item) => item.price + amount, 0);
  
  const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case "ADD_TO_BASKET":
        return {
          ...state,
          cart: [...state.cart, action.item],
        };
      
      case 'EMPTY_BASKET':
        return {
          ...state,
          cart: []
        }
  
      case "REMOVE_FROM_BASKET":
        const index = state.cart.findIndex(
          (cartItem) => cartItem.id === action.id
        );
        let newCart = [...state.Cart];
  
        if (index >= 0) {
          newCart.splice(index, 1);
  
        } else {
          console.warn(
            `Cant remove product (id: ${action.id})`
          )
        }
  
        return {
          ...state,
          cart: newCart
        }
      
      case "SET_USER":
        return {
          ...state,
          user: action.user
        }
  
      default:
        return state;
    }
  };
  
  export default reducer;
  