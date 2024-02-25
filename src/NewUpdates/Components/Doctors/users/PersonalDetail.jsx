import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Box } from '@mantine/core';
import TextInput from '../../forms/TextInput';
import PhoneInput from '../../forms/PhoneInput';
import TextAreaInput from '../../forms/TextAreaInput';





const PersonalDetails = ({ methods, isEditing }) => (
    <Box className="w-full flex flex-col gap-[54px] p-[20px]">
        <Box>
            <h4 className="text-lg font-lato text-white">Personal Information</h4>
        </Box>
        <Box className="flex flex-col lg:flex-row gap-[54px] lg:gap-6">
            <TextInput
                {...methods.register('name')}
                label="Name"
                placeholder="Enter Name"
                disabled={!isEditing}
                required
                
            />
            <TextInput
                {...methods.register('city')}
                label="City"
                placeholder="Enter City"
                disabled={!isEditing}
            />
            <TextInput
                {...methods.register('price')}
                label="Price"
                placeholder="Enter the price you want to show"
                required
                disabled={!isEditing}
            />
        </Box>
        <Box className="flex flex-col lg:flex-row gap-[54px] lg:gap-6">
            {/* <DateInput
        {...methods.register('dob')}
        label="Date of Birth"
        placeholder="Enter Date of Birth"
        required
        disabled={!isEditing}
      /> */}

            <TextInput
                {...methods.register('hospital')}
                label="Hospital"
                placeholder="Enter hospital"
                required
                disabled={!isEditing}
            />

            <TextInput
                {...methods.register('email')}
                type="email"
                label="Email Address"
                placeholder="Enter email id"
                required
                disabled={!isEditing}
            />
        </Box>
        <Box className="flex flex-col lg:flex-row gap-[54px] lg:gap-6">
            <Box className="flex-1">
                <PhoneInput
                    {...methods.register('phone')}
                    label="Enter Phone Number"
                    placeholder="Enter phone number"
                    required
                    disabled={!isEditing}
                />
            </Box>
            <Box className="flex-1" />
        </Box>
        <Box className="flex flex-col lg:flex-row gap-[54px] lg:gap-6">
            <TextAreaInput
                {...methods.register('address')}
                label="Enter Address"
                minRows={2}
                placeholder="Enter Address"
                background="#FFFFFF80"
            />
        </Box>
        <Box className="flex flex-col lg:flex-row gap-[54px] lg:gap-6">
            <TextAreaInput
                {...methods.register('desc')}
                label="A little bit about yourself"
                minRows={2}
                placeholder="This will be displayed in your profile"
                background="#FFFFFF80"
            />
        </Box>

    </Box>
);

export default PersonalDetails;
