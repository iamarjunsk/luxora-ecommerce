export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()

  if (!userStore.user) {
    await userStore.fetchUser()
  }

  if (!userStore.user && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }

  if (userStore.user && to.path === '/admin/login') {
    return navigateTo('/admin')
  }

  // RBAC: Restrict admin routes to admins only
  if (userStore.user && !userStore.isAdmin && to.path.startsWith('/admin')) {
    return navigateTo('/')
  }
})
