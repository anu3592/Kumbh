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