<script setup lang="ts">
import { mapInit } from '@/mapbox'
import { ref, onMounted } from 'vue'

const mapbox = ref<HTMLDivElement>()

onMounted(() => mapInit(mapbox.value!))
</script>

<template>
    <div ref="mapbox" class="map" id="map"></div>
</template>

<style scoped>
.map {
    width: 100%;
    height: 100%;
}
</style>
