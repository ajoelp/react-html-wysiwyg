import React, { FC } from 'react';

const noop: FC = ({ children }) => <>{children}</>;

const AnimatePresence = jest.fn().mockImplementation(noop);

const motion = {
    div: jest.fn().mockImplementation(noop),
};

export { AnimatePresence, motion };
