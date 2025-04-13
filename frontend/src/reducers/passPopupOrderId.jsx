const initialState = {
    orderId: null,
};

const passPopupOrderId = (state=initialState, action)=>{
    switch(action.type)
    {
        case "ORDERID":
            return {
                orderId: action.payload
            };

        default:
            return state;
    }
}

export default passPopupOrderId;