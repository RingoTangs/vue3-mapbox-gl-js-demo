<script setup lang="ts">
import { mapboxgl, useMapbox } from '@/mapbox'
import { ref, onMounted } from 'vue'
import { createIcon } from './icon-render'

defineOptions({
    name: 'AddCustomIconsWithMarkers',
})

const { map, container } = useMapbox(true)
const mapboxContainerWrapperRef = ref<HTMLDivElement>()

// Map mounted
onMounted(() => {
    mapboxContainerWrapperRef.value.appendChild(container)
    map.resize()
})

// map init
map.setCenter([-65.017, -16.457])
map.setZoom(5)
map.setMinZoom(5)

const iconProperties = [
    {
        iconSize: [60, 60],
        coordinates: [-66.324462, -16.024695],
        message: 'Hello1',
    },
    {
        iconSize: [50, 50],
        coordinates: [-61.21582, -15.971891],
        message: 'Hello2',
    },
    {
        iconSize: [40, 40],
        coordinates: [-63.292236, -18.281518],
        message: 'Hello3',
    },
]

for (const iconProp of iconProperties) {
    const el = document.createElement('div')
    el.style.width = 'fit-content'
    el.className = 'marker'
    createIcon(el, {
        width: iconProp.iconSize[0],
        height: iconProp.iconSize[1],
        onClick: () => alert(iconProp.message),
    })
    new mapboxgl.Marker({ element: el })
        .setLngLat(iconProp.coordinates as [number, number])
        .addTo(map)
}
</script>

<template>
    <div class="mapbox-container-wrapper" ref="mapboxContainerWrapperRef"></div>
</template>

<style scoped>
.mapbox-container-wrapper {
    width: 100%;
    height: 100%;
}
</style>
