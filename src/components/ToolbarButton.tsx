import React from 'react';
import styled from 'styled-components';

const ToolbarButtonWrapper = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
`;

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  active?: boolean;
};

export default function ToolbarButton({ onClick, ref: _ref, ...rest }: ButtonProps): JSX.Element {
  const click = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClick && onClick(e);
  };

  return <ToolbarButtonWrapper onClick={click} {...rest} />;
}
