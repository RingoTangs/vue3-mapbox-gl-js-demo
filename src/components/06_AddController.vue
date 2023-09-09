<script setup lang="ts">
import { mapInit, mapboxgl } from '@/mapbox'
import { ref, onMounted, h, render } from 'vue'
import HelloWorldConstructor from './HelloWorldControl.vue'

class MyControl implements mapboxgl.IControl {
    private _container: HTMLElement = null
    constructor(private _containerClass: string | string[] = 'mapboxgl-ctrl') {}

    onAdd(): HTMLElement {
        const el = document.createElement('div')
        const vnode = h(HelloWorldConstructor, { color: 'red' })
        render(vnode, el)
        console.log('MyControl onAdd..')
        if (typeof this._containerClass === 'string') {
            el.classList.add(this._containerClass)
        } else {
            el.classList.add(...this._containerClass)
        }
        this._container = el
        return el
    }
    onRemove(): void {
        this._container.remove()
        console.log('MyControl onRemove...')
    }
}

const containerRef = ref<HTMLDivElement>()
onMounted(() => {
    const map = mapInit(containerRef.value!)
    const navigationControl = new mapboxgl.NavigationControl({
        visualizePitch: true,
    })
    map.addControl(navigationControl)
    const myControl = new MyControl()
    map.addControl(myControl, 'bottom-left')
})
</script>

<template>
    <div ref="containerRef" class="container"></div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>
