<template>
  <q-page padding>
    <h3>Editor Page</h3>
    <!-- <SlideEditor /> -->
    <!-- <WysiwygField /> -->
    <pre>kbk: {{ kbkCode }}</pre>

    <pre>kbkSectionCode: {{ kbkSectionCode }}</pre>
    <pre>kbkSectionParentCode: {{ kbkSectionParentCode }}</pre>
    <pre>sectionParent: {{ sectionParentCode }}</pre>
    <pre>section: {{ sectionCode }}</pre>

    <pre>kbkBudgetCode: {{ kbkBudgetCode }}</pre>
    <pre>budget: {{ budgetCode }}</pre>

    <q-input v-model="kbkCode" label="kbk" mask="### ## ## ## # X# ##### ###"
             hint="### ## ## ## # X# ##### ###"></q-input>
    <!-- <q-select v-model="budgetCode" label="Select Page"></q-select> -->
  </q-page>
</template>

<script setup lang="ts">
// import SlideEditor from 'components/SlideEditor.vue'
// import WysiwygField from 'components/editor/WysiwygField.vue'
import { ref } from 'vue'
import { useKbkClassificator } from 'src/composables/useKbkClassificator'

defineOptions({
  name: 'EditorPage'
})

// const kbkCode = ref('725 04 11 47 2 U4 12300 241')
const kbkCode = ref('725 01 08 47 4 07 92782 862')

const {
  budgetCode,
  kbkBudgetCode,
  kbkSectionCode,
  kbkSectionParentCode,
  sectionCode,
  sectionParentCode
} = useKbkClassificator(kbkCode)

// const slides = ref(pages)
</script>
