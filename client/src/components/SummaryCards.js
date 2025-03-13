import React from 'react';
import './SummaryCards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SummaryCards = ({ summaryData }) => {
  return (
    <div className="cards-container">
      {summaryData.map(card => (
        <div key={card.title} className="card">
          <FontAwesomeIcon icon={card.icon} className="summary-icon" />
          <div>{card.title}</div>
          <div>{card.value}</div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;