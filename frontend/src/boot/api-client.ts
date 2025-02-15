import { client } from 'src/client/client.gen'
import * as types from 'src/client/types.gen'
import * as sdk from 'src/client/sdk.gen'
// import { useAuthStore } from 'stores/authStore'
import { SessionStorage } from 'quasar'
import { AuthControllerLoginResponse } from 'src/client/types.gen'

client.interceptors.request.use((request) => {
  const auth: AuthControllerLoginResponse | null = SessionStorage.getItem('auth') || null
  const accessToken = auth?.accessToken
  accessToken && request.headers.set('Authorization', `Bearer ${auth?.accessToken}`)
  return request
})

client.interceptors.response.use((response) => {
  // const authStore = useAuthStore()
  if (response.status === 200) {
    // console.log(`200 request to ${response.url} was successful`)
  }
  if (response.status === 201) {
    // console.log(`201 request to ${response.url} was successful`)
  }
  if (response.status === 401) {
    // authStore.refreshToken()
    // authStore.logout()
    SessionStorage.remove('auth')
    document.location.href = 'auth/login'
  }
  if (response.status === 404) {
    // console.log(`404 request to ${response.url} was successful`)
  }
  return response
})

export { client, types, sdk }
