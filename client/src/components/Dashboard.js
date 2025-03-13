import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Filter from "./Filter";
import SummaryCards from './SummaryCards';
import PerformanceChart from './PerformanceChart';
import RentStatus from './RentStatus';
import ResidentLeaderboard from './ResidentLeaderboard';
import RecentListing from './RecentListing';
import PropertiesSummary from './PropertiesSummary';
import './Dashboard.css';
import { faMoneyBillWave, faMoneyBill, faShoppingCart, faTools } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  // Dummy Data
  const summaryData = [
    { title: 'Revenue', value: '145,535.95', icon: faMoneyBillWave },
    { title: 'Expenses', value: '83,535.63', icon: faMoneyBill },
    { title: 'Bookings', value: '523', icon: faShoppingCart},
    { title: 'Maintenance', value: '12 Active', icon: faTools },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Expenses',
        data: [150000, 180000, 200000, 190000, 220000, 210000],
        fill: false,
        borderColor: 'gold',
        tension: 0.4,
      },
      {
        label: 'Income',
        data: [180000, 200000, 230000, 220000, 250000, 240000],
        fill: false,
        borderColor: 'gray',
        tension: 0.4,
      },
      {
        label: 'Profit',
        data: [30000, 20000, 30000, 30000, 30000, 30000],
        fill: false,
        borderColor: 'black',
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: ['Expiring 0-1 Months', 'Expiring 1-3 Months', 'Expiring 3-6 Months'],
    datasets: [
      {
        data: [40, 30, 24],
        backgroundColor: ['gold', 'gray', 'black'],
        hoverOffset: 4,
      },
    ],
  };

  const residents = [
    { name: 'Guy Hawkins', lastActive: 'Sep 23, 2021', scoring: '222' },
    { name: 'Robert Fox', lastActive: 'Sep 23, 2021', scoring: '145' },
    { name: 'Albert Flores', lastActive: 'Sep 23, 2021', scoring: '132' },
    { name: 'Devon Lane', lastActive: 'Sep 23, 2021', scoring: '102' },
  ];

  const listings = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      title: 'Floyd Miles',
      location: 'Could you help with my smoke detector? It seems like it is on.',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      title: 'Marvin McKinney',
      location: "I can't find my package and it looks like the tracking number is not working.",
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      title: 'Kathryn Murphy',
      location: 'I need to find the pool key access to the pool for the week.',
    },
  ];

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const data = [
    { id: 1, title: "Property Sales", category: "Commercials", status: "Active", date: "2025-03-05" },
    { id: 2, title: "Bank Loans", category: "Accommodation", status: "Pending", date: "2025-02-20" },
    { id: 3, title: "Tech Stocks", category: "Commercials", status: "Closed", date: "2025-01-10" },
  ];

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date);
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;

    return (
      (filters.search === "" || item.title.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.category === "" || item.category === filters.category) &&
      (filters.status === "" || item.status === filters.status) &&
      (!startDate || itemDate >= startDate) &&
      (!endDate || itemDate <= endDate)
    ); 
  });

  return (
    <div className="app-container">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="content">
        <Header />
        <Filter filters={filters} setFilters={setFilters} />
        <SummaryCards summaryData={summaryData} />
        <div className="charts-container">
          <PropertiesSummary />
          <PerformanceChart chartData={chartData} />
          <RentStatus doughnutData={doughnutData} />
        </div>
        <ResidentLeaderboard residents={residents} />
        <RecentListing listings={listings} />
      </div>
    </div>
  );
}

export default Dashboard;