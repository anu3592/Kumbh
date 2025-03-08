import { combineReducers } from "redux";
import changeStatus from "./changeCartStatus";
import showD from "./showDescription";
import { passCart } from "../actions";
import passCartItem from "./passCartItem";

const rootReducer = combineReducers({
    changeStatus,
    showD,
    passCartItem
})

export default rootReducer;