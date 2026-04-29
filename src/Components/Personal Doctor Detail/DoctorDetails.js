import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { FiUserCheck } from "react-icons/fi";
import { api_url } from "../../Urls/Api";
import { DashboardTopBar } from "../common/CareShell";
import { EmptyState, LoaderPanel } from "../common/LoadingStates";
import { useAuth } from "../../Context/AuthContext";
import { DoctorCard } from "./DoctorCard";
import "./DoctorDetails.css";

const patientLinks = [
  { name: "Dashboard", href: "/patientdashboard" },
  { name: "Care team", href: "/doctors" },
  { name: "Appointments", href: "/patientappointment" },
  { name: "Profile", href: "/patientdetailForm" },
];

const DoctorDetails = () => {
  const [docData, setDocData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const { signOutPatient } = useAuth();

  useEffect(() => {
    axios
      .get(`${api_url}doc/${id}`)
      .then((response) => {
        setDocData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

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
              <FiUserCheck /> Care provider
            </span>
            <h1>{docData?.name || "Doctor profile"}</h1>
            <p>
              Provider details, visiting hours, centre information, and reviews
              for the mother-facing booking workflow.
            </p>
          </div>
        </div>

        {loading ? (
          <section className="care-panel">
            <LoaderPanel label="Loading doctor profile" />
          </section>
        ) : error ? (
          <EmptyState
            title="Unable to load doctor profile"
            message="The profile request failed. Check the API connection and try again."
          />
        ) : (
          <DoctorCard doc={docData} />
        )}
      </section>
    </main>
  );
};

export default DoctorDetails;
