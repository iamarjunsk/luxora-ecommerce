export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: user } = await useFetch('/api/auth/me')

  if (!user.value?.user && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }

  if (user.value?.user && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
})
