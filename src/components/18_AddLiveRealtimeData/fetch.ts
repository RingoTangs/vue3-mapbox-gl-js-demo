import GeoJSON from 'geojson'

type GetLocationResponse = GeoJSON.FeatureCollection<GeoJSON.Point>

async function getLocation(): Promise<GetLocationResponse> {
    const response = await fetch(
        'https://api.wheretheiss.at/v1/satellites/25544',
        { method: 'GET' }
    )
    const { latitude, longitude } = await response.json()
    return {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
                properties: {},
            },
        ],
    }
}

export { type GetLocationResponse, getLocation }
