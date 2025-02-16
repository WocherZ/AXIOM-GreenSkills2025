<script setup lang="ts">
import ParagraphElement from 'components/editor/ParagraphElement.vue'
import HeadingElement from 'components/editor/HeadingElement.vue'

defineProps<{
  el: any
}>()
</script>

<template>
  <div class="col" v-for="(col, colIdx) in el.content" :key="colIdx">
    <template v-for="(elem, elemIdx) in col.content" :key="elemIdx">
      <template v-if="elem.type === 'heading'">
        <HeadingElement :el="elem"/>
      </template>

      <template v-if="elem.type === 'paragraph'">
        <ParagraphElement :el="elem"/>
      </template>
    </template>
  </div>
</template>

<style scoped>

</style>
