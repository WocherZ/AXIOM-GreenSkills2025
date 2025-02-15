<script setup lang="ts">
import { ref } from 'vue'

const queryText = ref<string | null>(null)

</script>

<template>
  <q-list>
    <q-item>
      <q-item-section>
        <q-input outlined bottom-slots v-model="queryText" label="Перейти к">
          <template v-slot:prepend>
            <q-icon name="search"/>
          </template>
          <template v-slot:append>
            <q-chip square>⌘+K</q-chip>
          </template>
        </q-input>
      </q-item-section>
    </q-item>
  </q-list>

</template>

<style scoped>

</style>
