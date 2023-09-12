<script setup lang="ts">
import Mapbox from '@/components/mapbox/Mapbox.vue'
import mapboxgl from 'mapbox-gl'

const options = {
    // The Mapbox Light style doesn't contain hillshading.
    // You could also add it in Mapbox Studio.
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-119.55, 37.71],
    zoom: 9,
}

const onMapCreated = (map: mapboxgl.Map) => {
    map.on('load', () => {
        map.addSource('dem', {
            type: 'raster-dem',
            url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        })
        map.addLayer(
            {
                id: 'hillshading',
                source: 'dem',
                type: 'hillshade',
            },
            // Insert below land-structure-polygon layer,
            // where hillshading sits in the Mapbox Streets style.
            'land-structure-polygon'
        )
    })
}
</script>

<template>
    <Mapbox
        :options="options"
        init-fog
        nav-ctr
        full-screen-ctr
        @map-created="onMapCreated"
    />
</template>
