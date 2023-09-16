import mapboxgl from 'mapbox-gl'
import type { EventData, MapEventType } from 'mapbox-gl'
import { onBeforeUnmount, reactive } from 'vue'

export const useMousemove = (map: mapboxgl.Map) => {
    const lngLatReactive = reactive({
        lng: 0,
        lat: 0,
    })

    const listener = (e: MapEventType['mousemove'] & EventData) => {
        const lngLat = e.lngLat
        lngLatReactive.lat = lngLat.lat
        lngLatReactive.lng = lngLat.lng
    }

    map.on('mousemove', listener)

    onBeforeUnmount(() => map.off('mousemove', listener))

    return { lngLatReactive }
}
