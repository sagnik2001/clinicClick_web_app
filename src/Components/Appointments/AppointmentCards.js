import { React, useEffect, useState } from "react";
import axios from "axios";
import { FiCalendar } from "react-icons/fi";
import DashboardLayout from "../../NewUpdates/Layouts/DashboardLayout";
import { EmptyState, SkeletonGrid } from "../common/LoadingStates";
import { api_url } from "../../Urls/Api";
import AppointmentLists from "./AppointmentLists";
import "./Appointments.css";

const AppointmentCards = () => {
  const token = window.localStorage.getItem("token");
  const [appointmentdetails, setappointmentdetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${api_url}appointment/get/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setappointmentdetails(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <DashboardLayout>
      <section className="care-page-header">
        <div>
          <span className="care-kicker">
            <FiCalendar /> Appointments
          </span>
          <h1>Checkup visits</h1>
          <p>
            Appointments created from mother subscriptions and booking flows,
            ready for workers to complete after each visit.
          </p>
        </div>
      </section>

      <section className="care-panel">
        {loading ? (
          <SkeletonGrid count={4} />
        ) : error ? (
          <EmptyState
            title="Unable to load appointments"
            message="The appointment request failed. Check the API connection and try again."
          />
        ) : appointmentdetails.length > 0 ? (
          <div className="care-list-grid">
            {appointmentdetails.map((doc) => (
              <AppointmentLists doc={doc} key={doc?._id} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No appointments scheduled"
            message="Booked checkups will appear here once mothers schedule visits."
          />
        )}
      </section>
    </DashboardLayout>
  );
};

export default AppointmentCards;
