import React from "react";
import { FiInbox } from "react-icons/fi";

export const LoaderInline = ({ label = "Loading records" }) => (
  <div className="care-loader">
    <span className="care-loader__dot" />
    <span>{label}</span>
  </div>
);

export const LoaderPanel = ({ label = "Syncing field records" }) => (
  <div className="care-loader care-loader--center">
    <span className="care-loader__dot" />
    <span>{label}</span>
  </div>
);

export const SkeletonBlock = ({ className = "", style }) => (
  <div className={`care-skeleton ${className}`} style={style} />
);

export const SkeletonCard = () => (
  <div className="care-skeleton-card">
    <div className="care-skeleton-row">
      <SkeletonBlock className="care-skeleton-avatar" />
      <div style={{ flex: 1 }}>
        <SkeletonBlock className="care-skeleton-line care-skeleton-line--lg" />
        <SkeletonBlock className="care-skeleton-line care-skeleton-line--sm" />
      </div>
    </div>
    <SkeletonBlock className="care-skeleton-line" style={{ width: "88%" }} />
    <SkeletonBlock className="care-skeleton-line" style={{ width: "72%" }} />
    <SkeletonBlock className="care-skeleton-line" style={{ width: "54%" }} />
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="care-list-grid">
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

export const EmptyState = ({
  title = "No records yet",
  message = "New records will appear here after the first sync.",
  action,
}) => (
  <div className="care-empty">
    <div>
      <div className="care-empty__icon">
        <FiInbox />
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
      {action ? <div style={{ marginTop: 18 }}>{action}</div> : null}
    </div>
  </div>
);
