export const showStatus = ()=>{
    return {
        type: "CHANGE"
    }
}

export const showDesc = (item)=>{
    return {
        type: 'SHOW_DESC',
        payload: item
    }
}

export const passCart = (item)=>{
    return {
        type: 'CART',
        payload: item
    }
}

export const passOrder = (item)=>{
    return {
        type: 'ORDER',
        payload: item
    }
}

export const showPopup = ()=>{
    return {
        type: 'POPUP'    
    }
}

export const showPopup2 = ()=>{
    return {
        type: 'POPUP2'    
    }
}

export const passPopup = (item)=>{
    return{
        type: 'PASSPOPUP',
        payload: item
    }
}

export const passPopupOrderId = (id)=>{
    return{
        type: 'ORDERID',
        payload: id
    }
}

export const passPopupAddress = (address)=>{
    return{
        type: 'ADDRESS',
        payload: address
    }
}