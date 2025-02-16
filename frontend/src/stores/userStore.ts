import { defineStore } from 'pinia'
import { SessionStorage } from 'quasar'
import { User, authControllerGetProfile } from 'src/client'

type UserState = {
  profile: User | null
}

export const useUserStore = defineStore('user', {
  state: () => (<UserState>{
    profile: SessionStorage.getItem('profile') || null
  }),
  getters: {
    isLoggedIn: (state): boolean => !!state.profile
  },
  actions: {
    async getProfile () {
      try {
        const response = await authControllerGetProfile()
        const user = response.data || null
        SessionStorage.set('profile', user || undefined)
        this.profile = user
        console.log('me', user)
      } catch (e) {
        console.error(12, e)
      }
    }
  }
})
