import { Box, Grid } from "@mantine/core"
import DashboardLayout from "../../../Layouts/DashboardLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import classNames from "classnames"
import { usePatientDetails } from "../../../Components/hooks/getpatientDetails"
import PatientDetailCard from "../../../Components/Doctors/patientDetails/PatientCard"


const PatientDetails = () => {
    const router = useNavigate()
    const { userInfo, loading, error } = usePatientDetails('doc/patients/')
    
    return (
        <DashboardLayout>
            <Box className="relative w-screen h-screen bg-no-repeat bg-fixed bg-cover overflow-y-scroll">
                <Box className="absolute w-[74vw] h-[60vh] bg-org-gradient-1 blur-[133px] top-[2%] -left-[19%] rotate-[15deg]" />
                <Box className="absolute w-[74vw] h-[60vh] bg-org-gradient-2 blur-[133px] top-[17.3%] left-[19%] rotate-[15deg]" />
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
                            <Box className="mt-3">
                                <p className="lg:text-[18px]  text-[14px] text-white">
                                    <span className="text-white opacity-50"> User / </span> PatientDetails
                                </p>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        className={classNames(
                            'w-full h-full min-h-[460px] bg-[#ffffff] bg-opacity-5 mt-6 rounded-3xl flex',
                            {
                                'items-start justify-start': userInfo && userInfo.length > 0,
                                'items-center justify-center': !userInfo || userInfo.length === 0,
                            },
                        )}
                    >
                        <Grid className="w-full h-full py-4 px-6">
                            {loading ? null : userInfo && userInfo.length > 0 ? (
                                userInfo?.map((patient) => (
                                    <Grid.Col sm={12} md={6} lg={4}>
                                        <PatientDetailCard patient={patient} />
                                    </Grid.Col>
                                ))
                            ) : (
                                // <NoItemsMessage
                                //     heading="No organization to show here"
                                //     subheading="You can create a organization by clicking create organization"
                                //     route="/dashboard/organizations/create"
                                //     buttonHeading="Create Organization"
                                // />
                                <></>
                            )}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </DashboardLayout>
    )
}

export default PatientDetails