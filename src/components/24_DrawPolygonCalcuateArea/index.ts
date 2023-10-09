import MapboxDraw from '@mapbox/mapbox-gl-draw'
import mapboxgl from 'mapbox-gl'
import drawPointMode from './modes/draw-point'

export const useDraw = (map: mapboxgl.Map) => {
    const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
            point: true,
            trash: true,
        },
        modes: {
            draw_point_mode: drawPointMode,
            ...MapboxDraw.modes,
        },
    })
    map.addControl(draw)

    const updateArea = (e: any) => {
        console.log(e.type, draw.getAll())
    }

    map.on('draw.create', updateArea)
    map.on('draw.delete', updateArea)
    map.on('draw.update', updateArea)

    console.log('draw', draw)

    return draw
}
