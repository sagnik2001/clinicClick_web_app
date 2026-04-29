import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiCalendar } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { DashboardTopBar } from "../../Components/common/CareShell";
import { EmptyState, SkeletonGrid } from "../../Components/common/LoadingStates";
import { useAuth } from "../../Context/AuthContext";
import { api_url } from "../../Urls/Api";
import AppointmentsAll from "./AppointmentsAll";

const patientLinks = [
  { name: "Dashboard", href: "/patientdashboard" },
  { name: "Care team", href: "/doctors" },
  { name: "Appointments", href: "/patientappointment" },
  { name: "Profile", href: "/patientdetailForm" },
];

const Appointments = () => {
  const token = window.localStorage.getItem("patientToken");
  const [appointmentlist, setappointmentlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { signOutPatient } = useAuth();

  useEffect(() => {
    axios
      .get(`${api_url}appointment/get/patient/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setappointmentlist(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <main className="care-patient-dashboard">
      <DashboardTopBar
        links={patientLinks}
        activePath={location.pathname}
        onLogout={signOutPatient}
        roleLabel="Mother"
      />
      <section className="care-dashboard-main">
        <div className="care-page-header">
          <div>
            <span className="care-kicker">
              <FiCalendar /> Appointments
            </span>
            <h1>Your checkup visits</h1>
            <p>
              A mother-facing list of upcoming, completed, and cancelled
              appointments created from the POC booking workflow.
            </p>
          </div>
        </div>

        <section className="care-panel">
          {loading ? (
            <SkeletonGrid count={4} />
          ) : error ? (
            <EmptyState
              title="Unable to load appointments"
              message="The appointment request failed. Check the API connection and try again."
            />
          ) : appointmentlist.length > 0 ? (
            <div className="care-list-grid">
              {appointmentlist.map((patient) => (
                <AppointmentsAll patient={patient} key={patient?._id} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No appointments yet"
              message="Appointments booked with a subscribed doctor will appear here."
            />
          )}
        </section>
      </section>
    </main>
  );
};

export default Appointments;
