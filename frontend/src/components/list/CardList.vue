<template>
  <CreationToolbar/>
  <FilterToolbar v-model:filter="filter" v-model:sort="sort" v-model:mode="mode"/>
  <div class="q-pa-md row items-start q-gutter-md">
    <template v-if="!loading">
      <template v-for="item in items" :key="item.id">
        <DocCard :item="item"/>
      </template>
    </template>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary"/>
    </q-inner-loading>

  </div>
  <!--  <pre>{{ items }}</pre>-->
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import DocCard from 'components/list/DocCard.vue'
import CreationToolbar from 'components/list/CreationToolbar.vue'
import FilterToolbar from 'components/list/FilterToolbar.vue'
import { Document } from 'src/client'

interface Props {
  items: Document[];
  loading: boolean;
}

const filter = ref('all')
const sort = ref('editedTime')
const mode = ref('grid')
const props = withDefaults(defineProps<Props>(), {
  items: () => ([]),
  loading: true
})
const { items } = toRefs(props)
</script>
