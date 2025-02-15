<template>
  <q-layout view="hHh LpR fFf">
    <!-- Основной тулбар -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>Редактор презентаций</q-toolbar-title>
        <q-btn
          :icon="isPreviewMode ? 'edit' : 'visibility'"
          :label="isPreviewMode ? 'Редактировать' : 'Просмотр'"
          @click="isPreviewMode = !isPreviewMode"
          flat
        />
        <q-btn label="Logout" @click="logOut" type="button" color="primary"/>
      </q-toolbar>
    </q-header>

    <!-- Левая панель инструментов -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="250"
      class="bg-grey-1"
    >
      <q-list>
        <q-item-label header>Инструменты</q-item-label>

        <q-item v-if="!isPreviewMode" clickable v-ripple @click="addElement('heading')">
          <q-item-section avatar>
            <q-icon name="add"/>
          </q-item-section>
          <q-item-section>Добавить заголовок</q-item-section>
        </q-item>

        <q-item v-if="!isPreviewMode" clickable v-ripple @click="addElement('text')">
          <q-item-section avatar>
            <q-icon name="add"/>
          </q-item-section>
          <q-item-section>Добавить текст</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Основная область редактирования -->
    <q-page-container>
      <router-view/>
    </q-page-container>

    <!-- Правая панель свойств -->
    <q-drawer
      v-if="selectedElement && !isPreviewMode"
      side="right"
      v-model="rightDrawerOpen"
      bordered
      :width="250"
      class="bg-grey-1"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item-label header>Свойства элемента</q-item-label>

          <q-item>
            <q-item-section>
              <q-input
                v-model="selectedElementContent"
                label="Содержимое"
                type="textarea"
                filled
                @update="updateElementContent"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-input
                v-model.number="selectedElementPosition.x"
                label="Позиция X"
                type="number"
                filled
                @update="updateElementPosition"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-input
                v-model.number="selectedElementPosition.y"
                label="Позиция Y"
                type="number"
                filled
                @update="updateElementPosition"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </q-layout>
</template>
<script lang="ts" setup>
import { useEditor } from 'src/composables/useEditor'
import { useEditorStore } from 'stores/editor-store'
import { computed } from 'vue'
import { useAuthStore } from 'stores/authStore'
const authStore = useAuthStore()

async function logOut () {
  await authStore.logout()
}

const editorStore = useEditorStore()
const currentSlide = computed(() => editorStore.current)
const {
  updateElementContent,
  updateElementPosition,
  selectedElementPosition,
  selectedElementContent,
  rightDrawerOpen,
  leftDrawerOpen,
  selectedElement,
  isPreviewMode,
  addElement
} = useEditor(currentSlide.value)
</script>
