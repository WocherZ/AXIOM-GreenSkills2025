<script setup lang="ts">
defineProps<{
  el: any
}>()
</script>

<template>
  <div class="q-mb-md" v-for="(item, index) in el.content" :key="index">
    {{ item.text }}
  </div>
</template>

<style scoped>

</style>
