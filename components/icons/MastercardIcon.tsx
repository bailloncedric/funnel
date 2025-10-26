import React from 'react';

const MastercardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="24"
    viewBox="0 0 38 24"
    role="img"
    aria-labelledby="pi-mastercard"
    {...props}
  >
    <title id="pi-mastercard">Mastercard</title>
    <path
      d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
      opacity=".07"
    />
    <path
      fill="#fff"
      d="M34 18H4c-.5 0-1-.5-1-1V7c0-.5.5-1 1-1h30c.5 0 1 .5 1 1v10c0 .5-.5 1-1 1z"
    />
    <circle fill="#EB001B" cx="15" cy="12" r="7" />
    <circle fill="#F79E1B" cx="23" cy="12" r="7" />
    <path
      fill="#FF5F00"
      d="M22 12c0-3.9-3.1-7-7-7-1.9 0-3.6.7-4.9 2-1.6 1.6-2.6 3.8-2.6 6.2 0 2.4 1 4.6 2.6 6.2 1.3 1.2 3 2 4.9 2 3.9 0 7-3.1 7-7z"
    />
  </svg>
);

export default MastercardIcon;
