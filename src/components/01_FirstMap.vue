<script setup lang="ts">
import { mapboxgl } from '@/mapbox'
import { ref, onMounted } from 'vue'

const mapbox = ref<HTMLDivElement>()

onMounted(() => {
    new mapboxgl.Map({
        container: mapbox.value!,
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 8, // starting zoom
    })
})
</script>

<template>
    <div ref="mapbox" class="map"></div>
</template>

<style scoped>
.map {
    width: 100%;
    height: 100%;
}
</style>
