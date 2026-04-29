import { useNavigate, useParams } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import PatientDetail from "../../../../Patients Components/Detail of a Patient/PatientDetail";
import { usePatientDetails } from "../../../Components/hooks/getpatientDetails";
import DashboardLayout from "../../../Layouts/DashboardLayout";
import { EmptyState, LoaderPanel, SkeletonGrid } from "../../../../Components/common/LoadingStates";

const PatientDetailed = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    userInfo: getPatientInfo,
    isLoading,
    error,
  } = usePatientDetails(`patient/${params.id}`);

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
            <FiChevronLeft /> Back to registry
          </button>
          <h1>{getPatientInfo?.name || "Patient details"}</h1>
          <p>
            A complete view of the mother profile, trimester context, location,
            concerns, and appointment history.
          </p>
        </div>
      </section>

      {isLoading ? (
        <section className="care-panel">
          <LoaderPanel label="Loading patient details" />
          <SkeletonGrid count={2} />
        </section>
      ) : error ? (
        <EmptyState
          title="Unable to load patient details"
          message="The patient detail request failed. Check the API connection and try again."
        />
      ) : getPatientInfo ? (
        <PatientDetail getPatientInfo={getPatientInfo} />
      ) : (
        <EmptyState
          title="Patient details not found"
          message="This patient record may have been removed or is unavailable."
        />
      )}
    </DashboardLayout>
  );
};

export default PatientDetailed;
