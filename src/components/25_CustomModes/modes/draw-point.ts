import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { Feature } from 'geojson'

export type State = { point: MapboxDraw.DrawPoint }

const DrawPoint: MapboxDraw.DrawCustomMode<State> = {
    // Triggered while a mode is being transitioned into.
    onSetup() {
        // 1: 将 GeoJSON 转为 DrawFeature 对象
        const point = this.newFeature({
            type: MapboxDraw.constants.geojsonTypes.FEATURE,
            properties: {},
            geometry: {
                type: MapboxDraw.constants.geojsonTypes.POINT,
                coordinates: [],
            },
        }) as MapboxDraw.DrawPoint

        // 2：DrawFeature 对象加入到 Draw 中
        // addFeature 方法会触发 toDisplayFeatures 方法
        this.addFeature(point)

        this.clearSelectedFeatures()
        this.updateUIClasses({ mouse: MapboxDraw.constants.cursors.ADD })

        this.setActionableState({
            trash: false,
            combineFeatures: false,
            uncombineFeatures: false,
        })

        return { point }
    },
    onClick(state, e) {
        this.updateUIClasses({ mouse: MapboxDraw.constants.cursors.MOVE })
        state.point.updateCoordinate('', e.lngLat.lng, e.lngLat.lat)
        this.map.fire(MapboxDraw.constants.events.CREATE, {
            features: state.point.toGeoJSON,
        })
        this.changeMode(MapboxDraw.constants.modes.SIMPLE_SELECT, {
            featureIds: [state.point.id],
        })
    },
    onTap(state, e) {
        this.updateUIClasses({ mouse: MapboxDraw.constants.cursors.MOVE })
        state.point.updateCoordinate('', e.lngLat.lng, e.lngLat.lat)
        this.map.fire(MapboxDraw.constants.events.CREATE, {
            features: state.point.toGeoJSON,
        })
        this.changeMode(MapboxDraw.constants.modes.SIMPLE_SELECT, {
            featureIds: [state.point.id],
        })
    },

    // Triggered when the mode is being exited, to be used for cleaning up artifacts such as invalid features
    onStop(state) {
        // 如果创建的点没有坐标就删掉
        if (!state.point.getCoordinate().length) {
            this.deleteFeature(state.point.id as string, { silent: true })
        }
    },

    /**
     * 切换模式后，有哪些 feature 需要渲染
     * 每个 Feature 渲染的时候触发(每个 Feature 都会触发)
     * Triggered per feature on render to convert raw features into set of features for display on the map See styling draw for information about what geojson properties Draw uses as part of rendering.
     */
    toDisplayFeatures(state, geojson: Feature, display) {
        // console.log(state, geojson)
        const isActivePoint = geojson.properties.id === state.point.id
        geojson.properties.active = isActivePoint
            ? MapboxDraw.constants.activeStates.ACTIVE
            : MapboxDraw.constants.activeStates.INACTIVE
        if (!isActivePoint) {
            return display(geojson)
        }
    },

    // Triggered when draw.trash() is called.
    onTrash(state) {
        console.log('trash')
        this.deleteFeature(state.point.id as string, { silent: true })
        this.changeMode(MapboxDraw.constants.modes.SIMPLE_SELECT)
    },
}

export default DrawPoint
