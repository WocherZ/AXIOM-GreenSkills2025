<template>
  <q-page padding>
    <q-btn label="Главная" to="/" icon="home"></q-btn>
    <div class="text-center q-mt-xl">
      <div class="text-h4">Создавайте с помощью искусственного интеллекта</div>
      <div class="text-h6">С чего начать?</div>

      <div class="q-pa-md row items-start full-height justify-center q-gutter-md">

        <q-card class="my-card paste">
          <q-img src="/images/thumbnail-paste.svg"/>

          <q-card-section>
            <div class="text-h6">Вставить текст</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Создавайте на основе заметок, конспекта или существующего контента
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Продолжить" icon-right="east"></q-btn>
          </q-card-actions>
        </q-card>

        <router-link to="/create/generate" class="my-card generate">
          <q-card class="full-height">
            <q-img src="/images/thumbnail-generate.svg">
              <!--            <div class="text-h5 absolute-bottom text-right">-->
              <!--              Популярное-->
              <!--            </div>-->
            </q-img>
            <q-card-section>
              <div class="text-h6">Сгенерировать</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Создание из однострочной подсказки за несколько секунд
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Продолжить" icon-right="east" to="/create/generate"></q-btn>
            </q-card-actions>
          </q-card>
        </router-link>
        <router-link to="/create/import" class="my-card generate">
          <q-card class="full-height">
            <q-img src="/images/thumbnail-transform.svg"/>

            <q-card-section>
              <div class="text-h6">Импортируйте файл или URL</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Улучшайте существующие документы, презентации или веб-страницы.
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Продолжить" icon-right="east"/>
            </q-card-actions>
          </q-card>
        </router-link>
      </div>
    </div>
    <div class="text-h6 text-center">Ваши недавние подсказки</div>
    <q-list bordered separator>
      <template v-for="draft in draftList" :key="draft.id">
        <q-item clickable :to="`/create/generate/${draft.id}`">
          <q-item-section>
            <div class="text-subtitle">{{ draft.prompt}}</div>
            <div class="text-subtitle2">{{ draft.createdAt}}</div>
          </q-item-section>
          <q-item-section side>
            <q-icon name="chevron_right"></q-icon>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { useDocsStore } from 'stores/docsStore'
import { computed, onMounted } from 'vue'

const docStore = useDocsStore()

onMounted(async () => {
  await docStore.loadDrafts()
})

const draftList = computed(() => docStore.draftList)
</script>

<style lang="scss" scoped>
.my-card {
  max-width: 18rem;
  height: 25rem;
  text-decoration: none;
  color: #1D1D1D;
  transition: transform .2s;
  &:hover {
    transform: scale(1.1);
    z-index: 10;
  }
}
</style>
