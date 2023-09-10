import { h, render } from 'vue'
import IconConstructor from './Icon.vue'
import { IconProps } from './icon'

const createIcon = (el: HTMLElement, props: IconProps) => {
    const vnode = h(IconConstructor, props)
    render(vnode, el)
}

export { createIcon }
