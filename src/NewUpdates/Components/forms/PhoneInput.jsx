import { Country } from 'country-state-city';
import React, { Ref, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Box, Select, TextInput, createStyles } from '@mantine/core';



const PhoneInput = ({ ...props }, ref) => {
  const methods = useFormContext();
  const useStyles = createStyles(theme => ({
    root: {
      position: 'relative',
      borderRadius: '39px',
    },
    label: {
      position: 'absolute',
      zIndex: 2,
      top: -30,
      left: -84,
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
      boxShadow: 'inset 0 0 0 1px #FFFFFF80',
      background: props.background === 'light' ? 'var(--white)' : 'var(--dark-blue)',
      color: props.background === 'light' ? 'var(--black)' : 'var(--white)',
      fontWeight: 400,
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
      fontSize: '10px',
      borderRadius: '2px',
    },
    item: {
      color: 'var(--white)',
      fontSize: '10px',
      opacity: '0.75',
    },
  }));

  const { classes } = useStyles();

  const countyCodes = useMemo(
    () =>
      Country.getAllCountries().map(x => ({
        'description': x.name,
        'value': x.phonecode[0] === '+' ? x.phonecode : `+${x.phonecode}`,
        'label': x.phonecode[0] === '+' ? x.phonecode : `+${x.phonecode}`,
      })),
    [],
  );

  return (
    <Box ref={ref} className="w-full flex items-stretch">
      <Controller
        control={methods.control}
        name={`${props.name}.countryCode`}
        render={({ field }) => (
          <Select
            id={`${props.name}.countryCode`}
            {...field}
            data={countyCodes}
            defaultValue="+91"
            selectOnBlur
            searchable
            classNames={classes}
            size="xs"
            disabled={props.disabled}
            styles={{
              input: {
                width: '84px',
              },
            }}
          />
        )}
      />
      <Controller
        control={methods.control}
        name={`${props.name}.number`}
        render={({ field, fieldState }) => (
          <Box className="relative w-full">
            <TextInput
              id={`${props.name}.number`}
              name={field.name}
              value={field.value}
              onChange={e => {
                methods.control.register(`${props.name}.number`);
                field.onChange(e);
              }}
              onBlur={field.onBlur}
              label={props.label}
              placeholder={props.placeholder}
              withAsterisk={props.required}
              size="xs"
              autoComplete="nope"
              classNames={classes}
              style={{ width: '100%', paddingLeft: '20px' }}
              error={!!fieldState.error?.message}
              type="number"
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

export default React.forwardRef(PhoneInput);