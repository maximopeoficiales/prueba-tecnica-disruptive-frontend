import { PostId } from '@/components/PostId'
import PrivateRoute from '@/components/PrivateRoute'
const PostPageId = () => {
  return (
    <PrivateRoute>
      <PostId />
    </PrivateRoute>

  )
}

export default PostPageId
