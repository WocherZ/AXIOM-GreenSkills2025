<script setup lang="ts">
// import { useUserStore } from 'stores/userStore'
import LoginForm from 'components/forms/LoginForm.vue'
</script>

<template>
  <q-page class="flex bg-image flex-center">
    <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
      <q-card-section>
        <q-avatar size="103px" class="absolute-center shadow-10">
          <img src="/images/profile.svg" alt="avatar" />
        </q-avatar>
      </q-card-section>
<!--      <pre>{{ profile }}</pre>-->
      <q-card-section>
        <div class="text-center q-pt-lg">
          <div class="col text-h6 ellipsis">
            Log in
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <LoginForm />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
