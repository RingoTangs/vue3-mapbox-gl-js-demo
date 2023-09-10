<script setup lang="ts">
import { useMapbox, injectionKeyMap } from '@/mapbox'
import { ref, onMounted, provide } from 'vue'
import UseMapboxTestChild from './07_UseMapboxTestChild.vue'

const maxboxWrapperRef = ref<HTMLDivElement>()
const { map, container } = useMapbox()

provide(injectionKeyMap, map)

onMounted(() => {
    maxboxWrapperRef.value.appendChild(container)
    map.resize()
})

console.log(map, container)
</script>

<template>
    <div class="mapbox-wrapper" ref="maxboxWrapperRef"></div>
    <UseMapboxTestChild />
</template>

<style>
.mapbox-wrapper {
    width: 100%;
    height: 100%;
}
</style>
