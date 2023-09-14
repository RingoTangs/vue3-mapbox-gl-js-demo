# 说明
项目模板：Vue Vite Base
模板链接：https://github.com/RingoTangs/vue-vite-base

# Mapbox GL JS 组件的使用

```vue
<script setup lang="ts">
import Mapbox from 'src/components/mapbox/Mapbox.vue'
</script>

<template>
   <Mapbox></Mapbox>
</template>
```
以上是 Mapbox 组件的基本使用。

Mapbox组件可以传入属性，如下所示：

```typescript
type Props = {
    options?: MapboxOptions

    /**
     * zoom 优先级高于 options.zoom
     */
    zoom?: number
    initFog?: boolean
    navCtr?: boolean | NavigationControlOptions
    fullScreenCtr?: boolean | FullScreenControlOptions
}
```

`zoom、navCtr、fullScreenCtr` 使用 `watchEffect` 实现了响应式。



# 获取Map实例

Mapbox 组件封装了 Vue3 的 `provide、inject` API。

```vue
// Hello.vue
<script setup lang="ts">
import Mapbox from 'src/components/mapbox/Mapbox.vue'
import Child from './Child.vue'
</script>

<template>
   <Mapbox>
       <Child></Child>
   </Mapbox>
</template>
```

```vue
// Child.vue
<script setup lang="ts">
import Mapbox from 'src/components/mapbox/Mapbox.vue'
import { useMap } from 'src/components/mapbox/context.ts'
const map = useMap()
</script>

<template>
   <h1>Child</h1>
</template>
```
这样设计，在子组件中就可以获取到 Map 实例。

注意：在 Mapbox 的子组件中不一定要有UI部分，可以直接在 setup 中写业务，这个组件定义为业务组件。
同时，可以使用业务组件包裹一个UI组件，目的是在 setup 中可以更好的获取 Map 实例。