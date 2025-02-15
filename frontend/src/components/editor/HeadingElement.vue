<script setup lang="ts">
defineProps<{
  el: any
}>()
</script>

<template>
  <div :class="`text-h${el.attrs.level} q-mb-md`">
    {{ el.content.map((item: any) => item.text).join('') }}
  </div>
</template>

<style scoped>

</style>
