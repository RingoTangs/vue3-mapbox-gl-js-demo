<script setup lang="ts">
import { type InformationProps } from './information'

const props = withDefaults(defineProps<InformationProps>(), {
    longitude: 10,
    latitude: 10,
})
</script>

<template>
    <div class="information" v-bind="$attrs">
        <h3 class="longitude">longitude: {{ props.longitude }}</h3>
        <h3 class="latitude">latitude: {{ latitude }}</h3>
    </div>
</template>

<style scoped>
.information {
    background-color: pink;
    color: black;
}
</style>
