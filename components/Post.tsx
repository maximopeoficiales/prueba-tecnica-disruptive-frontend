import { Post } from "@/domain/types"
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react"

interface MyProps {
  post: Post | undefined
}
export const PostCard = ({ post }: MyProps) => {
  const date = new Date(post?.updatedAt as string).toLocaleString()
  const buildUrlYouTube = (url?: string) => {
    if (!url) return
    if (url.includes('embed')) return url
    const idVideo = new URLSearchParams(url.split('?')[1]).get('v')
    return `https://www.youtube.com/embed/${idVideo!}`
  }
  return (
    <>
      {post ? (
        <>
          <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
            <Card className="py-4 w-9/12 md:w-8/12 lg:w-5/12">
              {post.user &&
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <small className="text-default-500">
                      <b >Username:</b> {post.user.username}
                    </small>

                    <small className="text-default-500">
                      <b >Credits:</b> <span>{post.user.credits}</span>
                    </small>
                  </div>
                </CardHeader>
              }

              <CardBody className="overflow-visible py-2">
                {post.image &&
                  <>
                    <Image
                      src={post.image}
                      alt={post.name}
                      shadow="md"
                      width="100%"
                      className="object-cover rounded-xl h-52"
                    />
                  </>

                }
                <h3 className='text-center text-xl font-bold my-1'>{post.name}</h3>
                <div className="">
                  <p className='text-justify text-foreground/55'>{post.text}</p>
                </div>

                {post.video && (
                  <>
                    <iframe
                      className={'my-2 rounded-xl h-52'}
                      src={buildUrlYouTube(post?.video)}
                      title={post.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      loading='lazy'
                    />
                  </>
                )}
                <div className='flex justify-end my-1'>
                  <p className='text-sm text-foreground/40'>
                    {date}
                  </p>
                </div>
              </CardBody>
            </Card>
          </section>
        </>
      )
        :
        <h3 className='text-3xl'>Post no encontrado</h3>
      }
    </>
  )
}
