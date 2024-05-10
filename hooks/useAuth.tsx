/* eslint-disable react-hooks/rules-of-hooks */
import { routes } from '@/config/routes'
import { useStateContext } from '@/provider/authProvider'
import { useRouter } from 'next/router'
import { FormEvent, MouseEvent } from 'react'

export const useAuth = () => {
  const router = useRouter()

  const context = useStateContext()
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { login, logout: logoutHandler, register, setPosts, isAuthenticated, findPostById, setThemes, setCountPost, registerPost, setSearchFilter, setThemeSelected } = context

  const logout = () => {
    logoutHandler()
    router.push(routes.HOME)
  }
  const singIn = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const { username, email } = evt.target as any
    const data = { username: username.value, email: email.value }
    await login(data)
    void router.push(routes.HOME)
  }

  const registerUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { username, email, roleName } = event.target as Record<string, any>
    await register(
      {
        username: username.value,
        email: email.value,
        role: roleName.value,
      }
    )
    void router.push(routes.HOME)
  }

  const redirectLogin = (evt: MouseEvent) => {
    evt.preventDefault()
    logout()
    void router.push(routes.LOGIN)
  }

  const redirectRegister = (evt: MouseEvent) => {
    evt.preventDefault()
    logout()
    void router.push(routes.REGISTER)
  }

  const registerNewPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { name, video, text, image, theme } = event.target as Record<string, any>
    await registerPost(
      {
        name: name.value,
        theme: theme.value,
        video: video?.value,
        text: text?.value,
        image: image?.value,
      }
    )
    void router.push(routes.HOME)
  }




  return {
    isAuthenticated,
    singIn,
    logout,
    registerUser,
    registerNewPost,
    redirectLogin,
    redirectRegister,
    setPosts,
    setCountPost,
    setThemes,
    setSearchFilter,
    findPostById,
    setThemeSelected,
    context,
  }
}
