import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiHeart,
  FiMapPin,
  FiUser,
} from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { DashboardTopBar } from "../../Components/common/CareShell";
import {
  EmptyState,
  LoaderPanel,
  SkeletonGrid,
} from "../../Components/common/LoadingStates";
import { useAuth } from "../../Context/AuthContext";
import { api_url } from "../../Urls/Api";
import milestoneImage from "../../Components/assets/img.jpg";

const patientLinks = [
  { name: "Dashboard", href: "/patientdashboard" },
  { name: "Care team", href: "/doctors" },
  { name: "Appointments", href: "/patientappointment" },
  { name: "Profile", href: "/patientdetailForm" },
];

const milestoneCards = [
  {
    label: "Week 8-12",
    title: "Early registration and first ANC visit",
    copy: "Confirm registration, basic vitals, supplements, and risk notes.",
  },
  {
    label: "Week 13-24",
    title: "Nutrition, growth, and symptom check",
    copy: "Track trimester progress and keep follow-up visits visible.",
  },
  {
    label: "Week 25-40",
    title: "Birth readiness and reminder support",
    copy: "Keep the next appointment, emergency plan, and worker contact easy to find.",
  },
];

const formatDate = (date) => {
  if (!date) return "NA";
  return date.toString().replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
};

export const DashboardPatient = () => {
  const token = window.localStorage.getItem("patientToken");
  const location = useLocation();
  const { signOutPatient } = useAuth();
  const [patientInfo, setPatientInfo] = useState(null);
  const [appointmentsToday, setAppointmentsToday] = useState([]);
  const [appointmentsAll, setAppointmentsAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const [patient, today, all] = await Promise.all([
          axios.get(`${api_url}patient/patientinfo/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${api_url}appointment/getperpatientdate/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${api_url}appointment/get/patient/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setPatientInfo(patient.data);
        setAppointmentsToday(Array.isArray(today.data) ? today.data : []);
        setAppointmentsAll(Array.isArray(all.data) ? all.data : []);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  return (
    <div className="care-patient-dashboard">
      <DashboardTopBar
        links={patientLinks}
        activePath={location.pathname}
        onLogout={signOutPatient}
        roleLabel="Mother"
      />
      <main className="care-dashboard-main">
        <section className="care-page-header">
          <div>
            <span className="care-kicker">
              <FiHeart /> Mother dashboard
            </span>
            <h1>
              {patientInfo?.name ? `${patientInfo.name}'s care journey` : "Care journey"}
            </h1>
            <p>
              Appointment status, trimester context, and week-by-week milestone
              prompts stay visible for the mother and aligned with the worker
              records.
            </p>
          </div>
        </section>

        {loading ? (
          <section className="care-panel">
            <LoaderPanel label="Loading mother dashboard" />
            <SkeletonGrid count={4} />
          </section>
        ) : error ? (
          <EmptyState
            title="Unable to load dashboard"
            message="The dashboard API requests failed. Check the server connection and try again."
          />
        ) : (
          <>
            <div className="care-stat-grid">
              <div className="care-stat-card">
                <span>Trimester</span>
                <strong>{patientInfo?.trimester || "NA"}</strong>
              </div>
              <div className="care-stat-card">
                <span>Today</span>
                <strong>{appointmentsToday.length}</strong>
              </div>
              <div className="care-stat-card">
                <span>Total visits</span>
                <strong>{appointmentsAll.length}</strong>
              </div>
              <div className="care-stat-card">
                <span>Milestones</span>
                <strong>Weekly</strong>
              </div>
            </div>

            <div className="care-grid care-grid--2">
              <section className="care-panel">
                <div className="care-panel__head">
                  <div>
                    <h2>Upcoming checkups</h2>
                    <p>Reminders for visits due today.</p>
                  </div>
                </div>
                {appointmentsToday.length > 0 ? (
                  <div className="care-timeline">
                    {appointmentsToday.map((appointment) => (
                      <div className="care-timeline__item" key={appointment?._id}>
                        <div className="care-timeline__icon">
                          <FiCalendar />
                        </div>
                        <div className="care-timeline__body">
                          <strong>{formatDate(appointment?.Date)}</strong>
                          <span>
                            <FiClock /> {appointment?.startTimeHours}:
                            {appointment?.startTimeMinutes} to{" "}
                            {appointment?.endTimeHours}:{appointment?.endTimeMinutes}
                          </span>
                          <span>Status: {appointment?.Status || "not updated"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No appointments today"
                    message="New reminders will appear here when a worker schedules the next checkup."
                  />
                )}
              </section>

              <section className="care-card care-card--media">
                <img
                  className="care-card__media"
                  src={milestoneImage}
                  alt="Pregnancy milestone and nutrition guidance"
                />
                <div style={{ padding: 22 }}>
                  <div className="care-card__icon">
                    <FiCheckCircle />
                  </div>
                  <h3>Milestone support beside appointment tracking</h3>
                  <p>
                    The POC demonstrates how education and operational follow-up
                    can sit together for mothers and health workers.
                  </p>
                </div>
              </section>
            </div>

            <section className="care-panel" style={{ marginTop: 18 }}>
              <div className="care-panel__head">
                <div>
                  <h2>Week-by-week prompts</h2>
                  <p>Static POC content that can later be backed by CMS or API data.</p>
                </div>
              </div>
              <div className="care-list-grid">
                {milestoneCards.map((item) => (
                  <article className="care-list-card" key={item.label}>
                    <span className="care-pill care-pill--amber">{item.label}</span>
                    <h3 style={{ marginTop: 14 }}>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="care-panel" style={{ marginTop: 18 }}>
              <div className="care-panel__head">
                <div>
                  <h2>Profile summary</h2>
                  <p>Shared context used by health workers during checkups.</p>
                </div>
              </div>
              <div className="care-meta-list">
                <div className="care-meta">
                  <span>
                    <FiUser /> Name
                  </span>
                  <strong>{patientInfo?.name || "NA"}</strong>
                </div>
                <div className="care-meta">
                  <span>Phone</span>
                  <strong>{patientInfo?.phone || "NA"}</strong>
                </div>
                <div className="care-meta">
                  <span>
                    <FiMapPin /> Location
                  </span>
                  <strong>
                    {[patientInfo?.city, patientInfo?.country]
                      .filter(Boolean)
                      .join(", ") || "NA"}
                  </strong>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};
