import { CreatePost } from "@/components/CreatePost"
import PrivateRoute from "@/components/PrivateRoute"


const CreatePostPage = () => {

  return (
    <PrivateRoute>
      <CreatePost />
    </PrivateRoute>
  )
}

export default CreatePostPage
