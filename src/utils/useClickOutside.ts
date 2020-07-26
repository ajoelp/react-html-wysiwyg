import React, { useCallback, useEffect } from 'react';

export function useClickOutside<T extends HTMLElement>(callback: () => void) {
    const ref = React.useRef<T>(null);

    const handleClick = useCallback(
        (e: any) => {
            if (ref.current?.contains(e.target)) {
                // inside click
                return;
            }
            // outside click
            callback();
        },
        [callback],
    );

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [handleClick]);

    return ref;
}
