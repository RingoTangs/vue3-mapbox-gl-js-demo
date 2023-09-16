import 'mapbox-gl'

declare module 'mapbox-gl' {
    interface Map {
        properties: { [key: string]: unknown }
    }
}
