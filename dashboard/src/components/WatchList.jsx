import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import {Tooltip, Grow} from '@mui/material';
import {BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz} from '@mui/icons-material'

import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnutGraph";

const labels = watchlist.map((subArray) => subArray["name"]);

const WatchList = () => {


  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / {50}</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return(<WatchListItem stock= {stock} key= {index}/>)
        })}
      </ul>
      <DoughnutChart data={data}/>
    </div>
  );
};

export default WatchList;

function WatchListItem({stock, index}) {
  const [showWatchListActions, setShowWatchListActions] = useState(false);

  const handleMouseEnter = () => {
    setShowWatchListActions(true);
  } 
  const handleMouseExit = () => {
    setShowWatchListActions(false);
  } 

  return ( 
    <li key={index} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit} style={{cursor:"pointer"}}>
      <div className="item">
      <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
      <div className="itemInfo">
        <span className="percent">{stock.percent}</span>
        {stock.isDown ? <KeyboardArrowDown className="down"/> : <KeyboardArrowUp className="up"/>}

        <span className="price">{stock.price}</span>
        

      </div>
      {showWatchListActions &&  <WatchListAction uid={stock.name}/>}

      </div>
    </li>
   );
}



const WatchListAction = ({uid}) => {
  const generalContext = useContext(GeneralContext);

  let handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  let handleSellClick = () => {
    generalContext.openSellWindow(uid);
  }

  return(
    <span>
      <span>
        <Tooltip title="Buy (B)" placement="bottom" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={handleBuyClick}>Buy</button>
        </Tooltip>&nbsp;&nbsp;&nbsp;
        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell" onClick={handleSellClick}>Sell</button>
        </Tooltip>&nbsp;&nbsp;&nbsp;
        <Tooltip title="Anlytics (A)" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <BarChartOutlined/>
          </button>
        </Tooltip>&nbsp;&nbsp;&nbsp;
        <Tooltip title="More (A)" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz/>
          </button>
        </Tooltip>
      </span>
    </span>
  )
}
