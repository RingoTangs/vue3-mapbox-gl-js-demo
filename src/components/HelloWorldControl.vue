<script setup lang="ts">
import gsap from 'gsap'
import { reactive, computed } from 'vue'

withDefaults(defineProps<{ color?: string }>(), { color: '#000' })

const styleReactive = reactive({
    opacity: 1,
    translateX: 0,
    display: 'block',
})

const computedTranslateX = computed(
    () => `translateX(${styleReactive.translateX}px)`
)

function onClick() {
    let opacity = 0
    let translateX = -50
    if (!styleReactive.opacity) {
        opacity = 1
        translateX = 0
    }
    gsap.to(styleReactive, {
        duration: 0.8,
        opacity,
        translateX,
        ease: 'back.inOut',
    })
}
</script>

<template>
    <h1 class="h1" @click="onClick">Hello World</h1>
</template>

<style scoped>
.h1 {
    cursor: default;
    transition: all 1000 ease;
    transform: translateX(-20px);
    color: v-bind('color');
    opacity: v-bind('styleReactive.opacity');
    transform: v-bind('computedTranslateX');
    display: v-bind('styleReactive.display');
}
</style>
