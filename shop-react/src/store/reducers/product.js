import * as actionTypes from '../actions/actionTypes';

const initState={
    products:[],
    loading:false
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
        default:
            return state;
    }
}

export default reducer;