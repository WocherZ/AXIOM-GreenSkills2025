<script setup lang="ts">
import ParagraphElement from 'components/editor/ParagraphElement.vue'
import HeadingElement from 'components/editor/HeadingElement.vue'

defineProps<{
  el: any
}>()
</script>

<template>
  <div class="col" v-for="(col, colIdx) in el.content" :key="colIdx">
      <template v-if="col.type === 'heading'">
        <HeadingElement :el="col"/>
      </template>

      <template v-if="col.type === 'paragraph'">
        <ParagraphElement :el="col"/>
      </template>
  </div>
</template>

<style scoped>

</style>
