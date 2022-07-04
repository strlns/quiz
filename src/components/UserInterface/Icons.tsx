import React, { SVGAttributes } from "react";

type IconProps = {
  title?: string;
  svgAttributes?: SVGAttributes<SVGElement>;
};

const Title = ({ title }: { title?: string }) => (
  <>{title && <title>{title}</title>}</>
);

/*
Collection of icons taken from Feather icons, Hero icons or similar MIT-licensed SVG icon libraries
 */

export const SaveIcon = ({ title, svgAttributes }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...svgAttributes}
  >
    <Title title={title} />
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

export const SignInIcon = ({ title, svgAttributes }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...svgAttributes}
  >
    <Title title={title} />
    <path
      fillRule="evenodd"
      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export const SignOutIcon = ({ title, svgAttributes }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...svgAttributes}
  >
    <Title title={title} />
    <path
      fillRule="evenodd"
      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
      clipRule="evenodd"
    />
  </svg>
);

export const PersonIcon = ({ title, svgAttributes }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...svgAttributes}
  >
    <Title title={title} />
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

export const HeartIcon = ({ title, svgAttributes }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...svgAttributes}
  >
    <Title title={title} />
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
);

export const ArrowLeft = ({ title, svgAttributes }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...svgAttributes}
    >
      <Title title={title} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  );
};

export const ArrowRight = ({ title, svgAttributes }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...svgAttributes}
    >
      <Title title={title} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
};

export const ArrowDown = ({ title, svgAttributes }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...svgAttributes}
    >
      <Title title={title} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 13l-5 5m0 0l-5-5m5 5V6"
      />
    </svg>
  );
};

export const ArrowUp = ({ title, svgAttributes }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...svgAttributes}
    >
      <Title title={title} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  );
};

export const LockIcon = ({ title, svgAttributes }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...svgAttributes}
  >
    <Title title={title} />
    <path
      fillRule="evenodd"
      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
      clipRule="evenodd"
    />
  </svg>
);

export const HamburgerIcon = ({ title, svgAttributes }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
    {...svgAttributes}
  >
    <Title title={title} />
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export const CheckIcon = ({ title, svgAttributes }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
    {...svgAttributes}
  >
    <Title title={title} />
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
export const MaximizeIcon = ({ title, svgAttributes }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
    {...svgAttributes}
  >
    <Title title={title} />
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
  </svg>
);
export const MinimizeIcon = ({ title, svgAttributes }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
    {...svgAttributes}
  >
    <Title title={title} />
    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
  </svg>
);
