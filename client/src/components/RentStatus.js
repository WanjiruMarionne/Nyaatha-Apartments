import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './RentStatus.css';

const RentStatus = ({ doughnutData }) => {
  return (
    <div className="rent-status-container">
      <h2>Lease Expiry</h2>
      <Doughnut data={doughnutData} />
    </div>
  );
};

export default RentStatus;