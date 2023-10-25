<script setup lang="ts">
import { useMap } from '@/components/mapbox/context'
import { Threebox } from 'threebox-plugin'

const map = useMap()
const tb = (window.tb = new Threebox(map, map.getCanvas().getContext('webgl'), {
    defaultLights: true,
    enableSelectingObjects: true,
}))

map.on('style.load', () => {
    map.addLayer({
        id: 'custom-threebox-model',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function () {
            // Creative Commons License attribution:  Metlife Building model by https://sketchfab.com/NanoRay
            // https://sketchfab.com/3d-models/metlife-building-32d3a4a1810a4d64abb9547bb661f7f3
            const scale = 3.2
            const options = {
                obj: 'https://docs.mapbox.com/mapbox-gl-js/assets/metlife-building.gltf',
                type: 'gltf',
                scale: { x: scale, y: scale, z: 2.7 },
                units: 'meters',
                rotation: { x: 90, y: -90, z: 0 },
            }

            tb.loadObj(options, (model: any) => {
                console.log(model)
                model.setCoords([116.405, 39.905])
                model.setRotation({ x: 0, y: 0, z: 241 })
                tb.add(model)
            })
        },
        render: function () {
            tb.update()
        },
    })
})

map.flyTo({ center: [116.405, 39.905], zoom: 18 })
</script>

<template>
    <p></p>
</template>
