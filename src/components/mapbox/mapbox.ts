import { mapboxgl } from './config.ts'
import { type LngLatLike } from 'mapbox-gl'
import { toRef, type ComponentInternalInstance } from 'vue'
import type {
    Options,
    NavigationControlOptions,
    FullScreenControlOptions,
} from './types.ts'
import { MAPBOX_CONTEXT_HOLDER } from './context.ts'
import {
    adjustZoom,
    adjustFog,
    adjustCenter,
    addFullScreenControl,
    addNavigationControl,
    adjustBearing,
} from './actions.ts'

/**
 * Mapbox 组件传入的 Props
 */
export type Props = {
    id?: string // Mapbox 实例ID 全局唯一
    options?: Options

    zoom?: number // zoom 优先级高于 options.zoom
    center?: LngLatLike // center 优先级高于 options.center
    bearing?: number // bearing 优先级高于 options.bearing
    initFog?: boolean
    navCtr?: NavigationControlOptions
    fullScreenCtr?: FullScreenControlOptions
}

const defaultOption: Options = {
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 1, // starting zoom
}

/**
 * 在 Vue 组件中初始化 Map 实例
 */
export const useMapboxInit = (
    props: Props,
    currentInstance: ComponentInternalInstance
) => {
    const container = document.createElement('div')
    container.classList.add('mapbox-container')
    container.style.width = '100%'
    container.style.height = '100%'

    const map = new mapboxgl.Map(
        props.options
            ? { container, ...props.options }
            : { container, ...defaultOption }
    )

    // 初始化 map.properties 属性
    // 将 Mapbox 组件实例添加到 map.properties 中
    // console.log(currentInstance)
    const { proxy } = currentInstance
    map.properties = { vc: proxy }

    adjustCenter(map, toRef(props, 'center'))
    adjustZoom(map, toRef(props, 'zoom'))

    addNavigationControl(map, toRef(props, 'navCtr'))
    addFullScreenControl(map, toRef(props, 'fullScreenCtr'))

    adjustBearing(map, toRef(props, 'bearing'))

    map.on('style.load', () => adjustFog(map, toRef(props, 'initFog')))

    if (props.id) {
        MAPBOX_CONTEXT_HOLDER.setMap(props.id, map)
    }

    return { map, container }
}
