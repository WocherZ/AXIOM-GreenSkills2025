<script setup lang="ts">
import { Theme } from 'src/client'

defineProps<{
  theme: Theme;
}>()
const itemStyle = (theme: any) => {
  const styles = []
  // theme.config.background.color && styles.push(`background-color: url(${theme.config.background.color.hex})`)
  theme.config.background.image && styles.push(`background-image: url(${theme.config.background.image.src})`)

  styles.push('background-color: white !important')
  return styles.join('; ')
}
const cardStyle = (theme: any) => {
  const styles = []
  theme.config.cardBackground?.color && styles.push(`background-color: ${theme.config.cardBackground.color.hex}`)
  theme.config.bodyColor && styles.push(`color: ${theme.config.bodyColor}`)

  return styles.join('; ')
}
// const headingStyle = (theme: any) => {
//   const styles = []
//   theme.config.cardBackground?.color && styles.push(`background-color: ${theme.config.cardBackground.color.hex}`)
//   theme.config.headingColor && styles.push(`color: ${theme.config.headingColor}`)
//   theme.config.headingGradient && styles.push(`background: -webkit-linear-gradient(${ theme.config.headingGradient.colors.join(',') }); -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;`)
//   return styles.join('; ')
// }

</script>

<template>
  <q-card class="my-card" :style="itemStyle(theme)">
    <q-card-section>
      <div class="card-content q-pa-md" :style="cardStyle(theme)">
        <q-img :src="theme.previewUrl" class="q-ma-md"/>
        <!--            <div class="text-h6" :style="headingStyle(theme)">{{ theme.name }}</div>-->
        <!--            <div>Text && <a href="#">Link</a></div>-->
      </div>
    </q-card-section>
    <q-card-actions class="bg-white">
      <!--          <pre>headingGradient: {{ theme.config.headingGradient }}</pre>-->
      <!--          <pre>cardBg: {{ theme.config.cardBackground }}</pre>-->
      <!--          <pre>secondaryAccentColors: {{ theme.config.secondaryAccentColors }}</pre>-->
      <!--          <pre>{{ Object.keys(theme.config) }}</pre>-->
      <div class="text-h6">{{ theme.name }}</div>
    </q-card-actions>
  </q-card>

</template>

<style scoped>

</style>
