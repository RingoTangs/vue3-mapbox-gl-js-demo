<script setup lang="ts">
import { mapInit, mapboxgl } from '@/mapbox'
import { ref, onMounted } from 'vue'

const containerRef = ref<HTMLDivElement>()
onMounted(() => {
    const map = mapInit(containerRef.value!)
    scrollZoomHandlerTest(map)
    boxZoomHandlerTest(map)
    dragRotateHandlerTest(map)
    dragPanHandlerTest(map)
    doubleClickZoomHandlerTest(map)
    touchZoomRotateHandlerTest(map)
    touchPitchHandlerTest(map)
})

function scrollZoomHandlerTest(map: mapboxgl.Map) {
    const scrollZoomHandler = map.scrollZoom
    console.log('scroll zoom handler isEnabled:', scrollZoomHandler.isEnabled())
}

function boxZoomHandlerTest(map: mapboxgl.Map) {
    const boxZoomHandler = map.boxZoom
    console.log('box zoom handler isEnabled:', boxZoomHandler.isEnabled())
}

function dragRotateHandlerTest(map: mapboxgl.Map) {
    // Drag Rotate Handler 操作 1: 鼠标右键 2: ctrl + 鼠标左键
    const dragRotateHandler = map.dragRotate
    console.log('drag rotate handler isEnabled:', dragRotateHandler.isEnabled())
}

function dragPanHandlerTest(map: mapboxgl.Map) {
    // 鼠标左键拖拽移动
    const dragPanHandler = map.dragPan
    console.log('drag pan handler isEnabled:', dragPanHandler.isEnabled())
}

function doubleClickZoomHandlerTest(map: mapboxgl.Map) {
    // 鼠标双击缩放
    const doubleClickZoomHandler = map.doubleClickZoom
    console.log(
        'double click zoom handler isEnabled:',
        doubleClickZoomHandler.isEnabled()
    )
}

function touchZoomRotateHandlerTest(map: mapboxgl.Map) {
    const touchZoomRotateHandler = map.touchZoomRotate
    touchZoomRotateHandler.disable()
    touchZoomRotateHandler.disableRotation()
    console.log(
        'touch zoom rotate handler isEnabled:',
        touchZoomRotateHandler.isEnabled()
    )
}

function touchPitchHandlerTest(map: mapboxgl.Map) {
    const touchPitchHandler = map.touchPitch
    touchPitchHandler.disable()
    console.log('touch pitch handler isEnabled:', touchPitchHandler.isEnabled())
}
</script>

<template>
    <div ref="containerRef" class="container"></div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>
