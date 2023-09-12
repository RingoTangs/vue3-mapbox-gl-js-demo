<script setup lang="ts">
import Mapbox from '@/components/mapbox/Mapbox.vue'
import RealTimeData from './RealTimeData.vue'

defineOptions({ name: 'AddLiveRealtimeData' })
</script>

<template>
    <Mapbox init-fog nav-ctr full-screen-ctr>
        <RealTimeData></RealTimeData>
    </Mapbox>
</template>
