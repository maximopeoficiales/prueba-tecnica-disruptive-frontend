import { PostCard } from '@/components/Post'
import { useSession } from '@/hooks/useSession'
import DefaultLayout from '@/layouts/default'
import { useRouter } from 'next/router'
const Post = () => {
  const router = useRouter()
  const { id } = router.query as Record<string, any>

  const { findPostById } = useSession()

  const post = findPostById(id)
  
  return (
    <DefaultLayout>
      <PostCard post={post} />
    </DefaultLayout>
  )
}

export default Post
