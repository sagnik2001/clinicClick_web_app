import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiLock, FiUsers } from "react-icons/fi";
import { useAuth } from "../../../../Context/AuthContext";
import workerImage from "../../../../Components/assets/Doctor_login.svg";
import { PublicNav } from "../../../../Components/common/CareShell";
import TextInput from "../../../Components/forms/TextInput";
import PasswordInput from "../../../Components/forms/PasswordInput";

const SignInPage = () => {
  const { Doctor_login } = useAuth();
  const methods = useForm({
    mode: "onTouched",
  });

  const handleSignIn = (data) => {
    Doctor_login(data);
  };

  return (
    <main className="care-auth-page">
      <PublicNav />
      <section className="care-container care-auth-layout">
        <aside className="care-auth-visual">
          <div>
            <span className="care-kicker">
              <FiLock /> Worker access
            </span>
            <h2>Field records, checkups, and reminders in one console.</h2>
            <p>
              Sign in to continue managing mother registrations, visit logs,
              and upcoming appointment reminders for the Mamta HMIC reference
              workflow.
            </p>
          </div>
          <img src={workerImage} alt="Health worker accessing patient records" />
          <div className="care-auth-highlights">
            <span>
              <FiUsers /> Patient registry
            </span>
            <span>
              <FiCheckCircle /> Visit follow-up
            </span>
          </div>
        </aside>

        <section className="care-auth-card">
          <h1>Health worker sign in</h1>
          <p className="care-auth-card__copy">
            Access the protected console used to register patients, review care
            details, and keep appointments moving.
          </p>

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleSignIn)}
              className="care-auth-form"
            >
              <TextInput
                {...methods.register("email")}
                label="Email"
                placeholder="Enter email"
                background="light"
                required
              />
              <PasswordInput
                {...methods.register("password")}
                label="Password"
                placeholder="Enter password"
                background="light"
                required
              />
              <button className="care-btn care-btn--primary" type="submit">
                Sign in to console
              </button>
            </form>
          </FormProvider>

          <div className="care-form-footer">
            <Link to="/forgetPassword">Forgot password?</Link>
            <span>
              New worker? <Link to="/doctorRegister">Create account</Link>
            </span>
          </div>
        </section>
      </section>
    </main>
  );
};

export default SignInPage;
