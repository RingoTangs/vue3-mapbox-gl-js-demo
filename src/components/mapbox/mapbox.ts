import mapboxgl from 'mapbox-gl'
import { NavigationControl, FullscreenControl } from 'mapbox-gl'

// 设置 mapboxgl 全局 access token
const ACCESS_TOKEN =
    'pk.eyJ1Ijoic2luZ3JhaW55YW5nODA4NiIsImEiOiJjbGxvcG9xNHgwYmRjM3Fwb2Q3eHF3cmJvIn0.W_onlq_G0GGN4Wcf_SZCzg'
mapboxgl.accessToken = ACCESS_TOKEN

// 定义 Mapbox 组件传入的属性
type MapboxOptions = Omit<mapboxgl.MapboxOptions, 'container'>
type ControlPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
type NavigationControlOptions = {
    showCompass?: boolean
    showZoom?: boolean
    visualizePitch?: boolean
    position?: ControlPosition
}
type FullScreenControlOptions = { position: ControlPosition }

/**
 * Mapbox 组件的属性
 */
type Props = {
    options?: MapboxOptions

    /**
     * zoom 优先级高于 options.zoom
     */
    zoom?: number
    initFog?: boolean
    navCtr?: boolean | NavigationControlOptions
    fullScreenCtr?: boolean | FullScreenControlOptions
}

const defaultOption: MapboxOptions = {
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 1, // starting zoom
}

const defaultFog: mapboxgl.Fog = {
    color: 'rgb(186, 210, 235)', // Lower atmosphere
    'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
    'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
    'space-color': 'rgb(11, 11, 25)', // Background color
    'star-intensity': 0.6, // Background star brightness (default 0.35 at low zoooms )
}

const addFullScreenControl = (
    map: mapboxgl.Map,
    options: boolean | FullScreenControlOptions
) => {
    options &&
        typeof options === 'boolean' &&
        map.addControl(new FullscreenControl())
    options &&
        typeof options === 'object' &&
        map.addControl(new FullscreenControl(), options.position)
}

const addNavigationControl = (
    map: mapboxgl.Map,
    options: boolean | NavigationControlOptions
) => {
    options &&
        typeof options === 'boolean' &&
        map.addControl(new NavigationControl())
    options &&
        typeof options === 'object' &&
        map.addControl(new NavigationControl(options), options.position)
}

const adjustZoom = (map: mapboxgl.Map, zoom: number) => {
    if (!zoom) return
    const maxZoom = map.getMaxZoom()
    const minZoom = map.getMinZoom()
    if (zoom < minZoom) zoom = minZoom
    if (zoom > maxZoom) zoom = maxZoom
    // console.log('maxZoom: ', maxZoom, '---', 'minZoom: ', minZoom)
    map.setZoom(zoom)
}

// 初始化 map 实例
const useMapboxInit = (props: Props) => {
    const container = document.createElement('div')
    container.classList.add('mapbox-container')
    container.style.width = '100%'
    container.style.height = '100%'

    const map = new mapboxgl.Map(
        props.options
            ? { container, ...props.options }
            : { container, ...defaultOption }
    )

    adjustZoom(map, props.zoom)

    if (props.initFog) {
        map.on('styledata', () => map.setFog(defaultFog))
    }

    addNavigationControl(map, props.navCtr)
    addFullScreenControl(map, props.fullScreenCtr)

    return { map, container }
}

export { type Props, useMapboxInit }
