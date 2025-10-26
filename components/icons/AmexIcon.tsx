import React from 'react';

const AmexIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="24"
    viewBox="0 0 38 24"
    role="img"
    aria-labelledby="pi-american_express"
    {...props}
  >
    <title id="pi-american_express">American Express</title>
    <path
      d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
      opacity=".07"
    />
    <path fill="#006FCF" d="M34 18H4V6h30v12z" />
    <path
      fill="#FFF"
      d="M23.1 8.9h-4.3v1.9h2.8v1.1h-2.8v2.1h4.3v1.9h-6.2V7h6.2v1.9zM15.3 10.1h-2.2v5.7h1.9V10.1zM11.3 10.1h-2.1v5.7h2.1V10.1zM11.3 8.9H7v1.2h4.3V8.9zM15.3 8.9h-2.1v1.2h2.1V8.9zM19.9 8.9H17v1.2h2.9V8.9zM23.1 7H17v1.9h6.1V7zM15.3 7h-6.2v1.9h6.2V7zM11.3 7H7v1.9h4.3V7z"
    />
  </svg>
);

export default AmexIcon;
