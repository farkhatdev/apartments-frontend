import React from "react";
import { CiCalendarDate } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

const Apartment = ({ apartment }) => {
  const {
    shortAddress,
    fullAddress,
    forWhom,
    price,
    rooms,
    images,
    id,
    phone1,
  } = apartment;

  const postedDate = new Date(id);
  const date = {
    year: postedDate.getFullYear(),
    day: postedDate.getDate(),
    month: postedDate.getMonth() + 1,
  };
  const { year, month, day } = date;
  return (
    <div className="apartment">
      <div className="apartment-main">
        <div className="apartment-main-img">
          <img src={images[0]} alt={images[0]} />
        </div>
        <div className="apartment-details">
          <h2>{shortAddress}</h2>
          <p>
            Xanalar sani: <span>{rooms}</span>
          </p>
          <p>
            Kimler ushin: <span>{forWhom}</span>
          </p>
          <p>
            Baxasi: <span>{price} sum /ayina</span>
          </p>
          <p>
            Orientr: <span>{fullAddress}</span>
          </p>
          <p>
            Shárayitlari: <span>Televizor, Muzlatqish, kir mashin</span>
          </p>
          <p>
            Baylanıs: <span>{phone1}</span>
          </p>
        </div>
      </div>
      <div className="apartment-info">
        <div className="upload-date">
          <CiCalendarDate size={22} />
          <span>{`${day}.${month}.${year} | 20:28`}</span>
        </div>
        <div className="count-views">
          <IoEyeOutline size={22} />
          <span>345</span>
        </div>
      </div>
    </div>
  );
};

export default Apartment;
