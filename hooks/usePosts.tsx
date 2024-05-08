/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { CountPost, Post, Theme } from '@/domain/types'
import { useEffect, useState } from 'react'
import { useFetch } from './useFetch'
import { useSession } from './useSession'

export const usePosts = () => {
  const { context: { state: { posts }, isAuthenticated }, setPosts, setThemes, setCountPost } = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const themes = await useFetch<Theme[]>({ path: '/theme', alerts: false })
      const countPost = await useFetch<CountPost>({ path: '/posts/resume/count', alerts: false })
      setThemes(themes)
      setCountPost(countPost)
      
      if (isAuthenticated) {
        const posts = await useFetch<Post[]>({ path: '/posts', alerts: false })
        setLoading(false)
        setPosts(posts)
      } else {
        const posts = await useFetch<Post[]>({
          path: '/posts/short',
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
