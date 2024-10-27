import React from "react";
import { useNavigate } from "react-router-dom";

const OneApartment = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container">
        <h1>One apartment</h1>
        <button
          onClick={() => {
            navigate("/apartments");
          }}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default OneApartment;
