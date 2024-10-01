
import React, { useState } from "react";
import {Link} from 'react-router-dom'

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index)
  }
  const handleProfileClick = (index) => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  }

  const menuClass = "menu";
  const activeMenuClasss = "menu selected"

  return (
    <div className="menu-container">
      <img src="/media/kite-icon.png" style={{ width: "50px" }} />
      <div className="menus pt-4">
        <ul>
          <li>
            <Link to="/" onClick={() => handleMenuClick(0)} style={{textDecoration: "none"}}><p className={selectedMenu===0 ? activeMenuClasss : menuClass}>Dashboard</p></Link>
          </li>
          <li>
            <Link to="/orders" onClick={() => handleMenuClick(1)} style={{textDecoration: "none"}}><p className={selectedMenu===1 ? activeMenuClasss : menuClass}>Orders</p></Link>
          </li>
          <li>
            <Link to="/holdings" onClick={() => handleMenuClick(2)} style={{textDecoration: "none"}}><p className={selectedMenu===2 ? activeMenuClasss : menuClass}>Holdings</p></Link>
          </li>
          <li>
            <Link to="/positions" onClick={() => handleMenuClick(3)} style={{textDecoration: "none"}}><p className={selectedMenu===3 ? activeMenuClasss : menuClass}>Positions</p></Link>
          </li>
          <li>
            <Link to="/funds" onClick={() => handleMenuClick(4)} style={{textDecoration: "none"}}><p className={selectedMenu===4 ? activeMenuClasss : menuClass}>Funds</p></Link>
          </li>
          <li>
            <Link to="apps" onClick={() => handleMenuClick(5)} style={{textDecoration: "none"}}><p className={selectedMenu===5 ? activeMenuClasss : menuClass}>Apps</p></Link>
          </li>
        </ul>
        <hr />
        <div className="profile pb-3">
          <div className="avatar">ZU</div>
          <p className="username pt-3">USERID</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
