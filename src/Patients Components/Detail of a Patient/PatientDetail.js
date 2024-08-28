import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientDetailImage from "../../Components/assets/PatientDetail.svg";
import DoctorProfileImage from "../../Components/assets/DoctorProfile.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarAll from "../../Components/Navbar/Navbar";
import { usePatientInfo } from "../../Context/PatientInfoContext";
import { api_url } from "../../Urls/Api";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import "./PatientDetail.css";
import { Badge, Box, Text } from "@mantine/core";
import { usePatientDetails } from "../../NewUpdates/Components/hooks/getpatientDetails";
import { BsCalendarDate } from "react-icons/bs";

const PatientDetail = ({ getPatientInfo }) => {

  const { userInfo: appointments, loading, error } = usePatientDetails(`doc/getAppointment/${getPatientInfo?._id}`)



  return (



    <Box className="w-full h-full py-8 flex flex-col gap-8">
      <Box>
        <Text color="#C3C3C3" size={20} sx={{ paddingLeft: '20px' }} className="font-bold">
          General details
        </Text>
        <Box className="flex flex-wrap items-center">
          <Box>
            <img src={DoctorProfileImage} width={250} height={250} className="contain" />
          </Box>
          <Box className="">
            <Box>
              <Text color="#C3C3C3" size={16} sx={{ paddingLeft: '20px' }} className="font-medium">
                Name - <strong>{getPatientInfo.name}</strong>
              </Text>
            </Box>
            <Box>
              <Text color="#C3C3C3" size={16} sx={{ paddingLeft: '20px' }} className="font-medium">Email - {getPatientInfo.email}</Text></Box>
            <Box>
              <Text color="#C3C3C3" size={16} sx={{ paddingLeft: '20px' }} className="font-medium">Phone Number - {getPatientInfo.phone}</Text></Box>
            <Box>
              <Text color="#C3C3C3" size={16} sx={{ paddingLeft: '20px' }} className="font-medium">Trimester - {getPatientInfo.trimester}</Text></Box>
            <Box>
              <Text color="#C3C3C3" size={16} sx={{ paddingLeft: '20px' }} className="font-medium">Problems (if any) - {getPatientInfo.problems}</Text></Box>
            <Box>
              <Text color="#C3C3C3" size={16} sx={{ paddingLeft: '20px' }} className="font-medium">Country - {getPatientInfo.country}</Text></Box>
            <Box>
              <Text color="#C3C3C3" size={16} sx={{ paddingLeft: '20px' }} className="font-medium">Region - {getPatientInfo.city}</Text></Box>
          </Box>
        </Box>
      </Box>



      {appointments?.appointments?.length > 0 && (
        <Box className="flex flex-col">
          <Box className="w-full flex flex-col gap-4">
            <Box>
              <Text color="#C3C3C3" size={20} sx={{ paddingLeft: '20px' }} className="font-bold">
                Appointments
              </Text>
            </Box>
          </Box>
          {appointments?.appointments?.map((appointment) => (
            <Box className="w-full h-full min-h-[160px] bg-[#ffffff] bg-opacity-5 mt-6 rounded-3xl">
              <Box className="py-4 px-6 h-full w-full">
                <Text color="#C3C3C3" size={16} sx={{ paddingLeft: '20px' }} className="font-medium">
                  Date  - <strong>{appointment?.Date.toString().replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3",)}</strong>
                </Text>
                <Text color="#C3C3C3" size={16} sx={{ paddingLeft: '20px' }} className="font-medium">
                  Time Period - <strong> {appointment?.startTimeHours}:{appointment?.startTimeMinutes} till{" "}
                    {appointment?.endTimeHours} :{appointment?.endTimeMinutes}</strong>
                </Text>
                <Text color="#C3C3C3" size={16} sx={{ paddingLeft: '20px' }} className="font-medium">
                  Price - <strong> ₹{appointment.Price}</strong>
                </Text>
                <Text color="#C3C3C3" size={16} sx={{ paddingLeft: '20px' }} className="font-medium">
                  Status  - <strong>{appointment?.Status}</strong>
                </Text>
                <Text color="#C3C3C3" size={16} sx={{ paddingLeft: '20px' }} className="font-medium">
                  Expired  -   <Badge size="lg" color="red">
                    {appointment?.expirity}
                  </Badge>
                </Text>
                <Text color="#C3C3C3" size={16} sx={{ paddingLeft: '20px' }} className="font-medium">
                  Problems  -   <strong>
                    {appointment?.problem}
                  </strong>
                </Text>
              </Box>
            </Box>

          ))}
        </Box>
      )}
    </Box>

  );
};

export default PatientDetail;
