<script setup lang="ts">
import Mapbox from './Mapbox.vue'
import MapboxContextHolderTest from './MapboxContextHolderTest.vue'
import { ref } from 'vue'

const initFogRef = ref(true)
const zoomRef = ref(1)
const centerRef = ref([115, 37])
const enableNavCtrRef = ref(true)
const enableFullScreenCtrRef = ref(true)
const bearingRef = ref(0)
const pitchRef = ref(0)
</script>

<template>
    <div class="mapbox-test">
        <div class="mapbox-wrapper">
            <Mapbox
                id="HelloMapbox"
                :init-fog="initFogRef"
                v-model:zoom="zoomRef"
                :center="centerRef"
                :nav-ctr="enableNavCtrRef"
                :full-screen-ctr="enableFullScreenCtrRef"
                :bearing="bearingRef"
                :pitch="pitchRef"
            >
            </Mapbox>
            <MapboxContextHolderTest />
        </div>
        <div class="operates">
            <!-- Init Fog-->
            <section>
                <label for="init-fog-select">Init Fog</label>
                <select id="init-fog-select" v-model="initFogRef">
                    <option :value="true">true</option>
                    <option :value="false">false</option>
                </select>
            </section>

            <!-- Zoom -->
            <section>
                <label for="zoom-range">Zoom Range</label>
                <input
                    id="zoom-range"
                    type="range"
                    min="1"
                    max="10"
                    v-model.number="zoomRef"
                    step="0.1"
                />
                {{ zoomRef.toFixed(2) }}
            </section>

            <!-- Center -->
            <section>
                <label for="center-longitude">center longitude</label>
                <input
                    id="center-longitude"
                    type="range"
                    min="-180"
                    max="180"
                    v-model.number="centerRef[0]"
                />
                <label for="center-latitude">center latitude</label>
                <input
                    id="center-latitude"
                    type="range"
                    min="-90"
                    max="90"
                    v-model.number="centerRef[1]"
                />
            </section>

            <!-- Navigation Control -->
            <section>
                <label for="nav-ctr-switch">Enable Navigation Control</label>
                <input
                    id="nav-ctr-switch"
                    type="checkbox"
                    v-model="enableNavCtrRef"
                />
            </section>

            <!-- Full Screen Control -->
            <section>
                <label for="full-screen-ctr-switch">
                    Enable Full Screen Control
                </label>
                <input
                    id="full-screen-ctr-switch"
                    type="checkbox"
                    v-model="enableFullScreenCtrRef"
                />
            </section>

            <!-- Bearing -->
            <section>
                <label for="set-bearing">Set Bearing</label>
                <input
                    id="set-bearing"
                    type="range"
                    min="0"
                    max="100"
                    v-model.number="bearingRef"
                />
                {{ bearingRef }}
            </section>

            <!-- Pitch -->
            <section>
                <label for="set-pitch">Set Pitch</label>
                <input
                    id="set-pitch"
                    type="range"
                    min="0"
                    max="100"
                    v-model.number="pitchRef"
                />
                {{ pitchRef }}
            </section>
        </div>
    </div>
</template>

<style scoped>
.mapbox-test {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
}

.mapbox-wrapper {
    flex: auto;
}

.operates {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.operates > section {
    margin: 20px;
}
</style>
