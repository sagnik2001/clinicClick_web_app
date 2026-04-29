import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Box } from '@mantine/core';
import TextInput from '../../forms/TextInput';
import PhoneInput from '../../forms/PhoneInput';
import TextAreaInput from '../../forms/TextAreaInput';





const PersonalDetails = ({ methods, isEditing }) => (
    <Box className="w-full flex flex-col gap-[54px] p-[20px]">
        <Box>
            <h4 className="text-lg font-lato text-[--care-ink]">Personal Information</h4>
        </Box>
        <Box className="flex flex-col lg:flex-row gap-[54px] lg:gap-6">
            <TextInput
                {...methods.register('name')}
                label="Name"
                placeholder="Enter Name"
                background="light"
                disabled={!isEditing}
                required
                
            />
            <TextInput
                {...methods.register('city')}
                label="City"
                placeholder="Enter City"
                background="light"
                disabled={!isEditing}
            />
            <TextInput
                {...methods.register('price')}
                label="Price"
                placeholder="Enter the price you want to show"
                background="light"
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
                background="light"
                required
                disabled={!isEditing}
            />

            <TextInput
                {...methods.register('email')}
                type="email"
                label="Email Address"
                placeholder="Enter email id"
                background="light"
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
                    background="light"
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
                background="light"
            />
        </Box>
        <Box className="flex flex-col lg:flex-row gap-[54px] lg:gap-6">
            <TextAreaInput
                {...methods.register('desc')}
                label="A little bit about yourself"
                minRows={2}
                placeholder="This will be displayed in your profile"
                background="light"
            />
        </Box>

    </Box>
);

export default PersonalDetails;
