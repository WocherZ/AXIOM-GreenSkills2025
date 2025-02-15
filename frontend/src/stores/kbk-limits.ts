import { defineStore } from 'pinia'
import data from 'stores/data/kbk-limits.json'
import { IKbkLimit } from 'src/types/IKbkLimit'
import { getKbkIdByCode, getKbkLookupByCode } from 'stores/kbk'

interface kbkLimitsStore {
  itemsMap: Record<string, IKbkLimit>
}

export const useKbkLimitsStore = defineStore('kbkLimits', {
  state: () => (<kbkLimitsStore>{
    itemsMap: {}
  }),
  getters: {
    itemsList: (state) => Object.values(state.itemsMap)
  },
  actions: {
    async loadData () {
      const list = data.query
      const englishPaymentDetails = transformPaymentDetailsArray(list)
      this.itemsMap = englishPaymentDetails.reduce((acc, item, index) => {
        item.id = index + 1
        Object.assign(acc, { [item.id]: item })
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
  'Лимит': 'limit',
  'Год': 'year',
  'NameKBK': 'title',
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
function transformPaymentDetailsArray (russianObjectArray: Array<Record<string, any>>): IKbkLimit[] {
  return russianObjectArray.map(russianObject => {
    const transformedObject: Partial<IKbkLimit> = {}

    Object.entries(russianObject).forEach(([russianKey, value]) => {
      // Проверяем, является ли ключ допустимым русским ключом
      const englishKey = russianKey in propertyMapping
        ? propertyMapping[russianKey as RussianKeys]
        : russianKey

      if (
        englishKey === 'year' ||
        englishKey === 'limit'
      ) {
        transformedObject[englishKey] = Number(value)
      } else if (
        englishKey === 'code'
      ) {
        const cleaned = value.replace('  ', ' ')

        transformedObject[englishKey] = cleaned
        transformedObject.kbk = getKbkIdByCode(cleaned)
        transformedObject.kbkLookup = getKbkLookupByCode(cleaned)
        transformedObject.slug = `${value.replace(/\s/g, '-')}-${transformedObject.year}`
        transformedObject.title = `${cleaned} на ${transformedObject.year} год`
      }
    })
    return transformedObject as IKbkLimit
  })
}
