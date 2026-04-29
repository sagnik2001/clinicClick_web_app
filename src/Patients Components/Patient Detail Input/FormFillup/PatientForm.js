import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit3, FiSave, FiXCircle } from "react-icons/fi";
import { usePatientInfo } from "../../../Context/PatientInfoContext";
import { api_url } from "../../../Urls/Api";
import { LoaderPanel } from "../../../Components/common/LoadingStates";
import "./PatientForm.css";

const PatientForm = () => {
  const { updatePatientInfo } = usePatientInfo();
  const token = window.localStorage.getItem("patientToken");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [patientInfo, setPatientInfo] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    country: "",
    city: "",
    trimester: "",
    problems: "",
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`${api_url}patient/patientinfo`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatientInfo(res.data);
        setForm({
          name: res.data?.name || "",
          phone: res.data?.phone || "",
          country: res.data?.country || "",
          city: res.data?.city || "",
          trimester: res.data?.trimester || "",
          problems: res.data?.problems || "",
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchPatient();
  }, [token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitData = (event) => {
    event.preventDefault();
    const body = {
      name: form.name || patientInfo?.name,
      phone: form.phone || patientInfo?.phone,
      country: form.country || patientInfo?.country,
      problems: form.problems || patientInfo?.problems,
      trimester: form.trimester || patientInfo?.trimester,
      city: form.city || patientInfo?.city,
    };
    updatePatientInfo(body);
    toast.success("Updated successfully");
  };

  if (loading) {
    return <LoaderPanel label="Loading mother profile" />;
  }

  return (
    <form className="patient-form-modern" onSubmit={submitData}>
      <div className="care-panel__head">
        <div>
          <h2>Profile details</h2>
          <p>Update the information shared with the health worker console.</p>
        </div>
        {!isEditing ? (
          <button
            className="care-btn care-btn--secondary"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            <FiEdit3 /> Edit
          </button>
        ) : (
          <button
            className="care-btn care-btn--danger"
            type="button"
            onClick={() => {
              setIsEditing(false);
              setForm({
                name: patientInfo?.name || "",
                phone: patientInfo?.phone || "",
                country: patientInfo?.country || "",
                city: patientInfo?.city || "",
                trimester: patientInfo?.trimester || "",
                problems: patientInfo?.problems || "",
              });
            }}
          >
            <FiXCircle /> Cancel
          </button>
        )}
      </div>

      <div className="patient-form-modern__grid">
        <label>
          <span>Name</span>
          <input
            className="care-input"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <label>
          <span>Phone</span>
          <input
            className="care-input"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <label>
          <span>Trimester</span>
          <select
            className="care-input"
            name="trimester"
            value={form.trimester}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="">Select trimester</option>
            <option value="1st">1st trimester</option>
            <option value="2nd">2nd trimester</option>
            <option value="3rd">3rd trimester</option>
          </select>
        </label>
        <label>
          <span>City</span>
          <input
            className="care-input"
            name="city"
            value={form.city}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <label>
          <span>Country</span>
          <input
            className="care-input"
            name="country"
            value={form.country}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <label className="patient-form-modern__wide">
          <span>Current concerns</span>
          <textarea
            className="care-input patient-form-modern__textarea"
            name="problems"
            value={form.problems}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Write any concern the worker should know before the next checkup."
          />
        </label>
      </div>

      <div className="patient-form-modern__actions">
        {isEditing && (
          <button className="care-btn care-btn--primary" type="submit">
            <FiSave /> Save profile
          </button>
        )}
        <Link to="/patientdashboard" className="care-btn care-btn--secondary">
          Move to dashboard
        </Link>
      </div>
    </form>
  );
};

export default PatientForm;
