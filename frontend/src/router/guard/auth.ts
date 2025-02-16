import { useAuthStore } from 'src/stores/authStore'

const authGuard = (to: any, from: any, next: (to?: string) => void) => {
  // Если у пользователя нет токена или он не авторизован,
  // перенаправьте его на страницу входа
  const authStore = useAuthStore()
  if (to.path === 'logout') {
    console.log('logout')
  }
  // if (to.path !== from.path) {
  //   console.log('change route')
  //   console.log('from', from)
  //   console.log('to', to)
  // }
  if (to.meta.authRequired === false) {
    console.log('Auth not required')
    console.log(authStore.auth && authStore.isAuthenticated)
    if (authStore.auth && authStore.isAuthenticated) {
      next('/')
    } else {
      next()
    }
  } else if (to.meta.authRequired === true) {
    if (!authStore.auth || !authStore.isAuthenticated) {
      next('/auth/login')
    } else {
      next()
    }
  } else {
    next()
  }
}

export default authGuard
