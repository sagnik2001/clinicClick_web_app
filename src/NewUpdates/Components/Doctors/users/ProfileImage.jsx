import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CameraInput from '../../forms/CameraInput';
import Button from '../../common/Button';




const ProfileImage = ({ methods, isEditing }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleRemoveProfile = () => {
    if (methods.watch('profile')) {
      methods.setValue('profile', undefined);
    }
  };


  return (
    <Box className="w-full flex flex-col gap-[54px] p-[20px]">
      <Box className="w-full">
        <CameraInput opened={opened} close={close} name="profile" />
      </Box>
      <Box className="flex flex-col gap-6">
        <Button
          type="button"
          color="primary"
          buttonClass="px-[2.25rem] py-[0.875rem] rounded-[0.5rem] border-none outline-none"
          onClick={open}
          disabled={!isEditing}
        >
          <Box className="font-roboto font-normal text-[0.875rem] text-white -tracking-[0.02em]">
            Update Profile
          </Box>
        </Button>
        <Button
          type="button"
          color="secondary"
          buttonClass="px-[2.25rem] py-[0.875rem] rounded-[0.5rem] outline-none"
          onClick={handleRemoveProfile}
          disabled={!isEditing}
        >
          <Box className="font-roboto font-normal text-[0.875rem] -tracking-[0.02em]">
            Remove Profile
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileImage;
