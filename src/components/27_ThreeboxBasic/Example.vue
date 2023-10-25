<script setup lang="ts">
import { useMap } from '../mapbox/context'
import { createThreebox } from '@/utils/threebox'
// import { Threebox } from 'threebox-plugin'

const map = useMap()

const origin = [-122.434, 37.7353, 1]

const threebox = createThreebox(map, {
    defaultLights: true,
    enableSelectingObjects: true,
    enableDraggingObjects: true,
    enableRotatingObjects: true,
})

const addModel = () => {
    threebox(() => {
        const sphere = window.tb.sphere({
            color: 'red',
            material: 'MeshToonMaterial',
            units: 'meters',
            radius: 1,
            anchor: 'center',
        })

        sphere.setCoords(origin)
        sphere.set({ scale: 5, duration: 10000 })
        // sphere.setAnchor('top')
        console.log(sphere)
        window.tb.add(sphere)
        map.flyTo({ center: [-122.434, 37.7353], zoom: 17, pitch: 60 })
    })
}
</script>

<template>
    <button type="button" @click="addModel">添加模型</button>
</template>
