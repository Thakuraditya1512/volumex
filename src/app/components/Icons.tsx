// Professional outline icons — stroke only, no color fills
// All icons use currentColor so they inherit text color from parent

interface IconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

const base = (strokeWidth = 1.5) => ({
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const IconBrain = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M9.5 2a2.5 2.5 0 0 1 5 0M9.5 2C7 2 5 4 5 6.5v1C3.5 8 2 9.5 2 11.5S3.5 15 5 15.5v1C5 19.5 7 22 9.5 22h5c2.5 0 4.5-2.5 4.5-5.5v-1c1.5-.5 3-2 3-4S20.5 8 19 7.5v-1C19 4 17 2 14.5 2" />
    <path {...base(strokeWidth)} d="M9 10h.01M15 10h.01M9.5 15s1 1 2.5 1 2.5-1 2.5-1" />
  </svg>
);

export const IconCode = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  </svg>
);

export const IconTrendingUp = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M22 7l-8.5 8.5-5-5L2 17" />
    <path {...base(strokeWidth)} d="M16 7h6v6" />
  </svg>
);

export const IconLink = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path {...base(strokeWidth)} d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export const IconBarChart = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M18 20V10M12 20V4M6 20v-6" />
  </svg>
);

export const IconCheck = ({ size = 16, strokeWidth = 2, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M20 6L9 17l-5-5" />
  </svg>
);

export const IconX = ({ size = 16, strokeWidth = 2, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const IconArrowRight = ({ size = 16, strokeWidth = 2, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const IconChevronDown = ({ size = 14, strokeWidth = 2, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M6 9l6 6 6-6" />
  </svg>
);

export const IconMenu = ({ size = 22, strokeWidth = 2, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const IconClose = ({ size = 22, strokeWidth = 2, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const IconPlay = ({ size = 16, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M5 3l14 9L5 21V3z" />
  </svg>
);

export const IconZap = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export const IconTarget = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="10" {...base(strokeWidth)} />
    <circle cx="12" cy="12" r="6" {...base(strokeWidth)} />
    <circle cx="12" cy="12" r="2" {...base(strokeWidth)} />
  </svg>
);

export const IconGithub = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const IconLinkedin = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" {...base(strokeWidth)} />
    <circle cx="4" cy="4" r="2" {...base(strokeWidth)} />
  </svg>
);

export const IconTwitter = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

export const IconYoutube = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <path {...base(strokeWidth)} d="M9.75 15.02l5.75-3.02-5.75-3.02v6.04z" />
  </svg>
);

export const IconUsers = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" {...base(strokeWidth)} />
    <path {...base(strokeWidth)} d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const IconMap = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" />
    <path {...base(strokeWidth)} d="M8 2v16M16 6v16" />
  </svg>
);

export const IconStar = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" {...base(strokeWidth)} />
  </svg>
);

export const IconBook = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path {...base(strokeWidth)} d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export const IconCpu = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <rect x="9" y="9" width="6" height="6" rx="1" {...base(strokeWidth)} />
    <path {...base(strokeWidth)} d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    <rect x="4" y="4" width="16" height="16" rx="2" {...base(strokeWidth)} />
  </svg>
);

export const IconAward = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="8" r="6" {...base(strokeWidth)} />
    <path {...base(strokeWidth)} d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

export const IconSettings = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="3" {...base(strokeWidth)} />
    <path {...base(strokeWidth)} d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const IconMessage = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const IconHome = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path {...base(strokeWidth)} d="M9 22V12h6v10" />
  </svg>
);

export const IconFolder = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

export const IconTerminal = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <polyline points="4 17 10 11 4 5" {...base(strokeWidth)} />
    <line x1="12" y1="19" x2="20" y2="19" {...base(strokeWidth)} />
  </svg>
);

export const IconShield = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const IconGlobe = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="10" {...base(strokeWidth)} />
    <path {...base(strokeWidth)} d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const IconArrowUpRight = ({ size = 16, strokeWidth = 2, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M7 17L17 7M7 7h10v10" />
  </svg>
);

export const IconArrowDownRight = ({ size = 16, strokeWidth = 2, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M7 7l10 10M17 7v10H7" />
  </svg>
);

export const IconMoreVertical = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="1" {...base(strokeWidth)} />
    <circle cx="12" cy="5" r="1" {...base(strokeWidth)} />
    <circle cx="12" cy="19" r="1" {...base(strokeWidth)} />
  </svg>
);

export const IconServer = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <rect x="2" y="2" width="20" height="8" rx="2" {...base(strokeWidth)} />
    <rect x="2" y="14" width="20" height="8" rx="2" {...base(strokeWidth)} />
    <line x1="6" y1="6" x2="6" y2="6" {...base(strokeWidth)} />
    <line x1="6" y1="18" x2="6" y2="18" {...base(strokeWidth)} />
  </svg>
);

export const IconDatabase = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <ellipse cx="12" cy="5" rx="9" ry="3" {...base(strokeWidth)} />
    <path {...base(strokeWidth)} d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path {...base(strokeWidth)} d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

export const IconActivity = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" {...base(strokeWidth)} />
  </svg>
);

export const IconTrophy = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34M8 4h8v7a4 4 0 0 1-8 0V4z" />
  </svg>
);

export const IconBell = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export const IconSearch = ({ size = 20, strokeWidth = 1.5, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <circle cx="11" cy="11" r="8" {...base(strokeWidth)} />
    <line x1="21" y1="21" x2="16.65" y2="16.65" {...base(strokeWidth)} />
  </svg>
);

export const IconChevronRight = ({ size = 16, strokeWidth = 2, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path {...base(strokeWidth)} d="M9 18l6-6-6-6" />
  </svg>
);

