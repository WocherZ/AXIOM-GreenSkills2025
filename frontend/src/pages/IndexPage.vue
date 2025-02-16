<template>
  <q-page padding>
    <div class="container q-mx-auto">
      <div class="text-h6 q-px-md">Quantums</div>
      <CardList :items="docsList"/>
    </div>
<!--    <pre>{{ // docsList }}</pre>-->
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

defineOptions({
  name: 'IndexPage'
})

import { useDocsStore } from 'src/stores/docsStore'
import CardList from 'components/list/CardList.vue'
const docsStore = useDocsStore()

const docsList = computed(() => docsStore.itemsList)
onMounted(async () => {
  await docsStore.loadData()
})
</script>
<style lang="scss" scoped>
.container {
  max-width: 1350px;
}
</style>
