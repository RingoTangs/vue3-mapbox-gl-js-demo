import type { DrawCustomMode, DrawPolygon } from '@mapbox/mapbox-gl-draw'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import type { Feature, Polygon } from 'geojson'

type State = { polygon: DrawPolygon; currentVertexPosition: number }

const { doubleClickZoom, CommonSelectors, isEventAtCoordinates, createVertex } =
    MapboxDraw.lib
const Constants = MapboxDraw.constants

const DrawPolygon: DrawCustomMode<State, never> = {
    onSetup() {
        // create polygon, add the feature to draw
        const polygon = this.newFeature({
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Polygon',
                coordinates: [[]],
            },
        }) as DrawPolygon

        this.addFeature(polygon)

        this.clearSelectedFeatures()
        doubleClickZoom.disable(this)
        this.updateUIClasses({ mouse: Constants.cursors.ADD })
        this.setActionableState({
            trash: true,
            combineFeatures: false,
            uncombineFeatures: false,
        })

        return {
            polygon,
            currentVertexPosition: 0,
        }
    },
    onMouseMove(state, e) {
        state.polygon.updateCoordinate(
            `0.${state.currentVertexPosition}`,
            e.lngLat.lng,
            e.lngLat.lat
        )
        if (CommonSelectors.isVertex(e)) {
            this.updateUIClasses({ mouse: Constants.cursors.POINTER })
        }
    },
    onClick(state, e) {
        if (CommonSelectors.isVertex(e)) {
            this.changeMode('simple_select', { featureId: [state.polygon.id] })
            return
        }
        // GeoJSON Polygon Example
        // https://datatracker.ietf.org/doc/html/rfc7946#autoid-44
        if (
            state.currentVertexPosition > 0 &&
            // 判断点击的这个点坐标和 Polygon Vertex 坐标相等
            isEventAtCoordinates(
                e,
                state.polygon.coordinates[0][state.currentVertexPosition - 1]
            )
        ) {
            this.changeMode('simple_select', { featureIds: [state.polygon.id] })
            return
        }

        // add polygon vertex really
        this.updateUIClasses({ mouse: Constants.cursors.ADD })
        state.polygon.updateCoordinate(
            `0.${state.currentVertexPosition}`,
            e.lngLat.lng,
            e.lngLat.lat
        )

        state.currentVertexPosition++

        // 这个坐标就是方便 MouseMove 的时候更新
        state.polygon.updateCoordinate(
            `0.${state.currentVertexPosition}`,
            e.lngLat.lng,
            e.lngLat.lat
        )
    },
    onKeyUp(state, e) {
        if (CommonSelectors.isEscapeKey(e)) {
            this.deleteFeature(state.polygon.id as string, { silent: true })
            this.changeMode('simple_select')
        } else if (CommonSelectors.isEnterKey(e)) {
            this.changeMode('simple_select', { featuresIds: [state.polygon.id] }) // prettier-ignore
        }
    },
    onStop(state) {
        // 退出当前模式的时候触发
        this.updateUIClasses({ mouse: Constants.cursors.NONE })
        doubleClickZoom.enable(this)

        // check to see if we've deleted this feature
        if (!this.getFeature(state.polygon.id as string)) return

        // remove last added coordinate
        state.polygon.removeCoordinate(`0.${state.currentVertexPosition}`)

        // created valid polygon fire CREATE event, or not delete the feature
        if (state.polygon.isValid()) {
            this.map.fire(Constants.events.CREATE, { features: [state.polygon.toGeoJSON()] }) // prettier-ignore
        } else {
            this.deleteFeature(state.polygon.id as string, { silent: true })
            this.changeMode('simple_select', {}, { silent: true })
        }
    },
    toDisplayFeatures(state, geojson: Feature<Polygon>, display) {
        const isActivePolygon = geojson.properties.id === state.polygon.id
        geojson.properties.active = isActivePolygon
            ? Constants.activeStates.ACTIVE
            : Constants.activeStates.INACTIVE
        if (!isActivePolygon) {
            display(geojson)
            return
        }

        // Don't render a polygon until it has two positions
        // (and a 3rd which is just the first repeated)
        if (geojson.geometry.coordinates.length === 0) return
        const coordinateCount = geojson.geometry.coordinates[0].length
        // 2 coordinates after selecting a draw type
        // 3 after creating the first point
        if (coordinateCount < 3) {
            return
        }

        geojson.properties.meta = Constants.meta.FEATURE

        // 每次渲染都要在 polygon 的起点绘制顶点
        display(
            createVertex(
                state.polygon.id as string,
                geojson.geometry.coordinates[0][0],
                `0.0`,
                false
            )
        )
        console.log(JSON.stringify(geojson.geometry.coordinates[0]))
        if (coordinateCount > 3) {
            // Add a start position marker to the map, clicking on this will finish the feature
            // This should only be shown when we're in a valid spot
            const endPos = geojson.geometry.coordinates[0].length - 3

            // 在 polygon 最后一次标注顶点的位置绘制顶点
            display(
                createVertex(
                    state.polygon.id as string,
                    geojson.geometry.coordinates[0][endPos],
                    `0.${endPos}`,
                    false
                )
            )
        }
        if (coordinateCount <= 4) {
            // If we've only drawn two positions (plus the closer),
            // make a LineString instead of a Polygon
            const lineCoordinates = [
                [
                    geojson.geometry.coordinates[0][0][0],
                    geojson.geometry.coordinates[0][0][1],
                ],
                [
                    geojson.geometry.coordinates[0][1][0],
                    geojson.geometry.coordinates[0][1][1],
                ],
            ]
            // create an initial vertex so that we can track the first point on mobile devices
            display({
                type: Constants.geojsonTypes.FEATURE,
                properties: geojson.properties,
                geometry: {
                    coordinates: lineCoordinates,
                    type: Constants.geojsonTypes.LINE_STRING,
                },
            })
            if (coordinateCount === 3) {
                return
            }
        }
        display(geojson)
    },
    onTrash(state) {
        this.deleteFeature(state.polygon.id as string, { silent: true })
        this.changeMode('simple_select')
    },
}

export default DrawPolygon
