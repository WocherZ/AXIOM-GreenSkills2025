<template>
  <q-page padding>
    <q-btn label="Назад" to="/create" icon="west"/>
    <div class="text-center generator-container q-mx-auto">
      <div class="text-h4 q-mb-md">Сгенерировать</div>
      <div class="text-h6 q-mb-md">Что бы Вы хотели создать сегодня?</div>
      <TypeOfDocs />
      <div class="row q-gutter-sm q-mb-md">
        <q-select v-model="form.cards" :options="cardsList" map-options outlined dense/>
        <q-select v-model="form.view" :options="viewList" map-options outlined dense/>
        <q-select v-model="form.lang" :options="langList" map-options outlined dense/>
      </div>
      <q-input v-model="form.prompt" type="text" outlined placeholder="Опишите, что вы хотели бы сделать"
               class="prompt-input"/>
      <q-btn v-if="form.prompt.length" size="lg" color="primary" icon="auto_awesome"
             label="Создать конспект"
             class="q-my-md q-px-xl"/>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import { computed, ref } from 'vue'
import TypeOfDocs from 'components/creator/TypeOfDocs.vue'

const form = ref({
  type: 'presentation',
  cards: 8,
  view: 'default',
  lang: 'ru',
  prompt: ''
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
