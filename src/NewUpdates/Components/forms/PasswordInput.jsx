import React, { Ref } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Box, PasswordInput as MantinePasswordInput, createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';



const useStyles = createStyles((theme, params) => ({
    root: {
        position: 'relative',
        border: params.background === 'light' ? '1px solid var(--care-line)' : '1px solid var(--grey-300)',
        background: params.background === 'light' ? 'var(--white)' : '#2F0182',
        borderRadius: params.background === 'light' ? '8px' : '39px',
    },
    label: {
        position: 'absolute',
        zIndex: 2,
        top: -30,
        pointerEvents: 'none',
        color: params.background === 'light' ? 'var(--care-ink)' : theme.white,
        fontSize: '14px',
        fontWeight: 400,
        marginLeft: '10px',
    },
    required: {
        transition: 'opacity 150ms ease',
        opacity: 1,
        color: params.background === 'light' ? 'var(--care-ink)' : theme.white,
    },

    input: {
        backgroundColor: 'transparent',
        fontSize: '14px',
        color: params.background === 'light' ? 'var(--care-ink) !important' : 'white !important' ,
        fontWeight: 400,
        boxShadow: 'none',
        border: params.background === 'light' ? '1px solid var(--care-line)' : `1px solid  'var(--grey-300)'`,
        borderRadius: params.background === 'light' ? '8px' : '39px',
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
        color: params.background === 'light' ? 'var(--care-ink)' : theme.white ,
        fontWeight: 400,
        boxShadow: 'none',
        paddingLeft: theme.spacing.sm,
        paddingRight: theme.spacing.sm,
        padding: 24,
        height: 65,

        '&::placeholder': {
            color: params.background === 'light' ? 'var(--care-muted)' : '#fff',
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

const PasswordInput = ({ ...props }, ref) => {
    const methods = useFormContext();
    const { classes } = useStyles({ background: props.background });

    const [visible, { toggle }] = useDisclosure(false);

    return (
        <Box ref={ref} className="flex items-stretch w-full">
            <Controller
                control={methods.control}
                name={`${props.name}`}
                render={({ field, fieldState }) => (
                    <Box className="relative w-full">
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
                        <Box className="absolute right-0 text-danger text-[0.8rem] m-2">
                            {fieldState.error?.message}
                        </Box>
                    </Box>
                )}
            />
        </Box>
    );
};

export default React.forwardRef(PasswordInput);
