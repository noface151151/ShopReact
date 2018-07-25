import * as actionTypes from './actionTypes';
import * as action from './index';
import axios from '../../axios-order';

export const Order_Add_Start=()=>{
    return{
        type:actionTypes.ORDER_ADD_START
    }
}

export const Order_Add_Success=()=>{
    return{
        type:actionTypes.ORDER_ADD_SUCCESS
    }
}

export const Order_Add_Fail=(error)=>{
    return{
        type:actionTypes.ORDER_ADD_FAIL
    }
}

export const Order_Add=(orderData)=>{
    return dispatch=>{
        dispatch(Order_Add_Start());
        axios.post('/orders.json',orderData)
            .then(resp=>{
                dispatch(Order_Add_Success());
                dispatch(action.ShoppingCart_DeleteAll());
            })
            .catch(err=>{
                dispatch(Order_Add_Fail(err))
            })
    }
}