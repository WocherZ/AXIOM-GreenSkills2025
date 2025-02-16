import { defineStore } from 'pinia'
import { Folder, folderControllerFindAll } from 'src/client'
import { client } from 'src/boot/api-client'

type folderState = {
  map: Record<string, Folder>
}

export const useFolderStore = defineStore('folder', {
  state: () => (<folderState>{
    map: {}
  }),

  getters: {
    list: (state) => Object.values(state.map)
  },

  actions: {
    async loadItems () {
      const response = await folderControllerFindAll({ client })
      const list = response.data || []
      this.map = list.reduce((acc, val) => ({
        ...acc,
        [val.id]: val
      }), {})
    }
    // async addFolder (folder: Folder) {
    // },
    // async removeFolder (key: string) {
    // },
  }
})
