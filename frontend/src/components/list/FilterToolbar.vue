<script setup lang="ts">
const currFilter = defineModel('filter')
const currSort = defineModel('sort')
const currMode = defineModel('mode')
const sorting = [
  {
    value: 'editedTime',
    label: 'Последнее изменение',
    icon: 'timer'
  },
  {
    value: 'createdTime',
    label: 'Дата создания',
    icon: 'schedule'
  },
  {
    value: 'title',
    label: 'Название',
    icon: 'text_field'
  }
]

const filters = [{
  label: 'Все',
  value: 'all',
  icon: 'apps'
}, {
  label: 'Недавно просмотренные',
  value: 'recent',
  icon: 'schedule'
}, {
  label: 'Создано вами',
  value: 'me',
  icon: 'account_circle'
}, {
  label: 'Избранное',
  value: 'favorite',
  icon: 'favorite_border'
}]
</script>

<template>
  <q-toolbar class="text-primary q-mx-none q-my-sm q-gutter-sm">
    <template v-for="filter in filters" :key="filter.label">
      <q-btn
        :flat="currFilter !== filter.value" :outline="currFilter === filter.value" dense size="md"
        :icon="filter.icon" :label="filter.label"
        @click="currFilter = filter.value"/>
    </template>

    <q-space/>

    <q-select
      v-model="currSort"
      :options="sorting"
      emit-value
      map-options
      dense
      flat
      borderless
      hide-bottom-space>
      <template v-slot:before-options>
        <q-item-label header>Сортировать по:</q-item-label>
      </template>
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section avatar>
            <q-icon v-if="scope.opt.value === currSort" name="done" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-btn flat dense icon="swap_vert" />
    <q-btn-toggle
      v-model="currMode"
      toggle-color="primary"
      dense
      :options="[
        {label: '', value: 'grid', slot: 'grid'},
        {label: '', value: 'table', slot: 'table'},
      ]"
    >
      <template v-slot:grid>
        <div class="row items-center no-wrap">
          <q-icon right name="grid_view" />
          <div class="text-cent">Сетка</div>
        </div>
      </template>
      <template v-slot:table>
        <div class="row no-wrap">
          <q-icon name="list" />
          <div class="text-cent">Список</div>
        </div>
      </template>
    </q-btn-toggle>
  </q-toolbar>
</template>

<style scoped>

</style>
