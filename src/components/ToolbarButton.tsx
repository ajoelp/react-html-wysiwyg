import React from 'react';

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default function ToolbarButton({ onClick, ...rest }: ButtonProps): JSX.Element {
  const click = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClick && onClick(e);
  };

  return <button onClick={click} {...rest} />;
}
