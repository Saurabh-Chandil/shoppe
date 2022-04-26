import { Items } from "../mock/Items";
import { Item } from "../models/Item";
import { ShoppingActionType } from "../models/ShoppingActionType";

const reducer = (state: Item[] = Items, action: ShoppingActionType) => {
    switch (action.type) {
        case "ADD_ITEM":
            return [ ...state, action.payload ];
        case "REMOVE_ITEM" :
            return state.filter(item => item.productId !== action.payload.productId)
        default:
            return state;
    }
}

export default reducer