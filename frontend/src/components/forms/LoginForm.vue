<script setup lang="ts">
import { useAuthStore } from 'stores/authStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFormChild } from 'quasar'

const router = useRouter()
// const userStore = useUserStore()
const authStore = useAuthStore()
const form = ref({
  email: 'shurochkin@gmail.com',
  password: '1q@W3e$R5t^Y'
})
// const profile = computed(() => userStore.profile)
const myForm = ref()
function validate (): boolean {
  myForm.value.validate().then((success: boolean) => {
    if (success) {
      console.log('Form is valid!', myForm.value) // successful validation
    } else {
      console.log('Form is Invalid!', myForm.value) // invalid validation
    }
  })
  return !!(form.value.email && form.value.password)
}

function resetValidation () {
  form.value.email = ''
  form.value.password = ''
}

useFormChild({
  validate,
  resetValidation,
  requiresQForm: false
})
async function handleSubmit () {
  const res = await authStore.login(form.value)
  if (res) {
    await router.push('/')
  }
}

// async function logOut () {
//   await userStore.logout()
// }
onMounted(async () => {
  // await userStore.login()
})
</script>

<template>
  <q-form
    class="q-gutter-md"
    @submit.prevent="handleSubmit"
    ref="myForm"
  >
    <q-input
      filled
      v-model="form.email"
      label="Email"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Необходимо заполнить поле']"
    />

    <q-input
      type="password"
      filled
      v-model="form.password"
      label="Password"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Необходимо заполнить поле']"
    />

    <div>
      <q-btn label="Login" @click="handleSubmit" type="button" color="primary"/>
      <!--            <q-btn label="Logout" @click="logOut" type="button" color="primary"/>-->
    </div>
  </q-form>

</template>

<style scoped>

</style>
