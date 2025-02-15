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
          <q-card class="">
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
        <q-card class="my-card ">
          <q-img src="/images/thumbnail-transform.svg"/>

          <q-card-section>
            <div class="text-h6">Импортируйте файл или URL</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Улучшайте существующие документы, презентации или веб-страницы.
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Продолжить" icon-right="east"></q-btn>
          </q-card-actions>
        </q-card>
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.my-card {
  max-width: 18rem;
  text-decoration: none;
  color: #1D1D1D;
}
</style>
