<script setup lang="ts">
import { useMap } from './context.ts'

const map = useMap()

map.on('style.load', () => {
    console.log(map.getFog())
})
</script>

<template>
    <div>Child</div>
</template>
