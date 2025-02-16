<template>
  <pre>{{ slide?.elements }}</pre>
  <div
    class="slide-container q-pa-md grid"
  >
    <div
      v-for="element in slide?.elements"
      :key="element.id"
      class="slide-element"
      :class="{ 'element-selected': selectedElement === element.id && !isPreviewMode }"
      :style="{
              left: `${element.position.x}px`,
              top: `${element.position.y}px`,
              cursor: isPreviewMode ? 'default' : 'move'
            }"
      @click="!isPreviewMode && selectElement(element.id)"
      v-touch-pan.prevent="!isPreviewMode ? (evt) => moveElement(evt, element.id) : undefined"
    >
      <!-- Содержимое элемента -->
      <div draggable="true" @dragstart="onDragStart" @dragend="onDragEnd" @dragover.prevent="onDragOver" @drop.prevent="onDrop">
        <component
          :is="element.type === 'heading' ? 'h2' : 'p'"
          class="element-content"
          :class="{ 'text-h4': element.type === 'heading' }"
        >
          {{ element.content }}
        </component>
      </div>

      <!-- Контролы элемента -->
      <q-fab
        v-if="selectedElement === element.id && !isPreviewMode"
        color="primary"
        icon="more_vert"
        direction="up"
        padding="xs"
        size="sm"
        class="element-controls"
      >
        <q-fab-action
          color="negative"
          icon="delete"
          size="sm"
          @click="deleteElement(element.id)"
        />
      </q-fab>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Slide, useEditor } from 'src/composables/useEditor'
import { useEditorStore } from 'stores/editor-store'
import { computed } from 'vue'
// Начальное состояние слайда
const slides: Slide[] = Array.from([{
  id: '1',
  elements: [
    {
      id: 'el1',
      type: 'heading',
      content: 'Заголовок слайда',
      position: {
        x: 50,
        y: 50
      }
    },
    {
      id: 'el2',
      type: 'text',
      content: 'Содержание слайда',
      position: {
        x: 50,
        y: 120
      }
    }
  ],
  background: '#ffffff'
}])

const editorStore = useEditorStore()
editorStore.setSlides(slides)
editorStore.setCurrent('1')
const slide = computed(() => editorStore.current)
const {
  selectedElement,
  isPreviewMode,
  deleteElement,
  selectElement,
  moveElement
} = useEditor(slide.value)

const onDragStart = (evt: any) => {
  console.log('Drag start:', getPosition(evt))
}
const onDragEnd = (evt: any) => {
  console.log('Drag end:', getPosition(evt))
}
const onDragOver = () => {
  // console.log('Drag over:', evt)
}
const onDrop = (evt: any) => {
  console.log('Drop:', getPosition(evt))
}
const getPosition = (evt: any) => {
  return {
    x: evt.target.offsetParent.offsetLeft,
    y: evt.target.offsetParent.offsetTop,
    h: evt.target.offsetParent.offsetHeight,
    w: evt.target.offsetParent.offsetWidth,
    offset: evt.target.offsetParent
  }
}
</script>

<style scoped>
.slide-container {
  position: relative;
  width: 1024px;
  height: 576px;
  margin: 20px auto;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: auto;
  background-size: 50px 50px;
  background-image: linear-gradient(to right, grey 1px, transparent 1px),
  linear-gradient(to bottom, grey 1px, transparent 1px);
}

.slide-element {
  position: absolute;
  padding: 8px;
  min-width: 100px;
  min-height: 40px;
}

.element-selected {
  outline: 2px solid var(--q-primary);
}

.element-controls {
  position: absolute;
  top: -20px;
  right: -20px;
  z-index: 999;
}

.element-content {
  margin: 0;
  padding: 0;
}

.grid {
  background-image: linear-gradient(to right, rgb(203 213 225) 1px, transparent 1px),
  linear-gradient(to bottom, rgb(203 213 225) 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: left top;
}
</style>
