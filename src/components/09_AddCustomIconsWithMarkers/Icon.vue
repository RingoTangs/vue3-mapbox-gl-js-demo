<script setup lang="ts">
import { type IconProps, resolveUrl, BASE_URL } from './icon'
const props = withDefaults(defineProps<IconProps>(), {
    url: BASE_URL,
    width: 50,
    height: 50,
    onClick: () => console.log('icon click'),
})

const width = `${props.width}px`
const height = `${props.height}px`
</script>

<template>
    <div class="icon" @click="onClick">
        <img
            class="icon-img"
            :src="resolveUrl(props.url, props.width, props.height)"
        />
    </div>
</template>

<style scoped>
.icon {
    width: v-bind('width');
    height: v-bind('height');
    border-radius: 50%;
    /* background-color: pink; */
    cursor: default;
    overflow: hidden;
}

.icon-img {
    display: inline-block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
