import type { ReactElement } from 'react'

/**
 * 手绘 SVG 动物插画。
 *
 * 全部使用 design-spec.md 的低饱和色板，不引入外部图片、不消耗任何请求。
 * 几何上尽量只用圆和椭圆，保持「简约可爱」而不是「卡通」。
 * 深色只出现在眼睛和鼻子（#3D4A57），面积极小——符合规范里「深色只给文字」的精神。
 */

export type AnimalName = 'octopus' | 'cat' | 'rabbit' | 'bear' | 'penguin' | 'fox'

type AnimalProps = {
  size?: number
  className?: string
}

const EYE = '#3D4A57'

function Svg({ size, className, children }: AnimalProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size ?? 48}
      height={size ?? 48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

/** 章鱼 —— 服务端与网络（多条腿 = 并发） */
export function Octopus(props: AnimalProps): ReactElement {
  return (
    <Svg {...props}>
      <g stroke="#A8C6E0" strokeWidth="3.2" strokeLinecap="round">
        <path d="M16.8 29c-1.3 3.8-3.1 5.6-4.4 8.8" />
        <path d="M21.4 30.6c-.9 3.9-1.5 6-2.1 8.9" />
        <path d="M26.6 30.6c.9 3.9 1.5 6 2.1 8.9" />
        <path d="M31.2 29c1.3 3.8 3.1 5.6 4.4 8.8" />
      </g>
      <ellipse cx="24" cy="20" rx="13.5" ry="12.5" fill="#CFE0F2" />
      <ellipse cx="19" cy="20.5" rx="1.7" ry="1.9" fill={EYE} />
      <ellipse cx="29" cy="20.5" rx="1.7" ry="1.9" fill={EYE} />
      <ellipse cx="14.2" cy="24.5" rx="2.4" ry="1.5" fill="#EFA8B2" opacity="0.55" />
      <ellipse cx="33.8" cy="24.5" rx="2.4" ry="1.5" fill="#EFA8B2" opacity="0.55" />
    </Svg>
  )
}

/** 猫 —— 桌面客户端 */
export function Cat(props: AnimalProps): ReactElement {
  return (
    <Svg {...props}>
      <path d="M13.6 16.8 11.6 6.2 21.2 13.4Z" fill="#C9B8E0" />
      <path d="M34.4 16.8 36.4 6.2 26.8 13.4Z" fill="#C9B8E0" />
      <circle cx="24" cy="27" r="13" fill="#E2D9F0" />
      <g stroke="#BCA9D6" strokeWidth="1" strokeLinecap="round">
        <path d="M6.5 26h5.5" />
        <path d="M7 30h5" />
        <path d="M41.5 26h-5.5" />
        <path d="M41 30h-5" />
      </g>
      <ellipse cx="19" cy="26.5" rx="1.7" ry="1.9" fill={EYE} />
      <ellipse cx="29" cy="26.5" rx="1.7" ry="1.9" fill={EYE} />
      <path d="M24 30.6 22.3 32.4h3.4Z" fill="#EFA8B2" />
    </Svg>
  )
}

/** 兔子 —— 系统与性能 */
export function Rabbit(props: AnimalProps): ReactElement {
  return (
    <Svg {...props}>
      <ellipse cx="18.2" cy="13.5" rx="3.3" ry="9" fill="#C3DCC9" transform="rotate(-10 18.2 13.5)" />
      <ellipse cx="29.8" cy="13.5" rx="3.3" ry="9" fill="#C3DCC9" transform="rotate(10 29.8 13.5)" />
      <ellipse cx="18.2" cy="14" rx="1.4" ry="5.4" fill="#EFA8B2" opacity="0.6" transform="rotate(-10 18.2 14)" />
      <ellipse cx="29.8" cy="14" rx="1.4" ry="5.4" fill="#EFA8B2" opacity="0.6" transform="rotate(10 29.8 14)" />
      <circle cx="24" cy="29" r="12" fill="#D6EDE6" />
      <ellipse cx="19.5" cy="28" rx="1.7" ry="1.9" fill={EYE} />
      <ellipse cx="28.5" cy="28" rx="1.7" ry="1.9" fill={EYE} />
      <path d="M24 32.4 22.6 34h2.8Z" fill="#EFA8B2" />
    </Svg>
  )
}

/** 小熊 —— 技术笔记 */
export function Bear(props: AnimalProps): ReactElement {
  return (
    <Svg {...props}>
      <circle cx="13.8" cy="16.5" r="5.6" fill="#E8D6BE" />
      <circle cx="34.2" cy="16.5" r="5.6" fill="#E8D6BE" />
      <circle cx="24" cy="28" r="13" fill="#F5EBD8" />
      <ellipse cx="24" cy="33" rx="6.6" ry="5" fill="#FCF5E9" />
      <ellipse cx="19" cy="26.5" rx="1.7" ry="1.9" fill={EYE} />
      <ellipse cx="29" cy="26.5" rx="1.7" ry="1.9" fill={EYE} />
      <ellipse cx="24" cy="31.8" rx="2.1" ry="1.5" fill={EYE} opacity="0.85" />
    </Svg>
  )
}

/** 企鹅 —— 联系 */
export function Penguin(props: AnimalProps): ReactElement {
  return (
    <Svg {...props}>
      <ellipse cx="11.4" cy="28" rx="2.9" ry="8" fill="#A5BACD" />
      <ellipse cx="36.6" cy="28" rx="2.9" ry="8" fill="#A5BACD" />
      <ellipse cx="24" cy="27.5" rx="13" ry="16" fill="#B9CBD9" />
      <ellipse cx="24" cy="30.5" rx="8" ry="11" fill="#FFFFFF" />
      <ellipse cx="19.5" cy="23.5" rx="1.7" ry="1.9" fill={EYE} />
      <ellipse cx="28.5" cy="23.5" rx="1.7" ry="1.9" fill={EYE} />
      <path d="M24 26.8 21.5 29.6h5Z" fill="#E8B4A0" />
      <ellipse cx="19" cy="43" rx="4.2" ry="2.2" fill="#E8B4A0" />
      <ellipse cx="29" cy="43" rx="4.2" ry="2.2" fill="#E8B4A0" />
    </Svg>
  )
}

/** 狐狸 —— 404 */
export function Fox(props: AnimalProps): ReactElement {
  return (
    <Svg {...props}>
      <path d="M11.4 15.6 13.2 7.4 20.2 14.2Z" fill="#EFC49F" />
      <path d="M36.6 15.6 34.8 7.4 27.8 14.2Z" fill="#EFC49F" />
      <path d="M11.4 15.6 13.8 11.6 17.4 15.4Z" fill="#E4B48C" />
      <path d="M36.6 15.6 34.2 11.6 30.6 15.4Z" fill="#E4B48C" />
      <circle cx="24" cy="27" r="13" fill="#EFC49F" />
      <path d="M24 39.5c-4.6 0-8.4-2.4-10.2-5 2.8 1.8 6.3 2.7 10.2 2.7s7.4-.9 10.2-2.7c-1.8 2.6-5.6 5-10.2 5Z" fill="#FFFDF8" />
      <ellipse cx="19" cy="25.5" rx="1.7" ry="1.9" fill={EYE} />
      <ellipse cx="29" cy="25.5" rx="1.7" ry="1.9" fill={EYE} />
      <ellipse cx="24" cy="31.6" rx="2.2" ry="1.6" fill={EYE} />
    </Svg>
  )
}

export const ANIMALS: Record<AnimalName, (props: AnimalProps) => ReactElement> = {
  octopus: Octopus,
  cat: Cat,
  rabbit: Rabbit,
  bear: Bear,
  penguin: Penguin,
  fox: Fox,
}
