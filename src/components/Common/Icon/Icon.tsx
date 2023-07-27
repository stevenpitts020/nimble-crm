import Icon from '@ant-design/icons'
import React from 'react'
// TO DO: use v4 way of defining props and types in Icon
import { IconProps } from '@ant-design/compatible/lib/icon'

const ClockSVG = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 16 16">
    <path
      d="M8 14.667A6.667 6.667 0 108 1.333a6.667 6.667 0 000 13.334z"
      stroke="#6F7C88"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 4v4l2.667 1.333"
      stroke="#6F7C88"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
const ExternalLinkSVG = () => (
  <svg width="16" height="16" fill="none">
    <path
      d="M12 8.667v4A1.334 1.334 0 0110.667 14H3.333A1.334 1.334 0 012 12.667V5.333A1.333 1.333 0 013.333 4h4M10 2h4v4M6.667 9.333L14 2"
      stroke="#6F7C88"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const LockSVG = () => (
  <svg width="60" height="60" fill="none">
    <path
      d="M45.556 25H14.444C11.99 25 10 26.492 10 28.333v23.334C10 53.507 11.99 55 14.444 55h31.112C48.01 55 50 53.508 50 51.667V28.333C50 26.493 48.01 25 45.556 25z"
      stroke="#4BBFEC"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M42.5 22.5v-5C42.5 10.596 36.904 5 30 5v0c-6.904 0-12.5 5.596-12.5 12.5v5"
      stroke="#4BBFEC"
      strokeWidth="5"
    />
  </svg>
)

const DriversLicenceFrontSVG = () => (
  <svg width="256" height="152" fill="none">
    <rect width="256" height="152" rx="6" fill="#F7F8FC" />
    <path
      d="M30 10H16a6 6 0 00-6 6v14M226 10h14a6 6 0 016 6v14M30 142H16a6 6 0 01-6-6v-14M226 142h14a6 6 0 006-6v-14"
      stroke="#E5E9F2"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect x="60" y="30" width="135.371" height="92" rx="6" fill="#2795D3" />
    <rect
      width="36.26"
      height="39.429"
      rx="6"
      transform="matrix(1 0 0 -1 72.086 82.571)"
      fill="#E5E9F2"
    />
    <rect
      x="120.434"
      y="43.143"
      width="62.851"
      height="5.257"
      rx="2.629"
      fill="#E5E9F2"
    />
    <rect
      x="120.434"
      y="54.971"
      width="62.851"
      height="5.257"
      rx="2.629"
      fill="#E5E9F2"
    />
    <rect
      x="120.434"
      y="66.8"
      width="42.304"
      height="5.257"
      rx="2.629"
      fill="#E5E9F2"
    />
    <rect
      x="150.65"
      y="103.6"
      width="32.634"
      height="5.257"
      rx="2.629"
      fill="#E5E9F2"
    />
    <rect
      x="72.086"
      y="103.6"
      width="32.634"
      height="5.257"
      rx="2.629"
      fill="#E5E9F2"
    />
    <ellipse
      opacity=".5"
      cx="90.216"
      cy="81.914"
      rx="18.13"
      ry="12.486"
      fill="#2795D3"
    />
    <ellipse
      opacity=".5"
      cx="90.217"
      cy="60.229"
      rx="7.252"
      ry="7.886"
      fill="#2795D3"
    />
  </svg>
)

const DriversLicenceBackSVG = () => (
  <svg width="256" height="152" fill="none">
    <rect width="256" height="152" rx="6" fill="#F7F8FC" />
    <path
      d="M30 10H16a6 6 0 00-6 6v14M226 10h14a6 6 0 016 6v14M30 142H16a6 6 0 01-6-6v-14M226 142h14a6 6 0 006-6v-14"
      stroke="#E5E9F2"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect x="60" y="30" width="135.371" height="92" rx="6" fill="#176795" />
    <rect x="72" y="43" width="85" height="5" rx="2.5" fill="#E5E9F2" />
    <rect x="72" y="55" width="43" height="5" rx="2.5" fill="#E5E9F2" />
    <rect x="171" y="51" width="12" height="12" rx="6" fill="#E5E9F2" />
    <rect x="97" y="104" width="86" height="5" rx="2.5" fill="#E5E9F2" />
    <rect x="76" y="92" width="107" height="5" rx="2.5" fill="#E5E9F2" />
  </svg>
)

const PassportFrontSVG = () => (
  <svg width="256" height="152" fill="none">
    <rect width="256" height="152" rx="6" fill="#F7F8FC" />
    <path
      d="M30 10H16a6 6 0 00-6 6v14M226 10h14a6 6 0 016 6v14M30 142H16a6 6 0 01-6-6v-14M226 142h14a6 6 0 006-6v-14"
      stroke="#E5E9F2"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect x="60" y="30" width="135.371" height="92" rx="6" fill="#2795D3" />
    <rect
      width="36.26"
      height="39.429"
      rx="6"
      transform="matrix(1 0 0 -1 72.086 82.571)"
      fill="#E5E9F2"
    />
    <rect
      x="120.434"
      y="43.143"
      width="62.851"
      height="5.257"
      rx="2.629"
      fill="#E5E9F2"
    />
    <rect
      x="120.434"
      y="54.971"
      width="62.851"
      height="5.257"
      rx="2.629"
      fill="#E5E9F2"
    />
    <rect
      x="120.434"
      y="66.8"
      width="42.304"
      height="5.257"
      rx="2.629"
      fill="#E5E9F2"
    />
    <rect
      x="150.65"
      y="103.6"
      width="32.634"
      height="5.257"
      rx="2.629"
      fill="#E5E9F2"
    />
    <rect
      x="72.086"
      y="103.6"
      width="32.634"
      height="5.257"
      rx="2.629"
      fill="#E5E9F2"
    />
    <ellipse
      opacity=".5"
      cx="90.216"
      cy="81.914"
      rx="18.13"
      ry="12.486"
      fill="#2795D3"
    />
    <ellipse
      opacity=".5"
      cx="90.217"
      cy="60.229"
      rx="7.252"
      ry="7.886"
      fill="#2795D3"
    />
  </svg>
)

const PlaceholderInstitutionSVG = () => (
  <svg width="56" height="56" fill="none">
    <g
      opacity=".3"
      stroke="#A5B1BD"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M49 37.333V18.667a4.667 4.667 0 00-2.333-4.037L30.333 5.297a4.666 4.666 0 00-4.666 0L9.333 14.63A4.667 4.667 0 007 18.667v18.666a4.666 4.666 0 002.333 4.037l16.334 9.333a4.666 4.666 0 004.666 0l16.334-9.333A4.667 4.667 0 0049 37.333z" />
      <path d="M7.63 16.24L28 28.023 48.37 16.24M28 51.52V28" />
    </g>
  </svg>
)

const CheckCircleSVG = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24">
    <path
      opacity=".15"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
      fill="#36B37E"
    />
    <path
      d="M10.398 15.824l-3.261-3.242A.476.476 0 017 12.23c0-.143.046-.26.137-.351l.722-.703a.435.435 0 01.342-.156c.137 0 .257.052.361.156l2.188 2.187 4.688-4.687a.496.496 0 01.36-.156c.137 0 .251.052.343.156l.722.703A.476.476 0 0117 9.73c0 .144-.046.26-.137.352l-5.761 5.742a.446.446 0 01-.352.156.446.446 0 01-.352-.156z"
      fill="#01C48D"
    />
  </svg>
)

const CheckCircleWhiteSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M14.6668 7.38662V7.99995C14.666 9.43757 14.2005 10.8364 13.3397 11.9878C12.4789 13.1393 11.269 13.9816 9.8904 14.3892C8.51178 14.7968 7.03834 14.7479 5.68981 14.2497C4.34128 13.7515 3.18993 12.8307 2.40747 11.6247C1.62501 10.4186 1.25336 8.99199 1.34795 7.55749C1.44254 6.12299 1.9983 4.7575 2.93235 3.66467C3.8664 2.57183 5.12869 1.81021 6.53096 1.49338C7.93323 1.17656 9.40034 1.32151 10.7135 1.90662"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.6667 2.66663L8 9.33996L6 7.33996"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const LineSVG = () => (
  <svg width="12" height="13" fill="currentColor" viewBox="0 0 12 3">
    <path
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1.5 1.5h9"
    />
  </svg>
)

const UserPlusSVG = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24">
    <path
      d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM20 8v6M23 11h-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const PlusSVG = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24">
    <path
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v8M8 12h8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Help = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 22 22">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.1232 7.01521c-.25038-.04227-.50704.00436-.72374.12971-.21636.12515-.37709.31938-.4578.5452-.18589.52007-.75817.79097-1.27823.60509-.52007-.18588-.79097-.75817-.60509-1.27823.2419-.67677.71794-1.24365 1.33973-1.60331.62145-.35946 1.35023-.49005 2.05803-.37056.708.11952 1.3533.48227 1.8202 1.02808.467.54606.7247 1.23977.7237 1.95861-.0005 1.2131-.9099 1.98-1.4806 2.3545-.202.1325-.4011.2423-.5777.3302V11c0 .5523-.4477 1-1.00002 1-.55229 0-1-.4477-1-1v-.9454c0-.43109.27625-.81353.68522-.94915m0 0l.00122-.0004.00131-.00044c.00026-.00008.00053-.00017.31225.94999m-.31478-.94915l.0076-.00262c.00855-.003.02372-.00841.04455-.01622.04183-.01568.10547-.04067.18348-.07479.15887-.0695.36297-.17062.55967-.29975.4584-.30074.5778-.54639.5778-.68325V8.0273c.0004-.23778-.0847-.47032-.2436-.65612-.1592-.18618-.383-.31373-.6332-.35597"
      fill="currentColor"
    />
    <circle cx="10" cy="14" r="1" fill="currentColor" />
  </svg>
)

const Search = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 22 22">
    <path
      d="M10.8227 19c4.4183 0 8-3.5817 8-8 0-4.41828-3.5817-8-8-8-4.41829 0-8.00001 3.58172-8.00001 8 0 4.4183 3.58172 8 8.00001 8zM20.8227 21l-4.35-4.35"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
