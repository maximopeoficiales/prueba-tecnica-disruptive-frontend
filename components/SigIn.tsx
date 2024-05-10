import { useAuth } from '@/hooks/useAuth'
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Input, Link as LinkUI } from '@nextui-org/react'
import NextLink from 'next/link'


const SigIn = () => {
  const { singIn } = useAuth()

  return (<section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
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
          <p className="text-2xl">Login</p>
        </div>
      </CardHeader>
      <Divider />
      <form action="#" onSubmit={singIn}>
        <CardBody >
          <Input isRequired label="Username" type="input"
            name="username" placeholder="Enter your username" className='my-2'
          />
          <Input isRequired type="email" name="email" label="Email" placeholder="Enter your email" className='my-2'
          />
          <Button color="primary" variant="shadow" className='my-2' type='submit'>
            Login
          </Button>
        </CardBody>
      </form>
      <Divider />
      <CardFooter>
        <p className='text-xs'>¿You are not registered?
          <LinkUI
            as={'span'}
            className='items-end text-xs font-bold ml-1'
            showAnchorIcon
          >
            <NextLink href={'/register'} >
              Register
            </NextLink>
          </LinkUI>
        </p>
      </CardFooter>
    </Card>
  </section>
  )
}

export default SigIn