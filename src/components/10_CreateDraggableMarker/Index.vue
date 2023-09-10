<script setup lang="ts">
import { useMapbox } from '@/mapbox'
import { ref, onMounted } from 'vue'
import Information from './Information.vue'
import { useDragMarker } from './marker'

defineOptions({
    name: 'CreateDraggableMarker',
})

const { map, container } = useMapbox(true)
const mapboxContainerWrapperRef = ref<HTMLDivElement>()

// Map mounted
onMounted(() => {
    const firstChild = mapboxContainerWrapperRef.value.firstChild
    mapboxContainerWrapperRef.value.insertBefore(container, firstChild)
    map.setZoom(5)
    map.resize()
})

const { latitudeRef, longitudeRef } = useDragMarker(map)
</script>

<template>
    <div class="mapbox-container-wrapper" ref="mapboxContainerWrapperRef">
        <Information
            class="information"
            :latitude="latitudeRef.toFixed(2)"
            :longitude="longitudeRef.toFixed(2)"
        />
    </div>
</template>

<style scoped>
.mapbox-container-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}

.information {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    position: absolute;
    bottom: 50px;
    left: 20px;
    letter-spacing: 1px;
    padding: 15px;
    border-radius: 10px;
    /* cursor: move; */
}
</style>
