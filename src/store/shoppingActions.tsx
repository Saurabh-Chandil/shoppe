import { Item } from "../models/Item";
import { ShoppingActionType } from "../models/ShoppingActionType";

export function addItem(data: Item): ShoppingActionType {  
    return {  
        type: 'ADD_ITEM',
        payload: data,
    };  
};

export function removeItem(data: Item): ShoppingActionType {  
    return {  
        type: 'REMOVE_ITEM',
        payload: data,
    };    
};
