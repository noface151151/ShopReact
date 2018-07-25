import * as actionTypes from './actionTypes';

export const setSelectedKey=(key)=>{
    return{
        type: actionTypes.SET_SELECTED_KEY,
        key:key
    }
}