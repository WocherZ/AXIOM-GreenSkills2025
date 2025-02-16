<script setup lang="ts">

import EssentialLink from 'components/EssentialLink.vue'

const mainLinks = [
  {
    title: 'Quantums',
    link: '/',
    icon: 'library_books'
  },
  {
    title: 'Поделились с вами',
    link: '/shared',
    icon: 'group'
  },
  {
    title: 'Сайты',
    link: '/sites',
    icon: 'language',
    side: {
      color: 'primary',
      label: 'BETA'
    }
  },
  {
    title: 'Изображения AI',
    link: '/ai-images',
    icon: 'flare',
    side: {
      color: 'secondary',
      label: 'NEW'
    }
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
