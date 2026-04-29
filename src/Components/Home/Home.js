import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiHeart, FiShield, FiUsers } from "react-icons/fi";
import { PublicNav } from "../common/CareShell";
import roleImage from "../assets/Home.svg";
import fieldImage from "../assets/homepage.jpg";
import "./home.css";

const Home = () => {
  const patientToken = window.localStorage.getItem("patientToken");
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/doctorDashboard");
    if (patientToken) navigate("/patientdetailForm");
  }, [navigate, patientToken, token]);

  return (
    <main className="care-role-page">
      <PublicNav />
      <section className="care-container care-role-layout">
        <div className="care-role-copy">
          <span className="care-kicker">
            <FiShield /> Secure care portals
          </span>
          <h1>Choose the workflow you are continuing.</h1>
          <p>
            The POC separates field-worker operations from the mother-facing
            journey while keeping patient records, checkups, and appointments
            connected through the same backend.
          </p>

          <div className="care-role-cards">
            <Link to="/doctorRegister" className="care-role-card">
              <span className="care-role-card__icon">
                <FiUsers />
              </span>
              <span>
                <h3>Health worker console</h3>
                <span>Register patients, review checkups, and track follow-ups.</span>
              </span>
              <span className="care-btn care-btn--primary">
                Start <FiArrowRight />
              </span>
            </Link>

            <Link to="/patientRegister" className="care-role-card">
              <span className="care-role-card__icon">
                <FiHeart />
              </span>
              <span>
                <h3>Mother journey</h3>
                <span>View appointments, pregnancy details, and milestone updates.</span>
              </span>
              <span className="care-btn care-btn--secondary">
                Continue <FiArrowRight />
              </span>
            </Link>
          </div>
        </div>

        <aside className="care-role-visual home-visual">
          <img src={roleImage} alt="Maternal care portal illustration" />
          <div className="home-visual__image-card">
            <img src={fieldImage} alt="Pregnancy care guidance" />
            <div>
              <FiCalendar />
              <strong>Appointment continuity</strong>
              <span>Reminders and milestone visibility stay central to the POC.</span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Home;
