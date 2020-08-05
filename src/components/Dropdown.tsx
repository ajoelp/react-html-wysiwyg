import { AnimatePresence, motion } from 'framer-motion';
import React, { createContext, ReactElement, useContext } from 'react';
import { useClickOutside } from '../utils/useClickOutside';
import ToolbarButton from './ToolbarButton';
import getThemeValue from '../utils/getThemeValue';
import styled from 'styled-components';
import { Box } from './Layout';

const DropdownContext = createContext<{ open: boolean; setOpen(value: boolean): void }>({
  open: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOpen() {},
});

const DropdownTriggerWrapper = styled.button`
  display: flex;
  align-items: center;
  font-size: 0.9em;
  width: auto;
  border: none;
  background: none;
  position: relative;
  margin: 0;
  padding: 0;
`;

const Arrow = styled.svg`
  width: 15px;
  height: auto;
  margin-left: 0.5em;
`;

export const DropdownTrigger: React.FC<{ noArrow?: boolean; className?: string }> = ({
  children,
  noArrow,
  className,
}) => {
  const { open, setOpen } = useContext(DropdownContext);
  return (
    <DropdownTriggerWrapper onClick={() => setOpen(!open)} className={className}>
      {children}
      {!noArrow && (
        <Arrow viewBox="0 0 24 24">
          <rect width="24" height="24" fill="none" rx="0" ry="0" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.2913 15.7064L5.29128 9.70641C4.90128 9.31641 4.90128 8.68641 5.29128 8.29641C5.68128 7.90641 6.31128 7.90641 6.70128 8.29641L12.0013 13.5864L17.2913 8.29641C17.6813 7.90641 18.3113 7.90641 18.7013 8.29641C18.9013 8.48641 19.0013 8.73641 19.0013 8.99641C19.0013 9.25641 18.9013 9.50641 18.7113 9.70641L12.7113 15.7064C12.3213 16.0964 11.6813 16.0964 11.2913 15.7064Z"
            fill="currentColor"
          />
        </Arrow>
      )}
    </DropdownTriggerWrapper>
  );
};

const DropDownMenuWrapper = styled(motion.div)`
  position: absolute;
  background: white;
  width: 200px;
  z-index: 30;
  border-radius: ${getThemeValue('rounding')};
  border: 1px solid ${getThemeValue('colors.borderColor')};
  left: 0;
  overflow: hidden;
  margin-top: 0.5em;
`;

export const DropdownMenu: React.FC<{ placement?: 'left' | 'right' }> = ({ children }) => {
  const { open } = useContext(DropdownContext);
  return (
    <AnimatePresence>
      {open && (
        <DropDownMenuWrapper
          initial={{ opacity: 0, marginTop: -10 }}
          animate={{ opacity: 1, marginTop: 0 }}
          exit={{ opacity: 0, marginTop: 10 }}
          transition={{ duration: 0.1 }}
        >
          {children}
        </DropDownMenuWrapper>
      )}
    </AnimatePresence>
  );
};

interface DropdownProps {
  children: ReactElement[];
}

const DropdownWrapper = styled(Box)`
  position: relative;
`;

export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));
  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <DropdownWrapper ref={ref}>{children}</DropdownWrapper>
    </DropdownContext.Provider>
  );
};

export const DropdownButton: React.FC<React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = ({ onClick, ...rest }) => {
  const { setOpen } = useContext(DropdownContext);

  const clicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick && onClick(event);
    setOpen(false);
  };

  return <ToolbarButton onClick={clicked} {...rest} />;
};
