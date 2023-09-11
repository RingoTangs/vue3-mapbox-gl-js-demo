<script setup lang="ts">
import { ScaleControl } from 'mapbox-gl'
import { ref, onMounted } from 'vue'
import { useMapbox } from '@/mapbox'

defineOptions({ name: 'ScaleControl' })

const { map, container } = useMapbox(true)
const mapboxContainerWrapperRef = ref<HTMLDivElement>()

// Map mounted
onMounted(() => {
    const firstChild = mapboxContainerWrapperRef.value.firstChild
    mapboxContainerWrapperRef.value?.insertBefore(container, firstChild)
    map.resize()
})

map.addControl(new ScaleControl())
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
