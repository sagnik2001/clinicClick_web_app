import React, { useRef } from "react";
import AuthLayout from "../../../Layouts/AuthLayout";
import { Box, Modal, SimpleGrid } from "@mantine/core";
import classNames from 'classnames';
import PedractianImage from "../../../../Components/assets/Doctor_register.svg"
import { useAuth } from "../../../../Context/AuthContext";
import DividerImg from "../../../../Components/assets/divider.svg"
import LogoImg from "../../../../Components/assets/logo.png"
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../../Components/common/Button";
import TextInput from "../../../Components/forms/TextInput";
import PasswordInput from "../../../Components/forms/PasswordInput";
import { Link } from "react-router-dom";
import PhoneInput from "../../../Components/forms/PhoneInput";
import PasswordInputWithSugg from "../../../Components/forms/PasswordInputWithSugg";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { api_url } from "../../../../Urls/Api";
import { useToggle } from "@mantine/hooks";
import { toast } from "react-toastify";
import axios from "axios";
import { ButtonBase } from "@mui/material";
import TextAreaInput from "../../../Components/forms/TextAreaInput";
import TimeInput from "../../../Components/forms/TimeInput";


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

let registerUserSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email('Email Format is not valid').required("Email is required"),
    password: yup.string().required('Password is required').min(8),
    confirmPassword: yup
        .string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password')], 'Confirm password should be same as password'),
    phone: yup.object().shape({
        number: yup.string()
            .required("Phone number is required")
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(10, "too short")
            .max(10, "too long"),
    })

})

const RegisterPage = () => {

    const { isMobileDevice } = useAuth()
    const [showModal, setShowModal] = useToggle();

    const methods = useForm({
        mode: 'onTouched',
        resolver: yupResolver(registerUserSchema),
    });

    const detailsmethods = useForm()

    const starttimeref = useRef()
    const endtimeref = useRef()


    const handleRegister = (data) => {
        const body = {
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone.number,
        }
        axios
            .post(`${api_url}doc/register/`, body, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                toast.success("SignedUp successfully!!");
                // setShowModal(true)
            })
            .catch((err) => {
                console.log(err);
            });
        // setShowModal(true)
    }

    // const handleSignUpDetails = (data) => {
    //     const body = {
    //         specialization: data?.specialization,
    //         price: data?.price,
    //         city: data?.city,
    //         country: data?.country,
    //         startTime: starttimeref.current.value,
    //         endTime: endtimeref.current.value
    //     }
    //     axios
    //         .put(`${api_url}doc/updateInfo/`, body, {
    //             headers: { Authorization: `Bearer ${token}` },
    //         })
    //         .then((res1) => {
    //             axios
    //                 .get(`${api_url}doc/getInfo/`, {
    //                     headers: { Authorization: `Bearer ${token}` },
    //                 })
    //                 .then((res) => {
    //                     history("");
    //                     toast.success("Updated successfully!!");
    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                 });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }



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
                                    src={PedractianImage}
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
                                src={PedractianImage}
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
                        <FormProvider {...methods}>
                            <form
                                onSubmit={methods.handleSubmit(handleRegister)}
                                className="w-full flex flex-col gap-[3rem]"
                            >
                                <TextInput
                                    {...methods.register('name')}
                                    label="Name"
                                    placeholder="Enter name"
                                    required
                                />
                                <TextInput
                                    {...methods.register('email')}
                                    label="Email"
                                    placeholder="Enter email"
                                    required
                                />
                                <PasswordInputWithSugg
                                    {...methods.register('password')}
                                    label="Create Password"
                                    placeholder="Enter password"
                                    value={methods.watch('password')}
                                    required
                                />
                                <PasswordInput
                                    {...methods.register('confirmPassword')}
                                    label="Confirm Password"
                                    placeholder="Confirm password"
                                    required
                                />
                                <PhoneInput
                                    {...methods.register('phone')}
                                    label="Enter Phone Number"
                                    placeholder="Enter phone number"
                                    required
                                />
                                <Button
                                    color="custom"
                                    buttonClass="px-[1.5rem] w-full py-[1rem] bg-purple-100 md:px-[3rem]  md:py-[1.5rem] rounded-[2rem] border-none outline-none"
                                // isLoading={userSignUp.isLoading}
                                >
                                    <Box className="font-roboto font-[500] text-[#02012F] text-[1rem] -tracking-[0.02em]">
                                        Register
                                    </Box>
                                </Button>
                            </form>
                        </FormProvider>
                        <p className="extra-text">
                            Already have an account?
                            <Link to="/doctorlogin"> Log in</Link>
                        </p>


                    </Box>

                </Box>
                {/* <Modal
                    opened={showModal}
                    onClose={() => setShowModal(false)}
                    title="Before you proceed fill up these details to know you better"
                    centered
                    size={"xl"}
                    styles={{ header: { background: '#2f0182', color: 'white' }, body: { background: '#2f0182', color: 'white' } }}
                >
                    <FormProvider {...detailsmethods}>
                        <form
                            onSubmit={detailsmethods.handleSubmit(handleSignUpDetails)}
                            className="w-full flex flex-col gap-[2rem] p-2"
                        >
                            <SimpleGrid cols={2}>
                                <TextInput
                                    {...detailsmethods.register('specialization')}
                                    label="Specialization"
                                    placeholder="Enter specialization"
                                    required
                                />
                                <TextInput
                                    {...detailsmethods.register('price')}
                                    label="Price"
                                    placeholder="Enter price per visit"
                                    required
                                />
                            </SimpleGrid>
                            <SimpleGrid cols={2}>
                                <TextInput
                                    {...detailsmethods.register('city')}
                                    placeholder="Enter city where you reside"
                                    required
                                />
                                <TextInput
                                    {...detailsmethods.register('country')}
                                    placeholder="Enter country where you reside"
                                    required
                                />
                            </SimpleGrid>
                            <div>
                                <p >Working Hours</p>
                                <SimpleGrid className="mt-8" cols={2}>

                                    <TimeInput {...detailsmethods.register('starttime')} timeref={starttimeref} label="Enter visiting hours starting time" />
                                    <TimeInput {...detailsmethods.register('endtime')} timeref={endtimeref} label="Enter visiting hours ending time" />

                                </SimpleGrid>
                            </div>

                            <SimpleGrid cols={2}>
                                <Button color="custom" buttonClass="py-2 rounded-2 bg-[red] text-white" onClick={() => setShowModal(false)}>
                                    Cancel
                                </Button>
                                <Button buttonClass="py-2 rounded-2" >
                                    Save
                                </Button>
                            </SimpleGrid>
                        </form>
                    </FormProvider>
                </Modal> */}
            </Box>
        </AuthLayout>
    )
}

export default RegisterPage