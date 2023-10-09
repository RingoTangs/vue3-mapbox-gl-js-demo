import { DrawCustomMode } from '@mapbox/mapbox-gl-draw'

type State = { count: number }

type Options = { count: number }

export const DrawLotsPoint: DrawCustomMode<State, Options> = {
    onSetup(options) {
        return {
            count: options.count || 0,
        }
    },
    onClick(state, e) {
        const point = this.newFeature({
            type: 'Feature',
            properties: {
                count: state.count,
            },
            geometry: {
                type: 'Point',
                coordinates: [e.lngLat.lng, e.lngLat.lat],
            },
        })
        console.log(this)
        this.addFeature(point)
    },
    toDisplayFeatures(_, geojson, display) {
        display(geojson)
    },
}
