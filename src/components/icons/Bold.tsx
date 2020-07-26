import * as React from 'react';

function SvgBold(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
            <path fill="none" d="M0 0h24v24H0z" />
            <path
                d="M8 11h4.5a2.5 2.5 0 100-5H8v5zm10 4.5a4.5 4.5 0 01-4.5 4.5H6V4h6.5a4.5 4.5 0 013.256 7.606A4.498 4.498 0 0118 15.5zM8 13v5h5.5a2.5 2.5 0 100-5H8z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgBold;
