import 'mapbox-gl'

declare module 'mapbox-gl' {
    import { type ComponentPublicInstance } from 'vue'
    interface Map {
        properties: { vc?: ComponentPublicInstance }
    }
}
