import type { SVGProps } from 'react'

type IconName =
  | 'car'
  | 'bike'
  | 'health'
  | 'shield'
  | 'plane'
  | 'truck'
  | 'fire'
  | 'group'
  | 'phone'
  | 'pin'
  | 'check'
  | 'arrow'
  | 'chat'
  | 'spark'

const paths: Record<IconName, JSX.Element> = {
  car: (
    <>
      <path d="M3 13l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 8l2 5" />
      <path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <circle cx="7" cy="15.5" r="1.4" />
      <circle cx="17" cy="15.5" r="1.4" />
    </>
  ),
  bike: (
    <>
      <circle cx="6" cy="17" r="3" />
      <circle cx="18" cy="17" r="3" />
      <path d="M6 17l4-7h5l3 7M10 10l2 7M15 10h2" />
    </>
  ),
  health: (
    <>
      <path d="M12 20s-7-4.4-7-9.3A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 7 3.7C19 15.6 12 20 12 20z" />
      <path d="M12 9.5v3l2 1.4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.6-3 8.2-7 10-4-1.8-7-5.4-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  plane: (
    <>
      <path d="M10.5 13.5L3 11l1-2 7 1 4-5a2 2 0 0 1 3 3l-5 4 1 7-2 1-2-6-4 2-1-2z" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="17" r="1.6" />
      <circle cx="17" cy="17" r="1.6" />
    </>
  ),
  fire: (
    <>
      <path d="M12 3c1 3-2 4-2 7a2 2 0 0 0 4 0c0-1 0-2 .5-3 1.5 2 2.5 3.5 2.5 6a5 5 0 0 1-10 0c0-4 3-6 5-10z" />
    </>
  ),
  group: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19a6 6 0 0 1 12 0" />
      <path d="M16 6a3 3 0 0 1 0 6M16 19a6 6 0 0 0-3-5" />
    </>
  ),
  phone: (
    <path d="M5 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  check: <path d="M5 12l4 4 10-10" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chat: (
    <path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3v-3H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
  ),
  spark: (
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
  ),
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
}

export function Icon({ name, size = 24, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}

export type { IconName }
