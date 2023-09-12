<script setup lang="ts">
import { useMap } from '@/components/mapbox/context.ts'
import { useCoordinates } from './realtime.ts'
import { getLocation } from '@/components/18_AddLiveRealtimeData/fetch.ts'
import { GeoJSONSource } from 'mapbox-gl'

const map = useMap()
const { setCoordinates } = useCoordinates(map)
map.on('style.load', () => {
    map.addSource('iss', { type: 'geojson' })
    // Add the rocket symbol layer to the map.
    map.addLayer({
        id: 'iss',
        type: 'symbol',
        source: 'iss',
        layout: {
            // This icon is a part of the Mapbox Streets style.
            // To view all images available in a Mapbox style, open
            // the style in Mapbox Studio and click the "Images" tab.
            // To add a new image to the style at runtime see
            // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
            'icon-image': 'rocket',
        },
    })

    setInterval(async () => {
        const geoJson = await getLocation()
        ;(map.getSource('iss') as GeoJSONSource).setData(geoJson)
        setCoordinates(geoJson)
    }, 2000)
})
</script>
