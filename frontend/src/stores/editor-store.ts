import { defineStore } from 'pinia'
import { Slide } from 'src/composables/useEditor'
import { OpenAPI } from 'src/api'

console.log(OpenAPI)

type EditorState = {
  slides: Slide[];
  current: Slide | null
}

export const useEditorStore = defineStore('editor', {
  state: () => (<EditorState>{
    slides: [],
    current: null
  }),
  getters: {},
  actions: {
    setSlides (arr: Slide[]) {
      this.slides = arr
    },
    setCurrent (id: string) {
      this.current = this.slides.find(item => item.id === id) ?? null
    }
  }
})
