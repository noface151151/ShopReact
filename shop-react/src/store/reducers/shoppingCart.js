import * as actionTypes from '../actions/actionTypes';

const initState = {
    shoppingCarts: [],
    totalPrice: 0,
    totalQuantity: 0
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SHOPPINGCART_ADD:
            const newShoppingCart = {
                ...action.shoppingCart,
                id: action.id,
                key:action.key
            }
            return {
                ...state,
                shoppingCarts: state.shoppingCarts.concat(newShoppingCart),
                totalPrice: state.totalPrice + newShoppingCart.totalPrice,
                totalQuantity: state.totalQuantity + newShoppingCart.quantity
            }
        case actionTypes.SHOPPINGCART_UPDATE:
            const shoppingCartUpdate = state.shoppingCarts[action.id];
            shoppingCartUpdate.quantity = action.quantity;
            shoppingCartUpdate.totalPrice=action.totalPrice;
            const shoppingCarts = [...state.shoppingCarts];
            shoppingCarts[action.id] = shoppingCartUpdate;

            return {
                ...state,
                shoppingCarts: shoppingCarts,
                totalPrice: shoppingCarts.map(shoppingcart => {
                    return shoppingcart.totalPrice
                }).reduce((sum, el) => {
                    return sum + el;
                }, 0),
                totalQuantity: shoppingCarts.map(shoppingcart => {
                    return shoppingcart.quantity
                }).reduce((sum, el) => {
                    return sum + el;
                }, 0)
            }
        case actionTypes.SHOPPINGCART_DELETE:
            const shoppingCartsNew = [...state.shoppingCarts];
            console.log(action.id)
            shoppingCartsNew.splice(action.id, 1);
            console.log(shoppingCartsNew)
            return {
                ...state,
                products: action.products,
                shoppingCarts: shoppingCartsNew,
                totalPrice: shoppingCartsNew.map(shoppingcart => {
                    return shoppingcart.totalPrice
                }).reduce((sum, el) => {
                    return sum + el;
                }, 0),
                totalQuantity: shoppingCartsNew.map(shoppingcart => {
                    return shoppingcart.quantity
                }).reduce((sum, el) => {
                    return sum + el;
                }, 0)
            }
        case actionTypes.SHOPPINGCART_DELETE_ALL:          
            return {
                ...state,
                products: action.products,
                shoppingCarts: [],
                totalPrice: 0,
                totalQuantity: 0
            }
        default:
            return state;
    }
}

export default reducer;