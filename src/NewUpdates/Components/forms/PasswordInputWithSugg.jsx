import { faX, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Ref, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
    Box,
    PasswordInput as MantinePasswordInput,
    createStyles,
    Progress,
    Text,
    Popover,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';



const useStyles = createStyles(theme => ({
    root: {
        position: 'relative',
        border: '1px solid var(--grey-300)',
        background: '#2F0182',
        borderRadius: '39px',
    },
    label: {
        position: 'absolute',
        zIndex: 2,
        top: -30,
        pointerEvents: 'none',
        color: theme.white,
        fontSize: '14px',
        fontWeight: 400,
        marginLeft: '10px',
    },
    required: {
        transition: 'opacity 150ms ease',
        opacity: 1,
        color: theme.white,
    },

    input: {
        backgroundColor: 'transparent',
        fontSize: '14px',
        color: 'white !important' ,
        fontWeight: 400,
        boxShadow: 'none',
        border: `1px solid  'var(--grey-300)'`,
        borderRadius: '39px',
        paddingLeft: theme.spacing.sm,
        paddingRight: theme.spacing.sm,
        outline: 'none',
        padding: 10,
        height: 65,

        '&:focus, &:focus-within': {
            outline: 'none',
            border: `1px solid '#3A3A3A'` 
        },
    },
    innerInput: {
        backgroundColor: 'transparent',
        fontSize: '14px',
        color:  theme.white ,
        fontWeight: 400,
        boxShadow: 'none',
        paddingLeft: theme.spacing.sm,
        paddingRight: theme.spacing.sm,
        padding: 24,
        height: 65,

        '&::placeholder': {
            color: '#fff',
            transition: 'color 150ms ease',
            opacity: 0.7,
        },

        '&:focus::placeholder': {
            opacity: 0.2,
        },
    },
    dropdown: {
        backgroundColor: 'var(--black)',
        fontSize: '14px',
        borderRadius: '2px',
    },
    rightSection: {
        padding: '24px 30px',
    },
    item: {
        color: 'var(--white)',
        fontSize: '16px',
        opacity: '0.75',
    },
}));

const PasswordRequirement = ({ meets, label }) => (
    <Text
        color={meets ? 'teal' : 'red'}
        sx={{ display: 'flex', alignItems: 'center' }}
        mt={7}
        size="sm"
    >
        {meets ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faX} />}{' '}
        <Box ml={10}>{label}</Box>
    </Text>
);

const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password) {
    let multiplier = password && password.length > 5 ? 0 : 1;

    requirements.forEach(requirement => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const PasswordInputWithSugg = (
    { ...props },
    ref,
) => {
    const methods = useFormContext();
    const { classes } = useStyles();
    const [popoverOpened, setPopoverOpened] = useState(false);
    const checks = requirements.map(requirement => (
        <PasswordRequirement
            key={requirement.label}
            label={requirement.label}
            meets={requirement.re.test(props.value ?? '')}
        />
    ));

    const [visible, { toggle }] = useDisclosure(false);
    const strength = getStrength(props.value);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    return (
        <Box ref={ref} className="flex items-stretch w-full">
            <Controller
                control={methods.control}
                name={`${props.name}`}
                render={({ field, fieldState }) => (
                    <Box className="relative w-full">
                        <Popover
                            opened={popoverOpened}
                            position="bottom"
                            width="target"
                            transitionProps={{ transition: 'pop' }}
                        >
                            <Popover.Target>
                                <div
                                    onFocusCapture={() => setPopoverOpened(true)}
                                    onBlurCapture={() => setPopoverOpened(false)}
                                >
                                    <MantinePasswordInput
                                        {...field}
                                        type={props.type}
                                        label={props.label}
                                        size="xs"
                                        autoComplete="nope"
                                        classNames={classes}
                                        style={{ width: '100%' }}
                                        error={!!fieldState.error?.message}
                                        withAsterisk={props.required}
                                        placeholder={props.placeholder}
                                        visible={visible}
                                        onVisibilityChange={toggle}
                                    />
                                </div>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <Progress color={color} value={strength} size={5} mb="xs" />
                                <PasswordRequirement
                                    label="Includes at least 8 characters"
                                    meets={!!props.value && props.value.length >= 8}
                                />
                                {checks}
                            </Popover.Dropdown>
                        </Popover>

                        <Box className="absolute right-0 text-danger text-[0.625rem]">
                            {fieldState.error?.message}
                        </Box>
                    </Box>
                )}
            />
        </Box>
    );
};

export default React.forwardRef(PasswordInputWithSugg);
