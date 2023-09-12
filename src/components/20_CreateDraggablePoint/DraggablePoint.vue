<script setup lang="ts">
import { useMap } from '@/components/mapbox/context'
import { useDraggablePoint } from './draggable-point'
import Information from '@/components/10_CreateDraggableMarker/Information.vue'
import { toRefs } from 'vue'

const map = useMap()
const { lat, lng } = toRefs(useDraggablePoint(map))
</script>

<template>
    <Information
        :longitude="lng.toFixed(2)"
        :latitude="lat.toFixed(2)"
        class="information"
    />
</template>

<style scoped>
.information {
    position: absolute;
    top: 50%;
    left: 50px;
    background-color: rgb(0, 0, 0, 0.8);
    color: white;
}
</style>
