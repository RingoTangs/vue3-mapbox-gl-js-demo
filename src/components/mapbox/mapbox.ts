import { mapboxgl } from './config.ts'
import { type LngLatLike } from 'mapbox-gl'
import { toRef } from 'vue'
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
} from './actions.ts'

/**
 * Mapbox 组件传入的 Props
 */
export type Props = {
    id?: string // Mapbox 实例ID 全局唯一
    options?: Options

    zoom?: number // zoom 优先级高于 options.zoom
    center?: LngLatLike // center 优先级高于 options.center
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
export const useMapboxInit = (props: Props) => {
    const container = document.createElement('div')
    container.classList.add('mapbox-container')
    container.style.width = '100%'
    container.style.height = '100%'

    const map = new mapboxgl.Map(
        props.options
            ? { container, ...props.options }
            : { container, ...defaultOption }
    )

    map.properties = {}

    adjustCenter(map, toRef(props, 'center'))
    adjustZoom(map, toRef(props, 'zoom'))

    addNavigationControl(map, toRef(props, 'navCtr'))
    addFullScreenControl(map, toRef(props, 'fullScreenCtr'))

    map.on('style.load', () => adjustFog(map, toRef(props, 'initFog')))

    if (props.id) {
        MAPBOX_CONTEXT_HOLDER.setMap(props.id, map)
    }

    return { map, container }
}
