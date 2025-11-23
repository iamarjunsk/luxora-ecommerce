export const useSnackbar = () => {
  const isVisible = useState('snackbar-visible', () => false)
  const message = useState('snackbar-message', () => '')
  const type = useState('snackbar-type', () => 'success') // success, error, info

  let timeout: NodeJS.Timeout

  const showSnackbar = (msg: string, msgType: 'success' | 'error' | 'info' = 'success') => {
    message.value = msg
    type.value = msgType
    isVisible.value = true

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      isVisible.value = false
    }, 3000)
  }

  const closeSnackbar = () => {
    isVisible.value = false
    if (timeout) clearTimeout(timeout)
  }

  return {
    isVisible,
    message,
    type,
    showSnackbar,
    closeSnackbar
  }
}