const Bell = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 22 22">
    <path
      d="M17.2113 7.27086c0-1.39476-.6045-2.7324-1.6804-3.71864-1.0759-.98625-2.5351-1.54032-4.0567-1.54032-1.52154 0-2.98078.55407-4.05668 1.54032-1.07591.98624-1.68034 2.32388-1.68034 3.71864 0 6.13544-2.86853 7.88844-2.86853 7.88844H20.0798s-2.8685-1.753-2.8685-7.88844zM13.1282 18.6653c-.1681.2656-.4094.4861-.6997.6394s-.6195.234-.9545.234c-.335 0-.6642-.0807-.9545-.234-.2903-.1533-.53157-.3738-.69968-.6394"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const AlertCircle = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 32 32">
    <path
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.667"
      d="M16 2.667C8.636 2.667 2.667 8.637 2.667 16S8.637 29.333 16 29.333c7.364 0 13.333-5.97 13.333-13.333S23.363 2.667 16 2.667zM16 21.333V16M16 10.667h-.013"
    />
  </svg>
)
const EmptyCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      opacity="0.15"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
      fill="#A5B1BD"
    />
  </svg>
)
const PendingCircle = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24">
    <path
      opacity=".15"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
      fill="#A0AECF"
    />
    <path
      d="M12 5.333V8"
      stroke="#6F7C88"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity=".56"
      d="M12 16v2.667"
      stroke="#6F7C88"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity=".86"
      d="M7.287 7.287l1.886 1.886"
      stroke="#6F7C88"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity=".42"
      d="M14.827 14.827l1.887 1.886"
      stroke="#6F7C88"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity=".84"
      d="M5.333 12H8"
      stroke="#6F7C88"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity=".28"
      d="M16 12h2.667"
      stroke="#6F7C88"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity=".7"
      d="M7.287 16.713l1.886-1.886"
      stroke="#6F7C88"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity=".14"
      d="M14.827 9.173l1.887-1.886"
      stroke="#6F7C88"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Email = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 32 32">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="1.6"
      d="M5.333 5.333h21.333c1.467 0 2.667 1.2 2.667 2.667v16c0 1.467-1.2 2.667-2.667 2.667H5.333A2.675 2.675 0 0 1 2.666 24V8c0-1.467 1.2-2.667 2.667-2.667z"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="1.6"
      d="M29.333 8L16 17.333 2.667 8"
    />
  </svg>
)
const Phone = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 32 32">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="1.6"
      d="M29.333 22.56v4a2.666 2.666 0 0 1-2.905 2.667 26.398 26.398 0 0 1-11.507-4.093 25.988 25.988 0 0 1-8-8 26.382 26.382 0 0 1-4.093-11.56 2.657 2.657 0 0 1 .687-2.038 2.664 2.664 0 0 1 1.967-.868h4a2.67 2.67 0 0 1 2.667 2.294 17.16 17.16 0 0 0 .933 3.747 2.675 2.675 0 0 1-.6 2.814l-1.693 1.693a21.333 21.333 0 0 0 8 8l1.693-1.693a2.665 2.665 0 0 1 2.814-.6 17.16 17.16 0 0 0 3.747.933 2.67 2.67 0 0 1 2.293 2.707z"
    />
  </svg>
)
const SmartPhone = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 32 32">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="1.6"
      d="M22.666 2.667H9.333a2.667 2.667 0 0 0-2.667 2.667v21.333a2.667 2.667 0 0 0 2.667 2.667h13.333a2.667 2.667 0 0 0 2.667-2.667V5.334a2.667 2.667 0 0 0-2.667-2.667zM16 24h.013"
    />
  </svg>
)

const MenuClients = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 19 19">
    <g
      opacity=".3"
      clipPath="url(#clip0)"
      stroke="#000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.1667 17.5v-1.6667c0-.884-.3512-1.7319-.9763-2.357-.6251-.6251-1.473-.9763-2.357-.9763H4.16671c-.88406 0-1.7319.3512-2.35703.9763-.62512.6251-.976306 1.473-.976306 2.357V17.5M7.49996 9.16667c1.84095 0 3.33334-1.49239 3.33334-3.33334S9.34091 2.5 7.49996 2.5 4.16663 3.99238 4.16663 5.83333s1.49238 3.33334 3.33333 3.33334zM19.1666 17.5v-1.6667c-.0005-.7385-.2463-1.456-.6988-2.0397-.4525-.5837-1.0861-1.0006-1.8012-1.1853M13.3334 2.60834c.717.18358 1.3525.60058 1.8063 1.18526.4539.58467.7002 1.30376.7002 2.0439 0 .74015-.2463 1.45924-.7002 2.04391-.4538.58468-1.0893 1.00168-1.8063 1.18526" />
    </g>
    <defs>
      <clipPath id="clip0">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
)

