<script setup lang="ts">
import Mapbox from '@/components/mapbox/Mapbox.vue'
import Model from './Model.vue'
</script>

<template>
    <Mapbox init-fog nav-ctr full-screen-ctr>
        <Model />
    </Mapbox>
</template>
