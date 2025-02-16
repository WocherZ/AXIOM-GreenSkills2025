import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/IndexPage.vue')
    }]
  },
  {
    path: '/json',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/JsonPage.vue')
    }]
  },
  {
    path: '/create',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        name: 'CreatePage',
        component: () => import('pages/CreatePage.vue'),
        meta: { authRequired: true }
      },
      {
        path: 'generate',
        name: 'GeneratePage',
        component: () => import('pages/GeneratePage.vue'),
        meta: { authRequired: true }
      },
      {
        path: 'generate/:draftId',
        name: 'GenerateDraftPage',
        component: () => import('pages/GeneratePage.vue'),
        meta: { authRequired: true }
      },
      {
        path: 'import',
        name: 'ImportPage',
        component: () => import('pages/ImportPage.vue'),
        meta: { authRequired: true }
      }
    ]
  },
  {
    path: '/docs',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [{
      path: ':docId',
      component: () => import('pages/DocsPage.vue'),
      meta: { authRequired: true }
    }]
  },
  {
    path: '/editor',
    component: () => import('layouts/EditorLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/EditorPage.vue'),
      meta: { authRequired: true }
    }]
  },
  {
    path: '/themes',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/ThemesPage.vue'),
      meta: { authRequired: true }
    }]
  },
  {
    path: '/drag',
    component: () => import('layouts/EditorLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/DragDropPage.vue')
    }]
  },
  {
    path: '/auth',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'LoginPage' }
      },
      {
        path: 'login',
        name: 'LoginPage',
        component: () => import('pages/LoginPage.vue'),
        meta: { authRequired: false }
      },
      {
        path: 'signup',
        name: 'SignupPage',
        component: () => import('pages/SignupPage.vue'),
        meta: { authRequired: false }
      },
      {
        path: 'logout',
        name: 'LogoutPage',
        component: () => import('pages/LoginPage.vue'),
        meta: { authRequired: false }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
