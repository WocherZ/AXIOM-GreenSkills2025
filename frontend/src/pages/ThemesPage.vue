<template>
  <q-page padding>
    <h4>Templates Page</h4>
    <div class="row q-gutter-md">
      <ThemeCard :theme="theme" v-for="theme in themesList" :key="theme.id"/>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useThemeStore } from 'stores/themeStore'
import ThemeCard from 'components/list/ThemeCard.vue'

const themesStore = useThemeStore()

const themesList = computed(() => themesStore.itemsList)
onMounted(async () => {
  await themesStore.loadData()
})

</script>
<style lang="scss" scoped>
.my-card {
  width: 15rem;
}
.card-content {
  border-width: 1px;
  border-radius: 1rem;
}
</style>
