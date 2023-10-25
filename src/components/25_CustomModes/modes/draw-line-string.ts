// import MapboxDraw from '@mapbox/mapbox-gl-draw'

// const drawLineString: MapboxDraw.DrawCustomMode = {
//     onSetup(opts) {
//         opts = opts || {}
//         const featureId = opts.featureId

//         let line, currentVertexPosition
//         const direction = 'forward'

//         if (featureId) {
//             line = this.getFeature(featureId)
//             if (!line) {
//                 throw new Error(
//                     'Could not find a feature with the provided featureId'
//                 )
//             }
//             let from = opts.from
//             if (
//                 from &&
//                 from.type === 'Feature' &&
//                 from.geometry &&
//                 from.geometry.type === 'Point'
//             ) {
//                 from = from.geometry
//             }
//             if (
//                 from &&
//                 from.type === 'Point' &&
//                 from.coordinates &&
//                 from.coordinates.length === 2
//             ) {
//                 from = from.coordinates
//             }
//             if (!from || !Array.isArray(from)) {
//                 throw new Error(
//                     'Please use the `from` property to indicate which point to continue the line from'
//                 )
//             }

//             const lastCoord = line.coordinates.length - 1
//         }
//     },
// }

// export default drawLineString

export default {}
