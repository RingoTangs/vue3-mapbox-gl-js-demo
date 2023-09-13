<!--
 https://docs.mapbox.com/mapbox-gl-js/example/hover-styles/
-->
<script setup lang="ts">
import Mapbox from '@/components/mapbox/Mapbox.vue'
import HoverEffect from './HoverEffect.vue'

defineOptions({ name: 'CreateHoverEffect' })

const options = {
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-100.486052, 37.830348],
    zoom: 2,
}
</script>

<template>
    <Mapbox :options="options" init-fog nav-ctr full-screen-ctr>
        <HoverEffect />
    </Mapbox>
</template>
