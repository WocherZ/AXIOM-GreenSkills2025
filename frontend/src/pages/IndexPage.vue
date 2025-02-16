<template>
  <q-page padding>
    <div class="container q-mx-auto">
      <div class="text-h6 q-px-md">Quantums</div>
      <CardList :items="docsList" :loading="loading"/>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useDocsStore } from 'src/stores/docsStore'
import CardList from 'components/list/CardList.vue'

defineOptions({
  name: 'IndexPage'
})

const docsStore = useDocsStore()

const loading = ref(false)
const docsList = computed(() => docsStore.itemsList)
onMounted(async () => {
  loading.value = true
  await docsStore.loadData()
  loading.value = false
})
</script>
<style lang="scss" scoped>
.container {
  max-width: 1350px;
}
</style>
