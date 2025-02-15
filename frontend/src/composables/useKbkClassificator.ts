import { computed, Ref } from 'vue'
import budgetUniqueList from 'stores/data/budget-unique.json'
import sectionList from 'stores/data/section.json'

export function useKbkClassificator (code: Ref) {
  const kbkCode = code

  const kbkBudgetCode = computed(() => {
    return kbkCode.value ? `${kbkCode.value.split(' ').reverse().slice(0, 1)}` : null
  })
  const budgetCode = computed(() => {
    return kbkBudgetCode.value?.length === 3 ? budgetUniqueList.find((item) => item.budgetExpenseCode === kbkBudgetCode.value) : null
  })
  const kbkSectionCode = computed(() => {
    return kbkCode.value.split(' ').slice(1, 3).join('')
  })
  const sectionCode = computed(() => {
    return kbkSectionCode.value.length === 4 ? sectionList.find((item) => item.sectionCode === kbkSectionCode.value) : null
  })
  const kbkSectionParentCode = computed(() => {
    return kbkCode.value.split(' ')[1] + '00'
  })
  const sectionParentCode = computed(() => {
    return kbkSectionCode.value.length === 4 ? sectionList.find((item) => item.sectionCode === kbkSectionParentCode.value) : null
  })

  return {
    budgetCode,
    kbkBudgetCode,
    kbkSectionCode,
    sectionCode,
    kbkSectionParentCode,
    sectionParentCode,
    kbkCode
  }
}
