import mapboxgl, {
    FullscreenControl,
    LngLatLike,
    NavigationControl,
} from 'mapbox-gl'
import { MaybeRef, unref, watchEffect } from 'vue'
import { FullScreenControlOptions, NavigationControlOptions } from './types.ts'

/**
 * 添加 Full Screen Control（响应式）
 */
export const addFullScreenControl = (
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

/**
 * 添加 Navigation Control（响应式）
 */
export const addNavigationControl = (
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

/**
 * 调整 map center 属性（响应式）
 */
export const adjustCenter = (
    map: mapboxgl.Map,
    maybeReffedCenter: MaybeRef<LngLatLike>
) => {
    watchEffect(() => {
        const center = unref(maybeReffedCenter)
        if (!center) return
        map.setCenter(center)
    })
}

/**
 * 调整 map zoom 属性（响应式）
 */
export const adjustZoom = (
    map: mapboxgl.Map,
    maybeReffedZoom: MaybeRef<number>
) => {
    watchEffect(() => {
        let zoom = unref(maybeReffedZoom)
        if (zoom) {
            const maxZoom = map.getMaxZoom()
            const minZoom = map.getMinZoom()
            if (zoom < minZoom) zoom = minZoom
            if (zoom > maxZoom) zoom = maxZoom
            map.zoomTo(zoom, undefined, { zoomedType: 'external' })
        }
    })

    map.on('zoomend', (e) => {
        if (e.zoomedType === 'external') return
        map.properties.vc.$emit('update:zoom', map.getZoom())
    })
}

/**
 * 调整 map fog 属性（响应式）
 */
export const adjustFog = (
    map: mapboxgl.Map,
    maybeReffedInitFog: MaybeRef<boolean>
) => {
    const defaultFog: mapboxgl.Fog = {
        color: 'rgb(186, 210, 235)', // Lower atmosphere
        'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
        'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
        'space-color': 'rgb(11, 11, 25)', // Background color
        'star-intensity': 0.6, // Background star brightness (default 0.35 at low zoooms )
    }

    const mapboxFog = map.getFog()
    watchEffect(() =>
        map.setFog(unref(maybeReffedInitFog) ? defaultFog : mapboxFog)
    )
}

/**
 * 设置 Bearing 属性（地图的初始方位）
 */
export const adjustBearing = (
    map: mapboxgl.Map,
    maybeReffedBearing: MaybeRef<number>
) => {
    console.log('maybeReffedBearing:', maybeReffedBearing)
    watchEffect(() => {
        const bearing = unref(maybeReffedBearing)
        if (bearing) {
            map.setBearing(bearing)
        }
    })
}
