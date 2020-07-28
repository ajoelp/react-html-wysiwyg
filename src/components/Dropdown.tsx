import { AnimatePresence, motion } from 'framer-motion';
import React, { createContext, ReactElement, useContext } from 'react';
import { useClickOutside } from '../utils/useClickOutside';
import { IconButton } from './IconButton';
import ToolbarButton from './ToolbarButton';

const DropdownContext = createContext<{ open: boolean; setOpen(value: boolean): void }>({
  open: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOpen() {},
});

export const DropdownTrigger: React.FC<{ noArrow?: boolean }> = ({ children, noArrow }) => {
  const { open, setOpen } = useContext(DropdownContext);
  return (
    <IconButton
      className="flex items-center hover:bg-gray-3 rounded focus:outline-none text-sm w-auto"
      onClick={() => setOpen(!open)}
    >
      {children}
      {!noArrow && (
        <svg viewBox="0 0 24 24" className="w-4 text-gray-5 ml-2">
          <rect width="24" height="24" fill="none" rx="0" ry="0" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.2913 15.7064L5.29128 9.70641C4.90128 9.31641 4.90128 8.68641 5.29128 8.29641C5.68128 7.90641 6.31128 7.90641 6.70128 8.29641L12.0013 13.5864L17.2913 8.29641C17.6813 7.90641 18.3113 7.90641 18.7013 8.29641C18.9013 8.48641 19.0013 8.73641 19.0013 8.99641C19.0013 9.25641 18.9013 9.50641 18.7113 9.70641L12.7113 15.7064C12.3213 16.0964 11.6813 16.0964 11.2913 15.7064Z"
            fill="currentColor"
          />
        </svg>
      )}
    </IconButton>
  );
};

export const DropdownMenu: React.FC<{ placement?: 'left' | 'right' }> = ({ children, placement = 'left' }) => {
  const { open } = useContext(DropdownContext);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, marginTop: -10 }}
          animate={{ opacity: 1, marginTop: 0 }}
          exit={{ opacity: 0, marginTop: 10 }}
          transition={{ duration: 0.1 }}
          className={`absolute bg-white w-56 z-30 shadow-xl rounded border border-gray-3 ${placement}-0 overflow-hidden mt-2`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface DropdownProps {
  children: ReactElement[];
}

export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));
  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={ref} className="group relative">
        {children}
      </div>
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
