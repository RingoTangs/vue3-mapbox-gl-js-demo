<script setup lang="ts">
import { useMapbox, mapboxgl } from '@/mapbox'
import { ref, onMounted } from 'vue'
import { MyControl } from './my-control'

defineOptions({ name: 'MyControl' })

const { map, container } = useMapbox(true)
const mapboxContainerWrapperRef = ref<HTMLDivElement>()

// Map mounted
onMounted(() => {
    const firstChild = mapboxContainerWrapperRef.value.firstChild
    mapboxContainerWrapperRef.value?.insertBefore(container, firstChild)
    map.resize()
})

map.addControl(new mapboxgl.NavigationControl())
map.addControl(new mapboxgl.FullscreenControl())
map.addControl(new MyControl())
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
