import { defineStore } from 'pinia'
import { data } from 'stores/data/docs-gamma.json'
import { IDoc } from 'src/types/IDocs'

interface docsStore {
  itemsMap: Record<string, IDoc>
}

export const useDocsStore = defineStore('docs', {
  state: () => (<docsStore>{
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
      const list = data.docs.edges.map(item => item.node)
      this.itemsMap = list.reduce((acc, item) => {
        return { ...acc, ...{ [item.id]: item } }
      }, {})
    }
  }
})
