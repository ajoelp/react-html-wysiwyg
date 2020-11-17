import React, { ReactNode } from 'react';
import { Transition } from '@headlessui/react';

const SIZES = {
  xs: 'sm:max-w-sm',
  sm: 'sm:max-w-lg',
  md: 'sm:max-w-xl',
  lg: 'sm:max-w-2xl',
};

interface BaseDialogProps {
  children: ReactNode;
  size?: keyof typeof SIZES;
  closeDialog(): void;
}

export function BaseDialog({ children, closeDialog, size = 'xs' }: BaseDialogProps) {
  return (
    <Transition appear={true} show={true}>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            className="fixed inset-0"
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <div onClick={closeDialog} className="absolute inset-0 bg-gray-500 opacity-75" />
          </Transition.Child>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
          &#8203;
          <Transition.Child
            className={`inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${SIZES[size]} sm:w-full sm:p-6`}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
          >
            <div role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              {children}
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>
  );
}
