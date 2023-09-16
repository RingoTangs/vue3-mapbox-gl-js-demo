import { MapboxOptions } from 'mapbox-gl'

/**
 * 创建 Mapbox 组件时传入的 Options
 */
export type Options = Omit<MapboxOptions, 'container'>

/**
 * Control 的位置
 */
export type ControlPosition =
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'

/**
 * Navigation Control 选项。
 * true/false 表示是否显示控件。传入对象表示一定显示控件，在此基础上做额外的配置。
 */
export type NavigationControlOptions =
    | {
          showCompass?: boolean
          showZoom?: boolean
          visualizePitch?: boolean
          position?: ControlPosition
      }
    | boolean

/**
 * Full Screen Control 选项。
 * true/false 表示是否显示控件。传入对象表示一定显示控件，在此基础上做额外的配置。
 */
export type FullScreenControlOptions = { position: ControlPosition } | boolean
