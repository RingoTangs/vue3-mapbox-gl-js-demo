import { ref } from 'vue'
import { Threebox } from 'threebox-plugin'
import mapboxgl from 'mapbox-gl'

export const createThreebox = (
    map: mapboxgl.Map,
    options = {},
    layerId = 'custom-layer'
) => {
    const tb = ref(null)

    // 这里必须要写 style.load 否则无法选中
    map.on('style.load', () => {
        map.addLayer({
            id: layerId,
            type: 'custom',
            renderingMode: '3d',
            onAdd: (map, gl) => {
                tb.value = window.tb = new Threebox(map, gl, options)
                map.fire('threebox.init', { tb })
                console.log('threebox 初始化成功！')
            },
            render: () => window.tb.update(),
        })
    })
    return (executor: () => void, failCallback?: (msg: string) => void) => {
        if (tb.value) {
            executor()
        } else {
            const msg = 'Threebox还没有初始化'
            failCallback?.(msg)
            console.error(msg)
        }
    }
}
