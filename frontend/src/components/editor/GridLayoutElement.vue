<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref } from 'vue'
import GridCellElement from 'components/editor/GridCellElement.vue'

const props = defineProps<{
  list: any[]
}>()
const gridItems = ref(props.list)

// Обработчики событий при необходимости
const onChange = (evt: any) => {
  console.log('Элемент перемещен:', evt)
}

const onDragStart = (evt: any) => {
  console.log('Drag start:', getPosition(evt))
}
const onDragEnd = (evt: any) => {
  console.log('Drag end:', getPosition(evt))
}
const getPosition = (event: any) => {
  const evt = { ...event }
  console.log(11, evt.to)
  return {
    to: {
      x: evt.to.offsetLeft,
      y: evt.to.offsetTop,
      h: evt.to.offsetHeight,
      w: evt.to.offsetWidth
    },
    from: {
      x: evt.from.offsetLeft,
      y: evt.from.offsetTop,
      h: evt.from.offsetHeight,
      w: evt.from.offsetWidth
    }
  }
}
</script>

<template>
  <draggable
    v-model="gridItems"
    group="grid"
    item-key="id"
    class="row q-col-gutter-sm"
    :animation="200"
    @start="onDragStart"
    @end="onDragEnd"
    @change="onChange">
    <template #item="{ element }">
      <div :class="`col-${12 / gridItems.length}`">
        <q-card class="cursor-move full-height">
          <q-card-section class="text-center">
            <GridCellElement :el="element"/>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </draggable>
</template>

<style scoped>

</style>