const MenuPricing = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 19 19">
    <path
      d="M17.1583 11.175L11.1833 17.15C11.0285 17.305 10.8447 17.4279 10.6424 17.5118C10.44 17.5957 10.2232 17.6388 10.0041 17.6388C9.7851 17.6388 9.56822 17.5957 9.36589 17.5118C9.16356 17.4279 8.97975 17.305 8.82496 17.15L1.66663 10V1.66669H9.99996L17.1583 8.82502C17.4687 9.13729 17.6429 9.55971 17.6429 10C17.6429 10.4403 17.4687 10.8627 17.1583 11.175V11.175Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.83337 5.83331H5.84171"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const MenuCalendar = () => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    id="icon-menu-calendar"
    viewBox="0 0 32 32"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.667"
      d="M25.333 5.333H6.666A2.667 2.667 0 0 0 3.999 8v18.667a2.667 2.667 0 0 0 2.667 2.667h18.667A2.667 2.667 0 0 0 28 26.667V8a2.667 2.667 0 0 0-2.667-2.667zM21.333 2.667V8M10.667 2.667V8M4 13.333h24"
    />
  </svg>
)
const MenuAudit = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 32 32">
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="3.2"
      d="M12 14.667l4 4L29.333 5.334"
    />
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="3.2"
      d="M28 16v9.333A2.668 2.668 0 0 1 25.333 28H6.666a2.668 2.668 0 0 1-2.667-2.667V6.666a2.668 2.668 0 0 1 2.667-2.667h14.667"
    />
  </svg>
)
const MenuAutomation = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 32 32">
    <path
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="3.2"
      d="M24 5.333H8A2.667 2.667 0 0 0 5.333 8v16A2.667 2.667 0 0 0 8 26.667h16A2.667 2.667 0 0 0 26.667 24V8A2.667 2.667 0 0 0 24 5.333z"
    />
    <path
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="3.2"
      d="M20 12h-8v8h8v-8zM12 1.333v4M20 1.333v4M12 26.667v4M20 26.667v4M26.666 12h4M26.666 18.667h4M1.334 12h4M1.334 18.667h4"
    />
  </svg>
)
const MenuCrossair = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 32 32">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="3.2"
      d="M16 29.333c7.364 0 13.333-5.97 13.333-13.333S23.363 2.667 16 2.667C8.636 2.667 2.667 8.637 2.667 16S8.637 29.333 16 29.333zM29.333 16H24M8 16H2.667M16 8V2.667M16 29.333V24"
    />
  </svg>
)
const MenuHome = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 32 32">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="3.2"
      d="M4 12l12-9.333L28 12v14.667a2.67 2.67 0 0 1-2.667 2.667H6.666a2.668 2.668 0 0 1-2.667-2.667V12z"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="3.2"
      d="M12 29.333V16h8v13.333"
    />
  </svg>
)
const MenuUnder = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 32 32">
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="3.2"
      d="M29.333 16h-8l-2.667 4h-5.333l-2.667-4h-8"
    />
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="3.2"
      d="M7.266 6.813L2.666 16v8a2.668 2.668 0 0 0 2.667 2.667h21.333A2.668 2.668 0 0 0 29.333 24v-8l-4.6-9.187a2.673 2.673 0 0 0-2.387-1.48H9.653a2.67 2.67 0 0 0-2.387 1.48z"
    />
  </svg>
)
const MenuPermissions = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 32 32">
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="3.2"
      d="M25.333 14.667H6.666a2.667 2.667 0 0 0-2.667 2.667v9.333a2.667 2.667 0 0 0 2.667 2.667h18.667A2.667 2.667 0 0 0 28 26.667v-9.333a2.667 2.667 0 0 0-2.667-2.667zM9.334 14.667V9.334A6.67 6.67 0 0 1 20.715 4.62a6.67 6.67 0 0 1 1.953 4.714v5.333"
    />
  </svg>
)
const MenuAnalytics = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 32 32">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="3.2"
      d="M28.28 21.187a13.325 13.325 0 0 1-9.69 7.886 13.338 13.338 0 0 1-15.315-9.095A13.33 13.33 0 0 1 5.562 7.695a13.33 13.33 0 0 1 5.104-3.923"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="3.2"
      d="M29.333 16a13.33 13.33 0 0 0-8.231-12.318A13.337 13.337 0 0 0 16 2.667V16h13.333z"
    />
  </svg>
)
const MenuSettings = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 32 32">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.667"
      d="M16 20a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.667"
      d="M25.867 20a2.208 2.208 0 0 0 .44 2.427l.08.08a2.672 2.672 0 0 1 .782 1.886 2.672 2.672 0 0 1-1.647 2.465 2.672 2.672 0 0 1-2.907-.579l-.08-.08a2.197 2.197 0 0 0-2.427-.44 2.2 2.2 0 0 0-1.334 2.013v.227a2.67 2.67 0 0 1-2.667 2.667 2.67 2.67 0 0 1-2.667-2.667v-.12A2.196 2.196 0 0 0 12 25.866a2.208 2.208 0 0 0-2.427.44l-.08.08a2.666 2.666 0 0 1-4.352-.865 2.668 2.668 0 0 1 .579-2.907l.08-.08a2.197 2.197 0 0 0 .44-2.427 2.2 2.2 0 0 0-2.013-1.334H4a2.668 2.668 0 0 1 0-5.334h.12a2.196 2.196 0 0 0 2.013-1.44 2.2 2.2 0 0 0-.44-2.427l-.08-.08a2.666 2.666 0 0 1 .865-4.352 2.668 2.668 0 0 1 2.908.579l.08.08a2.197 2.197 0 0 0 2.427.44H12a2.2 2.2 0 0 0 1.334-2.013v-.227a2.668 2.668 0 0 1 5.334 0v.12a2.203 2.203 0 0 0 1.334 2.013 2.2 2.2 0 0 0 2.427-.44l.08-.08a2.672 2.672 0 0 1 1.886-.782 2.672 2.672 0 0 1 2.465 1.647 2.668 2.668 0 0 1-.579 2.908l-.08.08a2.197 2.197 0 0 0-.44 2.427v.107a2.2 2.2 0 0 0    2.013 1.334h.227A2.67 2.67 0 0 1 30.668 16a2.67 2.67 0 0 1-2.667 2.667h-.12a2.203 2.203 0 0 0-2.013 1.334z"
    />
  </svg>
)
const MenuOpportunitiesSVG = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 20 20">
    <g
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.667 10v8.333H3.333V10M18.333 5.833H1.667V10h16.666V5.833zM10 18.333v-12.5M10 5.833H6.25a2.083 2.083 0 1 1 0-4.166c2.917 0 3.75 4.166 3.75 4.166zM10 5.833h3.75a2.083 2.083 0 0 0 0-4.166c-2.917 0-3.75 4.166-3.75 4.166z" />
    </g>
  </svg>
)
const ArrowDown = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 32 32">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="4.571"
      d="M8 12l8 8 8-8"
    />
  </svg>
)
const ArrowRight = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 32 32">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.667"
      d="M12 24l8-8-8-8"
    />
  </svg>
)
const ArrowLeftSVG = () => (
  <svg width="8" height="14" fill="none">
    <path
      d="M7 13L1 7l6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ArrowUpFilled = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 10 8">
    <path d="M5 0L9.33013 7.5H0.669873L5 0Z" fill="currentColor" />
  </svg>
)

