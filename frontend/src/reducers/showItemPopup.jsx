const initialState = false;

const showItemPopup = (state=initialState, action)=>{
    switch(action.type)
    {
        case "POPUP":
            return !state;
        default:
            return state;
    }
}

export default showItemPopup;