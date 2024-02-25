import React, { Ref } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Box, Textarea as MantineTextarea, createStyles } from '@mantine/core';


const TextAreaInput = ({ ...props }, ref) => {
  const methods = useFormContext();

  const useStyles = createStyles(theme => ({
    root: {
      position: 'relative',
      boxShadow: 'inset 0 0 0 1px #FFFFFF80',
      background: props.background ?? 'var(--dark-blue)',
      borderRadius: '12px',
    },
    label: {
      position: 'absolute',
      zIndex: 2,
      top: -30,
      pointerEvents: 'none',
      color: 'var(--white)',
      fontSize: '1rem',
      fontWeight: 400,
      marginLeft: '10px',
    },
    required: {
      transition: 'opacity 150ms ease',
      opacity: 1,
      color: 'var(--white)',
    },

    input: {
      backgroundColor: 'transparent',
      fontSize: '16px',
      color: 'var(--white)',
      fontWeight: 400,
      boxShadow: 'inset 0 0 0 1px #FFFFFF80',
      border: 'none',
      borderRadius: '12px',
      paddingLeft: theme.spacing.sm,
      paddingRight: theme.spacing.sm,
      outline: 'none',
      padding: 24,
      height: 65,

      '&::placeholder': {
        color: '#FFFFFF80',
      },

      '&:focus, &:focus-within': {
        outline: 'none',
        border: 'none',
        boxShadow: 'inset 0 0 0 1px #FFFFFF80',
      },
    },
    innerInput: {
      fontSize: '20px',
      color: 'var(--white)',
      fontWeight: 500,
      opacity: 0.7,
      padding: 0,

      '&::placeholder': {
        color: '#FFFFFF80',
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
            <MantineTextarea
              {...field}
              label={props.label}
              size="xs"
              autoComplete="nope"
              classNames={classes}
              style={{ width: '100%' }}
              error={!!fieldState.error?.message}
              withAsterisk={props.required}
              placeholder={props.placeholder}
              disabled={props.disabled}
              autosize
              minRows={props.minRows}
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

export default React.forwardRef(TextAreaInput);
