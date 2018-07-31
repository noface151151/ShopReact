import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const Product_GetList_Start = () => {
    return {
        type: actionTypes.PRODUCT_GETLIST_START
    }
}

export const Product_GetList_Success = (products) => {
    return {
        type: actionTypes.PRODUCT_GETLIST_SUCCESS,
        products: products
    }
}

export const Product_GetList_Fail = (error) => {
    return {
        type: actionTypes.PRODUCT_GETLIST_FAIL,
        error: error
    }
}

export const Product_GetList = () => {
    return dispatch => {
        dispatch(Product_GetList_Start());
        axios
            .get('/Products.json')
            .then(resp => {
                const fetchedProducts = [];
                for (let key in resp.data) {
                    if(resp.data[key]){
                        fetchedProducts.push({
                            ...resp.data[key],
                            id: key,
                            key:key
                        });
                    }
                }
                dispatch(Product_GetList_Success(fetchedProducts));
            })
            .catch(error=>{
                console.log(error);
                dispatch(Product_GetList_Fail(error))
            })
    }
}

export const Product_Add_Start=()=>{
    return{
        type:actionTypes.PRODUCT_ADD_START
    }
}

export const Product_Add_Fail=(error)=>{
    return{
        type:actionTypes.PRODUCT_ADD_FAIL,
        error:error
    }
}

export const Product_Add_Success=()=>{
    return{
        type:actionTypes.PRODUCT_ADD_SUCCESS
    }
}
export const Product_Add_End=()=>{
    return{
        type:actionTypes.PRODUCT_ADD_END
    }
}

export const Product_Add=(product)=>{
    return dispatch => {
        dispatch(Product_Add_Start());
        axios
            .post('/Products.json',product)
            .then(resp => {
                dispatch(Product_Add_Success());
             //   dispatch(Product_GetList());
            })
            .catch(error=>{
                console.log(error);
                dispatch(Product_Add_Fail(error))
            })
    }
}