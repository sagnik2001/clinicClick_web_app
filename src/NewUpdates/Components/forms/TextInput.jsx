import React, { Ref } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Box, TextInput as MantineTextInput, createStyles } from '@mantine/core';



const TextInput = ({ ...props },ref) => {
  const methods = useFormContext();

  const useStyles = createStyles(theme => ({
    root: {
      position: 'relative',
      boxShadow: 'inset 0 0 0 1px #FFFFFF80',
      background: props.background === 'light' ? 'var(--white)' : 'var(--dark-blue)',
      borderRadius: '39px',
    },
    label: {
      position: 'absolute',
      zIndex: 2,
      top: -30,
      pointerEvents: 'none',
      color: props.background === 'light' ? 'var(--black)' : 'var(--white) !important',
      fontSize: '1rem',
      fontWeight: 400,
      marginLeft: '10px',
    },
    required: {
      transition: 'opacity 150ms ease',
      opacity: 1,
      color: props.background === 'light' ? 'var(--black)' : 'var(--white)',
    },

    input: {
      backgroundColor: 'transparent',
      fontSize: '16px',
      color: props.background === 'light' ? 'var(--black)' : 'var(--white)',
      fontWeight: 400,
      boxShadow: 'inset 0 0 0 1px #FFFFFF80',
      border: props.background === 'light' ? '1px solid black' : 'none',
      borderRadius: '39px',
      paddingLeft: theme.spacing.sm,
      paddingRight: theme.spacing.sm,
      outline: 'none',
      padding: 24,
      height: 65,

      '&::placeholder': {
        color: props.background === 'light' ? 'var(--black)' : 'var(--white)',
        opacity: '0.8',
      },

      '&:focus, &:focus-within': {
        outline: 'none',
        border: 'none',
        boxShadow:
          props.background === 'light' ? 'inset 0 0 0 1px black' : 'inset 0 0 0 1px #FFFFFF80',
      },
    },
    innerInput: {
      fontSize: '20px',
      color: props.background === 'light' ? 'var(--black)' : 'var(--white)',
      fontWeight: 500,
      opacity: 0.7,
      padding: 0,

      '&::placeholder': {
        color: props.background === 'light' ? 'var(--black)' : 'var(--white)',
        opacity: '0.8',
        transition: 'color 150ms ease',
        fontSize: '14px',
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
    item: {
      color: 'var(--white)',
      fontSize: '16px',
      opacity: '0.75',
    },
  }));

  const { classes } = useStyles();

  return (
    <Box ref={ref} className="flex items-stretch w-full">
      <Controller
        control={methods.control}
        name={`${props.name}`}
        render={({ field, fieldState }) => (
          <Box className="relative w-full">
            <MantineTextInput
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
              disabled={props.disabled}
            />
            <Box className="absolute right-0 text-danger text-[0.625rem]">
              {fieldState.error?.message}
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};

export default React.forwardRef(TextInput);
