import { computed, ref } from 'vue'

// Определяем типы
export interface SlideElement {
  id: string
  type: 'text' | 'heading'
  content: string
  position: { x: number; y: number }
}

export interface Slide {
  id: string
  elements: SlideElement[]
  background: string
}

export function useEditor (slide: Slide | null) {
  const currentSlide = ref<Slide | null>(slide)
  // Состояние компонента
  const leftDrawerOpen = ref(true)
  const rightDrawerOpen = ref(true)
  const isPreviewMode = ref(false)
  const selectedElement = ref<string | null>(null)

  // Обработчики обновления свойств
  const updateElementContent = (newContent: string) => {
    if (selectedElement.value) {
      updateElement(selectedElement.value, { content: newContent })
    }
  }

  const updateElementPosition = () => {
    if (selectedElement.value) {
      updateElement(selectedElement.value, {
        position: selectedElementPosition.value
      })
    }
  }

  // Вычисляемые свойства для выбранного элемента
  const selectedElementContent = computed({
    get: () => {
      const element = currentSlide.value?.elements.find(
        el => el.id === selectedElement.value
      )
      return element?.content || ''
    },
    set: (newValue: string) => {
      if (selectedElement.value) {
        updateElement(selectedElement.value, { content: newValue })
      }
    }
  })

  const selectedElementPosition = computed({
    get: () => {
      const element = currentSlide.value?.elements.find(
        el => el.id === selectedElement.value
      )
      return element?.position || {
        x: 0,
        y: 0
      }
    },
    set: (newValue: { x: number; y: number }) => {
      if (selectedElement.value) {
        updateElement(selectedElement.value, { position: newValue })
      }
    }
  })

  // Методы управления элементами
  const addElement = (type: SlideElement['type']) => {
    const newElement: SlideElement = {
      id: `el${Date.now()}`,
      type,
      content: type === 'heading' ? 'Новый заголовок' : 'Новый текст',
      position: {
        x: 50,
        y: 50
      }
    }
    currentSlide.value?.elements.push(newElement)
    console.log(111, currentSlide.value?.elements)
  }

  const selectElement = (elementId: string) => {
    selectedElement.value = elementId
    rightDrawerOpen.value = true
  }

  const updateElement = (elementId: string, updates: Partial<SlideElement>) => {
    const index = currentSlide.value?.elements.findIndex(el => el.id === elementId) ?? -1
    if (index !== -1 && currentSlide.value) {
      currentSlide.value.elements[index] = {
        ...currentSlide.value?.elements[index],
        ...updates
      } ?? null
    }
  }

  const deleteElement = (elementId: string) => {
    if (currentSlide.value) {
      currentSlide.value.elements = currentSlide.value?.elements.filter(
        el => el.id !== elementId
      )
    }
    if (selectedElement.value === elementId) {
      selectedElement.value = null
      rightDrawerOpen.value = false
    }
  }

  // Обработчик перемещения элемента
  const moveElement = (evt: any, elementId: string) => {
    const { delta } = evt
    const element = currentSlide.value?.elements.find(el => el.id === elementId)

    if (element) {
      element.position = {
        x: element.position.x + delta.x,
        y: element.position.y + delta.y
      }
    }
  }

  return {
    addElement,
    moveElement,
    deleteElement,
    updateElement,
    selectElement,
    selectedElement,
    selectedElementContent,
    selectedElementPosition,
    leftDrawerOpen,
    rightDrawerOpen,
    isPreviewMode,
    updateElementContent,
    updateElementPosition
  }
}
