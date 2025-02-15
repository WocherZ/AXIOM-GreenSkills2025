<script setup lang="ts">
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const keys = computed(() => Object.keys($q).map(item => item))

const key = ref(keys.value[0])
const value = computed(() => key.value ?? $q[key.value])
</script>

<template>
  <div class="flex ">
    <div class="col auto">
      <pre>$q.</pre>
    </div>
    <div class="col">
      <q-select outlined v-model="key" :options="keys" label="Outlined"/>
      <pre>{{ key }}</pre>
    </div>
    <div class="col">
      <pre>{{ value }}</pre>
    </div>
  </div>

</template>

<style scoped>

</style>
