/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import React, { ReactNode, FC } from 'react';

import { Box, Loader } from '@mantine/core';



const Button = ({ ...props }) => {
  const { color, colorValue, ...buttonProps } = props;
  let colorClass;
  switch (color) {
    case 'primary':
      colorClass = `bg-primary${
        buttonProps.disabled || buttonProps.isLoading ? ' !bg-grey-400' : ''
      }`;
      break;
    case 'secondary':
      colorClass = `bg-transparent border border-solid border-white hover:bg-white hover:text-grey-600${
        buttonProps.disabled || buttonProps.isLoading
          ? ' !border-grey-400 !text-grey-400 hover:bg-transparent'
          : ''
      }`;
      break;
    case 'custom':
      colorClass = `bg-${colorValue} ${
        buttonProps.disabled || buttonProps.isLoading ? 'opacity-50' : ''
      }`;
      break;
    default:
      colorClass = 'bg-primary';
      break;
  }

  return (
    <button
      type={buttonProps.type}
      onClick={buttonProps.onClick}
      className={classNames(buttonProps.buttonClass ?? '', colorClass)}
      disabled={buttonProps.disabled || buttonProps.isLoading}
    >
      <Box className="flex flex-row items-center justify-center gap-3">
        {buttonProps.children}
        {buttonProps.postIcon ?? null}
        {buttonProps.isLoading ? <Loader size={16} /> : null}
      </Box>
    </button>
  );
};

export default Button;
