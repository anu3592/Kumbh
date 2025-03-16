let initialState = [];

const showD = (state=initialState, action)=>
{
    switch(action.type)
    {
        case 'SHOW_DESC':
            return [...state,action.payload];
        default:
            return state;
    }
}

export default showD;