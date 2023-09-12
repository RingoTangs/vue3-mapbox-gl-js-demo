import { inject, type InjectionKey, provide } from 'vue'
import mapboxgl from 'mapbox-gl'

const INJECTION_KEY_MAP: InjectionKey<mapboxgl.Map> = Symbol()

const provideMap = (map: mapboxgl.Map) => provide(INJECTION_KEY_MAP, map)

const useMap = () => inject(INJECTION_KEY_MAP)

export { INJECTION_KEY_MAP, provideMap, useMap }
