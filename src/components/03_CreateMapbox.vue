<script setup lang="ts">
import MaxBox from '@/components/mapbox/Mapbox.vue'
import { ref } from 'vue'
import {
    NavigationControlOptions,
    FullScreenControlOptions,
} from '@/components/mapbox/mapbox.ts'

const navCtr = ref<NavigationControlOptions>(true)

const fsCtr = ref<FullScreenControlOptions>(true)
</script>

<template>
    <MaxBox init-fog :nav-ctr="navCtr" :full-screen-ctr="fsCtr" />
</template>
