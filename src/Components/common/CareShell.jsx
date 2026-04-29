import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiArrowRight, FiBell, FiLogOut, FiUser } from "react-icons/fi";

export const BrandMark = ({ compact = false }) => (
  <Link to="/" className="care-brand" aria-label="Mamta HMIC care platform">
    <span className="care-brand__mark">MH</span>
    {!compact && (
      <span className="care-brand__text">
        <span className="care-brand__name">Mamta HMIC POC</span>
        <span className="care-brand__sub">Maternal field care</span>
      </span>
    )}
  </Link>
);

export const PublicNav = () => {
  const workerToken = window.localStorage.getItem("token");
  const motherToken = window.localStorage.getItem("patientToken");

  return (
    <nav className="care-nav">
      <div className="care-container care-nav__inner">
        <BrandMark />
        <div className="care-nav__actions">
          <NavLink to="/home" className="care-nav__link">
            Portals
          </NavLink>
          {workerToken && (
            <NavLink to="/doctorDashboard" className="care-nav__link">
              Worker console
            </NavLink>
          )}
          {motherToken && (
            <NavLink to="/patientdashboard" className="care-nav__link">
              Mother dashboard
            </NavLink>
          )}
          {!workerToken && (
            <NavLink to="/doctorlogin" className="care-nav__link">
              Health worker
            </NavLink>
          )}
          {!motherToken && (
            <NavLink to="/patientLogin" className="care-btn care-btn--primary">
              Mother login <FiArrowRight />
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export const DashboardTopBar = ({
  links = [],
  activePath,
  onLogout,
  roleLabel = "Field worker",
}) => (
  <nav className="care-dashboard-nav">
    <div className="care-container care-dashboard-nav__inner">
      <BrandMark />
      <div className="care-dashboard-nav__links">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.href}
            className={`care-nav__link ${
              activePath === link.href ? "active" : ""
            }`}
          >
            {link.name}
          </NavLink>
        ))}
      </div>
      <div className="care-dashboard-nav__right">
        <span className="care-pill">
          <FiUser /> {roleLabel}
        </span>
        <button className="care-icon-btn" type="button" aria-label="Notifications">
          <FiBell />
        </button>
        {onLogout && (
          <button
            className="care-icon-btn"
            type="button"
            onClick={onLogout}
            aria-label="Logout"
          >
            <FiLogOut />
          </button>
        )}
      </div>
    </div>
  </nav>
);
