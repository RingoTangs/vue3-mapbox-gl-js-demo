/**
 * 链接：
 * https://stackoverflow.com/questions/70895690/ts2307-cannot-find-module-app-vue-or-its-corresponding-type-declarations
 */
/* eslint-disable */
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
