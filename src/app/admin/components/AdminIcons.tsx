import React from "react";

const Svg: React.FC<{ d: string | string[]; size?: number; className?: string }> = ({
  d,
  size = 18,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

export const IcoDashboard: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"]} />
);
export const IcoUsers: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M23 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75", "M9 7m-4 0a4 4 0 1 0 8 0 4 4 0 1 0-8 0"]} />
);
export const IcoMap: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4", "M8 2v16", "M16 6v16"]} />
);
export const IcoBook: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M4 19.5A2.5 2.5 0 0 1 6.5 17H20", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"]} />
);
export const IcoClipboard: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2", "M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2z"]} />
);
export const IcoBriefcase: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z", "M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"]} />
);
export const IcoDB: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4z", "M2 6c0 2.21 4.48 4 10 4s10-1.79 10-4", "M2 12c0 2.21 4.48 4 10 4s10-1.79 10-4"]} />
);
export const IcoServer: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M2 3h20v7H2z", "M2 14h20v7H2z", "M6 7v.01", "M6 18v.01"]} />
);
export const IcoSettings: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"]} />
);
export const IcoBell: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"]} />
);
export const IcoSearch: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5z", "M16 16l4.5 4.5"]} />
);
export const IcoArrowUpRight: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <Svg size={size} d={["M7 17L17 7", "M7 7h10v10"]} />
);
export const IcoArrowDownRight: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <Svg size={size} d={["M17 7L7 17", "M17 17H7V7"]} />
);
export const IcoChevRight: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <Svg size={size} d="M9 18l6-6-6-6" />
);
export const IcoChevDown: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <Svg size={size} d="M6 9l6 6 6-6" />
);
export const IcoMail: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"]} />
);
export const IcoHelp: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z", "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", "M12 17h.01"]} />
);
export const IcoLogout: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5", "M21 12H9"]} />
);
export const IcoBadge: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"]} />
);
export const IcoTicket: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M15 5v2", "M15 11v2", "M15 17v2", "M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z"]} />
);
export const IcoBilling: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M12 1v22", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"]} />
);
export const IcoIntegrations: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"]} />
);
export const IcoReports: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M18 20V10", "M12 20V4", "M6 20v-6"]} />
);
export const IcoAnalytics: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M21 21H4.6A1.6 1.6 0 0 1 3 19.4V3", "M7 16l4-4 4 4 4-6"]} />
);
export const IcoPlus: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <Svg size={size} d={["M12 5v14", "M5 12h14"]} />
);
export const IcoRefresh: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <Svg size={size} d={["M23 4v6h-6", "M1 20v-6h6", "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"]} />
);
export const IcoDownload: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <Svg size={size} d={["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"]} />
);
export const IcoFilter: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <Svg size={size} d="M22 3H2l8 9.46V19l4 2V12.46L22 3z" />
);
export const IcoEdit: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <Svg size={size} d={["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"]} />
);
export const IcoTrash: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <Svg size={size} d={["M3 6h18", "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6", "M10 11v6", "M14 11v6", "M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"]} />
);
export const IcoGithub: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
);
export const IcoLinkedin: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z", "M2 9h4v12H2z", "M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"]} />
);
export const IcoSlack: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z", "M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z", "M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z", "M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z", "M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z", "M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z", "M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z", "M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"]} />
);
export const IcoX: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg size={size} d={["M18 6L6 18", "M6 6l12 12"]} />
);
