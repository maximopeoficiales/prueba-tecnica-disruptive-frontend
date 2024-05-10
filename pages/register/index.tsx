import PublicRoute from '@/components/PublicRoute'
import { RegisterUser } from '@/components/RegisterUser'


const RegisterPage = () => {
  return (
    <PublicRoute>
      <RegisterUser />
    </PublicRoute>
  )
}

export default RegisterPage
