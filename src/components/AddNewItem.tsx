import React, { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Select from 'react-select'
import { Item } from '../models/Item'
import '../styles/ShoppingHistory.css'
import '../styles/AddNewItem.css'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem } from '../store/shoppingActions'
import { storeOptions } from '../mock/StoreNames'
import { Store } from '../models/Store'
import date from 'date-and-time';

function AddNewItem() {
  const items = useSelector((state: Item[]) => state);
  const dispatch: any = useDispatch();
  const productNameRef = useRef<HTMLInputElement>(null);
  const storeNameRef = useRef<any>(null);
  
  const [ actionSuccess, setActionSuccess ] = useState<boolean>(false)
  const [ message, setMessage ] = useState<string>('')
  
  // Delete item from cart
  const deleteItem = (item: Item) => {
    dispatch(removeItem(item))
    setActionSuccess(true)
    setMessage(`${item.productName} with product id  ${item.productId} has been deleted successfully`)
  }

  // Parse date
  const parseDate = (dateStringFromStore: string) => {
    return date.parse(dateStringFromStore, 'YYYY-MM-DD HH:mm:ss').toString()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let storeURL
    if(productNameRef.current?.value !== '' && storeNameRef.current?.state.ariaSelection !== null) {

      switch (storeNameRef.current?.state.ariaSelection.value.label) {
        case 'Puma':
          storeURL = 'https://in.puma.com/'
          break;
        case 'HM':
          storeURL = 'https://www2.hm.com/en_in/index.html'
          break;  
        case 'Levi':
          storeURL = 'https://www.levi.in/'
          break;
        default:
            break;
      }

      let item: Item = {
        "dateTimeOfPurchase": date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        "productId": uuidv4(),
        "productName": productNameRef.current?.value,
        "storeName": storeNameRef.current?.state.ariaSelection.value.label,
        "storeURL": storeURL,
      }
      dispatch(addItem(item))
    }
  }

  return (
    <>
      <div><h1><i>Add New Item</i></h1></div>
      <div className="shopping-history-table" style={{width: "40%"}}>
        <table>
          <thead>
            <tr>
              <th>Date of Purchase</th>
              <th>Product Name</th>
              <th>Store Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              items.length ? items.map((item) => { 
                return (
                  <tr key={item.productId as React.Key}>
                    <td>{parseDate(item.dateTimeOfPurchase)}</td>
                    <td>{item.productName}</td>
                    <td>{item.storeName}</td>
                    <td><button onClick={() => deleteItem(item) }>Delete</button></td>
                  </tr>
              )}) : <tr style={{color: "red"}}><td>No items in cart</td></tr>
            }
          </tbody>
        </table>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
          <div className='add-item-form'>
            <input type="text" ref={productNameRef} style={{marginRight: "2rem"}}/>
            <Select<Store>
            ref={storeNameRef}
            options={storeOptions} />
            <button type='submit' style={{width: "5rem", marginLeft: "2rem"}}>Add</button>
          </div>
      </form>
      { actionSuccess && <div className='action-message'><span>{message}</span></div> }
    </>
  )
}

export default AddNewItem