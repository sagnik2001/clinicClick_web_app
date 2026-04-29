import React from "react";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiBell, FiClipboard, FiUserPlus } from "react-icons/fi";
import { api_url } from "../../../../Urls/Api";
import workerImage from "../../../../Components/assets/Doctor_register.svg";
import { PublicNav } from "../../../../Components/common/CareShell";
import TextInput from "../../../Components/forms/TextInput";
import PasswordInput from "../../../Components/forms/PasswordInput";
import PasswordInputWithSugg from "../../../Components/forms/PasswordInputWithSugg";
import PhoneInput from "../../../Components/forms/PhoneInput";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]*)|(\([0-9]{2,3}\)[ -]*)|([0-9]{2,4})[ -]*)*?[0-9]{3,4}?[ -]*[0-9]{3,4}?$/;

const registerUserSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Email Format is not valid")
    .required("Email is required"),
  password: yup.string().required("Password is required").min(8),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Confirm password should be same as password"),
  phone: yup.object().shape({
    number: yup
      .string()
      .required("Phone number is required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "too short")
      .max(10, "too long"),
  }),
});

const RegisterPage = () => {
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(registerUserSchema),
    defaultValues: {
      phone: {
        countryCode: "+91",
      },
    },
  });

  const handleRegister = (data) => {
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone.number,
    };

    axios
      .post(`${api_url}doc/register/`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        toast.success("Signed up successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to create account right now");
      });
  };

  return (
    <main className="care-auth-page">
      <PublicNav />
      <section className="care-container care-auth-layout">
        <aside className="care-auth-visual">
          <div>
            <span className="care-kicker">
              <FiUserPlus /> Worker onboarding
            </span>
            <h2>Set up the account used by field staff to manage care.</h2>
            <p>
              The worker role owns registration, visit history, appointment
              reminders, and the mother records Mamta HMIC validated during the
              POC review.
            </p>
          </div>
          <img src={workerImage} alt="Health worker registration illustration" />
          <div className="care-auth-highlights">
            <span>
              <FiClipboard /> Register patients
            </span>
            <span>
              <FiBell /> Reminder queue
            </span>
          </div>
        </aside>

        <section className="care-auth-card">
          <h1>Create worker account</h1>
          <p className="care-auth-card__copy">
            Add secure credentials for a health worker who will manage field
            visits and patient follow-ups.
          </p>

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleRegister)}
              className="care-auth-form"
            >
              <TextInput
                {...methods.register("name")}
                label="Name"
                placeholder="Enter name"
                background="light"
                required
              />
              <TextInput
                {...methods.register("email")}
                label="Email"
                placeholder="Enter email"
                background="light"
                required
              />
              <PasswordInputWithSugg
                {...methods.register("password")}
                label="Create password"
                placeholder="Enter password"
                value={methods.watch("password")}
                background="light"
                required
              />
              <PasswordInput
                {...methods.register("confirmPassword")}
                label="Confirm password"
                placeholder="Confirm password"
                background="light"
                required
              />
              <PhoneInput
                {...methods.register("phone")}
                label="Phone number"
                placeholder="Enter phone number"
                background="light"
                required
              />
              <button className="care-btn care-btn--primary" type="submit">
                Create account
              </button>
            </form>
          </FormProvider>

          <div className="care-form-footer">
            <span>
              Already registered? <Link to="/doctorlogin">Sign in</Link>
            </span>
          </div>
        </section>
      </section>
    </main>
  );
};

export default RegisterPage;
