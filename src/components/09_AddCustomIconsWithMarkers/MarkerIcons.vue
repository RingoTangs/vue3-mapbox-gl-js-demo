<script setup lang="ts">
import { Marker } from 'mapbox-gl'
import { useMap } from '@/components/mapbox/context.ts'
import { geoJson } from './geo-data.ts'
import { createIcon } from './icon-render.ts'

const map = useMap()

for (const feature of geoJson.features) {
    const el = document.createElement('div')
    const width = feature.properties.iconSize[0]
    const height = feature.properties.iconSize[1]
    createIcon(el, {
        width,
        height,
        onClick: () => alert(feature.properties.message),
    })
    new Marker(el).setLngLat(feature.geometry.coordinates).addTo(map)
}
</script>
