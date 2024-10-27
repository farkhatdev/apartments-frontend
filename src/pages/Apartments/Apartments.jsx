import React, { useEffect, useState } from "react";
import Apartment from "./Apartment";
import "./apartments.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAlert } from "../../store/slices/uiSlice";

const Apartments = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  // let publicURL = "https://apartment-gr2i0orv.b4a.run";
  useEffect(() => {
    let localURL = "http://localhost:8080";
    async function fetchData() {
      try {
        const response = await axios.get(localURL + "/apartment", {
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
            {data.map((apartment) => {
              return (
                <Link
                  key={apartment.id}
                  className="apartment-link"
                  to={`/apartments/${apartment.id}`}
                >
                  <Apartment apartment={apartment} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apartments;
