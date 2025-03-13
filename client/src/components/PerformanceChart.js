import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './PerformanceChart.css';

const PerformanceChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2>Performance</h2>
      <Line data={chartData} />
    </div>
  );
};

export default PerformanceChart;