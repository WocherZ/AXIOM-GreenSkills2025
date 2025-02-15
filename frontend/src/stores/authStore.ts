import { defineStore } from 'pinia'
// import { ApiClient, AuthLoginDto, OpenAPI } from 'src/api'
import { client as ApiClient } from 'src/boot/api-client'
import { SessionStorage } from 'quasar'
import {
  AuthControllerLoginResponse,
  authControllerLogout,
  authControllerRefreshToken,
  authControllerRegister,
  AuthLoginDto,
  AuthRegisterDto,
  AuthResponseDto
} from 'src/client'
import { authControllerLogin } from 'src/client/sdk.gen'
import { useUserStore } from 'stores/userStore'

type authState = {
  auth: AuthResponseDto | null;
};

export const useAuthStore = defineStore('auth', {
  state: () => (<authState>{
    auth: SessionStorage.getItem('auth') || null
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.auth
    // isLoggedIn: (state): boolean => !!state.profile
  },

  actions: {
    async signup (form: AuthRegisterDto) {
      try {
        const response = await authControllerRegister({ body: form })

        console.log('signup', response)
      } catch (e) {
        console.error(12, e)
      }
    },
    async refreshToken () {
      const auth: AuthControllerLoginResponse | null = SessionStorage.getItem('auth') || null
      try {
        if (auth?.accessToken) {
          const response = await authControllerRefreshToken({
            body: {
              refreshToken: auth.refreshToken
            }
          })
          console.log('refresh', response)
          ApiClient.setConfig({
            headers: {
              Authorization: `Bearer ${response.data?.accessToken}`
            }
          })
          this.auth = response.data || null
          SessionStorage.set('auth', response.data || undefined)
          return true
        } else {
          await this.logout()
        }
      } catch (e) {
        console.error(12, e)
      }
    },
    async login (form: AuthLoginDto) {
      try {
        const response = await authControllerLogin({ body: form })

        console.log('login', response)

        ApiClient.setConfig({
          headers: {
            Authorization: `Bearer ${response.data?.accessToken}`
          }
        })
        this.auth = response.data || null
        SessionStorage.set('auth', response.data || undefined)

        await useUserStore().getProfile()
        return true
      } catch (e) {
        console.error(12, e)
        return false
      }
    },
    async logout () {
      await authControllerLogout()
      SessionStorage.remove('auth')
      this.auth = null
    }

  }
})
