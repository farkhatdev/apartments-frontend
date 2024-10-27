import React, { useRef, useState } from "react";
import "./createPost.css";
import { MdDelete } from "react-icons/md";
import personSvg from "../../utils/icons/person-svg.svg";
import emailSvg from "../../utils/icons/email.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAlert } from "../../store/slices/uiSlice";
import { YMaps, Map, Placemark } from "react-yandex-maps";

const CreatePost = () => {
  const dispatch = useDispatch();
  const inputImgRef = useRef();
  const [images, setImages] = useState([]);
  const [place, setPlace] = useState([42.442987, 59.617839]);
  let localURL = "http://localhost:8080";
  // let url = "https://apartment-gr2i0orv.b4a.run";
  const accessToken = localStorage.getItem("access-token");
  const [step, setStep] = useState(2);
  const [form, setForm] = useState({
    shortAddress: "",
    fullAddress: "",
    forWhom: "",
    price: "",
    rooms: "",
    duration: "",
    phone1: "",
    phone2: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    const lastLetter = value.at(value.length - 1);
    const regex = /^[0-9]*$/;
    if (name === "phone1" || name === "phone2") {
      if (!regex.test(lastLetter)) return;
      let phoneNum = String(e.target.value);
      if (!phoneNum.startsWith("+998")) {
        setForm((prev) => {
          return { ...prev, [name]: "+998" };
        });
      } else {
        setForm((prev) => {
          return { ...prev, [name]: value };
        });
      }
    } else {
      setForm((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };
  const clearData = () => {
    setImages([]);
    setForm({
      shortAddress: "",
      fullAddress: "",
      forWhom: "",
      price: "",
      rooms: "",
      duration: "",
      phone1: "",
      phone2: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (step === 1) {
        if (images.length <= 1) return alert("en kemi 3 photo");
        setStep(2);
      } else if (step === 2) {
        setStep(3);
      } else if (step === 3) {
        const formData = new FormData();
        images.map((image) => formData.append("images", image));
        formData.append("info", JSON.stringify(form));
        const response = await axios.post(localURL + "/apartment", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response);
        dispatch(
          setAlert({
            message: response?.data?.message,
            type: "success",
            active: true,
          })
        );
        clearData();
      }
    } catch (error) {
      console.log(error?.response);

      dispatch(
        setAlert({
          message: error?.response?.data?.message || "Error",
          type: "error",
          active: true,
        })
      );
    }
  };

  return (
    <div className="create-post page">
      <div className="container">
        <div className="create-post-inner">
          <div className="create-post-wrapper">
            <span className="step">{step} / 3</span>
            {step === 1 ? (
              <div className="posting-apartment-images">
                {images.map((image, index) => {
                  let url = URL.createObjectURL(image);
                  return (
                    <div key={index} className="posting-apartment-image">
                      <img src={url} alt="" width={200} height={200} />
                      <div className="delete-btn">
                        <button
                          onClick={() => {
                            const newImgs = images.filter(
                              (img) => img !== image
                            );
                            setImages(newImgs);
                          }}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  );
                })}
                {images.length >= 6 ? null : (
                  <>
                    <div className="adding-apartment-btns">
                      <input
                        type="file"
                        accept="image/*"
                        ref={inputImgRef}
                        style={{ display: "none" }}
                        onChange={() => {
                          const file = inputImgRef.current.files[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setImages((prev) => {
                              return [...prev, file];
                            });
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                      <button
                        onClick={() => {
                          inputImgRef.current.click();
                        }}
                      >
                        Add image
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : null}

            {step === 1 ? (
              <form className="apartment-post-form" onSubmit={handleSubmit}>
                <div className="apartment-form-body">
                  <div className="apartment-post-form-columns">
                    <div className="form-group">
                      <label htmlFor="shortAddress">
                        <img
                          className="form-icon"
                          src={personSvg}
                          width={18}
                          height={18}
                          alt=""
                        />
                      </label>
                      <label htmlFor="shortAddress">Qısqa address:</label>
                      <input
                        id="shortAddress"
                        name="shortAddress"
                        type="text"
                        autoComplete="off"
                        placeholder="27 mikro rayon"
                        maxLength={20}
                        minLength={5}
                        value={form.shortAddress}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="fullAddress">
                        <img
                          className="form-icon"
                          src={emailSvg}
                          width={18}
                          height={18}
                          alt=""
                        />
                      </label>
                      <label htmlFor="fullAddress">Tolıq address:</label>
                      <input
                        id="fullAddress"
                        name="fullAddress"
                        type="text"
                        value={form.fullAddress}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Aydın jol MPJ Mega nukus qasinda"
                        required
                      />
                    </div>
                  </div>
                  <div className="apartment-post-form-columns">
                    <div className="form-group">
                      <label htmlFor="forWhom">
                        <img
                          className="form-icon"
                          src={personSvg}
                          width={18}
                          height={18}
                          alt=""
                        />
                      </label>
                      <label htmlFor="forWhom">Kimler ushın:</label>
                      <input
                        id="forWhom"
                        name="forWhom"
                        type="text"
                        autoComplete="off"
                        placeholder="Student ballar"
                        value={form.forWhom}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="price">
                        <img
                          className="form-icon"
                          src={personSvg}
                          width={18}
                          height={18}
                          alt=""
                        />
                      </label>
                      <label htmlFor="price">Baxası: sumda</label>
                      <input
                        className="custom-number-input"
                        id="price"
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="3 000 000 sum"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="rooms">
                        <img
                          className="form-icon"
                          src={emailSvg}
                          width={18}
                          height={18}
                          alt=""
                        />
                      </label>
                      <label htmlFor="rooms">Xanalar sanı:</label>
                      <input
                        className="custom-number-input"
                        id="rooms"
                        name="rooms"
                        type="number"
                        value={form.rooms}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="3"
                        maxLength={2}
                        required
                      />
                    </div>
                  </div>
                  <div className="apartment-post-form-columns">
                    <div className="form-group">
                      <label htmlFor="duration">
                        <img
                          className="form-icon"
                          src={personSvg}
                          width={18}
                          height={18}
                          alt=""
                        />
                      </label>
                      <label htmlFor="duration">Muddeti:</label>
                      <input
                        id="duration"
                        name="duration"
                        type="text"
                        value={form.duration}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Kunlik yaki ayliq"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone1">
                        <img
                          className="form-icon"
                          src={emailSvg}
                          width={18}
                          height={18}
                          alt=""
                        />
                      </label>
                      <label htmlFor="phone1">Baylanıs 1:</label>
                      <input
                        id="phone1"
                        name="phone1"
                        value={form.phone1}
                        onChange={handleChange}
                        type="tel"
                        maxLength={13}
                        minLength={13}
                        autoComplete="off"
                        placeholder="+998123456789"
                        onFocus={() => {
                          if (form.phone1 === "") {
                            setForm((prev) => {
                              return { ...prev, phone1: "+998" };
                            });
                          }
                        }}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone2">
                        <img
                          className="form-icon"
                          src={emailSvg}
                          width={18}
                          height={18}
                          alt=""
                        />
                      </label>
                      <label htmlFor="phone2">Baylanıs 2:</label>
                      <input
                        id="phone2"
                        name="phone2"
                        type="tel"
                        value={form.phone2}
                        maxLength={13}
                        minLength={13}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="+998123456789"
                        onFocus={() => {
                          if (form.phone2 === "") {
                            setForm((prev) => {
                              return { ...prev, phone2: "+998" };
                            });
                          }
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-btn-group">
                    <button type="reset" onClick={clearData}>
                      Clear
                    </button>
                    <button type="submit">Next</button>
                  </div>
                </div>
              </form>
            ) : null}
            {step === 2 ? (
              <form className="apartment-post-form" onSubmit={handleSubmit}>
                <div className="apartment-form-body">
                  <div
                    className="map"
                    style={{ width: "100%", height: "400px" }}
                  >
                    <YMaps
                      query={{ apikey: "d52c0095-ba4c-4140-8e30-f74f9f2703a3" }}
                    >
                      <Map
                        defaultState={{
                          center: place,
                          zoom: 16,
                          type: "yandex#map",
                        }}
                        modules={["control.TypeSelector"]}
                        width={"100%"}
                        height={"100%"}
                      >
                        <Placemark
                          geometry={place}
                          options={{
                            draggable: true, // Placemarkni sudrab ko'chirish uchun
                          }}
                          onDragEnd={(e) =>
                            setPlace(e.get("target").geometry.getCoordinates())
                          }
                        />
                      </Map>
                    </YMaps>
                  </div>
                  <div className="form-btn-group">
                    <button
                      type="button"
                      onClick={() => setStep((prev) => prev - 1)}
                    >
                      Back
                    </button>
                    <button type="submit">Next</button>
                  </div>
                </div>
              </form>
            ) : null}
            {step === 3 ? (
              <div className="view-ads-to-verify">
                <div className="all-informations"></div>
                <form className="apartment-post-form" onSubmit={handleSubmit}>
                  <div className="apartment-form-body">
                    <div className="form-btn-group">
                      <button
                        type="button"
                        onClick={() => setStep((prev) => prev - 1)}
                      >
                        Back
                      </button>
                      <button type="submit">Next</button>
                    </div>
                  </div>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
