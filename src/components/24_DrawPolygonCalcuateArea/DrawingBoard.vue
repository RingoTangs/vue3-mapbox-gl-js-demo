<script setup lang="ts">
import { useMap } from '@/components/mapbox/context'
import { useDraw } from './index'
const map = useMap()

const draw = useDraw(map)
</script>
<template>
    <button
        type="button"
        @click="
            () => {
                draw.changeMode('draw_point_mode', { count: 10 })
                console.log(draw.getMode())
            }
        "
    >
        Lots of Points
    </button>
</template>
