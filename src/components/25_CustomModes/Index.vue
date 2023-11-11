<script setup lang="ts">
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'

import Mapbox from '@/components/mapbox/Mapbox.vue'
import drawPointMode from './modes/draw-point'
import drawLineStringMode from './modes/draw-line-string'
import { ref } from 'vue'

let draw: MapboxDraw

const mode = ref('')

const onMapCreated = (map: mapboxgl.Map) => {
    draw = new MapboxDraw({
        modes: {
            draw_point_mode: drawPointMode,
            draw_line_string_mode: drawLineStringMode,
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

    console.log(draw)

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
        <!-- prettier-ignore -->
        <button type="button" @click="() => draw.changeMode('draw_line_string_mode')">
            Draw LineString
        </button>
        <span>mode: {{ mode }}</span>
        <button type="button" @click="() => draw.trash()">Trash</button>
    </Mapbox>
</template>
