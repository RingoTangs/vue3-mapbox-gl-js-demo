<script setup lang="ts">
import Mapbox from '@/components/mapbox/Mapbox.vue'
import mapboxgl from 'mapbox-gl'
import ZoomButton from './ZoomButton.vue'

defineOptions({ name: 'LifecycleTest' })

const onMapCreated = (map: mapboxgl.Map) => {
    // Lifecycle 生命周期

    // 下载所有必要的资源并且地图的第一次视觉上完整渲染发生后立即触发。
    map.on('load', () => {
        console.log('load...')
    })

    /**
     * render: 每当地图绘制到屏幕上就触发, 触发条件：
     * - 改变地图位置，zoom 缩放，pitch 倾斜，或者 bearing 方位的改变
     * - style 的改变
     * - GeoJSON source 改变
     * - 加载 vector tile, GeoJSON, glyph 或者 sprite
     */
    map.on('render', () => {
        console.log('render...')
    })

    /**
     * map 在进入 "空闲" 状态之前，渲染最后一帧后触发：
     * - No camera transitions are in progress
     * - All currently requested tiles have loaded // 所有请求的 tiles 已经加载完成
     * - All fade/transition animations have completed. // 所有的动画已经完成
     */
    map.on('idle', () => {
        console.log('idle...')
    })

    /**
     * 发生错误时触发。这是 Mapbox GL JS 主要错误报告机制。使用事件回调替换抛出异常可以更好地适应
     * 异步操作。如果没有 Listener 绑定到 Error Event，错误直接被打印到控制台。
     */
    map.on('error', (ev) => {
        console.log('error...', ev)
    })

    // 当 Webgl 上下文丢失的时候触发
    map.on('webglcontextlost', () => {
        console.log('webglcontextlost...')
    })

    // 当 WebGL 上下文恢复时触发。
    map.on('webglcontextrestored', () => {
        console.log('webglcontextrestored...')
    })

    //     Data Loading 数据加载

    /**
     * 当任何地图数据加载或者更改时触发
     */
    map.on('data', () => {
        console.log('data...')
    })

    /**
     * 当 map style 加载或者更改时触发
     */
    map.on('styledata', () => {
        console.log('styledata...')
    })

    /**
     * 当 map source 加载或者更改时触发。包括属于 source 的 tiles 加载或者更改。
     */
    map.on('sourcedata', () => {
        console.log('sourcedata...')
    })

    /**
     * 当任何的地图数据（style、source、tile等）开始异步加载或者更改时触发。
     * 所有的 dataloading 事件后会跟一个 data/error 事件
     */
    map.on('dataloading', () => {
        console.log('dataloading...')
    })

    /**
     * 当地图的 style 开始异步加载或更改时触发。
     * 所有 styledataloading 事件后都会跟随 styledata 或 error 事件。
     */
    map.on('styledataloading', () => {
        console.log('styledataloading..')
    })

    /**
     * 当地图的 source 开始异步加载或者更改时触发。
     * 所有 sourcedataloading 事件后会跟一个 sourcedata/error 事件。
     */
    map.on('sourcedataloading', () => {
        console.log('sourcedataloading...')
    })

    /**
     * 下载所有样式资源并且基本样式的第一次视觉上完整渲染发生后立即触发。
     */
    map.on('style.load', () => {
        console.log('style.load')
    })
}
</script>

<template>
    <Mapbox
        init-fog
        nav-ctr
        full-screen-ctr
        :zoom="5"
        @map-created="onMapCreated"
    >
        <ZoomButton />
    </Mapbox>
</template>
