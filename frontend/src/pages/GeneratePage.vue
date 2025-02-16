<template>
  <q-page padding>
    <q-btn label="Назад" to="/create" icon="west"/>
    <div class="generator-container q-mx-auto">
      <div class="text-center text-h4 q-mb-md">Сгенерировать</div>
      <div class="text-center text-h6 q-mb-md">Что бы Вы хотели создать сегодня?</div>
      <TypeOfDocs/>
      <div class="row q-gutter-sm q-my-md">
        <q-select v-model="form.cards" :options="cardsList" map-options outlined dense/>
        <q-select v-model="form.view" :options="viewList" map-options outlined dense/>
        <q-select v-model="form.lang" :options="langList" map-options outlined dense/>
      </div>
      <q-input v-model="form.prompt" type="text" outlined placeholder="Опишите, что вы хотели бы сделать"
               class="prompt-input"/>
      <q-btn v-if="form.prompt.length && !draft?.content.length" size="lg" color="primary" icon="auto_awesome"
             @click="generateDraft"
             :loading="loading"
             label="Создать конспект"
             class="q-mx-auto q-my-md q-px-xl"/>
      <template v-if="draft">
        <DraftSlideList v-model="draft.content" class="q-my-md"/>
        <q-btn v-if="form.prompt.length" size="lg" color="primary" icon="auto_awesome"
               @click="generateDoc"
               :loading="loading"
               label="Сгенерировать"
               class="q-my-md q-px-xl"/>
      </template>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import TypeOfDocs from 'components/creator/TypeOfDocs.vue'
import { useDocsStore } from 'stores/docsStore'
import DraftSlideList from 'components/generate/DraftSlideList.vue'
import { useRoute, useRouter } from 'vue-router'

const docsStore = useDocsStore()

const loading = ref(false)
const route = useRoute()
const router = useRouter()

const form = ref({
  type: 'presentation',
  cards: 8,
  view: 'default',
  lang: 'ru',
  prompt: ''
})
const content = ref<any[]>([])

const generateDraft = async () => {
  console.log('Generate draft')
  loading.value = true
  await docsStore.generateDraft(form.value)
  loading.value = false
}
const generateDoc = async () => {
  console.log('Generate doc')
  loading.value = true
  const doc = await docsStore.generateDoc()
  loading.value = false
  if (doc) {
    await router.push('/docs/' + doc.id)
  }
}

const draft = computed(() => docsStore.currentDraft)
watch(() => draft.value, async (val) => {
  if (val) {
    content.value = val.content
    form.value.prompt = val.prompt
  }
})

onMounted(async () => {
  if (route.params.draftId) {
    const draftId: string = Array.isArray(route.params.draftId) ? route.params.draftId[0] : route.params.draftId
    const dr = docsStore.draftById(draftId)
    if (!dr) {
      await docsStore.loadDrafts(draftId)
    } else {
      docsStore.currentDraft = dr
      content.value = [...dr.content]
      form.value.prompt = dr.prompt
    }
  }
})
onUnmounted(() => {
  docsStore.currentDraft = null
})

const cardsList = computed(() => {
  return Array.from({ length: 10 }).map((item, index) => ({
    value: index + 1,
    label: index + 1 + ' cards'
  }))
})
const langList = computed(() => {
  return [{
    value: 'ru',
    label: 'Русский'
  }, {
    value: 'en',
    label: 'English'
  }]
})
const viewList = computed(() => {
  return [{
    value: 'default',
    label: 'По-умолчанию'
  }, {
    value: 'standard',
    label: 'Традиционный'
  }, {
    value: 'height',
    label: 'Высокий'
  }]
})

</script>
<style lang="scss" scoped>
</style>
