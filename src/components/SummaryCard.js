import React from "react";

const SummaryCard = ({ title, value }) => {
  return (
    <div className="col-md-3">
      <div className="card text-white bg-primary text-center">
        <h5 className="card-header">{value}</h5>
        <div className="card-body">
          <p className="card-text">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;