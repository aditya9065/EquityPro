import axios from "axios";
import React, { useEffect, useState } from "react";

const Orders = () => {

  const [allOrders, setAllOrders] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:8080/allOrders").then((res)=>{
      setAllOrders(res.data);
    })
  },[]);

  return (
    <>
    <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <thead >
          <tr key={1.21}>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Mode</th>
          </tr>
          </thead>
          {allOrders.map((order, index) => {
            return(
              <tbody key={index}>
            <tr key={index} className="">
              <td>{order.name}</td>
              <td>{order.qty}</td>
              <td>{order.price.toFixed(2)}</td>
              <td >{order.mode}</td>
            </tr>
            </tbody>
            )
          })}
        </table>
      </div>
      </>
  );
};

export default Orders;