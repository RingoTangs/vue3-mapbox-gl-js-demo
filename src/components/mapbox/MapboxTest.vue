<script setup lang="ts">
import Mapbox from '@/components/mapbox/Mapbox.vue'
import MapboxTestChild from './MapboxTestChild.vue'

const onMapCreated = () => {
    console.log('onMapCreated')
    // 兄弟组件之间共享 map 实例，可以使用发布-订阅/全局对象保存
}
</script>

<template>
    <div class="wrapper">
        <Mapbox init-fog ref="mapboxRef" @map-created="onMapCreated">
            <MapboxTestChild />
            <h1>Hello</h1>
            <h2>Hello</h2>
        </Mapbox>
    </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
}
</style>
