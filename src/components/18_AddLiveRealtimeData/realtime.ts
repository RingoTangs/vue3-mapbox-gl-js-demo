import { ref, watchEffect, onBeforeUnmount } from 'vue'
import { getLocation, GetLocationResponse } from './fetch'
import mapboxgl from 'mapbox-gl'

type LngLat = [number, number]
const useCoordinates = (map: mapboxgl.Map) => {
    const coordinatesRef = ref<LngLat>([0, 0])

    const setCoordinates = (resp: GetLocationResponse) => {
        coordinatesRef.value = resp.features[0].geometry.coordinates as LngLat
    }

    getLocation().then(setCoordinates)

    const stop = watchEffect(() => {
        // console.log(coordinatesRef.value)
        map.flyTo({
            center: coordinatesRef.value as [number, number],
            speed: 0.5,
            zoom: 5,
        })
    })

    onBeforeUnmount(() => stop())

    return { coordinatesRef, setCoordinates }
}

export { useCoordinates }
