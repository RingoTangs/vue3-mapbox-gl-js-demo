<script setup lang="ts">
import { useMousemove } from './index.ts'
import { useMap } from '@/components/mapbox/context.ts'
const map = useMap()
const { lngLatReactive } = useMousemove(map)
</script>

<template>
    <div>
        {{ lngLatReactive.lng.toFixed(2) }} {{ lngLatReactive.lat.toFixed(2) }}
    </div>
</template>
