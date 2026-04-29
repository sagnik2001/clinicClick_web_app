import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiEdit3, FiSave, FiXCircle } from "react-icons/fi";
import DashboardLayout from "../../../Layouts/DashboardLayout";
import PersonalDetails from "../../../Components/Doctors/users/PersonalDetail";
import ProfileImage from "../../../Components/Doctors/users/ProfileImage";
import { useFetchDoctorProfile } from "../../../Components/hooks/getInfo";
import { LoaderPanel, SkeletonGrid } from "../../../../Components/common/LoadingStates";

const DoctorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const methods = useForm({
    mode: "onTouched",
  });
  const { userInfo, isLoading } = useFetchDoctorProfile();

  useEffect(() => {
    if (userInfo) {
      methods.reset({
        name: userInfo?.name,
        city: userInfo?.city,
        address: userInfo?.address,
        email: userInfo?.email,
        price: userInfo?.price,
        desc: userInfo?.desc,
        phone: {
          countryCode: "+91",
          number: userInfo?.phone,
        },
        hospital: userInfo?.hospital,
        profile: userInfo?.profilePicture,
      });
    }
  }, [methods, userInfo]);

  const handleUpdateProfile = (data) => {
    console.log(data);
    setIsEditing(false);
  };

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
          <h1>Worker profile</h1>
          <p>
            Keep the health worker profile clear for mothers reviewing doctors
            and for staff using the POC as a reference system.
          </p>
        </div>
      </section>

      {isLoading ? (
        <section className="care-panel">
          <LoaderPanel label="Loading profile" />
          <SkeletonGrid count={2} />
        </section>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleUpdateProfile)}
            className="care-grid"
          >
            <div className="care-detail-grid">
              <section className="care-panel">
                <ProfileImage methods={methods} isEditing={isEditing} />
              </section>
              <section className="care-panel">
                <PersonalDetails methods={methods} isEditing={isEditing} />
              </section>
            </div>

            <section className="care-panel">
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, flexWrap: "wrap" }}>
                {isEditing && (
                  <button
                    className="care-btn care-btn--danger"
                    type="button"
                    onClick={() => {
                      methods.reset();
                      setIsEditing(false);
                    }}
                  >
                    <FiXCircle /> Cancel
                  </button>
                )}
                {!isEditing ? (
                  <button
                    type="button"
                    className="care-btn care-btn--primary"
                    onClick={() => setIsEditing(true)}
                  >
                    <FiEdit3 /> Edit profile
                  </button>
                ) : (
                  <button className="care-btn care-btn--primary" type="submit">
                    <FiSave /> Save profile
                  </button>
                )}
              </div>
            </section>
          </form>
        </FormProvider>
      )}
    </DashboardLayout>
  );
};

export default DoctorProfile;
