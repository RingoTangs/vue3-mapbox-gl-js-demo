import { type InjectionKey } from 'vue'
import mapboxgl from 'mapbox-gl'

const ACCESS_TOKEN =
    'pk.eyJ1Ijoic2luZ3JhaW55YW5nODA4NiIsImEiOiJjbGxvcG9xNHgwYmRjM3Fwb2Q3eHF3cmJvIn0.W_onlq_G0GGN4Wcf_SZCzg'

mapboxgl.accessToken = ACCESS_TOKEN

function mapInit(container: HTMLElement | string) {
    const map = new mapboxgl.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 1, // starting zoom
    })
    map.on('styledata', () => {
        map.setFog({
            color: 'rgb(186, 210, 235)', // Lower atmosphere
            'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
            'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
            'space-color': 'rgb(11, 11, 25)', // Background color
            'star-intensity': 0.6, // Background star brightness (default 0.35 at low zoooms )
        })
    })
    return map
}

function useMapbox() {
    const container = document.createElement('div')
    container.classList.add('mapbox-container')
    container.style.width = '100%'
    container.style.height = '100%'
    const map = new mapboxgl.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 1, // starting zoom
    })
    // map.getCanvas().style.width = document.body.clientWidth + 'px'
    // map.getCanvas().style.height = document.body.clientHeight + 'px'

    map.on('style.load', () => {
        map.setFog({
            color: 'rgb(186, 210, 235)', // Lower atmosphere
            'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
            'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
            'space-color': 'rgb(11, 11, 25)', // Background color
            'star-intensity': 0.6, // Background star brightness (default 0.35 at low zoooms )
        })
    })
    return { map, container }
}

const injectionKeyMap: InjectionKey<mapboxgl.Map> = Symbol()

export { mapboxgl, mapInit, useMapbox, injectionKeyMap }
