import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import image4 from "../assets/Home.svg";
import { useNavigate } from "react-router-dom";
import "./home.css";
import AuthLayout from "../../NewUpdates/Layouts/AuthLayout";
import { useAuth } from "../../Context/AuthContext";
import { Box } from "@mui/material";
import classNames from 'classnames';
import LogoImg from "../assets/logo.png"
import DividerImg from "../assets/divider.svg"

const Home = () => {
  const patientToken = window.localStorage.getItem("patientToken");

  const navigate = useNavigate();
  const { isMobileDevice } = useAuth()
  const token = window.localStorage.getItem("token");


  useEffect(() => {
    if (token) navigate("/doctordetails");
    if (patientToken) navigate(`/patientdetailForm`);
  }, []);

  return (

    <AuthLayout>
      <Box
        className={classNames(
          'h-full flex flex-col lg:flex-row items-center justify-between sm:gap-4 py-8 overflow-hidden',
        )}
      >
        <Box
          className={classNames(
            'sm:h-full w-full lg:w-1/2 flex flex-col items-center sm:justify-center',
          )}
        >
          {isMobileDevice && (
            <Box className="flex flex-col items-center gap-[1rem]">
              <Box id="logo-container">
                <img
                  src={image4}
                  width={isMobileDevice ? 238 : 448}
                  height={isMobileDevice ? 74 : 111}
                  alt="logo"
                />
              </Box>
              <Box className="w-full flex flex-col gap-[0.7rem] md:gap-[1.12rem]">
                <p
                  className={classNames(
                    'font-roboto font-light text-[1rem] md:text-[1.125rem] text-center text-white',
                  )}
                >
                  All your appointments and patient details inside a
                  <br />
                  <span className="text-[#663399] italic underline">secured platform</span>
                </p>
              </Box>
            </Box>
          )}
          {!isMobileDevice && (
            <Box id="illustration-container" className="relative w-full h-full max-h-[680px] px-16">
              <img
                src={image4}
                alt="LandingPic"
                layout="fill"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
          )}
        </Box>
        <Box className="hidden lg:block lg:h-max">
          <img src={DividerImg} alt="|" width={2} height={500} />
        </Box>
        <Box
          className={classNames(
            'h-full w-full lg:w-1/2 flex flex-col items-center sm:justify-center gap-[4rem]',
          )}
        >
          {!isMobileDevice && (
            <Box id="logo-container">
              <img
                src={LogoImg}
                width={isMobileDevice ? 238 : 448}
                height={isMobileDevice ? 74 : 111}
                alt="logo"
              />
            </Box>
          )}
          <Box
            className={classNames('w-full', {
              'px-0 py-[6rem]': isMobileDevice,
              'px-28': !isMobileDevice,
            })}
          >
              <p className="text-white font-roboto">
                Your trusted companion on the incredible journey of pregnancy! Navigating the path to motherhood should be a joyful experience, and at PregBuddy, we're here to make it even more special.

                PregBuddy is your go-to platform for seamlessly booking appointments tailored to the needs of expectant mothers. We understand that each pregnancy is unique, and our mission is to provide you with a hassle-free way to connect with experienced healthcare professionals who specialize in prenatal care.

               
              </p>
              <div className="home-buttons">
                <Link to="/doctorRegister">
                  <button>For Doctors</button>
                </Link>
                <Link to="/patientRegister">
                  <button>For Patients</button>
                </Link>
              </div>
          </Box>

        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Home;
