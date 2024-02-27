import { Box, Card, useMantineTheme } from "@mantine/core"
import Button from "../../../Components/common/Button"
import { useEffect, useState } from "react";
import CustomModal from "../../../Components/common/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleChevronLeft, faCircleXmark, faPencil, faSave, faXmark } from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "../../../Layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import PersonalDetails from "../../../Components/Doctors/users/PersonalDetail";
import ProfileImage from "../../../Components/Doctors/users/ProfileImage";
import { useFetchDoctorProfile } from "../../../Components/hooks/getInfo";

const DoctorProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isCancelModalOpened, setIsCancelModalOpened] = useState(false);
    const theme = useMantineTheme()
    const router = useNavigate()
    const methods = useForm({
        mode: 'onTouched',
    });
    const { userInfo, isLoading, error } = useFetchDoctorProfile();
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
                    'countryCode': '+91',
                    'number': userInfo?.phone,
                },
                hospital: userInfo?.hospital,
                profile: userInfo?.profilePicture
            });

        }
    }, [userInfo]);


    const handleUpdateProfile = (data) => {
        console.log(data)
    }
    return (
        <DashboardLayout>
            <Box className="relative w-screen h-screen bg-no-repeat bg-fixed bg-cover overflow-y-scroll">
                <Box className="absolute w-[74vw] h-[60vh] bg-org-gradient-1 blur-[133px] top-[2%] -left-[19%] rotate-[15deg]" />
                <Box className="absolute w-[74vw] h-[60vh] bg-org-gradient-2 blur-[133px] top-[17.3%] left-[19%] rotate-[15deg]" />
                <Box className="py-[3rem] px-[2rem] md:py-[4.5rem] md:px-[4.5rem] absolute top-12 w-full">
                    <Box className="flex justify-between items-center flex-wrap">
                        <Box className="flex gap-3 items-center cursor-pointer">
                            <FontAwesomeIcon
                                icon={faCircleChevronLeft}
                                color="white"
                                onClick={() => router(-1)}
                            />
                            <p className="lg:text-[18px] mt-3 text-[14px] text-white">
                                <span className="text-white opacity-50"> User / </span> Profile
                            </p>
                        </Box>
                    </Box>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={methods.handleSubmit(handleUpdateProfile)}
                            className="flex flex-col gap-6"
                        >
                            <Box className="w-full flex flex-col lg:flex-row gap-6">
                                <Box className="w-full lg:w-1/4 h-full rounded-[0.5rem] bg-[#131313] bg-opacity-5">
                                    <ProfileImage methods={methods} isEditing={isEditing} />
                                </Box>
                                <Box className="w-full lg:w-3/4 h-auto flex flex-col gap-6">
                                    <Box className="!rounded-[0.5rem] h-full bg-[#131313] bg-opacity-5">
                                        <PersonalDetails methods={methods} isEditing={isEditing} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <Box className="!flex gap-6 justify-end !rounded-[0.5rem] bg-[#131313] bg-opacity-5 p-4">
                                    {isEditing && (
                                        <Box>
                                            <Button
                                                color="custom"
                                                type="button"
                                                buttonClass="w-full px-[24px] py-[8px] lg:px-[48px] lg:py-[16px] bg-white text-danger-100 rounded-[53px] border border-solid border-danger-100 outline-none"
                                                onClick={() => setIsCancelModalOpened(true)}
                                            >
                                                <Box className="font-roboto font-normal  text-[16px] -tracking-[0.02em] flex flex-row gap-2 items-center justify-center">
                                                    <FontAwesomeIcon icon={faCircleXmark} color="#f50000" />
                                                    Cancel
                                                </Box>
                                            </Button>
                                        </Box>
                                    )}
                                    {!isEditing ? (
                                        <Button
                                            type="button"
                                            color="custom"
                                            buttonClass="px-[24px] py-[8px] lg:px-[48px] lg:py-[16px] bg-blue-500 text-white rounded-[53px] border border-solid border-blue-500 outline-none"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            <Box className="font-roboto font-normal  text-[16px] -tracking-[0.02em] flex flex-row gap-2 items-center justify-center">
                                                <FontAwesomeIcon icon={faPencil} height={12} width={12} />
                                                Edit
                                            </Box>
                                        </Button>
                                    ) : (
                                        <Button
                                            color="custom"
                                            buttonClass="px-[24px] py-[8px] lg:px-[48px] lg:py-[16px] bg-blue-500 text-white rounded-[53px] border border-solid border-blue-500 outline-none"
                                            disabled={!methods.formState.isDirty || !methods.formState.isValid}
                                        >
                                            <Box className="font-roboto font-normal  text-[16px] -tracking-[0.02em] flex flex-row gap-2 items-center justify-center">
                                                <FontAwesomeIcon icon={faCircleCheck} color="white" />
                                                Save
                                            </Box>
                                        </Button>
                                    )}
                                    <CustomModal
                                        color="var(--primary)"
                                        show={isCancelModalOpened}
                                        onCancel={() => setIsCancelModalOpened(false)}
                                        onClick={() => {
                                            setIsEditing(false);
                                            setIsCancelModalOpened(false);
                                        }}
                                        title="Are you sure you want to cancel?"
                                        message="Once canceled your progress will be lost."
                                        confirmButtonLabel="Continue"
                                    />
                                </Box>
                            </Box>
                        </form>
                    </FormProvider>
                </Box>
            </Box>
        </DashboardLayout>
    )
}

export default DoctorProfile;