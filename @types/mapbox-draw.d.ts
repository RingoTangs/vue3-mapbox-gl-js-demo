import '@mapbox/mapbox-gl-draw'

declare module '@mapbox/mapbox-gl-draw' {
    interface DrawModes {
        DRAW_POINT_MODE: 'draw_point_mode'
        DRAW_LINE_STRING_MODE: 'draw_line_string_mode'
        DRAW_POLYGON_MODE: 'draw_polygon_mode'
    }
}
