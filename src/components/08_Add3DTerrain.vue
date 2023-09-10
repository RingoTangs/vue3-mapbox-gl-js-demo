<script setup lang="ts">
// 设置 terrain 地形属性
import { useMapbox } from '@/mapbox'
import { onMounted, ref, watchEffect, unref } from 'vue'
import gsap from 'gsap'

const mapContainerWrapperRef = ref<HTMLDivElement>()

const pitch = ref(80)
const bearing = ref(41)

const { map, container } = useMapbox(false)

onMounted(() => {
    mapContainerWrapperRef.value.appendChild(container)
    map.resize()
    map.setStyle('mapbox://styles/mapbox/satellite-streets-v12')
    map.setZoom(14)
    map.setCenter([-114.26608, 32.7213])

    map.on('style.load', () => {
        map.addSource('mapbox-dem', {
            type: 'raster-dem',
            url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
            tileSize: 512,
            maxzoom: 14,
        })
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })
    })
    watchEffect(() => {
        map.setPitch(pitch.value)
        map.setBearing(bearing.value)
    })
})

function onPitchIncrementClick() {
    gsap.to(pitch, { duration: 0.5, value: unref(pitch) + 10 })
}

function onBearingIncrementClick() {
    gsap.to(bearing, { duration: 0.5, value: unref(bearing) + 5 })
}
</script>

<template>
    <div class="map-container-wrapper" ref="mapContainerWrapperRef"></div>
    <button type="button" @click="onPitchIncrementClick">
        Increment pitch {{ pitch }}
    </button>
    <button type="button" @click="onBearingIncrementClick">
        Increment Bearing {{ bearing }}
    </button>
</template>

<style scoped>
.map-container-wrapper {
    width: 100%;
    height: 100%;
}
</style>
