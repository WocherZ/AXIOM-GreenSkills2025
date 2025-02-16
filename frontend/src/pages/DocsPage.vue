<template>
  <q-page padding class="doc-page">
    <q-btn label="Главная" to="/" icon="home" class="bg-white"></q-btn>

    <div class="container q-py-md">
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary"/>
      </q-inner-loading>
      <template v-if="!loading">
        <DocCard :card="{ title, user: userName, created: new Date(doc.createdAt) }" :index="-1" :img="images[0]"/>
        <template v-for="(card, index) in cards" :key="card.id">
          <DocCard :card="card" :index="index" :img="images[index+1]"/>
        </template>
      </template>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDocsStore } from 'stores/docsStore'
import DocCard from 'components/editor/DocCard.vue'

const route = useRoute()
const router = useRouter()
const docsStore = useDocsStore()
const docId: string = Array.isArray(route.params.docId) ? route.params.docId[0] : route.params.docId
const loading = ref(true)
onMounted(async () => {
  if (!docId) {
    await router.push('/')
  } else {
    await docsStore.loadDoc(docId)
    loading.value = false
  }
})
const doc = computed(() => docsStore.itemById(docId))
const userName = computed(() => `${doc.value?.createdBy?.firstName} ${doc.value?.createdBy?.lastName}`)
const title = computed(() => doc.value?.title)
const cards = computed(() => doc.value?.content?.data)
const images = computed(() => doc.value?.content?.images)
</script>

<style lang="scss" scoped>
.doc-page {
  background: lightgray;
}

.container {
  max-width: 1024px;
  margin: auto;
}
</style>
