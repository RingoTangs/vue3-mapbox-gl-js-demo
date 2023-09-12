import { EventData, MapEventType } from 'mapbox-gl'

export type Event<T extends keyof MapEventType> = MapEventType[T] & EventData
