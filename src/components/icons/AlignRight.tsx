import * as React from 'react';

function SvgAlignRight(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M3 4h18v2H3V4zm4 15h14v2H7v-2zm-4-5h18v2H3v-2zm4-5h14v2H7V9z" fill="currentColor" />
        </svg>
    );
}

export default SvgAlignRight;
