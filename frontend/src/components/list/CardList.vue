<template>
  <CreationToolbar />
  <FilterToolbar v-model:filter="filter" v-model:sort="sort" v-model:mode="mode" />
  <div class="q-pa-md row items-start q-gutter-md">
    <template v-for="item in items" :key="item.id">
      <DocCard v-if="item.site === null" :item="item"/>
    </template>
  </div>
<!--    <pre>{{ items }}</pre>-->
</template>

<script lang="ts" setup>
import { IDoc } from 'src/types/IDocs'
import { ref, toRefs } from 'vue'
import DocCard from 'components/list/DocCard.vue'
import CreationToolbar from 'components/list/CreationToolbar.vue'
import FilterToolbar from 'components/list/FilterToolbar.vue'

interface Props {
  items: IDoc[]
}
const filter = ref('all')
const sort = ref('editedTime')
const mode = ref('grid')
const props = withDefaults(defineProps<Props>(), {
  items: () => ([])
})
const { items } = toRefs(props)
</script>
