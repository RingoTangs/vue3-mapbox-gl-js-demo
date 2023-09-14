<script setup lang="ts">
import { useMap } from '@/components/mapbox/context.ts'
import { addPlacesSource, addPlacesLayer, onMouse } from './display-popup.ts'

const map = useMap()
map.on('load', () => {
    addPlacesSource(map)
    addPlacesLayer(map)
    onMouse(map)
})
</script>

<template>
    <p></p>
</template>
