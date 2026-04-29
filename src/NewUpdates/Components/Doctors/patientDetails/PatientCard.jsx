import { Link } from "react-router-dom";
import { FiMapPin, FiMessageCircle, FiMoreHorizontal, FiPhone } from "react-icons/fi";

const PatientDetailCard = ({ patient }) => {
  const initial = patient?.name ? patient.name.charAt(0).toUpperCase() : "M";

  return (
    <article className="care-list-card">
      <div className="care-list-card__top">
        <div style={{ display: "flex", gap: 12, minWidth: 0 }}>
          <div className="care-avatar">{initial}</div>
          <div>
            <h3>{patient?.name || "Mother record"}</h3>
            <p>{patient?.email || "Email not added"}</p>
          </div>
        </div>
        <span className="care-pill">
          <FiMoreHorizontal /> Record
        </span>
      </div>

      <div className="care-meta-list">
        <div className="care-meta">
          <span>
            <FiPhone /> Phone
          </span>
          <strong>{patient?.phone || "NA"}</strong>
        </div>
        <div className="care-meta">
          <span>
            <FiMapPin /> Location
          </span>
          <strong>{patient?.city || patient?.country || "NA"}</strong>
        </div>
        <div className="care-meta">
          <span>Trimester</span>
          <strong>{patient?.trimester || "NA"}</strong>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
        <Link to={`/patientDetails/${patient?._id}`} className="care-btn care-btn--primary">
          View details
        </Link>
        <Link to="/doctorchats" className="care-btn care-btn--secondary">
          <FiMessageCircle /> Chat
        </Link>
      </div>
    </article>
  );
};

export default PatientDetailCard;
