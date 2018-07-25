import * as actionTypes from '../actions/actionTypes';


const initState={
   
    itemSelected:["0"]

}

const reducer=(state=initState,action)=>{
    switch (action.type){
        case actionTypes.SET_SELECTED_KEY:
            const itemSelectedUpdate=[action.key];
            return{
                ...state,
                itemSelected:itemSelectedUpdate
            }
        
        default:
            return state;
    }
}

export default reducer;