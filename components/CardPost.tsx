import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react"

export const CardPost = () => {
  return (
    <div>cardPost</div>
  )
}

interface MyProps {
  name: string
  themeName: string
  themeImageUrl: string
}
export const CardPostSimple = ({ name, themeName, themeImageUrl }: MyProps) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt={'theme' + themeName}
          height={40}
          radius="sm"
          src={themeImageUrl}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{themeName}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{name}</p>
      </CardBody>
    </Card>
  )
}
