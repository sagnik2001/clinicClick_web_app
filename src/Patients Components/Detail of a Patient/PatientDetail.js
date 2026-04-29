import React from "react";
import { FiCalendar, FiClock, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import DoctorProfileImage from "../../Components/assets/DoctorProfile.svg";
import { usePatientDetails } from "../../NewUpdates/Components/hooks/getpatientDetails";
import { EmptyState, LoaderPanel, SkeletonGrid } from "../../Components/common/LoadingStates";
import "./PatientDetail.css";

const formatDate = (date) => {
  if (!date) return "NA";
  return date.toString().replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
};

const PatientDetail = ({ getPatientInfo }) => {
  const {
    userInfo: appointments,
    isLoading,
    error,
  } = usePatientDetails(`doc/getAppointment/${getPatientInfo?._id}`);
  const appointmentList = appointments?.appointments || [];

  return (
    <div className="care-detail-grid">
      <section className="care-panel">
        <div className="care-profile-hero">
          <div className="care-profile-avatar">
            <img src={DoctorProfileImage} alt="Mother profile" />
          </div>
          <div>
            <span className="care-pill">
              <FiUser /> Mother record
            </span>
            <h2>{getPatientInfo?.name || "Patient"}</h2>
            <p>
              {getPatientInfo?.problems ||
                "No clinical concern has been added for this mother record yet."}
            </p>
          </div>
        </div>

        <div className="care-meta-list" style={{ marginTop: 24 }}>
          <div className="care-meta">
            <span>Email</span>
            <strong>{getPatientInfo?.email || "NA"}</strong>
          </div>
          <div className="care-meta">
            <span>
              <FiPhone /> Phone
            </span>
            <strong>{getPatientInfo?.phone || "NA"}</strong>
          </div>
          <div className="care-meta">
            <span>Trimester</span>
            <strong>{getPatientInfo?.trimester || "NA"}</strong>
          </div>
          <div className="care-meta">
            <span>
              <FiMapPin /> Location
            </span>
            <strong>
              {[getPatientInfo?.city, getPatientInfo?.country]
                .filter(Boolean)
                .join(", ") || "NA"}
            </strong>
          </div>
        </div>
      </section>

      <section className="care-panel">
        <div className="care-panel__head">
          <div>
            <h2>Appointments</h2>
            <p>Checkup visit history and upcoming follow-ups for this mother.</p>
          </div>
        </div>

        {isLoading ? (
          <>
            <LoaderPanel label="Loading appointment history" />
            <SkeletonGrid count={2} />
          </>
        ) : error ? (
          <EmptyState
            title="Unable to load appointments"
            message="The appointment request failed. Check the API connection and try again."
          />
        ) : appointmentList.length > 0 ? (
          <div className="care-timeline">
            {appointmentList.map((appointment) => (
              <div className="care-timeline__item" key={appointment?._id}>
                <div className="care-timeline__icon">
                  <FiCalendar />
                </div>
                <div className="care-timeline__body">
                  <strong>{formatDate(appointment?.Date)}</strong>
                  <span>
                    <FiClock /> {appointment?.startTimeHours}:
                    {appointment?.startTimeMinutes} to {appointment?.endTimeHours}:
                    {appointment?.endTimeMinutes}
                  </span>
                  <span>
                    Status: {appointment?.Status || "NA"} · Concern:{" "}
                    {appointment?.problem || "Not added"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No appointments logged"
            message="Once a checkup is booked or completed, it will show up in this visit history."
          />
        )}
      </section>
    </div>
  );
};

export default PatientDetail;
