<script setup lang="ts">
import SmartLayoutCellElement from 'components/editor/SmartLayoutCellElement.vue'

const props = defineProps<{
  content: any
}>()

const elements = props.content
</script>

<template>
  <div class="smart-layout">
    <template v-for="(element, index) in elements" :key="index">
      <SmartLayoutCellElement :cell="element"/>
    </template>
  </div>

</template>

<style lang="scss" scoped>
.smart-layout {
  border:  1px solid #e5e5e5;
  padding: 1rem;
  display: inline-grid;
}
</style>
