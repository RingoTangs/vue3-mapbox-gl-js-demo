<script setup lang="ts">
import { useMapbox } from '@/mapbox'
import { Marker, Popup } from 'mapbox-gl'
import { ref, onMounted } from 'vue'
import { createIcon } from '@/components/09_AddCustomIconsWithMarkers/icon-render'

defineOptions({ name: 'AttachPopupToMarker' })

const { map, container } = useMapbox(true)
const mapboxContainerWrapperRef = ref<HTMLDivElement>()

// Map mounted
onMounted(() => {
    const firstChild = mapboxContainerWrapperRef.value.firstChild
    mapboxContainerWrapperRef.value?.insertBefore(container, firstChild)
    map.resize()
})

const addIconMarker = () => {
    const el = document.createElement('div')
    el.style.width = 'fit-content'
    createIcon(el, { width: 50, height: 50 })
    const popup = new Popup({
        closeOnMove: true,
        offset: 25,
    }).setText('Hello World')
    new Marker(el).setLngLat(map.getCenter()).setPopup(popup).addTo(map)
}

addIconMarker()
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