const ArrowDownFilled = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 10 8">
    <path d="M5 8L9.33.5H.67L5 8z" fill="currentColor" />
  </svg>
)

const City = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 32 32">
    <path
      fill="currentColor"
      d="M9.827 22.286l-.056.055c-.91.933-1.964 1.428-3.05 1.428-2.266 0-3.911-1.71-3.911-4.071 0-2.356 1.645-4.069 3.911-4.069 1.086 0 2.139.497 3.05 1.432l.056.057 1.457-1.773-.039-.048c-1.212-1.441-2.666-2.143-4.454-2.143-1.794 0-3.434.607-4.616 1.703C.891 16.043.213 17.717.213 19.698c0 1.98.678 3.657 1.962 4.844 1.182 1.101 2.822 1.705 4.616 1.705 1.788 0 3.242-.701 4.454-2.143l.039-.045-1.457-1.773zM12.757 26.006h2.575V13.36h-2.575v12.646zM25.417 23.256c-.687.421-1.326.632-1.9.632-.832 0-1.208-.442-1.208-1.426v-6.71h2.622v-2.381h-2.622V9.436l-2.523 1.359v2.576h-2.177v2.381h2.177v7.138c0 1.945 1.145 3.273 2.854 3.308 1.16.023 1.86-.325 2.285-.579l.025-.019.62-2.438-.152.094zM27.55 26.006h2.576V13.36H27.55v12.646z"
    />
    <path
      fill="currentColor"
      d="M31.668 11.116c-2.357-3.359-6.271-5.363-10.253-5.363-3.981 0-7.895 2.004-10.248 5.363l-.121.173h2.968l.033-.036c2.02-2.098 4.656-3.207 7.369-3.207s5.349 1.109 7.372 3.207l.033.036h2.967l-.119-.173z"
    />
  </svg>
)

const AlertTriangle = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
      fill="#F97A7A"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 6a1 1 0 00-1 1v6a1 1 0 102 0V7a1 1 0 00-1-1zm0 10a1 1 0 110 2 1 1 0 010-2z"
      fill="#FCFDFF"
    />
  </svg>
)

