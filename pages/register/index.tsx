import { roles } from '@/constants/roles'
import { useSession } from '@/hooks/useSession'
import DefaultLayout from '@/layouts/default'
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Input, Link as LinkUI, Select, SelectItem } from '@nextui-org/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'


const RegisterPage = () => {
  const { registerUser, isAuthenticated } = useSession()
  const { push } = useRouter()
  if (isAuthenticated) {
    push('/')
    return
  }

  return (
    <DefaultLayout>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <Card className="w-9/12 md:w-8/12 lg:w-5/12">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-2xl">Register</p>
            </div>
          </CardHeader>
          <Divider />
          <form action="#" onSubmit={registerUser}>
            <CardBody >
              <Input isRequired label="Username" name='username' placeholder="Enter your username" className='my-2' />
              <Input isRequired type="email" name='email' label="Email" placeholder="Enter your email" className='my-2' />
              <Select
                isRequired
                label="Role"
                placeholder="Select to role"
                className="my-2"
                name='roleName'
                value={'creator'}
              >
                {roles.map((role) => (
                  <SelectItem key={role} value={role} className='capitalize'>
                    {role}
                  </SelectItem>
                ))}
              </Select>
              <Button color="primary" variant="shadow" className='my-2' type='submit'>
                Register
              </Button>

            </CardBody>
          </form>
          <Divider />
          <CardFooter>
            <p className='text-xs'>¿Tienes un cuenta?
              <LinkUI
                className='items-end text-xs font-bold ml-1'
                showAnchorIcon
              >
                <NextLink href={'/login'}>
                  Sig In
                </NextLink>
              </LinkUI>
            </p>


          </CardFooter>
        </Card>
      </section>
    </DefaultLayout>
  )
}

export default RegisterPage
