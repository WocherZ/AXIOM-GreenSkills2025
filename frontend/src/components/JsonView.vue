<script setup lang="ts">
import { usePaymentsStore } from 'stores/payments'
import { useKbkStore } from 'stores/kbk'
import { useKbkLimitsStore } from 'stores/kbk-limits'
import { computed, onMounted } from 'vue'

const paymentsStore = usePaymentsStore()
const paymentsList = computed(() => paymentsStore.itemsMap)
const contractsList = computed(() => paymentsStore.governmentContractNumberList())
const expenditureDetailsList = computed(() => paymentsStore.expenditureDetailsList())
const kbkList = computed(() => paymentsStore.kbkList())
const kbkStore = useKbkStore()
const kbkList1 = computed(() => kbkStore.itemsList)
const limitsStore = useKbkLimitsStore()
const limitsList = computed(() => limitsStore.itemsList)
onMounted(async () => {
  await paymentsStore.loadData()
  await kbkStore.loadData()
  await limitsStore.loadData()
})
</script>

<template>
  <pre>limits: {{limitsList}}</pre>
  <pre>kbk: {{kbkList1}}</pre>
  <pre>expenditureDetails: {{expenditureDetailsList}}</pre>
  <pre>contracts: {{contractsList}}</pre>
  <pre>payments: {{paymentsList}}</pre>
  <pre>kbk: {{kbkList}}</pre>

</template>

<style scoped>

</style>
