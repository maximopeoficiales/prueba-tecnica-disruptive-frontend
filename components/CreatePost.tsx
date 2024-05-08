import { useSession } from '@/hooks/useSession'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'

export const CreatePost = () => {
  const { isAuthenticated, context: { state: { user } } } = useSession()
  const { push } = useRouter()
  const redirectCreatePost = () => {
    push('/post/create')
  }
  if (!isAuthenticated) {
    return
  }
  return (
    <div className="flex justify-between w-full">
      <Button color="primary" onClick={redirectCreatePost}>
        Create Post
      </Button>
      <div>
        <span>Creditos Actuales <b>{user?.credits}</b></span>
      </div>
    </div>
  )
}
