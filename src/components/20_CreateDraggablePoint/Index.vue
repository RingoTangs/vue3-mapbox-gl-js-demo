<script setup lang="ts">
import Mapbox from '@/components/mapbox/Mapbox.vue'
import DraggablePoint from './DraggablePoint.vue'

const options = {
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [0, 0],
    zoom: 2,
}
</script>

<template>
    <Mapbox
        class="mapbox"
        :options="options"
        @map-created="onMapCreated"
        init-fog
        nav-ctr
        full-screen-ctr
    >
        <DraggablePoint />
    </Mapbox>
</template>

<style scoped>
.mapbox {
    position: relative;
}
</style>
