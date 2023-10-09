<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMap } from '@/components/mapbox/context'

const map = useMap()

const area = ref(0)
const areaInfomation = computed(() =>
    area.value > 0 ? `${area.value} square meters` : ''
)

const mode = ref<string>('simple_selected')
map.on('draw.modechange', (e) => (mode.value = e.mode))
</script>

<template>
    <div class="area-board">
        <h3>Click the map to draw a polygon.</h3>
        <div>mode: {{ mode }}</div>
        <div class="content">{{ areaInfomation }}</div>
    </div>
</template>

<style scoped>
.area-board {
    width: fit-content;
    height: fit-content;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.6);
}

.content {
    height: 20px;
    padding: 10px;
}
</style>
