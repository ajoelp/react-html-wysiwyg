import React from 'react';
import ToolbarButton from './ToolbarButton';

export const IconButton: React.FC<React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = ({ className, ...props }) => {
  return (
    <ToolbarButton
      className={`h-8 w-8 border rounded p-1 hover:bg-gray-100 mr-1 items-center justify-center flex ${className}`}
      {...props}
    />
  );
};
