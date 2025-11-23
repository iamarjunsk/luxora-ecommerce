export const useAuth = () => {
  const user = useState<any>('user', () => null)

  const fetchUser = async () => {
    try {
      const data = await $fetch('/api/auth/me')
      user.value = data?.user || null
    } catch (e) {
      user.value = null
    }
  }

  return {
    user,
    fetchUser
  }
}
