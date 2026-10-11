import type { DetailedHTMLProps, HTMLAttributes } from 'react'

/**
 * model-viewer 是 Web Component，TS 内置的 JSX 类型库里没有它。
 * 运行时由 public/model-viewer.min.js 注册，这里只补类型。
 * React 18+ 的 JSX 命名空间挂在 React 上，所以要声明在 React.JSX 下。
 * 属性含义见 https://modelviewer.dev/docs/
 */
type ModelViewerProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string
  alt?: string
  'camera-controls'?: string
  'auto-rotate'?: string
  'rotation-per-second'?: string
  'camera-orbit'?: string
  'shadow-intensity'?: string
  'shadow-softness'?: string
  exposure?: string
  'environment-image'?: string
  'interaction-prompt'?: string
  'interaction-prompt-style'?: string
  'touch-action'?: string
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerProps
    }
  }
}

export {}