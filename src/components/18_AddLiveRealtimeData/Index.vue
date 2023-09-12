<script setup lang="ts">
import Mapbox from '@/components/mapbox/Mapbox.vue'
import RealTimeData from './RealTimeData.vue'
import { ref } from 'vue'

const isShowRef = ref(true)

defineOptions({ name: 'AddLiveRealtimeData' })
</script>

<template>
    <Mapbox init-fog nav-ctr full-screen-ctr>
        <RealTimeData v-if="isShowRef"></RealTimeData>
    </Mapbox>
</template>
