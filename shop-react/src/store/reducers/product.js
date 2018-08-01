import * as actionTypes from '../actions/actionTypes';

const initState={
    products:[],
    productSelected:null,
    loading:false,
    loadingAddEdit:false,
    isSuccess:false,
   //imageUrlSelected:null
}

const reducer=(state=initState,action)=>{
    switch (action.type){
        case actionTypes.PRODUCT_GETLIST_START:
            return{
                ...state,
                loading:true,
             //   imageUrlSelected:null
            }
        case actionTypes.PRODUCT_GETLIST_FAIL:
            return{
                ...state,
                loading:false,
            //    imageUrlSelected:null
            }
        case actionTypes.PRODUCT_GETLIST_SUCCESS:
            return{
                ...state,
                products:action.products,
                loading:false,
            //    imageUrlSelected:null
            }
        case actionTypes.PRODUCT_ADD_START:
            return{
                ...state,
                loadingAddEdit:true,
             //   imageUrlSelected:null
            }
        case actionTypes.PRODUCT_ADD_FAIL:
            return{
                ...state,
                loadingAddEdit:false,
            //    imageUrlSelected:null
            }
        case actionTypes.PRODUCT_ADD_SUCCESS:
            return{
                ...state,
                loadingAddEdit:false,
                isSuccess:true,
             //   imageUrlSelected:null
            }
        case actionTypes.PRODUCT_ADD_END:
            return{
                ...state,
                loadingAddEdit:false,
                isSuccess:false,
             //   imageUrlSelected:null
            }

            case actionTypes.PRODUCT_UPDATE_START:
            return{
                ...state,
                loadingAddEdit:true,
              //  imageUrlSelected:null
            }
        case actionTypes.PRODUCT_UPDATE_FAIL:
            return{
                ...state,
                loadingAddEdit:false,
               // imageUrlSelected:null
            }
        case actionTypes.PRODUCT_UPDATE_SUCCESS:
            return{
                ...state,
                loadingAddEdit:false,
                isSuccess:true,
               // imageUrlSelected:null
            }
        case actionTypes.PRODUCT_UPDATE_END:
            return{
                ...state,
                loadingAddEdit:false,
                isSuccess:false,
              //  imageUrlSelected:null
            }
        case actionTypes.PRODUCT_SELECTED:
            return{
                ...state,
                productSelected:action.product,
              //  imageUrlSelected:action.product.image
            }
        default:
            return state;
    }
}

export default reducer;