const AlertTriangleWhite = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M6.86001 2.57335L1.21335 12C1.09693 12.2016 1.03533 12.4302 1.03467 12.663C1.03402 12.8958 1.09434 13.1248 1.20963 13.327C1.32492 13.5293 1.49116 13.6978 1.69182 13.8159C1.89247 13.934 2.12055 13.9975 2.35335 14H13.6467C13.8795 13.9975 14.1076 13.934 14.3082 13.8159C14.5089 13.6978 14.6751 13.5293 14.7904 13.327C14.9057 13.1248 14.966 12.8958 14.9654 12.663C14.9647 12.4302 14.9031 12.2016 14.7867 12L9.14001 2.57335C9.02117 2.37742 8.85383 2.21543 8.65414 2.103C8.45446 1.99058 8.22917 1.93152 8.00001 1.93152C7.77086 1.93152 7.54557 1.99058 7.34588 2.103C7.1462 2.21543 6.97886 2.37742 6.86001 2.57335V2.57335Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 6V8.66667"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 11.3333H8.00667"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const DefaultAvatar = () => (
  <svg width="187" height="187" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="4"
      y="4"
      width="179"
      height="179"
      rx="89.5"
      fill="#F7F7F7"
      stroke="#fff"
      strokeWidth="8"
    />
    <g filter="url(#filter0_d)" clipPath="url(#clip0)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M147.969 160.496c-14.776 12.185-33.715 19.505-54.363 19.505-20.67 0-39.625-7.334-54.408-19.542l18.411-5.749c8.03-3.156 11.788-15.659 12.597-20.401-6.328-4.921-10.402-11.94-11.38-19.606 0-2.563-.809-3.613-1.24-3.816-1.102-.267-1.977-1.054-2.31-2.078a51.479 51.479 0 01-4.127-15.826c-.002-.295.037-.59.115-.876.552-2.113 1.873-3.978 3.735-5.27V67.642c.841-19.655 17.595-35.408 38.499-36.2 23.561 0 29.96 11.36 30.721 16.978 3.989 2.773 7.777 7.558 7.777 19.222v19.193c1.862 1.293 3.183 3.157 3.735 5.27.078.287.116.58.115.877a51.485 51.485 0 01-4.127 15.819c-.458 1.08-1.44 1.889-2.641 2.172a5.621 5.621 0 00-.931 3.728c-.973 7.644-5.024 14.647-11.319 19.57.816 4.749 4.597 17.26 12.859 20.496l18.282 5.728z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect x="8" y="8" width="171" height="172.379" rx="85.5" fill="#fff" />
      </clipPath>
      <filter
        id="filter0_d"
        x="7.198"
        y="3.444"
        width="172.771"
        height="212.557"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="16" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
)

