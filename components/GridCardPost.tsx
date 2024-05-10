import { useAuth } from "@/hooks/useAuth";
import { usePosts } from "@/hooks/usePosts";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { CardPostSimple } from "./CardPost";

export const GridCardPost = () => {
  const { loading, posts } = usePosts()
  const { context } = useAuth()
  const { isAuthenticated, } = context
  const { themeSelected, searchFilter, user: { role } } = context.state


  const router = useRouter()
  const checkUser = (event: any) => {
    if (isAuthenticated) return
    event.preventDefault()
    Swal.fire({
      title: "Warning",
      text: "You must be a registered user\nDo you want to register?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want to register!"
    }).then((result) => {
      if (result.isConfirmed) {
        void router.push('/register')
      }
    });
  }

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {loading && <p>Cargandooo</p>}
      {posts.length === 0 ? <h1>No hay posts</h1>
        :
        posts
          .filter(({ theme }) => {
            if (themeSelected === 'all') return true
            return theme.name.toLowerCase() === themeSelected.toLowerCase()
          })
          .filter(({ name }) => {
            if (!searchFilter) return true
            return searchFilter.some((word) => name.toLowerCase().includes(word))
          })
          .map(({ _id: id, name, theme }) => (
            <NextLink key={id} href={`/post/${id}`} onClick={checkUser}>
              <CardPostSimple name={name} themeName={theme.name} themeImageUrl={theme.imageUrl} />
            </NextLink>
          ))
      }


    </section>
  )
}