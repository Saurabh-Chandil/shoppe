import { Item } from "./Item";

export interface ShoppingActionType {
    type: String;
    payload: Item;
}