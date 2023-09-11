<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMapbox } from '@/mapbox'
import { GeolocateControl } from 'mapbox-gl'

defineOptions({ name: 'GeoLocateControl' })

const { map, container } = useMapbox(true)
const mapboxContainerWrapperRef = ref<HTMLDivElement>()

// Map mounted
onMounted(() => {
    const firstChild = mapboxContainerWrapperRef.value.firstChild
    mapboxContainerWrapperRef.value?.insertBefore(container, firstChild)
    map.resize()
})

// 添加 Geo Locate Control
map.addControl(
    new GeolocateControl({
        trackUserLocation: true, // 追踪用户位置
        showUserHeading: true,
        positionOptions: {
            enableHighAccuracy: true,
        },
    })
)
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
