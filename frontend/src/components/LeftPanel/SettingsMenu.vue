<script setup lang="ts">

import EssentialLink from 'components/EssentialLink.vue'

const mainLinks = [
  {
    title: 'Настройки и участники',
    link: '/settings',
    icon: 'settings'
  },
  {
    title: 'Контактная поддержка',
    link: '/contact',
    icon: 'chat'
  },
  {
    title: 'Поделитесь отзывом',
    link: '/ideas',
    icon: 'send'
  }
]

</script>

<template>
  <q-separator />
  <q-list>
    <EssentialLink
      v-for="link in mainLinks"
      :key="link.title"
      v-bind="link"
    />
  </q-list>

</template>

<style scoped>

</style>
