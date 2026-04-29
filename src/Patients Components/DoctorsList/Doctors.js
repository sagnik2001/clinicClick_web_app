import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  FiCalendar,
  FiHeart,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUserPlus,
} from "react-icons/fi";
import { FaHospital } from "react-icons/fa";
import { toast } from "react-toastify";
import { DashboardTopBar } from "../../Components/common/CareShell";
import { EmptyState, SkeletonGrid } from "../../Components/common/LoadingStates";
import { useAuth } from "../../Context/AuthContext";
import { api_url } from "../../Urls/Api";
import AddAppModal from "../AddAppointment/AddAppointment";
import "./doctors.css";

const patientLinks = [
  { name: "Dashboard", href: "/patientdashboard" },
  { name: "Care team", href: "/doctors" },
  { name: "Appointments", href: "/patientappointment" },
  { name: "Profile", href: "/patientdetailForm" },
];

export const Doctors = () => {
  const [docData, setDocData] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [getPatientInfo, setPatientInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = window.localStorage.getItem("patientToken");
  const location = useLocation();
  const { signOutPatient } = useAuth();

  const setOpen = () => setIsBookingOpen(true);
  const setClose = () => setIsBookingOpen(false);

  const getData = () => {
    setLoading(true);
    axios
      .get(`${api_url}doc/getdoc`, {})
      .then((res) => {
        setDocData(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    axios
      .get(`${api_url}patient/patientinfo/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPatientInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    getData();
  }, []);

  const handleSubcription = (doctorId) => {
    axios
      .post(
        `${api_url}doc/sendInvite`,
        { doctorId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() => {
        getData();
        toast.success("Sent subscription successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnSubcription = (doctorId) => {
    axios
      .post(
        `${api_url}doc/removeSubscription/`,
        { doctorId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() => {
        getData();
        toast.success("Unsubscribed successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <FiHeart /> Care team
            </span>
            <h1>Health workers and doctors</h1>
            <p>
              Subscribe to a care provider, view their profile, and book checkup
              visits from the mother-facing side of the POC.
            </p>
          </div>
        </div>

        <section className="care-panel">
          {loading ? (
            <SkeletonGrid count={6} />
          ) : docData.length > 0 ? (
            <div className="care-list-grid">
              {docData.map((doc) => {
                const isSubscribed = doc?.patients?.includes(getPatientInfo?._id);
                return (
                  <article className="care-list-card" key={doc?._id}>
                    <div className="care-list-card__top">
                      <div style={{ display: "flex", gap: 12 }}>
                        <div className="care-avatar">
                          {doc?.profilePicture ? (
                            <img src={doc.profilePicture} alt={doc?.name} />
                          ) : (
                            doc?.name?.charAt(0)?.toUpperCase() || "D"
                          )}
                        </div>
                        <div>
                          <h3>{doc?.name || "Doctor"}</h3>
                          <p>{doc?.specialization || "Maternal care"}</p>
                        </div>
                      </div>
                      <span className={`care-pill ${isSubscribed ? "" : "care-pill--amber"}`}>
                        {isSubscribed ? "Subscribed" : "Available"}
                      </span>
                    </div>

                    <div className="care-meta-list">
                      <div className="care-meta">
                        <span>
                          <FiPhone /> Phone
                        </span>
                        <strong>{doc?.phone || "NA"}</strong>
                      </div>
                      <div className="care-meta">
                        <span>
                          <FiMail /> Email
                        </span>
                        <strong>{doc?.email || "NA"}</strong>
                      </div>
                      <div className="care-meta">
                        <span>
                          <FiMapPin /> City
                        </span>
                        <strong>{doc?.city || "NA"}</strong>
                      </div>
                      <div className="care-meta">
                        <span>
                          <FaHospital /> Centre
                        </span>
                        <strong>{doc?.hospital || "NA"}</strong>
                      </div>
                    </div>

                    <div className="doctors-actions">
                      {isSubscribed && (
                        <button
                          type="button"
                          className="care-btn care-btn--primary"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedDoctorId(doc?._id);
                            setOpen();
                          }}
                        >
                          <FiCalendar /> Book
                        </button>
                      )}
                      <Link to={`/doctor/${doc._id}`} className="care-btn care-btn--secondary">
                        View profile
                      </Link>
                      {!isSubscribed ? (
                        <button
                          type="button"
                          className="care-btn care-btn--secondary"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSubcription(doc?._id);
                          }}
                        >
                          <FiUserPlus /> Subscribe
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="care-btn care-btn--danger"
                          onClick={(e) => {
                            e.preventDefault();
                            handleUnSubcription(doc?._id);
                          }}
                        >
                          Unsubscribe
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="No care providers found"
              message="Doctors and health workers will appear here after they are available from the API."
            />
          )}
        </section>
      </section>
      <AddAppModal open={isBookingOpen} onClose={setClose} id={selectedDoctorId} />
    </main>
  );
};
