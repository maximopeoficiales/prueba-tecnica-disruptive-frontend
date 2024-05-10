import { Theme } from '@/domain/types'
import { useAuth } from '@/hooks/useAuth'
import { Button, Card, CardBody, CardHeader, Divider, Image, Input, Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'


export const CreatePost = () => {
  const { registerNewPost, context } = useAuth()
  const [currentTheme, setCurrentTheme] = useState<Theme>()
  const validCategories = currentTheme?.categories.map(e => e.name)
  const validVideo = validCategories?.includes('video')
  const validText = validCategories?.includes('text')
  const validImage = validCategories?.includes('image')

  const { themes } = context.state

  const handlerChange = (event: any) => {
    const idTheme = event.target.value
    const theme = themes.find(theme => theme._id == idTheme)
    setCurrentTheme(theme)
  }
  return (
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
            <p className="text-2xl">Create Post</p>
          </div>
        </CardHeader>
        <Divider />
        <form action="#" onSubmit={registerNewPost}>
          <CardBody >
            <Select
              isRequired
              label="theme"
              placeholder="Select to role"
              className="my-2"
              name='theme'
              onChange={handlerChange}
            >
              {themes.map((theme) => (
                <SelectItem key={theme._id} value={theme._id} className='capitalize'>
                  {theme.name}
                </SelectItem>
              ))}
            </Select>
            <Input isRequired label="Name" name='name' placeholder="Enter your name post" className='my-2' />
            {validVideo &&
              <Input label="Url Video" name='video' placeholder="Insert url video" className='my-2' />
            }

            {validImage &&
              <Input label="Url Image" name='image' placeholder="Insert url image" className='my-2' />
            }

            {validText &&
              <Input label="Text" name='text' placeholder="Insert url text" className='my-2' />
            }

            <Button color="primary" variant="shadow" className='my-2' type='submit'>
              Create Post
            </Button>

          </CardBody>
        </form>

      </Card>
    </section>
  )
}

