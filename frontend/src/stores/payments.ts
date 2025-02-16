import { defineStore } from 'pinia'
import data from '../stores/data/payments.json'
import { IPaymentDetails } from 'src/types/IPaymentsDetails'
import { getKbkLookupByCode } from 'stores/kbk'

export const usePaymentsStore = defineStore('payments', {
  state: () => ({
    itemsMap: {}
  }),
  getters: {
    itemsList: (state): IPaymentDetails[] => Object.values(state.itemsMap),
    governmentContractNumberList () {
      return () => [...new Set(this.itemsList.map((item: IPaymentDetails) => item.governmentContractNumber))]
    },
    expenditureDetailsList () {
      return () => [...new Set(this.itemsList.map(item => item.expenditureDetails))]
    },
    kbkList () {
      return () => [...new Set(this.itemsList.map(item => item.kbkCode))]
    }
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
  'Дата платежа': 'paymentDate',
  'Наименование платежа': 'paymentName',
  'Сумма в рублях': 'amountInRubles',
  'Тип валюты': 'currencyType',
  'Заактировано': 'invoiced',
  'Статус платежа': 'paymentStatus',
  'КБК': 'kbkCode',
  'Наименование расхода в разрезе КБК': 'expenditureDetails',
  '№ госконтракта': 'governmentContractNumber',
  'Проект': 'project',
  'Результат': 'result',
  'Исполнитель': 'contractor',
  'Куратор': 'curator',
  'Дата начала контракта': 'contractStartDate',
  'Дата завершения контракта': 'contractEndDate',
  'Предмет госконтракта': 'contractSubject',
  'Тип элемента': 'elementType',
  'Путь': 'path',
  'Комментарий': 'comment',
  'Краткое название': 'description'
} as const

type RussianKeys = keyof typeof propertyMapping;

/**
 * Обратный маппинг английских названий свойств к русским
 * @type {Record<string, string>}
 */
export const reversePropertyMapping = Object.fromEntries(
  Object.entries(propertyMapping).map(([k, v]) => [v, k])
)

/**
 * Преобразует массив объектов с русскими ключами в массив объектов с английскими ключами
 * @param {Array<Record<string, any>>} russianObjectArray - Массив объектов с русскими ключами
 * @returns {IPaymentDetails[]} Массив объектов с английскими ключами
 */
function transformPaymentDetailsArray (russianObjectArray: Array<Record<string, any>>): IPaymentDetails[] {
  return russianObjectArray.map(russianObject => {
    const transformedObject: Partial<IPaymentDetails> = {}

    Object.entries(russianObject).forEach(([russianKey, value]) => {
      // Проверяем, является ли ключ допустимым русским ключом
      const englishKey = russianKey in propertyMapping
        ? propertyMapping[russianKey as RussianKeys]
        : russianKey

      if (['Сумма в рублях', 'Заактировано'].includes(russianKey)) {
        if (
          englishKey === 'amountInRubles' ||
          englishKey === 'invoiced'
        ) {
          transformedObject[englishKey] = Number(value)
        }
      } else {
        transformedObject[englishKey as keyof IPaymentDetails] = value
      }
      if (['Путь', 'Тип элемента'].includes(russianKey)) {
        if (
          englishKey === 'elementType' ||
          englishKey === 'path'
        ) {
          delete transformedObject[englishKey]
        }
      }
      if (
        englishKey === 'paymentDate' ||
        englishKey === 'contractStartDate' ||
        englishKey === 'contractEndDate'
      ) {
        transformedObject[englishKey] = new Date(value)
      }
      if (
        englishKey === 'kbkCode'
      ) {
        const cleaned = value.replace('  ', ' ')
        transformedObject[englishKey] = cleaned
        transformedObject.kbkCodeLookup = getKbkLookupByCode(cleaned)
      }
      if (
        englishKey === 'paymentName'
      ) {
        transformedObject[englishKey] = value
        transformedObject.title = value
      }
    })
    return transformedObject as IPaymentDetails
  })
}
