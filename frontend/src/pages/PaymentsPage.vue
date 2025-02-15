<script setup lang="ts">
import { reversePropertyMapping, usePaymentsStore } from 'stores/payments'
import { computed, onMounted } from 'vue'
import { useKbkStore } from 'stores/kbk'
import { useKbkLimitsStore } from 'stores/kbk-limits'
import { ILookupField } from 'src/types/IBase'

const paymentsStore = usePaymentsStore()
const kbkStore = useKbkStore()
const kbkLimitsStore = useKbkLimitsStore()
const paymentsList = computed(() => paymentsStore.itemsList)
const columns = [
  {
    name: 'id',
    label: 'ID',
    field: 'id'
  },
  {
    name: 'title',
    label: reversePropertyMapping.paymentName,
    field: 'title',
    sortable: true
  },
  {
    name: 'kbkCodeLookup',
    label: reversePropertyMapping.kbkCode,
    field: 'kbkCodeLookup',
    format: (val: ILookupField) => `${val.title}`,
    sortable: true
  },
  {
    name: 'governmentContractNumber',
    label: reversePropertyMapping.governmentContractNumber,
    field: 'governmentContractNumber',
    sortable: true
  },
  {
    name: 'paymentDate',
    label: reversePropertyMapping.paymentDate,
    field: 'paymentDate',
    format: (val: Date) => `${val.toLocaleString()}`,
    sortable: true
  }
]
onMounted(async () => {
  await kbkStore.loadData()
  await kbkLimitsStore.loadData()
  await paymentsStore.loadData()
})
</script>

<template>
  <q-page padding>
    <q-table :rows="paymentsList" title="Payments" :columns="columns">
    </q-table>
    <pre>{{ paymentsList[0] }}</pre>
    <pre>{{ columns }}</pre>
  </q-page>

</template>

<style scoped>

</style>
