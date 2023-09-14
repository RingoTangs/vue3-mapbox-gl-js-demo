import geojson from './geo.geojson?raw'
import mapboxgl, { Popup } from 'mapbox-gl'
import { Point } from 'geojson'
import gsap from 'gsap'

export const SOURCE_ID = 'places-source-id'
export const LAYER_ID = 'places-layer-id'

// console.log(JSON.parse(geojson))

export const addPlacesSource = (map: mapboxgl.Map) => {
    map.addSource(SOURCE_ID, {
        type: 'geojson',
        data: JSON.parse(geojson),
    })
}

export const addPlacesLayer = (map: mapboxgl.Map) => {
    if (!map.getSource(SOURCE_ID)) {
        throw new Error(`${SOURCE_ID} Not Found.`)
    }
    map.addLayer({
        id: LAYER_ID,
        type: 'symbol',
        source: SOURCE_ID,
        layout: {
            'icon-image': ['get', 'icon'], // Expression 获取 properties 中的 icon 属性
            'icon-allow-overlap': true, // 当图标重叠的时候是否显示
            'icon-size': 2,
        },
    })
}

export const onMouse = (map: mapboxgl.Map) => {
    const canvas = map.getCanvas()
    map.on('mouseenter', LAYER_ID, () => (canvas.style.cursor = 'pointer'))
    map.on('mouseleave', LAYER_ID, () => (canvas.style.cursor = ''))
    map.on('click', LAYER_ID, (e) => {
        const feature = e.features[0]
        const popup = new Popup()
            .setHTML(feature.properties['description'])
            .setLngLat(
                (feature.geometry as Point).coordinates as [number, number]
            )
            .setOffset(10)
            .addTo(map)
        gsap.fromTo(popup.getElement(), { opacity: 0 }, { opacity: 1 })
    })
}
