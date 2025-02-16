<script setup lang="ts">
import { toRef } from 'vue'

const props = defineProps<{
  card: any,
  index: number,
  img: string
}>()

const cardContent = toRef(props, 'card')
const cardImage = toRef(props, 'img')
</script>

<template>
  <div class="doc-card">
    <template v-if="index === -1">
      <div class="row items-center">
        <div class="col-6 col-image">
          <q-img :src="cardImage" alt="" class="full-height" />
        </div>
        <div class="col-6 col-content">
          <div class="text-h1">{{ cardContent.title }}</div>
          <div class="text-subtitle1">Автор: {{ cardContent.user }}</div>
          <div class="text-subtitle2">Создано: {{ cardContent.created.toLocaleString() }}</div>
        </div>
      </div>
    </template>
    <template v-else-if="!index">
      <div class="row">
        <div class="col-8 col-content">
          <div class="text-h2">{{ cardContent.title }}</div>
          <div class="text-body">{{ cardContent.text }}</div>
        </div>
        <div class="col-4 col-image">
          <q-img :src="cardImage" alt="" class="full-height" />
        </div>
      </div>
    </template>
    <template v-else-if="index % 2 === 0">
      <div class="row">
        <div class="col-9 col-content">
          <div class="text-h3">{{ cardContent.title }}</div>
          <div class="text-body">{{ cardContent.text }}</div>
          <ul>
            <li v-for="(item, index) in cardContent.list" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="col-3 col-image">
          <q-img :ratio="9/16" :src="cardImage" alt="" class="full-height" />
        </div>
      </div>
    </template>
    <template v-else-if="index % 3 === 0">
      <div class="row">
        <div class="col-4 col-image full-height">
          <q-img :src="cardImage" alt="" />
        </div>
        <div class="col-8 col-content">
          <div class="text-h3">{{ cardContent.title }}</div>
          <div class="text-body">{{ cardContent.text }}</div>
          <ul>
            <li v-for="(item, index) in cardContent.list" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row">
        <div class="col-12 col-content">
          <div class="text-h3">{{ cardContent.title }}</div>
          <div class="text-body">{{ cardContent.text }}</div>
          <ul>
            <li v-for="(item, index) in cardContent.list" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>
    </template>

<!--    <div class="text-h3" v-if="index">{{ cardContent.title }}</div>-->
<!--    <div class="text-body">{{ cardContent.text }}</div>-->
    <!--    <template v-for="(el, index) in cardLayoutItem(cardContent)" :key="index">-->
    <!--      &lt;!&ndash;      <pre v-if="!['heading', 'paragraph', 'gridLayout'].includes(el.type)">{{ el.type }}</pre>&ndash;&gt;-->
    <!--      <template v-if="el.type === 'heading'">-->
    <!--        <HeadingElement :el="el"/>-->
    <!--      </template>-->

    <!--      <template v-if="el.type === 'paragraph'">-->
    <!--        <ParagraphElement :el="el"/>-->
    <!--      </template>-->

    <!--      <template v-if="el.type === 'smartLayout'">-->
    <!--        <SmartLayoutElement :content="el.content"/>-->
    <!--      </template>-->

    <!--      <template v-if="el.type === 'gridLayout'">-->
    <!--        <GridLayoutElement :list="el.content"/>-->
    <!--      </template>-->
    <!--    </template>-->
  </div>
<!--  <pre>{{ cardContent }}</pre>-->
<!--  <pre>{{ cardImage }}</pre>-->
</template>

<style lang="scss" scoped>
.doc-card {
  border: 1px solid #ccc;
  margin-bottom: 20px;
  max-height: 768px;
  background: white;
  .col-content {
    padding: 2rem;
  }
}

:deep(.text-h1) {
  font-size: 4rem;
}

:deep(.text-h2) {
  font-size: 2.5rem;
}

:deep(.text-h3) {
  font-size: 2rem;
}

:deep(.text-h4) {
  font-size: 1.75rem;
}

:deep(.text-h5) {
  font-size: 1.5rem;
}

:deep(.text-h6) {
  font-size: 1.25rem;
}
</style>
