console.log('Parsing script...')

/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs'
import json from './52845_01.json'

// const kbk = json.kbk.map((item) => {
//   return { code: item.Код, title: item['Наименование вида расходов'] }
// }).reduce((acc, curr) => {
//   if (curr.title) {
//     acc = { ...acc, ...{ [curr.code]: curr } }
//   }
//   return acc
// }, {})

// console.log(kbk)

// const category = json.category.map((item) => {
//   return { code: item.Код, title: item['Наименование раздела, подраздела'] }
// }).reduce((acc, curr) => {
//   if (curr.title) {
//     acc = { ...acc, ...{ [curr.code]: curr } }
//   }
//   return acc
// }, {})
// console.log(category)

const full = json.full.slice(2).map((item) => {
  const map = {
    title: String(Object.values(item || {})[0]),
    sectionCode: String(item?.Column2),
    budgetExpenseCode: item?.Column3
  }
  return map
}).reduce((acc, curr) => {
  if (curr.budgetExpenseCode) {
    acc.budget = { ...acc.budget, ...{ [curr.budgetExpenseCode]: curr } }
  } else {
    delete curr.budgetExpenseCode
    if (curr.sectionCode !== 'undefined') {
      acc.section = { ...acc.section, ...{ [curr.sectionCode]: curr } }
    }
  }
  return acc
}, { section: {}, budget: {} })

fs.writeFile('./scripts/data/section.json', JSON.stringify(Object.values(full.section)), (err) => {
  if (err) throw err
})
console.log(full.section)

fs.writeFile('./scripts/data/budget.json', JSON.stringify(Object.values(full.budget)), (err) => {
  if (err) throw err
})

// fs.writeFile('./scripts/data/budget-unique.json', JSON.stringify(
//   [...new Set(Object.values(full.budget).map((item) => ({
//     title: item.title,
//     budgetExpenseCode: item.budgetExpenseCode,
//   })))]
// ), (err) => {
//   if (err) throw err
// })

console.log(full.budget)
