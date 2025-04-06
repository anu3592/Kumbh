const initialState = [];

const passPopupItem = (state=initialState, action) =>{
    switch(action.type){
        case "PASSPOPUP":
            return [...state, action.payload];
        default:
            return state;
    }
}

export default passPopupItem;