<template>
  <div>My component</div>
  <section>
    <article>
      <header>

      </header>
      <div>
        <q-input v-model="query"></q-input>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const query = ref<string>('')
</script>
