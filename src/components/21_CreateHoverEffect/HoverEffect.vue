<script setup lang="ts">
import { useMap } from '@/components/mapbox/context.ts'
import { addLayers, addOperation } from './hover-effect.ts'

const map = useMap()

map.on('load', () => {
    addLayers(map)
    addOperation(map)
})
</script>

<template>
    <div></div>
</template>

<style scoped></style>
