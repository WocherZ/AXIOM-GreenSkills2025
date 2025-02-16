import { defineStore } from 'pinia'
import data from 'stores/data/kbk.json'
import { IKbkCode } from 'src/types/IKbkCode'
import { ILookupField } from 'src/types/IBase'

interface kbkStore {
  itemsMap: Record<string, IKbkCode>
}

export const useKbkStore = defineStore('kbk', {
  state: () => (<kbkStore>{
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
      const list = data.query
      const englishPaymentDetails = transformPaymentDetailsArray(list)
      this.itemsMap = englishPaymentDetails.reduce((acc, item, index) => {
        item.id = index + 1
        Object.assign(acc, { [item.code]: item })
        return acc
      }, {})
    }
  }
})

/**
 * Маппинг русских названий свойств к английским
 * @type {Record<string, string>}
 */
const propertyMapping = {
  'КБК': 'code',
  'Тип элемента': 'elementType',
  'Путь': 'path'
} as const

type RussianKeys = keyof typeof propertyMapping;

/**
 * Преобразует массив объектов с русскими ключами в массив объектов с английскими ключами
 * @param {Array<Record<string, any>>} russianObjectArray - Массив объектов с русскими ключами
 * @returns {IPaymentDetails[]} Массив объектов с английскими ключами
 */
function transformPaymentDetailsArray (russianObjectArray: Array<Record<string, any>>): IKbkCode[] {
  return russianObjectArray.map(russianObject => {
    const transformedObject: Partial<IKbkCode> = {}

    Object.entries(russianObject).forEach(([russianKey, value]) => {
      // Проверяем, является ли ключ допустимым русским ключом
      const englishKey = russianKey in propertyMapping
        ? propertyMapping[russianKey as RussianKeys]
        : russianKey

      if (
        englishKey === 'code'
      ) {
        const cleaned = value.replace('  ', ' ')

        transformedObject[englishKey] = cleaned
        transformedObject.slug = cleaned.replace(/\s/g, '-')
        transformedObject.title = cleaned
      }
    })
    return transformedObject as IKbkCode
  })
}
export function getKbkLookupByCode (code: string): ILookupField {
  const store = useKbkStore()
  const item = store.getItemByCode(code)
  return {
    id: item.id,
    title: item.title
  }
}
export function getKbkIdByCode (code: string): number {
  const store = useKbkStore()
  const kbk = store.getItemByCode(code)
  return (kbk && kbk.id) ?? 0
}
