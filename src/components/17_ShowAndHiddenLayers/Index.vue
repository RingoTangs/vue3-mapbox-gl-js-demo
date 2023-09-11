<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMapbox } from '@/mapbox'
import Menu from './Menu.vue'

defineOptions({ name: 'ShowAndHiddenLayers' })

const { map, container } = useMapbox(false)
const mapboxContainerWrapperRef = ref<HTMLDivElement>()

// map init
map.setZoom(5)
map.setStyle('mapbox://styles/mapbox/streets-v12')
map.setCenter([-71.97722138410576, -13.517379300798098])

// Map mounted
onMounted(() => {
    const firstChild = mapboxContainerWrapperRef.value.firstChild
    mapboxContainerWrapperRef.value?.insertBefore(container, firstChild)
    map.resize()
})

map.on('load', () => {
    map.addSource('museums', {
        type: 'vector',
        url: 'mapbox://mapbox.2opop9hr',
    })
    map.addLayer({
        id: 'museums',
        type: 'circle',
        source: 'museums',
        layout: {
            // Make the layer visible by default.
            visibility: 'visible',
        },
        paint: {
            'circle-radius': 8,
            'circle-color': 'rgba(55,148,179,1)',
        },
        'source-layer': 'museum-cusco',
    })
    map.addSource('contours', {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-terrain-v2',
    })
    map.addLayer({
        id: 'contours',
        type: 'line',
        source: 'contours',
        'source-layer': 'contour',
        layout: {
            // Make the layer visible by default.
            visibility: 'visible',
            'line-join': 'round',
            'line-cap': 'round',
        },
        paint: {
            'line-color': '#877b59',
            'line-width': 1,
        },
    })
})
</script>

<template>
    <div class="mapbox-container-wrapper" ref="mapboxContainerWrapperRef">
        <Menu class="menu" :map="map" />
    </div>
</template>

<style scoped>
.mapbox-container-wrapper {
    width: 100%;
    height: 100%;
}
.menu {
    position: absolute;
    top: 20%;
    right: 20px;
}
</style>
