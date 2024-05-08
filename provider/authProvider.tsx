/* eslint-disable react-hooks/rules-of-hooks */
import { LoginDto, PostCreateDto, RegisterDto } from '@/domain/dto';
import { UserResponse } from '@/domain/response';
import { CountPost, Post, Theme, User } from '@/domain/types';
import { useFetch } from '@/hooks/useFetch';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
export interface StateGlobal {
  user: User
  token: string | null
  logged: boolean | null
  posts: Post[] | []
  themes: Theme[] | []
  themeSelected: string
  post: Post | undefined
  countPost: CountPost | undefined
  searchFilter: string[] | undefined
}

interface AuthContextType {
  state: StateGlobal;
  login: (user: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>
  registerPost: (data: PostCreateDto) => Promise<Post | null>
  logout: () => void;
  isAuthenticated: boolean | null
  setPosts: (posts: Post[]) => Promise<void>
  setSearchFilter: (searchFilter: string) => Promise<void>
  setThemes: (posts: Theme[]) => Promise<void>
  setThemeSelected: (theme: string) => Promise<void>
  setCountPost: (countPost: CountPost) => Promise<void>
  findPostById: (id: string) => Post | undefined
}



const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface MyProps {
  children: React.ReactNode
}
export const AuthProvider = ({ children }: MyProps) => {
  const [state, setState] = useState<StateGlobal>({
    user: {

    } as any,
    token: null,
    logged: false,
    posts: [],
    post: undefined,
    countPost: undefined,
    themes: [],
    searchFilter: undefined,
    themeSelected: 'all'
  })

  const login = async (data: LoginDto) => {
    try {
      const response = await useFetch<UserResponse>({
        path: '/auth/login',
        method: 'POST',
        data,
      })

      window.localStorage.setItem('token', response.token)
      setState((prevState) => ({
        ...prevState,
        user: response?.user ?? null,
        token: response?.token ?? null,
        logged: true
      }))
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Welcome ${response.user.username}`,
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.log(error)
    }
  };

  const register = async (data: RegisterDto) => {
    try {
      const response = await useFetch<UserResponse>({
        path: '/auth/register',
        method: 'POST',
        data,
      })
      window.localStorage.setItem('token', response.token)
      setState((prevState) => ({
        ...prevState,
        user: response?.user ?? null,
        token: response?.token ?? null,
        logged: true
      }))
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Welcome ${response.user.username}`,
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.log(error)

    }
  };
  const registerPost = async (data: PostCreateDto) => {
    try {
      const post = await useFetch<Post>({
        path: '/posts',
        method: 'POST',
        data,
      })
      setState((prevState) => ({
        ...prevState,
        user: {
          ...prevState.user,
          credits: post.user.credits
        }
      }))
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Post Created",
        showConfirmButton: false,
        timer: 1500
      });
      return post
    } catch (error) {
      console.log(error)
      return null
    }
  };

  const setCountPost = async (countPost: CountPost) => {
    try {
      setState((prevState) => ({
        ...prevState,
        countPost
      }))
    } catch (error) {
      console.log(error)
    }
  };
  const setSearchFilter = async (searchFilter: string) => {
    try {
      setState((prevState) => ({
        ...prevState,
        searchFilter: searchFilter.toLowerCase().split(' ')
      }))
    } catch (error) {
      console.log(error)
    }
  };
  const setThemeSelected = async (themeSelected: string) => {
    try {
      setState((prevState) => ({
        ...prevState,
        themeSelected
      }))
    } catch (error) {
      console.log(error)
    }
  };
  const setPosts = async (posts: Post[]) => {
    try {
      setState((prevState) => ({
        ...prevState,
        posts
      }))
    } catch (error) {
      console.log(error)
    }
  };
  const setThemes = async (themes: Theme[]) => {
    try {
      setState((prevState) => ({
        ...prevState,
        themes
      }))
    } catch (error) {
      console.log(error)
    }
  };

  const findPostById = (id: string) => {
    try {
      const post = state.posts.find(p => p._id === id)
      setState((prevState) => ({
        ...prevState,
        post
      }))
      return post
    } catch (error) {
      console.log(error)
    }
  };

  const logout = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Good Bye, ${state.user.username}`,
      showConfirmButton: false,
      timer: 1500
    });

    window.localStorage.removeItem('token')
    setState((prevState) => ({
      ...prevState,
      user: {} as any,
      token: null,
      logged: false,
    }))

  };

  useEffect(() => {
    (async () => {
      try {
        const token = window.localStorage.getItem('token')
        if (token) {
          const response = await useFetch<UserResponse>({
            path: '/auth/refresh',
            method: 'POST',
            data: { token },
            alerts: false
          })
          setState((prevState) => ({
            ...prevState,
            user: response.user,
            token: response.token,
            logged: true
          }))
        } else {
          logout
        }
      } catch (error) {
        logout()
      }
    })()
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, register, setSearchFilter, setThemeSelected, registerPost, setThemes, setCountPost, findPostById, setPosts, state, isAuthenticated: state.logged }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useStateContext = () => {
  return useContext(AuthContext)
}