<template>
  <q-page padding>
    <q-btn label="Назад" to="/create" icon="west"/>
    <div class="text-center generator-container q-mx-auto">
      <div class="text-h4 q-mb-md">Импорт с помощью искусственного интеллекта
      </div>
      <template v-if="!form.file">
        <div class="text-h6 q-mb-md">Выберите файл, который Вы хотите преобразовать</div>
        <TypeOfImport v-model="form.file"/>
      </template>
      <template v-else>
        <q-input v-model="form.prompt" type="text" outlined placeholder="Опишите, что вы хотели бы сделать"
                 class="prompt-input q-my-md"/>

        <q-list bordered class="q-my-md">
          <q-item>
            <q-item-section>
              {{ form.file.fileName }}
            </q-item-section>
            <q-item-section side>
              <q-icon name="delete"></q-icon>
            </q-item-section>
          </q-item>
        </q-list>
        <!--        <q-input v-model="form.file" outlined :label="form.file" type="text" icon-right="delete" />-->
        <div class="text-h6">
          Что бы Вы хотели создать с помощью этого контента?
        </div>
        <TypeOfDocs/>
        <q-btn v-if="form.file && form.prompt.length" size="lg" color="primary" icon-right="east"
               label="Продолжить"
               class="q-my-md q-px-xl"
               @click="generateDraft"
        />
      </template>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import TypeOfDocs from 'components/creator/TypeOfDocs.vue'
import TypeOfImport from 'components/creator/TypeOfImport.vue'
import { ResFileDto } from 'src/client'

interface IForm {
  type: string;
  cards: number,
  view: string,
  lang: string,
  prompt: string,
  file: ResFileDto | null
}

const form = ref<IForm>({
  type: 'presentation',
  cards: 8,
  view: 'default',
  lang: 'ru',
  prompt: '',
  file: null
})

async function generateDraft () {
  console.log('Generate draft')
  // const resp = await docsControllerDraft({
  //   body: {
  //     type: form.value.type,
  //     cards: form.value.cards,
  //     view: form.value.view,
  //     lang: form.value.lang,
  //     prompt: form.value.prompt,
  //     file: form.value.file?.id
  //   }
  // })
}

</script>
<style lang="scss" scoped>
.generator-container {
  max-width: 48rem;
}

.type-btn {
  border: 2px solid grey;
  width: 7rem;
}

.prompt-input {
  font-size: 1.2rem;
}
</style>
