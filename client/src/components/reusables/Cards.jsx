import React from "react";

const Cards = ({ icon, heading, number }) => {
  return (
    <div className="stat w-[300px] border-2 border-neutral bg-base-200 rounded-md">
      <div className="stat-figure text-secondary">{icon}</div>
      <div className="stat-title text-base-content font-mont">{heading}</div>
      <div className="stat-value text-secondary font-mont">{number}</div>
      <div className="stat-desc font-mont">
        {number} {heading} this month
      </div>
    </div>
  );
};

export default Cards;
