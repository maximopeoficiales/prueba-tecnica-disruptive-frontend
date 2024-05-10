'use client'
import { PostCard } from '@/components/Post'
import { useSession } from '@/hooks/useSession'
import DefaultLayout from '@/layouts/default'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
const Post = () => {
  const router = useRouter()
  const { id } = router.query as Record<string, any>

  const { findPostById, isAuthenticated } = useSession()

  const post = findPostById(id)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  return (
    <DefaultLayout>
      {isAuthenticated &&
        <PostCard post={post} />
      }
    </DefaultLayout>
  )
}

export default Post
