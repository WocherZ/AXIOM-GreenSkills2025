import { defineStore } from 'pinia'
import { Theme, themeControllerFindAll } from 'src/client'

interface themeStore {
  itemsMap: Record<string, Theme>
}

export const useThemeStore = defineStore('theme', {
  state: () => (<themeStore>{
    itemsMap: {}
  }),
  getters: {
    itemsList: (state) => Object.values(state.itemsMap),
    getItemByCode () {
      return (code: string) => this.itemsMap[code]
    }
  },
  actions: {
    async loadData () {
      const resp = await themeControllerFindAll()
      console.log(222, resp.data?.data)
      const list = resp.data?.data || []
      this.itemsMap = list.reduce((acc, item) => ({ ...acc, ...{ [item.id]: item } }), {})
    }
  }
})
