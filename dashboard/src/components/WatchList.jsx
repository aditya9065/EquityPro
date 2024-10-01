import React, { useState } from "react";

import {Tooltip, Grow} from '@mui/material';
import {BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz} from '@mui/icons-material'

import { watchlist } from "../data/data";

const WatchList = () => {
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
      {showWatchListActions &&  <WatchListAction uid={index}/>}

      </div>
    </li>
   );
}


const WatchListAction = ({uid}) => {
  return(
    <span>
      <span>
        <Tooltip title="Buy (B)" placement="bottom" arrow TransitionComponent={Grow}>
          <button className="buy">Buy</button>
        </Tooltip>&nbsp;&nbsp;&nbsp;
        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell">Sell</button>
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
