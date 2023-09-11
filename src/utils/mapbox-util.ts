import { Map } from 'mapbox-gl'

/**
 * Layer 是否可见
 */
function isLayerVisible(map: Map, layerId: string) {
    return map.getLayoutProperty(layerId, 'visibility') === 'visible'
}

/**
 * 设置 Layer 的可见性
 */
function setLayerVisible(map: Map, layerId: string, visible: boolean) {
    map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none')
}

export { isLayerVisible, setLayerVisible }
