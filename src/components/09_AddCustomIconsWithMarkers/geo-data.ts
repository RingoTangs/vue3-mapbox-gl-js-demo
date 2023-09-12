export const geoJson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {
                message: 'Foo',
                iconSize: [60, 60],
            },
            geometry: {
                type: 'Point',
                coordinates: [-66.324462, -16.024695],
            },
        },
        {
            type: 'Feature',
            properties: {
                message: 'Bar',
                iconSize: [50, 50],
            },
            geometry: {
                type: 'Point',
                coordinates: [-61.21582, -15.971891],
            },
        },
        {
            type: 'Feature',
            properties: {
                message: 'Baz',
                iconSize: [40, 40],
            },
            geometry: {
                type: 'Point',
                coordinates: [-63.292236, -18.281518],
            },
        },
    ],
}
