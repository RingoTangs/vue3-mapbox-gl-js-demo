<script setup lang="ts">
import { useMap } from '@/components/mapbox/context.ts'
import { ref, watchEffect } from 'vue'
const map = useMap()

console.log(map.getZoom())

const zoomRef = ref(map.getZoom())

watchEffect(() => map.setZoom(zoomRef.value))
</script>

<template>
    <button type="button" @click="zoomRef++">Zoom Increment</button>
</template>

<style scoped></style>
