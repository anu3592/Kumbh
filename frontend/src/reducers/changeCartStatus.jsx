const initialState = false;

const changeStatus = (state=initialState, action)=>{
    switch(action.type){
        case "CHANGE": return !state;
        default: return state;
    }
}

export default changeStatus; 