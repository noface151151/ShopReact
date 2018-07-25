import * as actionTypes from './actionTypes';



export const ShoppingCart_Add = (shoppingCart,id) => {
    return {
        type: actionTypes.SHOPPINGCART_ADD,
        shoppingCart: shoppingCart,
        id:id,
        key:id
    }
}

export const ShoppingCart_Update = (quantity,totalPrice,id) => {
    return {
        type: actionTypes.SHOPPINGCART_UPDATE,
        quantity: quantity,
        totalPrice:totalPrice,
        id:id
    }
}

export const ShoppingCart_Delete =(id)=>{
    return{
        type:actionTypes.SHOPPINGCART_DELETE,
        id:id
    }
}

export const ShoppingCart_DeleteAll=()=>{
    return{
        type:actionTypes.SHOPPINGCART_DELETE_ALL
    }
}