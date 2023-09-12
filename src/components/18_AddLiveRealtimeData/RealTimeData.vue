<script setup lang="ts">
import { useMap } from '@/components/mapbox/context.ts'
import { useCoordinates } from './realtime.ts'
import { getLocation } from '@/components/18_AddLiveRealtimeData/fetch.ts'
import { GeoJSONSource } from 'mapbox-gl'
import { onBeforeUnmount } from 'vue'

const map = useMap()
const { setCoordinates } = useCoordinates(map)

let timeId = null

onBeforeUnmount(() => {
    clearInterval(timeId)
    map.removeLayer('iss').removeSource('iss')
})

console.log(1111)

const fn = () => {
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

    timeId = setInterval(async () => {
        const geoJson = await getLocation()
        ;(map.getSource('iss') as GeoJSONSource).setData(geoJson)
        setCoordinates(geoJson)
    }, 2000)
}

if (map.isStyleLoaded()) {
    fn()
} else {
    map.on('style.load', fn)
}
</script>
