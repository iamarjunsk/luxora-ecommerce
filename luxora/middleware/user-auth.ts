export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const data = await $fetch('/api/auth/me')
    if (!data?.user) {
      return navigateTo(`/login?redirect=${to.path}`)
    }
  } catch (error) {
    return navigateTo(`/login?redirect=${to.path}`)
  }
})
