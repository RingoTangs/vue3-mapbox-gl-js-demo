<script setup lang="ts">
import { useMap } from '../mapbox/context'
// import { createThreebox } from '@/utils/threebox'
import { Threebox } from 'threebox-plugin'

const map = useMap()
map.setCenter([-122.434, 37.7353])
map.setZoom(10)
const origin = [-122.434, 37.7353, 1]

map.on('style.load', () => {
    console.log('===style.load===')
    map.addLayer({
        id: 'custom_layer',
        type: 'custom',
        renderingMode: '3d',
        onAdd: (_map, _gl) => {
            const tb = (window.tb = new Threebox(_map, _gl, {
                defaultLights: true,
                enableSelectingObjects: true,
            }))

            //instantiate a red sphere and position it at the origin lnglat
            const sphere = tb
                .sphere({
                    color: 'red',
                    material: 'MeshToonMaterial',
                    units: 'meters',
                    radius: 5000,
                })
                .setCoords(origin)
            // add sphere to the scene
            tb.add(sphere)
            console.log(sphere)
        },
        render: () => window.tb.update(),
    })
})
</script>

<template>
    <p></p>
</template>
