<script setup lang="ts">

import EssentialLink from 'components/EssentialLink.vue'

const mainLinks = [
  {
    title: 'Шаблоны',
    link: '/templates',
    icon: 'bolt'
  },
  {
    title: 'Вдохновение',
    link: '/inspiration',
    icon: 'menu_book'
  },
  {
    title: 'Темы',
    link: '/themes',
    icon: 'color_lens'
  },
  {
    title: 'Шрифты',
    link: '/fonts',
    icon: 'font_download'
  },
  {
    title: 'Корзина',
    link: '/bin',
    icon: 'delete'
  }
]

</script>

<template>
  <q-list>
    <q-separator />
    <EssentialLink
      v-for="link in mainLinks"
      :key="link.title"
      v-bind="link"
    />
  </q-list>

</template>

<style scoped>

</style>
