import { defineStore } from 'pinia'
import {
  docsControllerDraft,
  docsControllerDraftsFindAll, docsControllerFindAll,
  docsControllerFindOne,
  docsControllerGenerateDoc,
  docsControllerUpdateDraft, Document, DocGenerateInput
} from 'src/client'

interface docsStore {
  itemsMap: Record<string, Document>
  draftMap: Record<string, DocGenerateInput>
  currentDraft: any
}

export const useDocsStore = defineStore('docs', {
  state: () => (<docsStore>{
    itemsMap: {},
    draftMap: {},
    currentDraft: null
  }),
  getters: {
    itemsList: (state) => Object.values(state.itemsMap),
    draftList: (state) => Object.values(state.draftMap)
      .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1),
    itemById () {
      return (code: string) => this.itemsMap[code]
    },
    draftById () {
      return (id: string) => this.draftMap[id] || null
    }
  },
  actions: {
    async loadData () {
      const resp = await docsControllerFindAll()
      const list = resp.data?.data || []
      this.itemsMap = list.reduce((acc, item) => {
        return { ...acc, ...{ [item.id]: item } }
      }, {})
    },
    async loadDoc (id: string) {
      const resp = await docsControllerFindOne({ path: { id } })
      const item = resp.data
      if (item) {
        this.itemsMap = { ...this.itemsMap, ...{ [item.id]: item } }
      }
    },
    async loadDrafts (id?: string) {
      const resp = await docsControllerDraftsFindAll()
      const list = resp.data?.data || []
      this.draftMap = list.reduce((acc, item) => {
        return { ...acc, ...{ [item.id]: item } }
      }, {})
      if (id) {
        this.currentDraft = this.draftMap[id] || null
      }
    },
    async generateDraft (draft: any) {
      console.log('Generate draft for prompt:', prompt)
      const resp = await docsControllerDraft({
        body: {
          prompt: draft.prompt,
          settings: { numCards: draft.cards.value }
        }
      })
      console.log('Generated draft response:', resp.data)
      this.currentDraft = { ...resp.data }
    },
    async generateDoc () {
      const resp = await docsControllerGenerateDoc({
        path: { draftId: this.currentDraft.id }
      })
      // console.log('Generated doc response:', resp.data)
      return resp.data
    },
    async updateDraft (draft: any) {
      if (this.currentDraft) {
        const resp = await docsControllerUpdateDraft({
          path: { draftId: this.currentDraft.id },
          body: {
            content: draft.content,
            // settings: this.currentDraft.settings
          }
        })
        this.currentDraft = resp.data
        // console.log('Updated draft response:', resp.data)
      }
    }
  }
})
