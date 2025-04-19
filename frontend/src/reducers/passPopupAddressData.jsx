const initialState = {
    address: null,
}

const passPopupAddressData = (state=initialState, action)=>{
    switch(action.type)
    {
        case "ADDRESS":
            return{
                address: action.payload
            };
        default:
            return state;
    }
}

export default passPopupAddressData;