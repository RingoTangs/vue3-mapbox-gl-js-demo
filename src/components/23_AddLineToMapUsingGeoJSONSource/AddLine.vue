<script setup lang="ts">
import { useMap } from '@/components/mapbox/context.ts'
import {
    addLineSource,
    addLineLayer,
    coordinates,
    geoJSON,
    LINE_SOURCE_ID,
} from './add-line.ts'
import { GeoJSONSource } from 'mapbox-gl'

const map = useMap()
map.on('load', () => {
    addLineSource(map)
    addLineLayer(map)

    const source = <GeoJSONSource>map.getSource(LINE_SOURCE_ID)
    coordinates.forEach((d) => geoJSON.geometry.coordinates.push(d))
    source.setData(geoJSON)
})
</script>

<template>
    <p></p>
</template>
