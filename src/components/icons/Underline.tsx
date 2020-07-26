import * as React from 'react';

function SvgUnderline(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
            <path fill="none" d="M0 0h24v24H0z" />
            <path fill="currentColor" d="M8 3v9a4 4 0 108 0V3h2v9a6 6 0 11-12 0V3h2zM4 20h16v2H4v-2z" />
        </svg>
    );
}

export default SvgUnderline;
