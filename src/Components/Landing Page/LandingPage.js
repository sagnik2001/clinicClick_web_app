import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBell,
  FiCalendar,
  FiCheckCircle,
  FiClipboard,
  FiHeart,
  FiSmartphone,
  FiUsers,
} from "react-icons/fi";
import { PublicNav } from "../common/CareShell";
import heroImage from "../assets/homepage.jpg";
import milestoneImage from "../assets/img.jpg";
import "./LandingPage.css";

const workflowCards = [
  {
    icon: <FiUsers />,
    title: "Register mothers in the field",
    copy: "Health workers can capture patient records, contact details, trimester status, location, and care notes during village visits.",
  },
  {
    icon: <FiClipboard />,
    title: "Log every checkup visit",
    copy: "Each appointment and checkup becomes a trackable record, so NGO staff can see who was seen, what changed, and what is pending.",
  },
  {
    icon: <FiBell />,
    title: "Trigger appointment reminders",
    copy: "Upcoming visits stay visible for workers, reducing missed ANC follow-ups and making the next action clear.",
  },
];

const validationNotes = [
  "Presented to Mamta HMIC staff as a working POC.",
  "Validated by the NGO as a useful reference for their production system.",
  "Iterated directly from field-worker feedback, not only classroom assumptions.",
];

const LandingPage = () => {
  return (
    <main className="care-page ngo-landing">
      <PublicNav />

      <section
        className="care-hero ngo-landing__hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="care-container">
          <div className="care-hero__content">
            <span className="care-kicker">
              <FiHeart /> NGO maternal health POC
            </span>
            <h1>Mamta HMIC maternal care platform</h1>
            <p className="care-hero__lead">
              A working proof of concept for local NGO field teams: health
              workers register patients, log checkup visits, track upcoming
              appointments, and mothers receive week-by-week pregnancy milestone
              updates.
            </p>
            <div className="care-hero__actions">
              <Link to="/home" className="care-btn care-btn--primary">
                Open portals <FiArrowRight />
              </Link>
              <Link to="/doctorlogin" className="care-btn care-btn--ghost">
                Health worker sign in
              </Link>
            </div>
          </div>
        </div>

        <div className="care-hero__strip">
          <div className="care-hero__stat">
            <strong>Register</strong>
            <span>Mother profiles</span>
          </div>
          <div className="care-hero__stat">
            <strong>Log</strong>
            <span>Checkup visits</span>
          </div>
          <div className="care-hero__stat">
            <strong>Remind</strong>
            <span>Upcoming appointments</span>
          </div>
          <div className="care-hero__stat">
            <strong>Update</strong>
            <span>Weekly milestones</span>
          </div>
        </div>
      </section>

      <section className="care-section">
        <div className="care-container">
          <div className="care-section__header">
            <div>
              <span className="care-kicker">Field workflow</span>
              <h2 className="care-section__title">Built around NGO staff work</h2>
            </div>
            <p className="care-section__copy">
              The POC focuses on the practical loop Mamta HMIC needed to test:
              identify the mother, record the visit, schedule the next follow-up,
              and keep the family informed.
            </p>
          </div>

          <div className="care-grid care-grid--3">
            {workflowCards.map((item) => (
              <article className="care-card" key={item.title}>
                <div className="care-card__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="care-section care-section--tight">
        <div className="care-container care-split">
          <div>
            <span className="care-kicker">
              <FiSmartphone /> Mother support
            </span>
            <h2 className="care-section__title">
              Week-by-week milestone updates for expectant mothers
            </h2>
            <p className="care-section__copy">
              Mothers get a calmer dashboard for appointment status, trimester
              details, and practical milestone guidance. The worker side keeps
              the same record visible to the care team.
            </p>
            <div className="ngo-validation-list">
              {validationNotes.map((note) => (
                <div className="ngo-validation-list__item" key={note}>
                  <FiCheckCircle />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="care-photo-panel">
            <img src={milestoneImage} alt="Pregnancy nutrition milestone guidance" />
            <div className="care-photo-panel__caption">
              <strong>Care content can live beside clinical follow-ups.</strong>
              <span>
                The product reference combines operational tracking with mother
                education and appointment continuity.
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section className="care-section">
        <div className="care-container">
          <div className="ngo-proof-panel">
            <div>
              <span className="care-kicker">
                <FiCalendar /> Iterative delivery
              </span>
              <h2>Owned the build and shipped from direct feedback</h2>
              <p>
                The POC was delivered as a working product reference, then
                refined around feedback from NGO staff who understood the field
                workflow and the production system they wanted to build.
              </p>
            </div>
            <Link to="/home" className="care-btn care-btn--primary">
              Choose a portal <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
