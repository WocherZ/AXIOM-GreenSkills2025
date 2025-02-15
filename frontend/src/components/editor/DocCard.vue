<script setup lang="ts">
import { toRef } from 'vue'
import HeadingElement from 'components/editor/HeadingElement.vue'
import ParagraphElement from 'components/editor/ParagraphElement.vue'
import GridCellElement from 'components/editor/GridCellElement.vue'
import GridLayoutElement from 'components/editor/GridLayoutElement.vue'
import SmartLayoutElement from 'components/editor/SmartLayoutElement.vue'

const props = defineProps<{
  card: any
}>()

const cardContent = toRef(props, 'card')

const cardLayoutItem = (item: any) => {
  return item.content.filter((item: any) => item.type === 'cardLayoutItem').map(element)[0]
}
const element = (item: any) => {
  return item.content
}
</script>

<template>
  <div class="doc-card" :id="cardContent.attrs.id">
    <template v-for="(el, index) in cardLayoutItem(cardContent)" :key="index">
<!--      <pre v-if="!['heading', 'paragraph', 'gridLayout'].includes(el.type)">{{ el.type }}</pre>-->
      <template v-if="el.type === 'heading'">
        <HeadingElement :el="el"/>
      </template>

      <template v-if="el.type === 'paragraph'">
        <ParagraphElement :el="el"/>
      </template>

      <template v-if="el.type === 'smartLayout'">
        <SmartLayoutElement :content="el.content"/>
      </template>

      <template v-if="el.type === 'gridLayout'">
        <GridLayoutElement>
          <GridCellElement :el="el"/>
        </GridLayoutElement>
      </template>
    </template>
  </div>
  <!--  <pre>{{ cardLayoutItem(cardContent) }}</pre>-->
</template>

<style lang="scss" scoped>
.doc-card {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  height: 768px;
  background: white;
}
</style>
