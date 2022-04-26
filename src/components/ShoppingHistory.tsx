import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import { Item } from '../models/Item';
import '../styles/ShoppingHistory.css'
import date from 'date-and-time';
import Select from 'react-select'
import { Store } from '../models/Store'
import { storeOptions } from '../mock/StoreNames'

function ShoppingHistory() {
  const items = useSelector((state: Item[]) => state);
  const parseDate = (dateStringFromStore: string) => { return date.parse(dateStringFromStore, 'YYYY-MM-DD HH:mm:ss').toString() }
  const productNameRef = useRef<HTMLInputElement>(null);
  const storeNameRef = useRef<any>(null);
  const dateTimePurchaseRef = useRef<HTMLInputElement>(null!);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let storeName = ''
    if(storeNameRef.current?.state.ariaSelection !== null) {
      storeName = storeNameRef.current?.state.ariaSelection.value.label
    }
    
    let filter: any = {
      dateTimeOfPurchase: dateTimePurchaseRef.current?.value,
      productName: productNameRef.current?.value,
      storeName: storeName
    }

    let users = items.filter((item) => {
      // TODO : implement search logic
    });
  }
  return (
    <>
      <div><h1><i>ShoppingHistory</i></h1></div>
      
        <form onSubmit={(e) => handleSearchSubmit(e)}> 
        <div className="search-bar">
          <label style={{marginRight: "1rem"}}>Date Time Of Purchase : </label>
          <input ref={dateTimePurchaseRef} type="date" id="date-time-purchase" name="date-time-purchase"/>
          
          <label style={{marginLeft: "5rem", marginRight: "1rem"}}>Product Name : </label>
          <input ref={productNameRef} type="text" id="product-name" name="product-name"/>

          <label style={{marginLeft: "5rem", marginRight: "1rem"}}>Store Name : </label>
          <Select<Store>
            ref={storeNameRef}
            options={storeOptions} />
          <button style={{marginLeft: "5rem", width: "10rem", borderRadius: "5px"}} type='submit'>Search</button>
          </div>
        </form>
      
      <div className="shopping-history-table">
        <table>
          <thead>
            <tr>
              <th>Date Time Of Purchase</th>
              <th>Product Name</th>
              <th>Store Name</th>
            </tr>
          </thead>
          <tbody>
            {
              items.length ? items.map((item) => { 
                return (
                  <tr key={item.productId.toString()}><td>{parseDate(item.dateTimeOfPurchase)}</td><td>{item.productName}</td>
                  <td><a href={item.storeURL} target="_blank">{item.storeName}</a></td></tr>
              )}) : <tr style={{color: "red"}}><td>No items in cart</td></tr>
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ShoppingHistory