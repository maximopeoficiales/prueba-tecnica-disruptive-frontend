import { routes } from '@/config/routes'
import { useAuth } from '@/hooks/useAuth'
import DefaultLayout from '@/layouts/default'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

interface MyProps {
  children: React.ReactNode
}
const PublicRoute = ({ children }: MyProps) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(routes.HOME);
    }
  }, [isAuthenticated, router]);
  return !isAuthenticated ?
    <DefaultLayout>
      {children}
    </DefaultLayout > : <></>
}


export default PublicRoute