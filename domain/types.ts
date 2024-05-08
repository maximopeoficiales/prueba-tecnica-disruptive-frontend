import { SVGProps } from "react"

export interface Category {
  _id: string
  name: string
  imageUrl: string
  createdAt?: string
  updatedAt?: string
}

export interface Post {
  _id: string
  name: string
  image?: string
  video?: string
  text?: string
  theme: Theme
  user: User
  createdAt?: string
  updatedAt?: string
}

export interface Theme {
  _id: string
  name: string
  imageUrl: string
  categories: Category[]
  createdAt?: string
  updatedAt?: string
}

export interface User {
  _id: string
  username: string
  email: string
  role: Role
  credits: number
  createdAt: string
  updatedAt: string
}

export interface Role {
  _id: string
  name: string
  role: number
  createdAt: string
  updatedAt: string
}

export interface CountPost {
  recordsImagesPost: number
  recordsVideoPost: number
  recordsTextPost: number
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
