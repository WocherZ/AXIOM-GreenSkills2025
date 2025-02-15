<template>
  <q-page padding class="doc-page">
<!--    <pre>id: {{ $route.params.docId }}</pre>-->
<!--    <pre>{{ Object.keys(docSnapshot.content.default.content[0].attrs) }}</pre>-->
<!--    <pre>{{ docSnapshot.content.default.content[0] }}</pre>-->
    <div class="container">
      <template v-for="card in cards" :key="card.id">
        <DocCard :card="card"/>
      </template>
    </div>

    <!--    <pre>{{ cards }}</pre>-->
  </q-page>
</template>

<script setup lang="ts">
import docData from 'src/stores/data/doc-gamma.json'
import { ref } from 'vue'
import DocCard from 'components/editor/DocCard.vue'

const docSnapshot = docData.data.snapshot

const cards = ref(docSnapshot.content.default.content[0].content.filter(i => i.type === 'card'))

</script>

<style lang="scss" scoped>
.doc-page {
  background: lightgray;
}
.container {
  max-width: 1024px;
  margin: auto;
}
</style>
