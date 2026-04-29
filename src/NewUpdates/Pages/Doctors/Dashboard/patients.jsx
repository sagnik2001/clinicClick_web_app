import { Link, useNavigate } from "react-router-dom";
import { FiChevronLeft, FiPlus, FiUsers } from "react-icons/fi";
import DashboardLayout from "../../../Layouts/DashboardLayout";
import { usePatientDetails } from "../../../Components/hooks/getpatientDetails";
import PatientDetailCard from "../../../Components/Doctors/patientDetails/PatientCard";
import { EmptyState, SkeletonGrid } from "../../../../Components/common/LoadingStates";

const PatientDetails = () => {
  const navigate = useNavigate();
  const { userInfo, isLoading, error } = usePatientDetails("doc/patients/");
  const patients = Array.isArray(userInfo) ? userInfo : [];

  return (
    <DashboardLayout>
      <section className="care-page-header">
        <div>
          <button
            type="button"
            className="care-breadcrumb"
            onClick={() => navigate(-1)}
            style={{ background: "transparent", border: 0, padding: 0 }}
          >
            <FiChevronLeft /> Back
          </button>
          <h1>Patient registry</h1>
          <p>
            A field-ready list of mothers registered under this worker account,
            with contact, location, trimester, and visit entry points.
          </p>
        </div>
        <Link to="/patientdetailForm" className="care-btn care-btn--secondary">
          <FiPlus /> Add record
        </Link>
      </section>

      <div className="care-stat-grid">
        <div className="care-stat-card">
          <span>Total records</span>
          <strong>{patients.length}</strong>
        </div>
        <div className="care-stat-card">
          <span>Trimester visibility</span>
          <strong>On</strong>
        </div>
        <div className="care-stat-card">
          <span>Follow-up flow</span>
          <strong>Live</strong>
        </div>
        <div className="care-stat-card">
          <span>Validated POC</span>
          <strong>NGO</strong>
        </div>
      </div>

      <section className="care-panel">
        <div className="care-panel__head">
          <div>
            <h2>
              <FiUsers /> Registered mothers
            </h2>
            <p>Skeleton cards display while records are syncing from the API.</p>
          </div>
        </div>

        {isLoading ? (
          <SkeletonGrid count={6} />
        ) : error ? (
          <EmptyState
            title="Unable to load patient records"
            message="The API request failed. Check the server connection and try again."
          />
        ) : patients.length > 0 ? (
          <div className="care-list-grid">
            {patients.map((patient) => (
              <PatientDetailCard patient={patient} key={patient._id} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No mothers registered yet"
            message="New patient records will appear here after a worker registers or subscribes a mother."
          />
        )}
      </section>
    </DashboardLayout>
  );
};

export default PatientDetails;
