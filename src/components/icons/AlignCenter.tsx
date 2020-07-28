import * as React from 'react';

function SvgAlignCenter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M3 4h18v2H3V4zm2 15h14v2H5v-2zm-2-5h18v2H3v-2zm2-5h14v2H5V9z" fill="currentColor" />
    </svg>
  );
}

export default SvgAlignCenter;
