<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useFolderStore } from 'stores/folderStore'

const folderStore = useFolderStore()
const folders = computed(() => folderStore.list)
onMounted(() => {
  folderStore.loadItems()
})
</script>

<template>
  <q-separator />
  <q-list>
    <div class="flex content-between">
      <q-item-label header class="col">
        Папки
      </q-item-label>
      <q-item-section side class="col-auto">
        <q-btn size="sm" icon="add" round />
      </q-item-section>
    </div>
    <template v-if="folders.length">
      <q-item v-for="folder in folders" :key="folder.id">
        <q-item-section avatar>
          <q-icon icon="folder" />
        </q-item-section>
        <q-item-section>
          {{ folder.name }}
        </q-item-section>
      </q-item>
    </template>
    <template v-else>
      <q-item>
        <q-item-section class="bg-grey-2 q-pa-md text-center text-subtitle2">
          <p>Упорядочьте quantums по темам и поделитесь им со своей командой</p>

          <a href="#">Создать папку или присоединиться к ней</a>
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<style scoped>

</style>
