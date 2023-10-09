import MapboxDraw, { DrawCustomMode, DrawPoint } from '@mapbox/mapbox-gl-draw'

const drawPonit: DrawCustomMode<{ point: DrawPoint }> = {
    onSetup() {
        const point = this.newFeature({
            type: MapboxDraw.constants.geojsonTypes.FEATURE,
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [],
            },
        }) as DrawPoint
        this.addFeature(point)

        this.clearSelectedFeatures()
        this.updateUIClasses({ mouse: MapboxDraw.constants.cursors.ADD })
        // this.activateUIButton(MapboxDraw.constants.types.POINT)

        this.setActionableState({
            trash: true,
            combineFeatures: false,
            uncombineFeatures: false,
        })

        return { point }
    },

    onTrash(state) {
        this.deleteFeature(state.point.id as string, { silent: true })
        this.changeMode(MapboxDraw.constants.modes.SIMPLE_SELECT)
    },

    onClick(state, e) {
        this.updateUIClasses({ mouse: MapboxDraw.constants.cursors.MOVE })
        state.point.updateCoordinate('', e.lngLat.lng, e.lngLat.lat)
        this.map.fire(MapboxDraw.constants.events.CREATE, {
            features: [state.point.toGeoJSON()],
        })
        this.changeMode(MapboxDraw.constants.modes.SIMPLE_SELECT, {
            featureIds: [state.point.id],
        })
    },

    toDisplayFeatures(_, geojson, display) {
        display(geojson)
    },
}

export default drawPonit
