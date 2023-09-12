import mapboxgl, { GeoJSONSource } from 'mapbox-gl'
import { type Event } from '@/utils/mapbox-types.ts'
import GeoJSON from 'geojson'
import { reactive } from 'vue'

const SOURCE_ID = 'point-source'

const LAYER_ID = 'point-layer'

const GEO_JSON: GeoJSON.FeatureCollection<GeoJSON.Point> = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [0, 0],
            },
            properties: {},
        },
    ],
}

const addLayer = (map: mapboxgl.Map) => {
    // Add a single point to the map.
    map.addSource(SOURCE_ID, { type: 'geojson', data: GEO_JSON })

    map.addLayer({
        id: LAYER_ID,
        type: 'circle',
        source: SOURCE_ID,
        paint: {
            'circle-radius': 10,
            'circle-color': '#F84C4C', // red color
        },
    })
}

const useDraggablePoint = (map: mapboxgl.Map) => {
    const canvas = map.getCanvas()

    const lngLatReactive = reactive({ lng: 0, lat: 0 })

    const onMove = (e: Event<'mousemove' | 'touchmove'>) => {
        const coords = e.lngLat

        // Set a UI indicator for dragging.
        canvas.style.cursor = 'grabbing'

        // Update the Point feature in `geojson` coordinates
        // and call setData to the source layer `point` on it.
        GEO_JSON.features[0].geometry.coordinates = [coords.lng, coords.lat]
        ;(map.getSource(SOURCE_ID) as GeoJSONSource).setData(GEO_JSON)
    }

    const onUp = (e: Event<'mouseup'>) => {
        const { lng, lat } = e.lngLat
        lngLatReactive.lng = lng
        lngLatReactive.lat = lat
        // Print the coordinates of where the point had
        // finished being dragged to on the map.
        canvas.style.cursor = ''

        // Unbind mouse/touch events
        map.off('mousemove', onMove)
        map.off('touchmove', onMove)
    }

    map.on('load', () => {
        addLayer(map)
        map.on('mouseenter', LAYER_ID, () => {
            map.setPaintProperty(LAYER_ID, 'circle-color', '#3bb2d0')
            canvas.style.cursor = 'move'
        })
        map.on('mouseleave', LAYER_ID, () => {
            map.setPaintProperty(LAYER_ID, 'circle-color', '#3887be')
            canvas.style.cursor = ''
        })

        map.on('mousedown', LAYER_ID, (e) => {
            // Prevent the default map drag behavior.
            e.preventDefault()

            canvas.style.cursor = 'grab'

            map.on('mousemove', onMove)
            map.once('mouseup', onUp)
        })

        map.on('touchstart', LAYER_ID, (e) => {
            console.log('touchstart')
            if (e.points.length !== 1) return

            // Prevent the default map drag behavior.
            e.preventDefault()

            map.on('touchmove', onMove)
            map.once('touchend', onUp)
        })
    })

    return lngLatReactive
}

export { addLayer, useDraggablePoint }
