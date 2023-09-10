import mapboxgl from 'mapbox-gl'
import { ref } from 'vue'

function useDragMarker(map: mapboxgl.Map) {
    const center = map.getCenter()
    const longitudeRef = ref(center.lng)
    const latitudeRef = ref(center.lat)

    const marker = new mapboxgl.Marker({ draggable: true })
        .setLngLat([center.lng, center.lat])
        .addTo(map)

    const el = marker.getElement()
    el.style.cursor = 'move'

    marker.on('dragend', () => {
        const { lng, lat } = marker.getLngLat()
        longitudeRef.value = lng
        latitudeRef.value = lat
    })

    return { longitudeRef, latitudeRef, marker }
}

export { useDragMarker }
