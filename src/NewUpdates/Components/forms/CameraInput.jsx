import { faCamera, faCheck, faRefresh, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
    Box,
    Image as MantineImage,
    Modal,
    useMantineTheme,
    createStyles,
    Loader,
} from '@mantine/core';





const useStyles = createStyles(() => ({
    body: {
        position: 'relative',
        top: 'calc(50% - 72px)',
        transform: 'translateY(-50%)',
        padding: 0,
    },

}));

const CameraInput = ({ name, opened, close }) => {


    const theme = useMantineTheme();

    const [deviceCameraDimensions, setDeviceCameraDimensions] = useState({
        width: 640,
        height: 480,
    });

    const form = useFormContext();

    const file = form.watch(name);








    return (
        <Box>

            <Box
                className={classNames(
                    'relative w-full aspect-square flex items-center justify-center border-4 border-solid border-white rounded-full cursor-pointer overflow-hidden',
                    {
                        'after:absolute after:bg-grey-600 after:w-full after:h-full after:top-0 after:left-0 after:bottom-0 after:right-0 after:z-10 after:rounded-full after:opacity-75':
                            !file,
                    },
                )}
            >
                {file ? (
                    <img
                        src={URL.createObjectURL(file)}
                        // imageProps={{
                        //   onLoad: () => URL.revokeObjectURL(URL.createObjectURL(file as unknown as Blob)),
                        // }}
                        width={1000}
                        height={1000}
                        className={classNames({
                            'w-auto h-full object-cover':
                                deviceCameraDimensions.width > deviceCameraDimensions.height,
                            'w-full h-auto object-cover':
                                deviceCameraDimensions.width < deviceCameraDimensions.height,
                        })}
                        alt="file"
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faUser}
                        size="4x"
                        color={'var(--grey-200)'}
                    />
                )}
            </Box>
        </Box>
    );
};

export default CameraInput;
