import mapboxgl from 'mapbox-gl'
import { NavigationControl, FullscreenControl, LngLatLike } from 'mapbox-gl'
import { MaybeRef, toRef, unref, watchEffect } from 'vue'

// 设置 mapboxgl 全局 access token
const ACCESS_TOKEN =
    'pk.eyJ1Ijoic2luZ3JhaW55YW5nODA4NiIsImEiOiJjbGxvcG9xNHgwYmRjM3Fwb2Q3eHF3cmJvIn0.W_onlq_G0GGN4Wcf_SZCzg'
mapboxgl.accessToken = ACCESS_TOKEN

// 定义 Mapbox 组件传入的属性
type MapboxOptions = Omit<mapboxgl.MapboxOptions, 'container'>
type ControlPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
type NavigationControlOptions =
    | {
          showCompass?: boolean
          showZoom?: boolean
          visualizePitch?: boolean
          position?: ControlPosition
      }
    | boolean
type FullScreenControlOptions = { position: ControlPosition } | boolean

/**
 * Mapbox 组件的属性
 */
type Props = {
    options?: MapboxOptions

    zoom?: number // zoom 优先级高于 options.zoom
    center?: LngLatLike // center 优先级高于 options.center
    initFog?: boolean
    navCtr?: NavigationControlOptions
    fullScreenCtr?: FullScreenControlOptions
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
    maybeReffedOptions: MaybeRef<FullScreenControlOptions>
) => {
    let fullscreenControl: FullscreenControl = null
    const removeControl = () =>
        fullscreenControl && map.removeControl(fullscreenControl)

    watchEffect(() => {
        const options = unref(maybeReffedOptions)
        removeControl()
        if (options !== false) {
            fullscreenControl = new FullscreenControl()
            if (options === true) {
                map.addControl(fullscreenControl)
            } else if (typeof options === 'object') {
                map.addControl(fullscreenControl, options.position)
            }
        }
    })
}

const addNavigationControl = (
    map: mapboxgl.Map,
    options: MaybeRef<NavigationControlOptions>
) => {
    let navigationControl: NavigationControl = null
    const removeControl = () =>
        navigationControl && map.removeControl(navigationControl)

    watchEffect(() => {
        const opts = unref(options)
        removeControl()
        if (opts === true) {
            navigationControl = new NavigationControl()
            map.addControl(navigationControl)
        } else if (typeof opts === 'object') {
            navigationControl = new NavigationControl(opts)
            map.addControl(navigationControl, opts.position)
        }
    })
}

const adjustCenter = (
    map: mapboxgl.Map,
    maybeReffedCenter: MaybeRef<LngLatLike>
) => {
    watchEffect(() => {
        const center = unref(maybeReffedCenter)
        if (!center) return
        map.setCenter(center)
    })
}

const adjustZoom = (map: mapboxgl.Map, maybeReffedZoom: MaybeRef<number>) => {
    watchEffect(() => {
        let zoom = unref(maybeReffedZoom)
        if (zoom) {
            const maxZoom = map.getMaxZoom()
            const minZoom = map.getMinZoom()
            if (zoom < minZoom) zoom = minZoom
            if (zoom > maxZoom) zoom = maxZoom
            // console.log('maxZoom: ', maxZoom, '---', 'minZoom: ', minZoom)
            watchEffect(() => map.setZoom(zoom))
        }
    })
}

const adjustFog = (
    map: mapboxgl.Map,
    maybeReffedInitFog: MaybeRef<boolean>
) => {
    const mapboxFog = map.getFog()
    watchEffect(() =>
        map.setFog(unref(maybeReffedInitFog) ? defaultFog : mapboxFog)
    )
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

    adjustCenter(map, toRef(props, 'center'))
    adjustZoom(map, toRef(props, 'zoom'))

    addNavigationControl(map, toRef(props, 'navCtr'))
    addFullScreenControl(map, toRef(props, 'fullScreenCtr'))

    map.on('style.load', () => adjustFog(map, toRef(props, 'initFog')))

    return { map, container }
}

export {
    type Props,
    type NavigationControlOptions,
    type FullScreenControlOptions,
    useMapboxInit,
}
