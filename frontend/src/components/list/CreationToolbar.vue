<script setup lang="ts">
function onItemClick (e: any) {
  console.log('Clicked on an Item', e.target)
}

</script>

<template>
  <q-toolbar class="text-primary q-ma-none q-gutter-sm">
    <q-btn push color="primary" icon="add" label="Создать новый" to="/create">
      <q-chip square size="md" dense>AI</q-chip>
    </q-btn>

    <!-- dropdown -->
    <q-btn-dropdown push label="Новое из пустого" class="bg-grey-1" icon="add" split>
      <q-list>
        <q-item-label header>Презентация</q-item-label>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>По умолчанию</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Традиционный</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Высокий</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator/>

        <q-item-label header>Документ</q-item-label>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>По умолчанию</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Бесстраничный</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Письмо</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>А4</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator/>

        <q-item-label header>Социальная</q-item-label>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Портрет</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Квадрат</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Истории</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>А4</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator/>

        <q-item-label header>Веб-страница</q-item-label>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Веб-страница</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-btn-dropdown>

    <!-- dropdown -->
    <q-btn-dropdown push label="Импорт" class="q-mr-sm bg-grey-1">

    </q-btn-dropdown>
  </q-toolbar>
</template>

<style scoped>

</style>
