export interface LoginDto {
  username: string,
  email: string
}
export interface RegisterDto {
  username: string,
  email: string,
  role: string
}

export interface PostCreateDto {
  name: string
  video?: string
  text?: string
  image?: string
  theme: string
}
