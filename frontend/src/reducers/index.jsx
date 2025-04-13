import { combineReducers } from "redux";
import changeStatus from "./changeCartStatus";
import showD from "./showDescription";
import { passCart } from "../actions";
import passCartItem from "./passCartItem";
import passOrderItem from "./passOrderItem";
import showItemPopup from "./showItemPopup";
import passPopupItem from "./passPopupItem";

const rootReducer = combineReducers({
    changeStatus,
    showD,
    passCartItem,
    passOrderItem,
    showItemPopup,
    passPopupItem
})

export default rootReducer;