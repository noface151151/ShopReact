import * as actionTypes from '../actions/actionTypes';

const initState={
    orders:[],
    loading:false,
    isComplete:false
}

const reducer=(state=initState,action)=>{
    switch (action.type){
        case actionTypes.ORDER_ADD_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.ORDER_ADD_SUCCESS:
            return{
                ...state,
                loading:false,
                isComplete:true
            }
        case actionTypes.ORDER_ADD_FAIL:
            return{
                ...state,
                products:action.products,
                loading:false,
                isComplete:false
            }
        default:
            return state;
    }
}

export default reducer;