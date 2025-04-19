const initialState = false;

const showAddressPopup = (state=initialState, action)=>{
    switch(action.type)
    {
        case "POPUP2":
            return !state;
        default:
            return state;
    }
}

export default showAddressPopup;