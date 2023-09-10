<script setup lang="ts">
import { useMapbox, mapboxgl } from '@/mapbox'
import { ref, onMounted } from 'vue'

defineOptions({ name: 'DisplayPopup' })
const { map, container } = useMapbox(true)
const mapboxContainerWrapperRef = ref<HTMLDivElement>()

// Map mounted
onMounted(() => {
    const firstChild = mapboxContainerWrapperRef.value.firstChild
    mapboxContainerWrapperRef.value?.insertBefore(container, firstChild)
    map.setZoom(5)
    map.resize()
})

const { lng, lat } = map.getCenter()

new mapboxgl.Popup({
    closeOnClick: false,
})
    .setLngLat([lng, lat])
    .setHTML('<h1>Hello World!</h1>')
    .addTo(map)
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
