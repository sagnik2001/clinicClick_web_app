import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiClipboard,
  FiClock,
  FiUsers,
} from "react-icons/fi";
import DashboardLayout from "../../../Layouts/DashboardLayout";
import UserProfile from "../../../../Components/assets/profile.svg";
import careImage from "../../../../Components/assets/homepage.jpg";
import { useFetchDoctorProfile } from "../../../Components/hooks/getInfo";
import { LoaderPanel, SkeletonBlock } from "../../../../Components/common/LoadingStates";

const DocDashboard = () => {
  const { userInfo, isLoading } = useFetchDoctorProfile();
  const patientCount = Array.isArray(userInfo?.patients)
    ? userInfo.patients.length
    : 0;

  return (
    <DashboardLayout>
      <section className="care-page-header">
        <div>
          <span className="care-kicker">
            <FiClipboard /> Field console
          </span>
          <h1>Hi, {userInfo?.name ? userInfo.name : "health worker"}.</h1>
          <p>
            Keep the Mamta HMIC POC workflow moving: register mothers, review
            visit details, and follow up on appointments before they are missed.
          </p>
        </div>
        <Link to="/doctorPatients" className="care-btn care-btn--primary">
          Open patient registry <FiArrowRight />
        </Link>
      </section>

      {isLoading ? (
        <div className="care-panel">
          <LoaderPanel label="Loading worker console" />
          <div className="care-stat-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="care-stat-card" key={index}>
                <SkeletonBlock className="care-skeleton-line care-skeleton-line--sm" />
                <SkeletonBlock className="care-skeleton-line care-skeleton-line--lg" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="care-stat-grid">
            <div className="care-stat-card">
              <span>Registered mothers</span>
              <strong>{patientCount}</strong>
            </div>
            <div className="care-stat-card">
              <span>Checkup status</span>
              <strong>Live</strong>
            </div>
            <div className="care-stat-card">
              <span>Reminder queue</span>
              <strong>Today</strong>
            </div>
            <div className="care-stat-card">
              <span>POC stack</span>
              <strong>4</strong>
            </div>
          </div>

          <div className="care-grid care-grid--2">
            <section className="care-panel">
              <div className="care-profile-hero">
                <div className="care-profile-avatar">
                  {userInfo?.profilePicture ? (
                    <img src={userInfo.profilePicture} alt={userInfo?.name} />
                  ) : (
                    <img src={UserProfile} alt="Health worker profile" />
                  )}
                </div>
                <div>
                  <span className="care-pill">
                    <FiCheckCircle /> Active field profile
                  </span>
                  <h2>{userInfo?.name || "Health worker"}</h2>
                  <p>
                    {userInfo?.hospital || "Mamta HMIC"} care team
                    {userInfo?.city ? `, ${userInfo.city}` : ""}. Profile and
                    visit details are used by the patient registry.
                  </p>
                </div>
              </div>
              <div className="care-role-cards">
                <Link to="/doctorPatients" className="care-role-card">
                  <span className="care-role-card__icon">
                    <FiUsers />
                  </span>
                  <span>
                    <h3>Patient registry</h3>
                    <span>Review mother details, trimester, city, and contact.</span>
                  </span>
                  <span className="care-btn care-btn--secondary">Open</span>
                </Link>
                <Link to="/doctorappointment" className="care-role-card">
                  <span className="care-role-card__icon">
                    <FiCalendar />
                  </span>
                  <span>
                    <h3>Appointment visits</h3>
                    <span>Track upcoming and completed checkups.</span>
                  </span>
                  <span className="care-btn care-btn--secondary">View</span>
                </Link>
              </div>
            </section>

            <section className="care-card care-card--media">
              <img className="care-card__media" src={careImage} alt="Mother care journey" />
              <div style={{ padding: 22 }}>
                <div className="care-card__icon">
                  <FiClock />
                </div>
                <h3>Designed around repeated field follow-ups</h3>
                <p>
                  The dashboard keeps the next action visible for health workers:
                  identify pending mothers, check appointment status, and move
                  the record forward after every visit.
                </p>
              </div>
            </section>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default DocDashboard;
