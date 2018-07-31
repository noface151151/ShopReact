import * as actionTypes from '../actions/actionTypes';

const initState={
    products:[],
    loading:false,
    loadingAddEdit:false,
    isSuccess:false
}

const reducer=(state=initState,action)=>{
    switch (action.type){
        case actionTypes.PRODUCT_GETLIST_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.PRODUCT_GETLIST_FAIL:
            return{
                ...state,
                loading:false
            }
        case actionTypes.PRODUCT_GETLIST_SUCCESS:
            return{
                ...state,
                products:action.products,
                loading:false
            }
        case actionTypes.PRODUCT_ADD_START:
            return{
                ...state,
                loadingAddEdit:true
            }
        case actionTypes.PRODUCT_ADD_FAIL:
            return{
                ...state,
                loadingAddEdit:false
            }
        case actionTypes.PRODUCT_ADD_SUCCESS:
            return{
                ...state,
                loadingAddEdit:false,
                isSuccess:true
            }
        case actionTypes.PRODUCT_ADD_END:
            return{
                ...state,
                loadingAddEdit:false,
                isSuccess:false
            }
        default:
            return state;
    }
}

export default reducer;