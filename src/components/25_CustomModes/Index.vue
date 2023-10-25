<script setup lang="ts">
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'

import Mapbox from '@/components/mapbox/Mapbox.vue'
import drawPointMode from './modes/draw-point'
import { ref } from 'vue'

let draw: MapboxDraw

const mode = ref('')

const onMapCreated = (map: mapboxgl.Map) => {
    draw = new MapboxDraw({
        modes: {
            draw_point_mode: drawPointMode,
            ...MapboxDraw.modes,
        },
        controls: {
            point: true,
            line_string: true,
            polygon: false,
            combine_features: false,
            uncombine_features: false,
            trash: true,
        },
    })
    map.addControl(draw)

    map.on('draw.modechange', (e) => {
        console.log('draw.modechange', e)
        mode.value = e.mode
    })
}
</script>

<template>
    <Mapbox init-fog @map-created="onMapCreated">
        <button type="button" @click="() => draw.changeMode('draw_point_mode')">
            Draw Point
        </button>
        <span>mode: {{ mode }}</span>
        <button type="button" @click="() => draw.trash()">Trash</button>
    </Mapbox>
</template>
