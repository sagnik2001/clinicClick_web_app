import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart, FiUserCheck } from "react-icons/fi";
import { DashboardTopBar } from "../../../Components/common/CareShell";
import { useAuth } from "../../../Context/AuthContext";
import PatientForm from "../FormFillup/PatientForm";
import Patient3 from "../../../Components/assets/Patients3.svg";
import "./PatientDetailForm.css";

const patientLinks = [
  { name: "Dashboard", href: "/patientdashboard" },
  { name: "Care team", href: "/doctors" },
  { name: "Appointments", href: "/patientappointment" },
  { name: "Profile", href: "/patientdetailForm" },
];

const PatientDetailForm = () => {
  const { signOutPatient } = useAuth();

  return (
    <main className="care-patient-dashboard">
      <DashboardTopBar
        links={patientLinks}
        activePath="/patientdetailForm"
        onLogout={signOutPatient}
        roleLabel="Mother"
      />
      <section className="care-dashboard-main patient-profile-setup">
        <div className="care-page-header">
          <div>
            <span className="care-kicker">
              <FiUserCheck /> Mother profile
            </span>
            <h1>Complete the care profile.</h1>
            <p>
              These details help the field worker understand trimester status,
              location, and current concerns before logging checkup visits.
            </p>
          </div>
        </div>

        <div className="care-grid care-grid--2">
          <section className="care-panel">
            <PatientForm />
          </section>
          <aside className="care-card care-card--media">
            <img
              className="care-card__media patient-profile-setup__image"
              src={Patient3}
              alt="Mother profile setup"
            />
            <div style={{ padding: 22 }}>
              <div className="care-card__icon">
                <FiHeart />
              </div>
              <h3>Built for continuity after the first registration</h3>
              <p>
                Once the profile is ready, the mother dashboard can show
                appointments, reminders, and week-by-week milestone support.
              </p>
              <div style={{ marginTop: 18 }}>
                <Link to="/patientdashboard" className="care-btn care-btn--primary">
                  Open dashboard <FiArrowRight />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default PatientDetailForm;
