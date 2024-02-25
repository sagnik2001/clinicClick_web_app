import React from "react";
import AuthLayout from "../../../Layouts/AuthLayout";
import { Box } from "@mantine/core";
import classNames from 'classnames';
import PedractianImage from "../../../../Components/assets/Doctor_login.svg"
import { useAuth } from "../../../../Context/AuthContext";
import DividerImg from "../../../../Components/assets/divider.svg"
import LogoImg from "../../../../Components/assets/logo.png"
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../../Components/common/Button";
import TextInput from "../../../Components/forms/TextInput";
import PasswordInput from "../../../Components/forms/PasswordInput";
import { Link } from "react-router-dom";


const SignInPage = () => {

    const { isMobileDevice } = useAuth()
    const methods = useForm({
        mode: 'onTouched',
    });

    const handleSignIn = (data) => {
        console.log(data)
    }

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
                                onSubmit={methods.handleSubmit(handleSignIn)}
                                className="w-full flex flex-col gap-[3rem]"
                            >
                                <TextInput
                                    {...methods.register('email')}
                                    label="Email"
                                    placeholder="Enter email"
                                    required
                                />
                                <PasswordInput
                                    {...methods.register('password')}
                                    label="Password"
                                    placeholder="Enter password"
                                    required
                                />
                                <Button
                                    color="custom"
                                    buttonClass="px-[1.5rem] w-full py-[1rem] bg-purple-100 md:px-[3rem]  md:py-[1.5rem] rounded-[2rem] border-none outline-none"
                                // isLoading={userSignUp.isLoading}
                                >
                                    <Box className="font-roboto font-[500] text-[#02012F] text-[1rem] -tracking-[0.02em]">
                                        LogIn Your Profile
                                    </Box>
                                </Button>
                            </form>
                        </FormProvider>
                    </Box>
                    <p className="extra-text">
                        <Link to="/forgetPassword">Forget Password ?</Link>
                    </p>
                    <p className="extra-text" style={{ color: 'white' }}>
                        Don't have an account?
                        <Link to="/doctorRegister"> Register</Link>
                    </p>
                </Box>
            </Box>
        </AuthLayout>
    )
}

export default SignInPage