import React, { useState } from "react";
import "./Filter.css";

const Filter = ({ filters, setFilters }) => {
  const [showCustomDates, setShowCustomDates] = useState(false);

  // Function to apply date filters
  const applyDateFilter = (type) => {
    const today = new Date();
    let startDate = new Date();

    if (type === "Yesterday") {
      startDate.setDate(today.getDate() - 1);
      today.setDate(today.getDate() - 1);
    } else if (type === "Last 7 Days") {
      startDate.setDate(today.getDate() - 7);
    } else if (type === "Last 30 Days") {
      startDate.setMonth(today.getMonth() - 1);
    } else if (type === "Last 6 Months") {
      startDate.setMonth(today.getMonth() - 6);
    } else if (type === "Last Year") {
      startDate.setFullYear(today.getFullYear() - 1);
    } else if (type === "Custom") {
      setShowCustomDates(true);
      return;
    }

    setShowCustomDates(false);
    setFilters({
      ...filters,
      startDate: startDate.toISOString().split("T")[0],
      endDate: today.toISOString().split("T")[0],
    });
  };

  return (
    <div className="filters-container">
      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="filter-input"
      />

      {/* Date Filter Dropdown */}
      <select className="filter-dropdown" onChange={(e) => applyDateFilter(e.target.value)}>
        <option value="">Dates</option>
        <option value="Yesterday">Yesterday</option>
        <option value="Last 7 Days">Last 7 Days</option>
        <option value="Last 30 Days">Last 30 Days</option>
        <option value="Last 6 Months">Last 6 Months</option>
        <option value="Last Year">Last Year</option>
        <option value="Custom">Custom</option>
      </select>

      {/* Custom Date Range Selection */}
      {showCustomDates && (
        <div className="date-container">
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            className="date-input"
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            className="date-input"
          />
        </div>
      )}

      {/* Category Filter */}
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        className="filter-dropdown"
      >
        <option value="">All Categories</option>
        <option value="Commercials">Commercials</option>
        <option value="Accommodation">Accommodation</option>
      </select>

      {/* Status Filter */}
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="filter-dropdown"
      >
        <option value="">All Status</option>
        <option value="Active">Paid</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
  );
};

export default Filter;
