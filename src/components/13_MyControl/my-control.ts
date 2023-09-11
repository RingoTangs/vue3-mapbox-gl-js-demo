import { IControl } from 'mapbox-gl'
import { VNode, h, render } from 'vue'
import MyControlConstructor from './MyControl.vue'

class MyControl implements IControl {
    private _el: HTMLElement
    private _vode: VNode

    onAdd(): HTMLElement {
        const el = document.createElement('div')
        el.classList.add('mapboxgl-ctrl', 'mapboxgl-ctrl-group')
        const vnode = h(MyControlConstructor)
        render(vnode, el)
        this._el = el
        this._vode = vnode
        return el
    }

    onRemove(): void {
        render(this._vode, null)
        this._el.remove()
        this._vode = null
        this._el = null
    }
}

export { MyControl }
