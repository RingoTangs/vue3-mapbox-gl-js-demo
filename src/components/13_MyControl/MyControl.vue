<script setup lang="ts">
const onCtr1BtnClick = () => alert('ctr1')
</script>

<template>
    <button
        type="button"
        class="mapboxgl-ctrl-my-ctr-1"
        aria-label="Ctr 1"
        aria-disabled="false"
        @click="onCtr1BtnClick"
    >
        <span
            class="mapboxgl-ctrl-icon"
            aria-hidden="true"
            title="Ctr 1"
        ></span>
    </button>

    <button
        type="button"
        class="mapboxgl-ctrl-my-ctr-2"
        aria-label="Ctr 2"
        aria-disabled="false"
    >
        <span
            class="mapboxgl-ctrl-icon"
            aria-hidden="true"
            title="Ctr 2"
        ></span>
    </button>
    <button
        type="button"
        class="mapboxgl-ctrl-my-ctr-3"
        aria-label="Ctr 3"
        aria-disabled="false"
    >
        <span
            class="mapboxgl-ctrl-icon"
            aria-hidden="true"
            title="Ctr 3"
        ></span>
    </button>
</template>
