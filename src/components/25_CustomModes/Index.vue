<script setup lang="ts">
import { ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'

import drawPointMode from './modes/draw-point'
import drawLineStringMode from './modes/draw-line-string'
import drawPolygonMode from './modes/draw-polygon'

import Mapbox from '@/components/mapbox/Mapbox.vue'

let draw: MapboxDraw

const mode = ref('')

const onMapCreated = (map: mapboxgl.Map) => {
    draw = new MapboxDraw({
        modes: {
            draw_point_mode: drawPointMode,
            draw_line_string_mode: drawLineStringMode,
            draw_polygon_mode: drawPolygonMode,
            ...MapboxDraw.modes,
        },
        controls: {
            point: true,
            line_string: true,
            polygon: true,
            combine_features: false,
            uncombine_features: false,
            trash: true,
        },
    })
    map.addControl(draw)

    map.on('draw.modechange', (e) => {
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
        <!-- prettier-ignore -->
        <button type="button" @click="() => draw.changeMode('draw_polygon_mode')">
            Draw Polygon
        </button>
        <span>mode: {{ mode }}</span>
        <button type="button" @click="() => draw.trash()">Trash</button>
    </Mapbox>
</template>
