import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiCalendar, FiClock, FiFileText, FiXCircle } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import { api_url } from "../../Urls/Api";

const AppointmentsAll = ({ patient }) => {
  const token = window.localStorage.getItem("patientToken");

  const handleCancel = (event) => {
    event.preventDefault();
    axios
      .put(
        `${api_url}appointment/cancel/`,
        {
          appointmentId: patient._id,
          doctorId: patient.doctorId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() => {
        toast.success("Appointment cancelled");
        window.location.reload();
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
            <h3>Doctor visit</h3>
            <p>{patient?.Date || "Date not added"}</p>
          </div>
        </div>
        <span
          className={`care-pill ${
            patient?.Status === "completed" ? "" : "care-pill--amber"
          }`}
        >
          {patient?.Status || "not updated"}
        </span>
      </div>

      <div className="care-meta-list">
        <div className="care-meta">
          <span>Doctor ID</span>
          <strong>{patient?.doctorId || "NA"}</strong>
        </div>
        <div className="care-meta">
          <span>
            <FiClock /> Time
          </span>
          <strong>
            {patient?.startTimeHours}:{patient?.startTimeMinutes} to{" "}
            {patient?.endTimeHours}:{patient?.endTimeMinutes}
          </strong>
        </div>
        <div className="care-meta">
          <span>
            <FaRupeeSign /> Price
          </span>
          <strong>₹{patient?.Price || "NA"}</strong>
        </div>
        <div className="care-meta">
          <span>
            <FiFileText /> Expired
          </span>
          <strong>{patient?.expirity || "NA"}</strong>
        </div>
      </div>

      {patient?.expirity === "false" && patient?.Status === "notcompleted" && (
        <div style={{ marginTop: 18 }}>
          <button
            type="button"
            className="care-btn care-btn--danger"
            onClick={handleCancel}
          >
            <FiXCircle /> Cancel appointment
          </button>
        </div>
      )}
    </article>
  );
};

export default AppointmentsAll;
