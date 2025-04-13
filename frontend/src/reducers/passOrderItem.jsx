const initialState = [];

const passOrderItem = (state=initialState, action)=>{
    switch(action.type){
        case "ORDER":
            return [...state, action.payload];
        default:
            return state;
    }
}

export default passOrderItem;