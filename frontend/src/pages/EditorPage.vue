<template>
  <q-page padding>
    <h3>Editor Page</h3>
    <SlideEditor />
  </q-page>
</template>

<script setup lang="ts">
import SlideEditor from 'components/SlideEditor.vue'
// import WysiwygField from 'components/editor/WysiwygField.vue'
// import pages from 'src/stores/data/pages.json'

defineOptions({
  name: 'EditorPage'
})
</script>

<style lang="scss" scoped>

</style>
