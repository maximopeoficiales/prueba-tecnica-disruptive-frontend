import { routesApi } from '@/config/routes'
import { CountPost, Post, Theme } from '@/domain/types'
import { fetchApi } from '@/utils/fetchApi'
import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'

export const usePosts = () => {
  const { context: { state: { posts }, isAuthenticated }, setPosts, setThemes, setCountPost } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const themes = await fetchApi<Theme[]>({ path: routesApi.THEME, alerts: false })
      const countPost = await fetchApi<CountPost>({ path: routesApi.POST_COUNT, alerts: false })
      setThemes(themes)
      setCountPost(countPost)

      if (isAuthenticated) {
        const posts = await fetchApi<Post[]>({ path: routesApi.POST, alerts: false })
        setLoading(false)
        setPosts(posts)
      } else {
        const posts = await fetchApi<Post[]>({
          path: routesApi.POST_SHORT,
          alerts: false,
        })
        setLoading(false)
        setPosts(posts)
      }
    }
    )()
  }, [])

  return { posts, loading }
}
