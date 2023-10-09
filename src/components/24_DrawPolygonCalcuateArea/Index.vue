<script setup lang="ts">
import Mapbox from '@/components/mapbox/Mapbox.vue'
import AreaBoard from './AreaBoard.vue'
import DrawingBoard from './DrawingBoard.vue'
</script>

<template>
    <Mapbox
        :options="{ style: 'mapbox://styles/mapbox/satellite-v9' }"
        :center="[-91.874, 42.76]"
        :zoom="12"
        init-fog
        class="mapbox"
    >
        <AreaBoard class="area-board" />
        <DrawingBoard />
    </Mapbox>
</template>

<style scoped>
.mapbox {
    position: relative;
}

.area-board {
    position: absolute;
    bottom: 50px;
    left: 50px;
}
</style>
