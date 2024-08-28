import { useEffect, useState } from "react"
import PatientDetail from "../../../../Patients Components/Detail of a Patient/PatientDetail"
import axios from "axios"
import { api_url } from "../../../../Urls/Api"
import { usePatientDetails } from "../../../Components/hooks/getpatientDetails"
import DashboardLayout from "../../../Layouts/DashboardLayout"

const { faCircleChevronLeft } = require("@fortawesome/free-solid-svg-icons")
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome")
const { Box } = require("@mantine/core")
const { useNavigate, useParams } = require("react-router-dom")

const PatientDetailed = () => {
    const params = useParams();



    // const token = window.localStorage;

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`${api_url}patient/${params.id}`, {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             });
    //             setPatientInfo(response.data);

    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const { userInfo: getPatientInfo, loading, error } = usePatientDetails(`patient/${params.id}`)


    const router = useNavigate()
    return (
        <DashboardLayout>
            <Box className="relative w-screen h-screen bg-no-repeat bg-fixed bg-cover overflow-y-scroll">
                <Box className="absolute w-[74vw] h-[60vh] bg-opacity-50 bg-org-gradient-1 blur-[133px] top-[2%] -left-[19%] rotate-[15deg]" />
                <Box className="absolute w-[74vw] h-[60vh] bg-opacity-50 bg-org-gradient-2 blur-[133px] top-[17.3%] left-[19%] rotate-[15deg]" />
                <Box className="py-[3rem] px-[2rem] md:py-[4.5rem] md:px-[4.5rem] absolute top-12 w-full">
                    <Box className="flex justify-between items-center flex-wrap">
                        <Box className="flex gap-3 items-center cursor-pointer">
                            <Box>
                                <FontAwesomeIcon
                                    icon={faCircleChevronLeft}
                                    color="white"
                                    onClick={() => router(-1)}
                                />
                            </Box>
                            <Box>
                                <p className="lg:!text-[18px] !text-[14px] mb-0 !text-white">
                                    <span className="!text-opacity-50 !text-[#ffffff]">
                                        {' '}
                                        Patients / {' '}
                                    </span>{' '}
                                    {getPatientInfo?.name}
                                </p>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="w-full h-full min-h-[460px] bg-[#ffffff] bg-opacity-5 mt-6 rounded-3xl">
                        <Box className="py-4 px-6 h-full w-full">
                            {/* workflow ? (
                            <WorkflowDetails workflow={workflow} />
                        ) : (
                            <NoItemsMessage heading="Workflow details not found" />
                        )} */}
                            {
                                loading ? null : getPatientInfo &&
                                    < PatientDetail getPatientInfo={getPatientInfo} />
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </DashboardLayout>
    )
}

export default PatientDetailed