
import React from 'react';

export const GeminiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#343541]"
    {...props}
  >
    <path d="M12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9z" />
    <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    <path d="M12 12l4-4" />
    <path d="M12 12l-4 4" />
  </svg>
);
