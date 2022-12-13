import { createContext, useReducer } from "react";

const initialState = {
    cart:{
        cartItems:[]
    }
}

function reducer(state,action){
    switch (action.type) {
        case 'CART_ADD_ITEM':
            //
            return{
                ...state,
                cart:{
                    ...state.cart,
                    cartItems:[...state.cart.cartItems, action.payload]
                }
            }
    
        default:
            return state;
    }
}

/**
 * Context - Context provides a way to pass data through the component tree without having to pass props down manually at every level.
 * 
 * Store - A store holds the whole state tree of your application
 * 
 * The <Provider> component makes the Redux store available to any nested components 
 * 
 * props. children is a special prop, automatically passed to every component,
 */

export const Store = createContext();

export function StoreProvider(props){
    const [state,dispatch] = useReducer(reducer,initialState)
    const value = {state,dispatch}
    return(
        <Store.Provider value={value}>{props.children}</Store.Provider>
    )
}