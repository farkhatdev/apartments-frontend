import React, { useEffect, useState } from "react";
import Apartment from "./Apartment";
import "./apartments.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAlert } from "../../store/slices/uiSlice";

const Apartments = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    let publicURL = "https://farkhat-98p2gtql.b4a.run";
    async function fetchData() {
      try {
        const response = await axios.get(publicURL + "/apartment", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        setData(response?.data?.data);
      } catch (error) {
        dispatch(
          setAlert({
            message: error?.response?.data?.message || "Error",
            type: "error",
            active: true,
          })
        );
      }
    }
    fetchData();
  }, [dispatch]);
  return (
    <div className="apartments page">
      <div className="container">
        <div className="apartments-inner">
          <div className="apartments-heading">
            <h2>Apartments in Nukus</h2>
          </div>
          <div className="apartments-result">
            {data.map((apartment, index) => {
              return <Apartment key={index} apartment={apartment} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apartments;
