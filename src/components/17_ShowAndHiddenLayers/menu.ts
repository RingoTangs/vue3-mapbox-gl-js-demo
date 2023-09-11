import { Map } from 'mapbox-gl'
import { ref } from 'vue'
import { isLayerVisible } from '@/utils/mapbox-util.ts'

const useActive = (map: Map) => {
    const contoursActiveRef = ref(false)
    const museumsActiveRef = ref(false)

    map.on('idle', () => {
        contoursActiveRef.value = isLayerVisible(map, 'contours')
        museumsActiveRef.value = isLayerVisible(map, 'museums')
    })

    return { contoursActiveRef, museumsActiveRef }
}

export { useActive }
