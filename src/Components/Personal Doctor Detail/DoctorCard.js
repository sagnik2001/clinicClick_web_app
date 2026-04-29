import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FiClock,
  FiFileText,
  FiHeart,
  FiMail,
  FiMapPin,
  FiPhone,
  FiStar,
} from "react-icons/fi";
import { FaHospital, FaRupeeSign } from "react-icons/fa";
import DoctorDetailImage from "../assets/DoctorDetail.svg";
import ShowReviewModal from "./Reviews/ShowReviewModal";
import Feedback from "./Reviews/AddReviewModal";

export const DoctorCard = ({ doc }) => {
  const [handleOpen, sethandleOpen] = useState(false);
  const [handleReviewOpen, sethandleReviewOpen] = useState(false);
  const params = useParams();
  const profileId = doc?._id || params.id;

  return (
    <div className="care-detail-grid">
      <section className="care-panel">
        <div className="care-profile-hero">
          <div className="care-profile-avatar">
            {doc?.profilePicture ? (
              <img src={doc.profilePicture} alt={doc?.name} />
            ) : (
              doc?.name?.charAt(0)?.toUpperCase() || "D"
            )}
          </div>
          <div>
            <span className="care-pill">
              <FiHeart /> Maternal care provider
            </span>
            <h2>Dr {doc?.name || "Provider"}</h2>
            <p>{doc?.desc || "No description added yet."}</p>
          </div>
        </div>

        <div className="care-meta-list" style={{ marginTop: 24 }}>
          <div className="care-meta">
            <span>
              <FiMail /> Email
            </span>
            <strong>{doc?.email || "NA"}</strong>
          </div>
          <div className="care-meta">
            <span>
              <FiPhone /> Phone
            </span>
            <strong>{doc?.phone || "NA"}</strong>
          </div>
          <div className="care-meta">
            <span>
              <FiClock /> Time slot
            </span>
            <strong>
              {doc?.startTimeHours || "NA"}:
              {doc?.startTimeMinutes === 0 ? "00" : doc?.startTimeMinutes || "00"} to{" "}
              {doc?.endTimeHours || "NA"}:
              {doc?.endTimeMinutes === 0 ? "00" : doc?.endTimeMinutes || "00"}
            </strong>
          </div>
          <div className="care-meta">
            <span>
              <FaRupeeSign /> Fees
            </span>
            <strong>₹{doc?.price || "NA"}</strong>
          </div>
          <div className="care-meta">
            <span>
              <FaHospital /> Hospital
            </span>
            <strong>{doc?.hospital || "NA"}</strong>
          </div>
          <div className="care-meta">
            <span>
              <FiMapPin /> Location
            </span>
            <strong>{[doc?.city, doc?.country].filter(Boolean).join(", ") || "NA"}</strong>
          </div>
          <div className="care-meta">
            <span>
              <FiFileText /> Specialization
            </span>
            <strong>{doc?.specialization || "NA"}</strong>
          </div>
        </div>

        <div className="doctor-profile-actions">
          <button
            type="button"
            className="care-btn care-btn--secondary"
            onClick={() => sethandleOpen(true)}
          >
            <FiStar /> Show reviews
          </button>
          <button
            type="button"
            className="care-btn care-btn--primary"
            onClick={() => sethandleReviewOpen(true)}
          >
            Add review
          </button>
        </div>
      </section>

      <aside className="care-card care-card--media">
        <img
          className="care-card__media doctor-profile-image"
          src={DoctorDetailImage}
          alt="Doctor profile illustration"
        />
        <div style={{ padding: 22 }}>
          <div className="care-card__icon">
            <FiHeart />
          </div>
          <h3>Profile used before booking a visit</h3>
          <p>
            Mothers can inspect provider details before booking or continuing
            care through the appointment workflow.
          </p>
        </div>
      </aside>

      <ShowReviewModal
        open={handleOpen}
        handleClose={() => sethandleOpen(false)}
        id={profileId}
      />
      <Feedback
        open={handleReviewOpen}
        onClose={() => sethandleReviewOpen(false)}
        id={profileId}
      />
    </div>
  );
};
