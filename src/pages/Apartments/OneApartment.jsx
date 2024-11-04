import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const OneApartment = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  return (
    <div>
      <div className="container">
        <h1>One apartment</h1>
        <button
          onClick={() => {
            navigate("/apartments", { replace: true });
          }}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default OneApartment;
