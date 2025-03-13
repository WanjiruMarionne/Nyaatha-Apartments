/*import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>PMS Dashboard</h2>
      <nav>
        <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
        <NavLink to="/properties" className="nav-item">Properties</NavLink>
        <NavLink to="/tenants" className="nav-item">Tenants</NavLink>
        <NavLink to="/bookings" className="nav-item">Bookings</NavLink>
        <NavLink to="/financials" className="nav-item">Financials</NavLink>
        <NavLink to="/maintenance" className="nav-item">Maintenance</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;*/

import React from 'react';
import { Link } from "react-router-dom";
import './Sidebar.css';

function Sidebar () {
  return (
    <aside className="sidebar-container">
      <div className='admin-sidebar'>
        <Link to="/dashboard" className="admin-links">Dashboard</Link>
        <Link to="/commercials-management" className="admin-links">Commercials Management</Link>
        <Link to="/bookings-management" className="admin-links">Bookings Management</Link>
        <Link to="/maintenance" className="admin-links">Maintenance</Link>
        <Link to="/financials" className="admin-links">Financial Management</Link>
        <Link to="/reports" className="admin-links">Reports</Link>
      </div>
    </aside>
  );
};

export default Sidebar;