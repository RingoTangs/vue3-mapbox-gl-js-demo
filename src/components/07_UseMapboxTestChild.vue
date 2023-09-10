<script setup lang="ts">
import { inject } from 'vue'
import { injectionKeyMap } from '@/mapbox'

const map = inject(injectionKeyMap)
console.log(map)
</script>
