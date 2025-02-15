<script setup lang="ts">
import { useUserStore } from 'stores/userStore'
import { computed } from 'vue'

const userStore = useUserStore()
const user = computed(() => userStore.profile)
</script>

<template>
  <q-list>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-avatar color="primary" text-color="white" size="2rem">
          {{ user?.firstName.slice(0, 1) }}{{user?.lastName.slice(0, 1) }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ user?.firstName }} {{user?.lastName }}</q-item-label>
        <q-item-label caption lines="1">FREE</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>

</template>

<style scoped>

</style>