const PhoneSVG = () => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_230_5555)">
        <path
          d="M30.8385 44.7678L30.8382 44.7677L30.8362 44.7757C30.6966 45.3339 30.8316 45.9065 31.1292 46.204C31.5448 46.6197 32.1244 46.7836 32.5775 46.4906L38.7788 44.3795C38.8561 44.4354 38.9496 44.4665 39.0251 44.4916L39.0349 44.4949C39.1211 44.5236 39.1866 44.5469 39.2332 44.5796V49.1H3.29987V13.3H39.3665V15.8071C34.1651 18.6311 30.6999 23.9824 30.6999 30.2667C30.6999 33.2035 31.4968 36.0068 32.9573 38.544L30.8385 44.7678ZM63.5665 30.2667C63.5665 21.1448 56.1884 13.7667 47.0665 13.7667C45.3706 13.7667 43.6739 14.0205 42.0999 14.5286V7.33333C42.0999 3.27811 38.7218 -0.1 34.6665 -0.1H7.86654C3.81131 -0.1 0.433203 3.27811 0.433203 7.33333V7.40519V7.47701V7.54878V7.62052V7.69223V7.7639V7.83553V7.90713V7.9787V8.05023V8.12173V8.19321V8.26465V8.33606V8.40744V8.4788V8.55013V8.62143V8.6927V8.76396V8.83518V8.90639V8.97757V9.04873V9.11987V9.191V9.2621V9.33318V9.40425V9.4753V9.54633V9.61735V9.68835V9.75935V9.83032V9.90129V9.97225V10.0432V10.1141V10.1851V10.256V10.3269V10.3978V10.4687V10.5396V10.6105V10.6814V10.7522V10.8231V10.894V10.9649V11.0358V11.1067V11.1775V11.2484V11.3193V11.3902V11.4611V11.532V11.603V11.6739V11.7448V11.8158V11.8867V11.9577V12.0287V12.0997V12.1707V12.2417V12.3127V12.3838V12.4548V12.5259V12.597V12.6681V12.7393V12.8104V12.8816V12.9528V13.024V13.0953V13.1666V13.2379V13.3092V13.3805V13.4519V13.5233V13.5948V13.6662V13.7377V13.8093V13.8808V13.9524V14.024V14.0957V14.1674V14.2392V14.3109V14.3827V14.4546V14.5265V14.5984V14.6704V14.7424V14.8145V14.8866V14.9587V15.0309V15.1031V15.1754V15.2478V15.3201V15.3926V15.465V15.5376V15.6101V15.6828V15.7555V15.8282V15.901V15.9738V16.0468V16.1197V16.1927V16.2658V16.339V16.4122V16.4854V16.5587V16.6321V16.7056V16.7791V16.8527V16.9263V17V17.0738V17.1476V17.2215V17.2955V17.3696V17.4437V17.5179V17.5922V17.6665V17.7409V17.8154V17.89V17.9647V18.0394V18.1142V18.1891V18.264V18.3391V18.4142V18.4894V18.5647V18.6401V18.7155V18.7911V18.8667V18.9424V19.0182V19.0941V19.1701V19.2462V19.3223V19.3986V19.475V19.5514V19.6279V19.7046V19.7813V19.8581V19.935V20.0121V20.0892V20.1664V20.2437V20.3212V20.3987V20.4763V20.554V20.6319V20.7098V20.7879V20.866V20.9443V21.0227V21.1011V21.1797V21.2584V21.3372V21.4162V21.4952V21.5744V21.6536V21.733V21.8125V21.8921V21.9719V22.0517V22.1317V22.2118V22.292V22.3723V22.4528V22.5334V22.6141V22.6949V22.7759V22.857V22.9382V23.0195V23.101V23.1826V23.2643V23.3462V23.4282V23.5103V23.5926V23.675V23.7575V23.8402V23.923V24.006V24.089V24.1723V24.2556V24.3391V24.4228V24.5066V24.5905V24.6746V24.7588V24.8432V24.9277V25.0124V25.0972V25.1821V25.2672V25.3525V25.4379V25.5235V25.6092V25.6951V25.7811V25.8673V25.9536V26.0401V26.1267V26.2135V26.3005V26.3876V26.4749V26.5624V26.65V26.7378V26.8257V26.9138V27.0021V27.0905V27.1791V27.2679V27.3569V27.446V27.5352V27.6247V27.7143V27.8041V27.8941V27.9842V28.0746V28.1651V28.2557V28.3466V28.4376V28.5288V28.6202V28.7118V28.8035V28.8955V28.9876V29.0799V29.1724V29.265V29.3579V29.4509V29.5442V29.6376V29.7312V29.825V29.919V30.0132V30.1076V30.2021V30.2969V30.3918V30.487V30.5823V30.6779V30.7736V30.8696V30.9657V31.0621V31.1586V31.2554V31.3523V31.4495V31.5468V31.6444V31.7422V31.8401V31.9383V32.0367V32.1353V32.2341V32.3332V32.4324V32.5318V32.6315V32.7314V32.8315V32.9318V33.0323V33.133V33.234V33.3352V33.4366V33.5382V33.64V33.7421V33.8444V33.9469V34.0496V34.1526V34.2557V34.3591V34.4628V34.5666V34.6707V34.7751V34.8796V34.9844V35.0894V35.1947V35.3001V35.4059V35.5118V35.618V35.7244V35.8311V35.938V36.0451V36.1525V36.2601V36.368V36.4761V36.5845V36.6931V36.8019V36.911V37.0203V37.1299V37.2397V37.3498V37.4601V37.5707V37.6815V37.7926V37.9039V38.0155V38.1274V38.2395V38.3518V38.4644V38.5773V38.6904V38.8038V38.9174V39.0313V39.1455V39.2599V39.3746V39.4896V39.6048V39.7203V39.836V39.9521V40.0684V40.1849V40.3017V40.4188V40.5362V40.6538V40.7717V40.8899V41.0084V41.1271V41.2461V41.3654V41.485V41.6048V41.7249V41.8453V41.966V42.087V42.2082V42.3298V42.4516V42.5737V42.6961V42.8187V42.9417V43.0649V43.1885V43.3123V43.4364V43.5608V43.6855V43.8105V43.9357V44.0613V44.1872V44.3133V44.4398V44.5666V44.6936V44.821V44.9486V45.0766V45.2048V45.3334V45.4623V45.5914V45.7209V45.8507V45.9807V46.1111V46.2418V46.3728V46.5041V46.6358V46.7677V46.8999V47.0325V47.1654V47.2985V47.432V47.5658V47.7V47.8344V47.9692V48.1043V48.2397V48.3754V48.5114V48.6478V48.7845V48.9215V49.0588V49.1965V49.3345V49.4728V49.6114V49.7504V49.8897V50.0293V50.1693V50.3096V50.4502V50.5911V50.7324V50.8741V51.016V51.1583V51.3009V51.4439V51.5872V51.7309V51.8748V52.0192V52.1638V52.3088V52.4542V52.5999V52.7459V52.8923V53.0391V53.1861V53.3336V53.4813V53.6295V53.778V53.9268V54.076V54.2255V54.3754V54.5256V54.6762V54.8272V54.9785V55.1302V55.2822V55.4346V55.5873V55.7404V55.8939V56.0477V56.2019V56.3565V56.5114V56.6667C0.433203 60.7219 3.81131 64.1 7.86654 64.1H34.9332C38.9884 64.1 42.3665 60.7219 42.3665 56.6667V45.8714C43.9406 46.3795 45.6372 46.6333 47.3332 46.6333C56.189 46.6333 63.5665 39.2547 63.5665 30.2667ZM3.29987 7.33333C3.29987 4.85335 5.25696 2.76667 7.86654 2.76667H34.9332C37.4113 2.76667 39.4999 4.85523 39.4999 7.33333V10.4333H3.29987V7.33333ZM39.3665 56.6667C39.3665 59.1448 37.278 61.2333 34.7999 61.2333H7.86654C5.38843 61.2333 3.29987 59.1448 3.29987 56.6667V51.9667H39.3665V56.6667ZM47.1999 43.7667C44.5538 43.7667 42.0391 42.973 39.9207 41.6493C39.4896 41.3624 39.0564 41.3646 38.6349 41.5051L34.4247 42.9086L35.8281 38.6983C35.9686 38.2766 35.9708 37.8431 35.6835 37.4118C34.2283 35.1627 33.5665 32.6487 33.5665 30.1333C33.5665 22.5886 39.6551 16.5 47.1999 16.5C54.7443 16.5 60.8327 22.5881 60.8332 30.1325C60.7003 37.6792 54.6101 43.7667 47.1999 43.7667Z"
          fill="#4BBFEC"
          stroke="#4BBFEC"
          strokeWidth="0.2"
        />
      </g>
      <defs>
        <clipPath id="clip0_230_5555">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

