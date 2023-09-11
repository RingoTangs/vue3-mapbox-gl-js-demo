<script setup lang="ts">
import { useMapbox, mapboxgl } from '@/mapbox'
import { ref, onMounted } from 'vue'
import { addPlacesSource, addPlacesLayer } from './index'
import { Point } from 'geojson'
import gsap from 'gsap'

defineOptions({ name: 'DisplayPopup' })

const { map, container } = useMapbox(false)
const mapboxContainerWrapperRef = ref<HTMLDivElement>()

map.setStyle('mapbox://styles/mapbox/streets-v12')
map.setCenter([-77.04, 38.907])
map.setZoom(11.15)

// Map mounted
onMounted(() => {
    const firstChild = mapboxContainerWrapperRef.value.firstChild
    mapboxContainerWrapperRef.value?.insertBefore(container, firstChild)
    map.resize()
})
map.on('style.load', () => {
    const placesSourceId = addPlacesSource(map)
    const placesLaygerId = addPlacesLayer(map, placesSourceId)

    const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false,
        offset: 20,
        className: 'hovered-popup',
    })

    popup.on('open', () =>
        gsap.fromTo(
            popup.getElement(),
            { opacity: 0 },
            { duration: 1, opacity: 1 }
        )
    )

    map.on('mouseenter', placesLaygerId, (e) => {
        map.getCanvas().style.cursor = 'default'
        const coordinates = (<Point>e.features[0].geometry).coordinates
        const description = e.features[0].properties.description

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        popup
            .setLngLat(<[number, number]>coordinates)
            .setHTML(description)
            .addTo(map)
    })

    map.on('mouseleave', placesLaygerId, () => {
        map.getCanvas().style.cursor = ''
        // popup.remove()
    })
})
</script>

<template>
    <div class="mapbox-container-wrapper" ref="mapboxContainerWrapperRef"></div>
</template>

<style scoped>
.mapbox-container-wrapper {
    width: 100%;
    height: 100%;
}
</style>
