import { Box } from "@mantine/core"
import DashboardLayout from "../../../Layouts/DashboardLayout"
import UserProfile from "../../../../Components/assets/profile.svg"
import Button from "../../../Components/common/Button"
import { Link } from "react-router-dom"
import { faCirclePlus, faInfoCircle, faHospitalUser, faCashRegister } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFetchDoctorProfile } from "../../../Components/hooks/getInfo"

const DocDashboard = () => {

    const { userInfo, isLoading, error } = useFetchDoctorProfile();


    return (
        <DashboardLayout>
            <Box className="relative w-screen h-screen bg-no-repeat bg-fixed bg-cover overflow-hidden">
                <Box className="absolute w-screen h-screen bg-dashboard-gradient-1 -top-[17.3%] -left-[22%] rotate-[15deg]" />
                <Box className="absolute w-screen h-screen bg-dashboard-gradient-2 top-[17.3%] left-[22%] rotate-[15deg]" />
                <Box className="relative w-full h-full">
                    <Box className="absolute w-[280vw] h-[200vh] lg:w-[146vw] lg:h-[120vh] top-1/3 left-1/2 -translate-x-1/2 rounded-[100%] border border-solid border-white z-0" />
                    <Box className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[128px] h-[128px] bg-[#FFFFFF03] rounded-full backdrop-blur-lg z-10" />
                    <Box className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="128"
                            height="128"
                            viewBox="0 0 128 128"
                            fill="none"
                        >
                            <g filter="url(#filter0_b_1441_2628)">
                                <circle cx="63.9984" cy="64.0971" r="63.643" fill="white" fillOpacity="0.03" />
                                <circle
                                    cx="63.9984"
                                    cy="64.0971"
                                    r="62.5137"
                                    stroke="url(#paint0_linear_1441_2628)"
                                    strokeWidth="2.25859"
                                />
                            </g>
                            <defs>
                                <filter
                                    id="filter0_b_1441_2628"
                                    x="-11.7656"
                                    y="-11.667"
                                    width="151.527"
                                    height="151.528"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="6.06055" />
                                    <feComposite
                                        in2="SourceAlpha"
                                        operator="in"
                                        result="effect1_backgroundBlur_1441_2628"
                                    />
                                    <feBlend
                                        mode="normal"
                                        in="SourceGraphic"
                                        in2="effect1_backgroundBlur_1441_2628"
                                        result="shape"
                                    />
                                </filter>
                                <linearGradient
                                    id="paint0_linear_1441_2628"
                                    x1="0.355469"
                                    y1="64.0971"
                                    x2="127.641"
                                    y2="66.2545"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#6F0FEA" />
                                    <stop offset="0.506398" stopColor="#C995F8" />
                                    <stop offset="1" stopColor="#D86CD4" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </Box>
                    <Box className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center z-30">
                        <Box
                            className=
                            'w-[108px]  relative aspect-square flex items-center justify-center rounded-full overflow-hidden'

                        >
                            {userInfo?.profilePicture ? (
                                <img
                                    src={userInfo?.profilePicture}
                                    width={108}
                                    height={108}
                                    className="w-auto h-full object-cover"
                                    alt="file"
                                />
                            ) : (
                                <img src={UserProfile} alt="UserContainer" width={108} height={108} className="w-auto h-full object-cover" />
                            )}
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box className="absolute bottom-8 w-full flex flex-col gap-6 pt-6 max-sm:pt-0">
                        <Box className="w-full text-center text-2xl md:text-3xl lg:text-8xl leading-[160%] -tracking-[0.05em]">
                            <span className="font-light text-[#FFF8]">Hi,</span>{' '}
                            <span className="text-white">Dr {userInfo?.name}</span>
                        </Box>
                        <Box className="text-center flex flex-col gap-2 items-center ">
                            <Box className="text-[--grey-100] -tracking-[0.333px]">
                                Welcome to Clinic Click
                            </Box>
                            <Box className="text-[--grey-100] -tracking-[0.333px]">
                                We're excited to have you here. Lets see whats in store for you.
                            </Box>
                            <Box className="pt-6 max-sm:pt-0 flex items-center flex-wrap justify-center gap-4">
                                <Link href="/dashboard/organizations">
                                    <Button
                                        color="custom"
                                        type="button"
                                        buttonClass="bg-[rgba(0, 0, 0, 0.1)] border backdrop-blur-[5px] text-[#ffffff] rounded-[59px] border-solid border-[rgba(255,255,255,0.44)]
                   px-[24px] py-[16px] hover:bg-[#ffffff] hover:bg-opacity-30"
                                    >
                                        <Box className="font-roboto font-[500] flex items-center gap-2  md:text-[1.2rem] -tracking-[0.02em]">
                                            <FontAwesomeIcon icon={faCirclePlus} />
                                        </Box>
                                        Daily Appointments
                                    </Button>
                                </Link>
                                <Link href="/dashboard/organizations/create">
                                    <Button
                                        color="custom"
                                        type="button"
                                        buttonClass="bg-white border backdrop-blur-[5px] rounded-[59px] text-[#2F0182]
                   hover:!bg-[#2F0182] hover:!bg-opacity-30 hover:text-white border-solid border-[rgba(255,255,255,0.44)] px-[24px] py-[16px]"
                                    >
                                        <Box className="font-roboto font-[500] flex items-center gap-2  md:text-[1.2rem] -tracking-[0.02em]">
                                            <FontAwesomeIcon icon={faHospitalUser} />
                                        </Box>
                                        Patients Details
                                    </Button>
                                </Link>
                                <Link href="/dashboard/kyc/requests">
                                    <Button
                                        color="custom"
                                        type="button"
                                        buttonClass="bg-[rgba(0, 0, 0, 0.1)] border backdrop-blur-[5px] rounded-[59px] text-[#ffffff] border-solid border-[rgba(255,255,255,0.44)] px-[24px] py-[16px] hover:bg-[#ffffff] hover:bg-opacity-30"
                                    >
                                        <Box className="font-roboto font-[500] flex items-center gap-2  md:text-[1.2rem] -tracking-[0.02em]">
                                            <FontAwesomeIcon icon={faCashRegister} />

                                        </Box>
                                        Payments Enlisted
                                    </Button>
                                </Link>
                            </Box>
                            <Box className="pt-6 max-sm:pt-0 flex items-center flex-wrap justify-center gap-4">
                                {/* <Footer /> */}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </DashboardLayout>
    )
}

export default DocDashboard