<script setup lang="ts">
import { Map } from 'mapbox-gl'
import { useActive } from './menu.ts'
import { setLayerVisible } from '@/utils/mapbox-util.ts'

const props = defineProps<{ map: Map }>()
const map = props.map

const { contoursActiveRef, museumsActiveRef } = useActive(map)

const onMuseumsClick = () => {
    museumsActiveRef.value = !museumsActiveRef.value
    setLayerVisible(map, 'museums', museumsActiveRef.value)
}

const onContoursClick = () => {
    contoursActiveRef.value = !contoursActiveRef.value
    setLayerVisible(map, 'contours', contoursActiveRef.value)
}
</script>

<template>
    <div class="menu">
        <button
            type="button"
            :class="{ active: contoursActiveRef }"
            @click="onContoursClick"
        >
            contours(轮廓)
        </button>
        <button
            type="button"
            :class="{ active: museumsActiveRef }"
            @click="onMuseumsClick"
        >
            museums(博物馆)
        </button>
    </div>
</template>

<style scoped>
.menu {
    font-size: 16px;
}
button[type='button'] {
    display: block;
    width: 100%;
    cursor: pointer;
    outline: none;
    border: none;
    background-color: #fff;
    padding: 10px;
}
button[type='button']:nth-child(n + 2) {
    border-top: 1px solid indianred;
}

button[type='button']:hover {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
}

button[type='button'].active {
    background-color: pink;
}
</style>
