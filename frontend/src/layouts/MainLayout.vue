<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quantum.app
        </q-toolbar-title>

<!--        <div>Quasar v{{ $q.version }}</div>-->
        <q-btn label="Logout" @click="logOut" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <UserField/>
      <SearchField/>
      <MainMenu />
      <Folders />
      <FeaturesMenu />
      <SettingsMenu />
    </q-drawer>

    <q-page-container class="bg-grey-11">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserField from 'components/LeftPanel/UserField.vue'
import SearchField from 'components/LeftPanel/SearchField.vue'
import Folders from 'components/LeftPanel/FoldersComponent.vue'
import FeaturesMenu from 'components/LeftPanel/FeaturesMenu.vue'
import { useAuthStore } from 'stores/authStore'
import { useRouter } from 'vue-router'
import MainMenu from 'components/LeftPanel/MainMenu.vue'
import SettingsMenu from 'components/LeftPanel/SettingsMenu.vue'

defineOptions({
  name: 'MainLayout'
})
const authStore = useAuthStore()
const router = useRouter()
async function logOut () {
  await authStore.logout()
  await router.push('/auth/login')
}

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
