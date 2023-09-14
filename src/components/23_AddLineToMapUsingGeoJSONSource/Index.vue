<script setup lang="ts">
import Mapbox from '@/components/mapbox/Mapbox.vue'
import AddLine from './AddLine.vue'

defineOptions({ name: 'AddLineToMapUsingGeoJSONSource' })
</script>

<template>
    <Mapbox init-fog :zoom="14" :center="[-122.486052, 37.830348]">
        <AddLine />
    </Mapbox>
</template>
