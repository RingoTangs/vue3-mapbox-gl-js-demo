<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from 'vue'
import { type Props, useMapboxInit } from './mapbox.ts'
import { provideMap } from './context.ts'
import mapboxgl from 'mapbox-gl'

// WebStorm IDE BUG
// https://stackoverflow.com/questions/76313288/error-when-using-both-withdefaults-and-defineprops-in-script-setup-in-vite-v
// const props = withDefaults(defineProps<Props>(), { initFog: true })
const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'mapCreated', map: mapboxgl.Map): void
    (e: 'update:zoom', value: number): void
}>()

const { map, container } = useMapboxInit(props, getCurrentInstance())

emits('mapCreated', map) // 父组件可以获取 map
defineExpose({ map }) // 父组件可以使用 ref 获取 map
provideMap(map) // Mapbox 所有的子组件都可以在 setup 中使用 map

const wrapperRef = ref<HTMLDivElement>()

// console.log(props)

onMounted(() => {
    const firstChild = wrapperRef.value.firstChild
    wrapperRef.value.insertBefore(container, firstChild)
    map.resize()
})
</script>

<template>
    <div class="mapbox-container_wrapper" ref="wrapperRef">
        <slot></slot>
    </div>
</template>

<style scoped>
.mapbox-container_wrapper {
    width: 100%;
    height: 100%;
}
</style>
