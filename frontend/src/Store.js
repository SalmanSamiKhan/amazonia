import { createContext, useReducer } from "react";

/**
 * Context - Context provides a way to pass data through the component tree without having to pass props down manually at every level.
 * Store - A store holds the whole state tree of your application
 */

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: []
    }
}

/**
 * Prevent adding duplicate product on cart
 * instead increase quantity if user tries to add a product multiple times
 * 1. Item that we are trying to add to cart
 * 2. Check if item already in cart or not, if yes put it in existItem variable 
 * 3. If item already in cart,
 * 4. use map item on cartItems to update current item with new item
 * 5. If its a new item add it to the end of the array
*/
function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            const newItem = action.payload // --- (1)
            const existItem = state.cart.cartItems.find(
                (item) => item._id === newItem._id) // --- (2)
            const cartItems = existItem // --- (3)
                ? state.cart.cartItems.map(item =>  // --- (4) 
                    item._id === existItem._id ? newItem : item
                )
                : [...state.cart.cartItems, newItem] // --- (5)
            return { ...state, cart: { ...state.cart, cartItems } }
        default:
            return state;
    }
}

/**
 * The <Provider> component makes the Redux store available to any nested components 
 * props. children is a special prop, automatically passed to every component,
 */

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch }
    return (
        <Store.Provider value={value}>{props.children}</Store.Provider>
    )
}