import React from 'react';
import { NavLink } from 'react-router-dom';
import "../../style/AdminNav.css";

const AdminNav = () => {
  return (
    <div className='admin-nav'>
        <NavLink to="/admin-dashboard/products" className='admin-link'>Products</NavLink>
        <NavLink to="/admin-dashboard/create-product" className='admin-link'>Create Product</NavLink>
        <NavLink to="/admin-dashboard/create-category"  className='admin-link'>Create Category</NavLink>
        <NavLink to="/admin-dashboard/all-users"  className='admin-link'>All Users</NavLink>
    </div>
  )
}

export default AdminNav;