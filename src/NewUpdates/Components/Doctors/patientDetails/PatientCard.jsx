import { faAddressCard, faCommentMedical, faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Menu, Text } from "@mantine/core"
import { FaComment, FaRocketchat } from "react-icons/fa"
import { Link } from "react-router-dom"

const PatientDetailCard = ({ patient }) => {
    return (
        <Box className="bg-[#000000] h-[150px]  bg-opacity-30 border border-solid border-[rgba(255,255,255,0.50)] relative rounded-xl">
            <Box className="h-full m-auto flex flex-row justify-between items-start">
                <Box className="flex h-full flex-row justify-between items-start gap-4" dir="ltr">
                    <Box className="h-full w-[150px] rounded-s-xl flex items-center justify-center text-[48px]  bg-white text-grey-600">
                        {patient.name[0]}
                    </Box>
                    <Box className="flex flex-col pt-3 items-start">

                        <Text color="white" size="0.8rem" className="font-medium font-white text-center">
                            {patient.name}
                        </Text>
                        <Box className="flex gap-3 items-center">
                            <Text color="white" size="0.8rem" className="font-bold font-white text-center">
                                Mobile Number :
                            </Text>
                            <Text color="white" size="0.8rem" className="font-bold font-white text-center">
                                {patient.phone}
                            </Text>
                        </Box>
                        <Box className="flex gap-3 items-center">
                            <Text color="white" size="0.8rem" className="font-bold font-white text-center">
                                City :
                            </Text>
                            <Text color="white" size="0.8rem" className="font-bold font-white text-center">
                                {patient?.city ? patient?.city : 'NA'}
                            </Text>
                        </Box>
                        <Box className="flex gap-3 items-center">
                            <Text color="white" size="0.8rem" className="font-bold font-white text-center">
                                Country :
                            </Text>
                            <Text color="white" size="0.8rem" className="font-bold font-white text-center">
                                {patient?.country ? patient?.country : 'NA'}
                            </Text>
                        </Box>
                        <Box className="flex gap-3 items-center">
                            <Text color="white" size="0.8rem" className="font-bold font-white text-center">
                                Trimester :
                            </Text>
                            <Text color="white" size="0.8rem" className="font-bold font-white text-center">
                                {patient?.trimester ? patient?.trimester : 'NA'}
                            </Text>
                        </Box>

                    </Box>


                </Box>
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <Box className="cursor-pointer pt-5 px-3">
                            <FontAwesomeIcon size="2x" icon={faEllipsisVertical} color="#fff" />
                        </Box>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Link to={`/patientDetails/${patient._id}`}>
                            <Menu.Item>
                                <Box className="flex gap-3 items-center">
                                    <FontAwesomeIcon size="1x" icon={faAddressCard} color="#000" />
                                    More Details
                                </Box>
                            </Menu.Item>
                        </Link>

                        <Menu.Item>
                            <Box className="flex gap-3 items-center">
                                <FontAwesomeIcon size="1x" icon={faCommentMedical} color="#000" />
                                Chat With User
                            </Box>
                        </Menu.Item>
                        <Menu.Item>
                            <Box className="flex gap-3 items-center">
                                <FontAwesomeIcon size="1x" icon={faTrash} color="red" />
                                Remove User
                            </Box>
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Box>
        </Box>
    )
}

export default PatientDetailCard