import { AppShell, Box, Burger, Header, MediaQuery, Menu, Modal, SimpleGrid, Button, Drawer } from "@mantine/core"
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { detectMobileDevice, useWindowSize } from "../Components/utils";
import { useDisclosure, useToggle } from "@mantine/hooks";
import classNames from 'classnames';
import UserProfileImage from "../../Components/assets/profile.svg"
import LogoImage from "../../Components/assets/logo.png"
import NotiImage from "../../Components/assets/notification.svg"
import { api_url } from "../../Urls/Api";
import { toast } from "react-toastify";
import axios from "axios";

const sideBarLinkDetails = [
    { name: 'My Dashboard', href: '/doctorDashboard' },
    // { name: 'My Profile', href: '/dashboard/user/profile' },
    { name: 'My Appointments', href: '/dashboard/link-2' },
    { name: 'My Chats', href: '/dashboard/kyc/submissions' },
    { name: 'My Reviews', href: '/dashboard/kyc/submissions' },
];


const NavBody = (links) => {
    const router = useLocation();
    return links.map(link => {
        if (link.href) {
            return (
                <Box>
                    <Link
                        key={link.name}
                        className={classNames(
                            'w-full  font-medium text-[16px] block rounded-md px-4  text-[#ffffff] text-opacity-30 transition-colors hover:!text-[--grey-100] hover:text-opacity-100',
                            ' ',
                            `${router.pathname === link.href ? '!font-bold !text-[white]' : ''}`,
                        )}
                        to={link.href}
                    >
                        {link.name}
                    </Link>
                </Box>
            );
        }

        return null;
    });
};

const mobileNavStyle = {
    root: {
        padding: '1rem 0.5rem',
    },
    label: {
        fontSize: '1.5rem',
    },
};

const DashboardLayout = ({ children }) => {
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const router = useLocation();

    const [showLogout, setShowLogout] = useToggle();
    const [opened, { open, close }] = useDisclosure(false);
    const history = useNavigate()

    const { width, height } = useWindowSize();

    const handleLogout = () => {
        const token = localStorage.getItem("token")
        axios.post(`${api_url}logout`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                localStorage.removeItem("token")
                history("/doctorlogin");
                toast.success("Logged out!!");
            })
            .catch((err) => {
                console.log(err)
            })

    }


    useEffect(() => {
        if (window !== undefined) {
            setIsMobileDevice(detectMobileDevice());
        }
    }, [width, height]);
    return (
        <AppShell
            styles={{
                main: {
                    background: 'var(--blue-600)',
                    padding: 0,
                    height: '100%',
                },
            }}
            fixed
            header={
                <Header
                    height={88}
                    style={{ background: '#01001D20', backdropFilter: 'blur(8px)', border: 'none' }}
                    className="pr-8 py-8 bg-no-repeat bg-fixed bg-cover"
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Link href="/dashboard">
                            <Box id="logo-container">
                                <img
                                    src={LogoImage}
                                    width={isMobileDevice ? 224 : 323}
                                    // height={isMobileDevice ? 19 : 32}
                                    alt="logo"
                                />
                            </Box>
                        </Link>
                        {!isMobileDevice && (
                            <div className="flex flex-row items-center justify-between">
                                {NavBody(sideBarLinkDetails)}
                            </div>
                        )}
                        <div className="flex flex-row items-center gap-4">
                            <img
                                src={NotiImage}
                                width={24}
                                height={24}
                                alt="notification-primary"
                            />
                            {!isMobileDevice && (
                                <Menu position="bottom-start" width={200}>
                                    <Menu.Target>
                                        <div
                                            style={{
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                            }}
                                        >
                                            <img
                                                src={UserProfileImage}
                                                width={32}
                                                height={32}
                                                alt="logo-primary"
                                            />
                                        </div>
                                    </Menu.Target>

                                    <Menu.Dropdown className="!bg-[--blue-600]">
                                        <Menu.Label>
                                            <Link
                                                className={classNames(
                                                    'w-full font-lato !font-medium !text-[14px] block rounded-md px-2 py-2 text-white transition-colors ',
                                                    '!hover:bg-transparent hover:bg-opacity-10 flex justify-between items-center',
                                                )}
                                                as="/dashboard/user/profile"
                                                to="/doctorDetails"
                                                passHref
                                                prefetch
                                            >
                                                Profile
                                            </Link>
                                        </Menu.Label>
                                        <Menu.Label onClick={() => setShowLogout(true)}>
                                            <div
                                                className={classNames(
                                                    'w-full font-lato !font-medium !text-[14px] block rounded-md px-2 py-2 text-white transition-colors ',
                                                    '!hover:bg-transparent hover:bg-opacity-10 flex justify-between items-center',
                                                )}
                                            >
                                                Logout
                                            </div>
                                        </Menu.Label>
                                    </Menu.Dropdown>
                                </Menu>
                            )}
                            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                                <Burger
                                    opened={opened}
                                    onClick={opened ? close : open}
                                    size="sm"
                                    color="grey"
                                />
                            </MediaQuery>
                            <Drawer
                                opened={opened}
                                onClose={close}
                                transitionProps={{
                                    duration: 0,
                                }}
                                styles={{ body: { padding: '10px', textAlign: 'center' }, content: { backgroundColor: '#2f0182' }, header: { backgroundColor: '#2f0182' } }}


                            >
                                {sideBarLinkDetails.map(link => (

                                    <Box>
                                        <Link
                                            key={link.name}
                                            className={classNames(
                                                'w-full  font-medium text-[18px] mb-4 block rounded-md px-4  text-[#ffffff] text-opacity-30 transition-colors hover:!text-[--grey-100] hover:text-opacity-100',
                                                ' ',
                                                `${router.pathname === link.href ? '!font-bold !text-[white]' : ''}`,
                                            )}
                                            href={link.href}
                                        >
                                            {link.name}
                                        </Link>
                                    </Box>

                                ))}
                            </Drawer>
                        </div>
                    </div>
                </Header>
            }
        >
            {children}
            <Modal
                opened={showLogout}
                onClose={() => setShowLogout(false)}
                title="Are you sure you want to logout?"
                centered
            >
                <SimpleGrid cols={2}>
                    <Button variant="outline" onClick={() => setShowLogout(false)}>
                        Cancel
                    </Button>
                    <Button variant="outline" onClick={handleLogout} color="red">
                        Logout
                    </Button>
                </SimpleGrid>
            </Modal>
        </AppShell>
    )
}

export default DashboardLayout