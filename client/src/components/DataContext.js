// DataContext.js
import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [leases, setLeases] = useState([]);
  const [units, setUnits] = useState([]);
  const [tenants, setTenants] = useState([]);

  const updateData = (newLeases, newUnits, newTenants) => {
    setLeases(newLeases);
    setUnits(newUnits);
    setTenants(newTenants);
  };

  const value = {
    leases,
    units,
    tenants,
    updateData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};