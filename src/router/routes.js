export default [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/HomePage.vue')
      },
      {
        path: 'form',
        name: 'form',
        component: () => import('pages/form.vue')
      },
      {
        path: 'cform',
        name: 'cform',
        component: () => import('pages/cform.vue')
      }
    ]
  },

  // Optional: catch-all route for 404s
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]
