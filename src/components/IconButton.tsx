import React from 'react';
import ToolbarButton from './ToolbarButton';
import styled, { css } from 'styled-components';
import getThemeValue from '../utils/getThemeValue';

const IconButtonWrapper = styled(ToolbarButton)`
  height: 30px;
  width: 30px;
  border: 1px solid ${getThemeValue('colors.borderColor')};
  border-radius: ${getThemeValue('rounding')};
  padding: 0.5em;
  margin-right: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${getThemeValue('colors.primary')};
    cursor: pointer;
  }
  ${({ active }) =>
    active &&
    css`
      background: ${getThemeValue('colors.primary')};
      cursor: pointer;
    `}
`;

interface IconButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  active?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({ className, ref: _ref, ...props }) => {
  return <IconButtonWrapper className={className} {...props} />;
};
