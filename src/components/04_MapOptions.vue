<script setup lang="ts">
import { mapboxgl } from '@/mapbox'
import { ref, onMounted } from 'vue'

const containerRef = ref<HTMLDivElement>()

onMounted(() => {
    new mapboxgl.Map({
        antialias: false, // 抗锯齿。性能优化，默认 false 。
        attributionControl: true, // MapBox 右下角链接区域
        // bounds: [[116.20, 39.56], [100, 20]],  // 设置地图的界限。会覆盖 center 和 zoom 属性
        boxZoom: true, // BoxZoomHandler。Shift + Click 画出矩形，Map可以放大适应这个边界
        cooperativeGestures: false, // 组合手势
        customAttribution: ['hello', 'world'], // 在 AttributionControl 中显示自定义属性
        doubleClickZoom: true, // 鼠标双击缩放
        dragPan: true, // 鼠标拖拽移动
        dragRotate: true, // 鼠标右键旋转
        // fitBoundsOptions: undefined, // 适配 bounds, 要配合上面的 bounds 使用
        hash: false, // zoom, center latitude, center longitude 会以 Hash 的形式显示在 URL 地址上
        interactive: true, // 开启/禁用 交互功能
        keyboard: true, // KeyboardHandler(zoom, rotation, pitch) 左右代表 rotation 旋转, 上下代表 pitch 俯仰
        // locale: undefined,

        logoPosition: 'bottom-left', // Logo 的位置

        pitch: 0, // 倾斜角 （0-85）

        preserveDrawingBuffer: false, // 设置为 true 可以将 Canvas 导出到 PNG，设置为 false 考虑到性能优化
        projection: { name: 'mercator' }, // 投影

        renderWorldCopies: true,
        scrollZoom: true, // 开启/禁用 鼠标滚轮缩放

        container: containerRef.value!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [116.2, 39.56],
        zoom: 2,
    })
})

console.log(window.navigator.language)
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
