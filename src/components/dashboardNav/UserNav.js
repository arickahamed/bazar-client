import React from 'react';
import { NavLink } from 'react-router-dom';
import "../../style/AdminNav.css";

const UserNav = () => {
  return (
    <div className='admin-nav'>
        <NavLink to="/user-dashboard/orders" className='admin-link'>Orders</NavLink>
        <NavLink to="/user-dashboard/review"  className='admin-link'>Review</NavLink>
    </div>
  )
}

export default UserNav;