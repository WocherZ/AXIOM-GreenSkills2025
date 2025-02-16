<template>
  <q-page class="flex bg-image flex-center">
    <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
      <q-card-section>
        <div class="text-center q-pt-lg">
          <div class="col text-h6 ellipsis">
            Sign Up
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form
          class="q-gutter-md"
          @submit="handleSubmit"
        >
          <q-input
            filled
            v-model="form.firstName"
            label="First Name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Необходимо заполнить поле']"
          />

          <q-input
            filled
            v-model="form.lastName"
            label="Last Name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Необходимо заполнить поле']"
          />

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
            <q-btn label="Sign Up" @click="handleSubmit" type="submit" color="primary"/>
            <!--            <q-btn label="Logout" @click="logOut" type="button" color="primary"/>-->
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'stores/authStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFormChild, useQuasar } from 'quasar'

const $q = useQuasar()
const authStore = useAuthStore()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})
const myForm = ref()

function validate (): boolean {
  myForm.value.validate().then((success: boolean) => {
    if (success) {
      console.log('Form is valid!', myForm.value) // successful validation
    } else {
      console.log('Form is Invalid!', myForm.value) // invalid validation
    }
  })
  return !!(form.value.email && form.value.password && form.value.firstName && form.value.lastName)
}

function resetValidation () {
  form.value.firstName = ''
  form.value.lastName = ''
  form.value.email = ''
  form.value.password = ''
}

useFormChild({
  validate,
  resetValidation,
  requiresQForm: true
})
const router = useRouter()

async function handleSubmit () {
  if (!form.value.firstName || !form.value.lastName || !form.value.email || !form.value.password) {
    return false
  } else {
    await authStore.signup(form.value)
    await router.push('/auth/login')
  }
}

</script>

<style lang="scss" scoped>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
