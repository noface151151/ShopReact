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
                            id: key
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