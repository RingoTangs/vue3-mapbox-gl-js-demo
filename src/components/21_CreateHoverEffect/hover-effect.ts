import mapboxgl from 'mapbox-gl'

const US_STATES_GEO_JSON_SOURCE_ID = 'us-states-geo-json-source'
const US_STATES_FILL_LAYER_ID = 'us-states-fills-layer'
const US_STATES_BORDER_LAYER_ID = 'us-states-border-layer'

const addLayers = (map: mapboxgl.Map) => {
    map.addSource(US_STATES_GEO_JSON_SOURCE_ID, {
        type: 'geojson',
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson',
    })
    map.addLayer({
        id: US_STATES_FILL_LAYER_ID,
        type: 'fill',
        source: US_STATES_GEO_JSON_SOURCE_ID,
        paint: {
            'fill-color': '#627BC1',
            // case 语法：["case",
            //     condition: boolean, output: OutputType,
            //     condition: boolean, output: OutputType,
            //     ...,
            //     fallback: OutputType
            // ]: OutputType
            // feature-state 语法：["feature-state", string]: value
            // boolean 语法：["boolean", value, fallback: value, fallback: value, ...]: boolean
            // prettier-ignore
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false], 1,
                0.5,
            ],
        },
    })
    map.addLayer({
        id: US_STATES_BORDER_LAYER_ID,
        type: 'line',
        source: US_STATES_GEO_JSON_SOURCE_ID,
        paint: {
            'line-color': '#627BC1',
            // 'line-color': [
            //     'case',
            //     ['boolean', ['feature-state', 'hover'], false], 'red',
            //     '#627BC1'
            // ],
            'line-width': 2,
        },
    })
}

const addOperation = (map: mapboxgl.Map) => {
    let hoveredPolygonId: string | number = null
    map.on('mousemove', US_STATES_FILL_LAYER_ID, (e) => {
        if (e.features.length) {
            if (hoveredPolygonId !== null) {
                map.setFeatureState(
                    {
                        source: US_STATES_GEO_JSON_SOURCE_ID,
                        id: hoveredPolygonId,
                    },
                    { hover: false }
                )
            }
            hoveredPolygonId = e.features[0].id
            map.setFeatureState(
                { source: US_STATES_GEO_JSON_SOURCE_ID, id: hoveredPolygonId },
                { hover: true }
            )
        }
    })

    map.on('mouseleave', US_STATES_FILL_LAYER_ID, () => {
        if (hoveredPolygonId !== null) {
            map.setFeatureState(
                { source: US_STATES_GEO_JSON_SOURCE_ID, id: hoveredPolygonId },
                { hover: false }
            )
        }
        hoveredPolygonId = null
    })
}

export { addLayers, addOperation }
