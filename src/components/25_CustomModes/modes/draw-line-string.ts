import MapboxDraw from '@mapbox/mapbox-gl-draw'
import type { Feature, LineString } from 'geojson'
import type {
    DrawLineString,
    MapMouseEvent,
    DrawCustomModeThis,
} from '@mapbox/mapbox-gl-draw'

const doubleClickZoom = MapboxDraw.lib.doubleClickZoom
const isEventAtCoordinates = MapboxDraw.lib.isEventAtCoordinates
const commonSelectors = MapboxDraw.lib.CommonSelectors
const createVertex = MapboxDraw.lib.createVertex

const Constants = MapboxDraw.constants

type State = {
    line: DrawLineString
    currentVertexPosition: number
    direction: 'forward' | 'backwards'
}

const _clickAnyWhere = (
    _this: DrawCustomModeThis,
    state: State,
    e: MapMouseEvent
) => {
    // prettier-ignore
    if (
        (state.currentVertexPosition > 0 && isEventAtCoordinates(e, state.line.coordinates[state.currentVertexPosition - 1])) ||
        (state.direction === 'backwards' && isEventAtCoordinates(e, state.line.coordinates[state.currentVertexPosition + 1]))
    ) {
        _this.changeMode('simple_select', { featureIds: [state.line.id] })
        return 
    }

    _this.updateUIClasses({ mouse: Constants.cursors.ADD })
    state.line.updateCoordinate(`${state.currentVertexPosition}`, e.lngLat.lng, e.lngLat.lat); // prettier-ignore
    if (state.direction === 'forward') {
        state.currentVertexPosition++
        state.line.updateCoordinate(`${state.currentVertexPosition}`, e.lngLat.lng, e.lngLat.lat) // prettier-ignore
    } else {
        state.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat)
    }
}

const _clickOnVertex = (_this: DrawCustomModeThis, state: State) => {
    _this.changeMode('simple_select', { featureIds: [state.line.id] }) // prettier-ignore
}

const drawLineString: MapboxDraw.DrawCustomMode<State, never> = {
    onSetup() {
        const currentVertexPosition = 0
        const direction = 'forward'

        const line = this.newFeature({
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: [],
            },
        }) as DrawLineString
        this.addFeature(line)

        this.clearSelectedFeatures()
        doubleClickZoom.disable(this)
        this.updateUIClasses({ mouse: Constants.cursors.ADD })
        this.setActionableState({
            trash: true,
            combineFeatures: false,
            uncombineFeatures: false,
        })
        return {
            line,
            currentVertexPosition,
            direction,
        }
    },
    onClick(state, e) {
        console.log(e.featureTarget)
        if (commonSelectors.isVertex(e)) {
            _clickOnVertex(this, state)
            return
        }
        _clickAnyWhere(this, state, e)
    },
    onMouseMove(state, e) {
        // prettier-ignore
        state.line.updateCoordinate(`${state.currentVertexPosition}`, e.lngLat.lng, e.lngLat.lat);
        if (commonSelectors.isVertex(e)) {
            this.updateUIClasses({ mouse: Constants.cursors.POINTER })
        }
    },
    onKeyUp(state, e) {
        if (commonSelectors.isEnterKey(e)) {
            this.changeMode('simple_select', { featureIds: [state.line.id] })
        } else if (commonSelectors) {
            this.deleteFeature(state.line.id as string, { silent: true })
            this.changeMode('simple_select')
        }
    },
    toDisplayFeatures(state, geojson: Feature<LineString>, display) {
        const isActiveLine = geojson.properties.id === state.line.id
        geojson.properties.active = isActiveLine
            ? Constants.activeStates.ACTIVE
            : Constants.activeStates.INACTIVE
        if (!isActiveLine) return display(geojson)
        // Only render the line if it has at least one real coordinate
        if (geojson.geometry.coordinates.length < 2) return
        geojson.properties.meta = Constants.meta.FEATURE
        display(
            createVertex(
                state.line.id as string,
                geojson.geometry.coordinates[
                    state.direction === 'forward'
                        ? geojson.geometry.coordinates.length - 2
                        : 1
                ],
                `${
                    state.direction === 'forward'
                        ? geojson.geometry.coordinates.length - 2
                        : 1
                }`,
                false
            )
        )
        display(geojson)
    },
}

export default drawLineString
