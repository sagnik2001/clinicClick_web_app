import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiUser,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import { api_url } from "../../Urls/Api";

const formatDate = (date) => {
  if (!date) return "NA";
  return date.toString().replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
};

const AppointmentLists = ({ doc }) => {
  const token = window.localStorage.getItem("token");
  const [patientdata, setpatientdata] = useState(null);

  useEffect(() => {
    axios
      .get(`${api_url}patient/${doc.patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setpatientdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [doc.patientId, token]);

  const handleComplete = (event) => {
    event.preventDefault();
    axios
      .put(
        `${api_url}appointment/complete/`,
        {
          id: doc._id,
          status: "completed",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() => {
        window.location.reload();
        toast.success("Appointment completed");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <article className="care-list-card">
      <div className="care-list-card__top">
        <div style={{ display: "flex", gap: 12 }}>
          <div className="care-avatar">
            <FiCalendar />
          </div>
          <div>
            <h3>{patientdata?.name || "Patient visit"}</h3>
            <p>{formatDate(doc?.Date)}</p>
          </div>
        </div>
        <span
          className={`care-pill ${
            doc?.Status === "completed" ? "" : "care-pill--amber"
          }`}
        >
          {doc?.Status || "not updated"}
        </span>
      </div>

      <div className="care-meta-list">
        <div className="care-meta">
          <span>
            <FiUser /> Patient
          </span>
          <strong>{patientdata?.name || doc?.patientId || "NA"}</strong>
        </div>
        <div className="care-meta">
          <span>
            <FiClock /> Time
          </span>
          <strong>
            {doc?.startTimeHours}:{doc?.startTimeMinutes} to {doc?.endTimeHours}:
            {doc?.endTimeMinutes}
          </strong>
        </div>
        <div className="care-meta">
          <span>
            <FaRupeeSign /> Price
          </span>
          <strong>₹{doc?.Price || "NA"}</strong>
        </div>
        <div className="care-meta">
          <span>
            <FiFileText /> Concern
          </span>
          <strong>{doc?.problem || "NA"}</strong>
        </div>
      </div>

      {doc?.expirity === "false" && doc?.Status === "notcompleted" && (
        <div style={{ marginTop: 18 }}>
          <button
            type="button"
            className="care-btn care-btn--primary"
            onClick={handleComplete}
          >
            <FiCheckCircle /> Complete appointment
          </button>
        </div>
      )}
    </article>
  );
};

export default AppointmentLists;
