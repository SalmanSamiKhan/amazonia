import { createContext, useReducer, useState} from "react";

/**
 * Context - Context provides a way to pass data through the component tree
 * without having to pass props down manually at every level.
 * Store - A store holds the whole state tree of your application
 */

export const Store = createContext();


// Initial state for logged user info and cart
const initialState = {

    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,

    cart: {
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
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
 * 6. Return state, 1. inside cart update state
 * 7. return all item except current one that is to be removed
 * 8. Saving state in browser local storage memory,
 * after refresh get the actual state
 * convert cartItems into string and save it to 'cartItems
*/
function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            const newItem = action.payload // --- (1)
            const existItem = state.cart.cartItems.find(
                (item) => item._id === newItem._id) // --- (2)
            const cartItems =
                existItem ? // --- (3)
                    state.cart.cartItems.map(item =>  // --- (4) 
                        item._id === existItem._id ? newItem : item
                    )
                    : [...state.cart.cartItems, newItem] // --- (5)
            localStorage.setItem('cartItems', JSON.stringify(cartItems)) // --- (8)
            return { ...state,  cart: { ...state.cart, cartItems } } // --- (6)

        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter(
                (item) => item._id !== action.payload._id // --- (7)
            )
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } }
        }
        case 'USER_SIGNIN':
            return { ...state, userInfo: action.payload };
        case 'USER_SIGNOUT':
            return {
                ...state,
                userInfo: null,
                cart:{
                    cartItems:[],
                    shippingAddress:{}      
                }
            };
        case 'SAVE_SHIPPING_ADDRESS':
            return{
                ...state,
                cart:{
                    ...state.cart,
                    shippingAddress:action.payload
                }
            }
        default:
            return state;
    }
}
/**
 * 1. The <Provider> component makes the Redux store 
 * available to any nested components.
 * 2. props. children is a special prop, 
 * automatically passed to every component,
 */

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch }
    return (
        <Store.Provider value={value}>{props.children}</Store.Provider>
    )
}