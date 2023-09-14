<script setup lang="ts">
import Mapbox from '@/components/mapbox/Mapbox.vue'
import DisplayPopup from './DisplayPopup.vue'

defineOptions({ name: 'DisplayPopupOnHover' })
</script>

<template>
    <Mapbox init-fog :zoom="11.75" :center="[-77.04, 38.907]">
        <DisplayPopup />
    </Mapbox>
</template>
