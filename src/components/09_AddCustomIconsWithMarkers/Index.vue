<script setup lang="ts">
import Mapbox from '@/components/mapbox/Mapbox.vue'
import MarkerIcons from './MarkerIcons.vue'

defineOptions({
    name: 'AddCustomIconsWithMarkers',
})
</script>

<template>
    <Mapbox init-fog full-screen-ctr nav-ctr>
        <MarkerIcons />
    </Mapbox>
</template>
