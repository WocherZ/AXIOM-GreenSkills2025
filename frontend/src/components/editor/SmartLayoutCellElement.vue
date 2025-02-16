<script setup lang="ts">
import ParagraphElement from 'components/editor/ParagraphElement.vue'
import HeadingElement from 'components/editor/HeadingElement.vue'

defineProps<{
  cell: any
}>()
</script>

<template>

  <div class="smart-cell" :id="cell.attrs.id">
    <template v-for="(col, colIdx) in cell.content" :key="colIdx">
      <template v-if="col.type === 'heading'">
        <dt>
          <HeadingElement :el="col"/>
        </dt>
      </template>
      <template v-if="col.type === 'paragraph'">
        <dd>
          <ParagraphElement :el="col"/>
        </dd>
      </template>
    </template>
  </div>

</template>

<style lang="scss" scoped>
.smart-cell {
  border: 1px solid green;
  padding: 10px;
}

</style>