const CopySVG = (props: any) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
      <path
        style={{
          textIndent: 0,
          textTransform: 'none',
          direction: 'ltr',
          baselineShift: 'baseline',
          color: '#FFF',
        }}
        d="M13.688 5c-1.464.153-2.696 1.528-2.688 3v62c0 1.57 1.43 3 3 3h19v19c0 1.57 1.43 3 3 3h50c1.57 0 3-1.43 3-3V42a3.037 3.037 0 0 0-.875-2.125l-12-12A3.037 3.037 0 0 0 74 27h-7v-7a3.037 3.037 0 0 0-.875-2.125l-12-12A3.037 3.037 0 0 0 52 5H13.687zM17 11h31v10c0 1.57 1.43 3 3 3h10v3H35.687c-1.463.153-2.695 1.528-2.687 3v37H17zm37 3.25L57.75 18H54zM39 33h31v10c0 1.57 1.43 3 3 3h10v43H39zm37 3.25L79.75 40H76z"
        overflow="visible"
      />
    </svg>
  )
}

export const ExternalLinkIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={ExternalLinkSVG} {...props} />
}
export const ClockIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={ClockSVG} {...props} />
}
export const LockIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={LockSVG} {...props} />
}
export const DriversLicenceFrontIcon: React.FC<IconProps> = (
  props: IconProps
) => {
  return <Icon component={DriversLicenceFrontSVG} {...props} />
}
export const DriversLicenceBackIcon: React.FC<IconProps> = (
  props: IconProps
) => {
  return <Icon component={DriversLicenceBackSVG} {...props} />
}
export const PassportFrontIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={PassportFrontSVG} {...props} />
}
export const AlertTriangleIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={AlertTriangle} {...props} />
}
export const AlertTriangleIconWhite: React.FC<IconProps> = (
  props: IconProps
) => {
  return <Icon component={AlertTriangleWhite} {...props} />
}
export const PlaceHolderInstitutionIcon: React.FC<IconProps> = (
  props: IconProps
) => {
  return <Icon component={PlaceholderInstitutionSVG} {...props} />
}
export const ClientsIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={MenuClients} {...props} />
}
export const PricingIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={MenuPricing} {...props} />
}
export const CalendarIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={MenuCalendar} {...props} />
}
export const AuditIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={MenuAudit} {...props} />
}
export const AutomationIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={MenuAutomation} {...props} />
}
export const CrossairIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={MenuCrossair} {...props} />
}
export const HomeIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={MenuHome} {...props} />
}
export const UnderIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={MenuUnder} {...props} />
}
export const PermissionsIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={MenuPermissions} {...props} />
}
export const AnalyticsIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={MenuAnalytics} {...props} />
}
export const OpportunitiesIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={MenuOpportunitiesSVG} {...props} />
}
export const SettingsIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={MenuSettings} {...props} />
}
export const CityIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={City} {...props} />
}
export const AlertCircleIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={AlertCircle} {...props} />
}
export const EmptyCircleIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={EmptyCircle} {...props} />
}
export const PendingCircleIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={PendingCircle} {...props} />
}
export const ArrowDownIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={ArrowDown} {...props} />
}
export const ArrowRightIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={ArrowRight} {...props} />
}
export const ArrowLeftIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={ArrowLeftSVG} {...props} />
}
export const PhoneIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={Phone} {...props} />
}
export const EmailIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={Email} {...props} />
}
export const SmartPhoneIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={SmartPhone} {...props} />
}
export const BellIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={Bell} {...props} />
}
export const SearchIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={Search} {...props} />
}
export const HelpIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={Help} {...props} />
}
export const CheckCircleIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={CheckCircleSVG} {...props} />
}
export const CheckCircleWhiteIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={CheckCircleWhiteSVG} {...props} />
}
export const LineIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={LineSVG} {...props} />
}
export const UserPlusIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={UserPlusSVG} {...props} />
}
export const PlusIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={PlusSVG} {...props} />
}
export const ArrowUpFilledIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={ArrowUpFilled} {...props} />
}
export const ArrowDownFilledIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={ArrowDownFilled} {...props} />
}
export const DefaultAvatarIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={DefaultAvatar} {...props} />
}
export const MFAPhoneIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={PhoneSVG} {...props} />
}
export const CopyIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Icon component={CopySVG} {...props} />
}
