import { inject, type InjectionKey, provide } from 'vue'
import mapboxgl from 'mapbox-gl'

const INJECTION_KEY_MAP: InjectionKey<mapboxgl.Map> = Symbol()

const provideMap = (map: mapboxgl.Map) => provide(INJECTION_KEY_MAP, map)

const useMap = () => inject(INJECTION_KEY_MAP)

const mapboxContextHolder = () => {
    const holder: { [id: string]: mapboxgl.Map } = {}
    const setMap = (id: string, map: mapboxgl.Map) => {
        if (holder[id]) {
            throw new Error('mapbox context holder has exists id: ' + id)
        }
        holder[id] = map
    }
    const getMap = (id: string): mapboxgl.Map | undefined => holder[id]

    return {
        setMap,
        getMap,
    }
}

const MAPBOX_CONTEXT_HOLDER = mapboxContextHolder()

export { INJECTION_KEY_MAP, MAPBOX_CONTEXT_HOLDER, provideMap, useMap }
